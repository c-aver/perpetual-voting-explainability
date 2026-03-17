import json
import sys
import re
import argparse
from collections import Counter, defaultdict
from pathlib import Path
from typing import Any, Dict, List, Optional
from datetime import datetime, timezone

def load_json(path: str) -> dict:
  with Path(path).open(encoding="utf-8") as file:
    return json.load(file)


def extract_age(entry: Dict[str, Any]) -> Optional[float]:
  participant = (
    entry.get("survey-response", {})
    .get("responses", {})
    .get("demographic", {})
    .get("submission", {})
    .get("participant", {})
  )
  answers = (
    entry.get("survey-response", {})
    .get("responses", {})
    .get("demographic", {})
    .get("answers", {})
  )
  age = participant.get("age") or answers.get("age", {}).get("value")
  if isinstance(age, (int, float)):
    return float(age)
  return None


def passes_age_filter(entry: Dict[str, Any], min_age: Optional[float], max_age: Optional[float], include_missing: bool) -> bool:
  age = extract_age(entry)
  if age is None:
    return include_missing
  if min_age is not None and age < min_age:
    return False
  if max_age is not None and age > max_age:
    return False
  return True


def extract_submission_time(entry: Dict[str, Any]) -> Optional[datetime]:
  """Extract submission time from entry, returns None if not found or invalid."""
  submission_time_str = entry.get("submission-time")
  if not submission_time_str:
    return None
  try:
    # Parse ISO 8601 format with timezone
    return datetime.fromisoformat(submission_time_str.replace("Z", "+00:00"))
  except (ValueError, AttributeError):
    return None


def passes_date_filter(entry: Dict[str, Any], start_date: Optional[datetime]) -> bool:
  """Check if entry submission time is after start_date."""
  if start_date is None:
    return True
  submission_time = extract_submission_time(entry)
  if submission_time is None:
    return False  # Exclude entries without valid submission time
  return submission_time >= start_date


def extract_lottery_name(entry: Dict[str, Any]) -> Optional[str]:
  """Extract lottery name from entry if available."""
  survey_response = entry.get("survey-response", {})
  responses = survey_response.get("responses", {})
  
  # Lottery name is in the thank-you response
  thank_you = responses.get("thank-you", {})
  submission = thank_you.get("submission", {})
  lottery = submission.get("lottery", {})
  lottery_name = lottery.get("name")
  
  if lottery_name and isinstance(lottery_name, str) and lottery_name.strip():
    return lottery_name.strip()
  return None


def collect_lottery_names(data: List[Dict[str, Any]]) -> Dict[str, Any]:
  """Collect all lottery names from participants and return stats."""
  lottery_names = []
  participants_with_names = 0
  
  for entry in data:
    name = extract_lottery_name(entry)
    if name:
      lottery_names.append(name)
      participants_with_names += 1
  
  return {
    "lottery_names": lottery_names,
    "participants_with_names": participants_with_names,
    "total_participants": len(data)
  }


def summarize_page_response_counts(data: List[Dict[str, Any]]) -> Dict[str, int]:
  """Count the number of responses for each page ID, sorted by count descending."""
  page_counts: Dict[str, int] = Counter()
  
  for entry in data:
    survey_response = entry.get("survey-response", {})
    responses = survey_response.get("responses", {})
    
    for page_id in responses.keys():
      page_counts[page_id] += 1
  
  # Sort by count descending
  return dict(sorted(page_counts.items(), key=lambda x: x[1], reverse=True))


def summarize_participants(data: List[Dict[str, Any]]) -> Dict[str, Any]:
  """Generate a compact summary for the participants section of the survey."""
  language_counts = Counter()
  education_counts = Counter()
  gender_counts = Counter()
  ages: List[float] = []
  hashed_ips = set()
  demographic_responses = 0

  for entry in data:
    survey_response = entry.get("survey-response", {})
    responses = survey_response.get("responses", {})
    demographic = responses.get("demographic", {})
    answers = demographic.get("answers", {})
    participant = demographic.get("submission", {}).get("participant", {})

    hashed_ip = entry.get("hashed-ip")
    if hashed_ip:
      hashed_ips.add(hashed_ip)

    language = survey_response.get("language") or survey_response.get("locale") or "unknown"
    language_counts[language] += 1

    if demographic:
      demographic_responses += 1

    education = participant.get("education") or answers.get("education", {}).get("value")
    if education:
      education_counts[education] += 1

    gender = participant.get("gender") or answers.get("gender", {}).get("value")
    if gender:
      gender_counts[gender] += 1

    age = participant.get("age") or answers.get("age", {}).get("value")
    if isinstance(age, (int, float)):
      ages.append(age)

  total = len(data)
  demographic_completion_rate = round(demographic_responses / total, 2) if total else 0.0
  age_summary = None
  if ages:
    average_age = round(sum(ages) / len(ages), 2)
    age_summary = {
      "min": min(ages),
      "max": max(ages),
      "average": average_age
    }

  return {
    "total_responses": total,
    "unique_participants": len(hashed_ips),
    "languages": dict(language_counts),
    "gender_counts": dict(gender_counts),
    "education_counts": dict(education_counts),
    "age_summary": age_summary,
    "demographic_completion_rate": demographic_completion_rate
  }


def summarize_page_durations(data: List[Dict[str, Any]]) -> Dict[str, Any]:
  """Aggregate completion times per page across filtered responses."""
  accumulator: Dict[str, List[int]] = defaultdict(list)
  for entry in data:
    page_durations = entry.get("survey-response", {}).get("pageDurationsMs", {})
    for page, duration in page_durations.items():
      if isinstance(duration, (int, float)):
        accumulator[page].append(int(duration) / 1000.0 / 60)

  summary: Dict[str, Dict[str, float]] = {}
  for page, durations in accumulator.items():
    if not durations:
      continue
    avg_duration = round(sum(durations) / len(durations), 2)
    summary[page] = {
      "count": len(durations),
      "average_min": avg_duration,
      "min_min": min(durations),
      "max_min": max(durations)
    }
  return summary


def summarize_instance_ratings(data: List[Dict[str, Any]]) -> Dict[str, Dict[str, Any]]:
  """Produce per-participant rating tables, including demo and instance feedback."""
  participant_ratings: Dict[str, Dict[str, Any]] = {}
  for idx, entry in enumerate(data):
    survey_response = entry.get("survey-response", {})
    responses = survey_response.get("responses", {})
    participant_id = survey_response.get("submissionId") or entry.get("hashed-ip") or f"participant-{idx+1}"

    instances: Dict[str, Dict[str, Any]] = {}
    for key, value in responses.items():
      if not key.startswith("instance-") or not isinstance(value, dict):
        continue
      rating = value.get("rating")
      max_rating = value.get("maxRating")
      if rating is None:
        continue
      instances[key] = {
        "rating": rating,
        "maxRating": max_rating,
        #"expandedExplanationDay": value.get("expandedExplanationDay"),
        "feedback": value.get("additionalFeedback")
      }

    demo_info = responses.get("perpetual-demo")
    demo_rating = None
    if isinstance(demo_info, dict):
      demo_value = demo_info.get("rating")
      if demo_value is not None:
        demo_rating = {
          "rating": demo_value,
          "maxRating": demo_info.get("maxRating"),
          "expandedExplanationDay": demo_info.get("expandedExplanationDay"),
          "feedback": demo_info.get("additionalFeedback")
        }

    if instances or demo_rating is not None:
      participant_summary: Dict[str, Any] = {
        "locale": survey_response.get("locale"),
        "language": survey_response.get("language")
      }
      if demo_rating is not None:
        participant_summary["demo_rating"] = demo_rating
      if instances:
        participant_summary["instances"] = instances
      participant_ratings[participant_id] = participant_summary

  return participant_ratings


def summarize_participant_times(data: List[Dict[str, Any]]) -> Dict[str, float]:
  """Return total time spent on the survey per participant in minutes (rounded).

  Uses `survey-response.pageDurationsMs` when available and sums numeric
  duration values. Participant identifiers use the same logic as
  `summarize_instance_ratings` (submissionId, hashed-ip, or generated id).
  """
  times: Dict[str, float] = {}
  for idx, entry in enumerate(data):
    survey_response = entry.get("survey-response", {})
    participant_id = (
      survey_response.get("submissionId")
      or entry.get("hashed-ip")
      or f"participant-{idx+1}"
    )

    page_durations = survey_response.get("pageDurationsMs", {})
    total_min = 0
    page_times = dict()
    if isinstance(page_durations, dict):
      for page_id, time in page_durations.items():
        if isinstance(time, (int, float)):
          page_time_min = int(time) / 1000.0 / 60
          total_min += page_time_min
          page_times[page_id] = page_time_min

    times[participant_id] = { 'total': total_min, 'page_times': page_times }

  return times


def summarize_fairness_ratings(data: List[Dict[str, Any]], sort_by_value: bool = True) -> Dict[str, float]:
  """Calculate average fairness rating per instance category (rule and explanation type).
  
  For example: "unit_cost-none", "approval-instance_based", etc.
  By default returns categories sorted by rating in descending order.
  If sort_by_value is False, sorts alphabetically by category name.
  """
  category_ratings: Dict[str, List[float]] = defaultdict(list)
  
  for entry in data:
    survey_response = entry.get("survey-response", {})
    responses = survey_response.get("responses", {})
    
    for key, value in responses.items():
      if not key.startswith("instance-") or not isinstance(value, dict):
        continue
      rating = value.get("rating")
      if rating is None:
        continue
      
      # Extract category from instance key (remove "instance-" prefix)
      category = key.replace("instance-", "", 1)
      category_ratings[category].append(float(rating))
  
  # Calculate average rating per category
  averages: Dict[str, float] = {}
  for category, ratings in category_ratings.items():
    if ratings:
      avg = round(sum(ratings) / len(ratings), 2)
      averages[category] = avg
  
  # Sort by value (descending) or by key (alphabetically)
  if sort_by_value:
    return dict(sorted(averages.items(), key=lambda x: x[1], reverse=True))
  else:
    return dict(sorted(averages.items()))


def summarize_fairness_ratings_by_rule(data: List[Dict[str, Any]], sort_by_value: bool = True) -> Dict[str, float]:
  """Calculate average fairness rating per rule-explanation combination (across all datasets).
  
  Groups all ratings for a given rule-explanation combination, averaging across datasets.
  For example: "approval-none", "unit_cost-mechanical", "equal_shares-instance_based", etc.
  By default returns 12 categories sorted by rating in descending order.
  If sort_by_value is False, sorts alphabetically by rule-explanation name.
  """
  rule_explanation_ratings: Dict[str, List[float]] = defaultdict(list)
  
  for entry in data:
    survey_response = entry.get("survey-response", {})
    responses = survey_response.get("responses", {})
    
    for key, value in responses.items():
      if not key.startswith("instance-") or not isinstance(value, dict):
        continue
      rating = value.get("rating")
      if rating is None:
        continue
      
      # Extract rule and explanation from instance key
      # Format: "instance-{dataset}-{rule}-{explanation}"
      full_category = key.replace("instance-", "", 1)
      parts = full_category.split("-")
      
      # Need at least 3 parts: dataset, rule, explanation
      if len(parts) >= 3:
        # parts[0] is dataset, parts[1] is rule, parts[2] is explanation
        rule = parts[1]
        explanation = parts[2]
        rule_explanation = f"{rule}-{explanation}"
        rule_explanation_ratings[rule_explanation].append(float(rating))
  
  # Calculate average rating per rule-explanation combination
  averages: Dict[str, float] = {}
  for rule_explanation, ratings in rule_explanation_ratings.items():
    if ratings:
      avg = round(sum(ratings) / len(ratings), 2)
      averages[rule_explanation] = avg
  
  # Sort by value (descending) or by key (alphabetically)
  if sort_by_value:
    return dict(sorted(averages.items(), key=lambda x: x[1], reverse=True))
  else:
    return dict(sorted(averages.items()))


def main() -> None:
  parser = argparse.ArgumentParser(
    prog="analyse_responses.py",
    description="Analyze survey response data and generate summary statistics.",
    formatter_class=argparse.RawDescriptionHelpFormatter,
    epilog="""
FEATURES:
  --page-durations      Include page duration statistics (default: disabled)
  --no-page-durations   Exclude page duration statistics

  --ratings             Include instance ratings and demo feedback (default: disabled)
  --no-ratings          Exclude instance ratings

  --participant-times   Include participant total time spent (default: disabled)
  --no-participant-times Exclude participant time summaries

  --lottery-names       Include list of lottery names (default: disabled)
  --no-lottery-names    Exclude lottery names

  --responses-per-page  Include page response counts (default: disabled)
  --no-responses-per-page Exclude page response counts

  --fairness-ratings    Include average fairness ratings by instance category (default: disabled)
  --no-fairness-ratings Exclude fairness ratings

  --fairness-ratings-by-rule Include average fairness ratings by rule-explanation combination (12 categories) (default: disabled)
  --no-fairness-ratings-by-rule Exclude fairness ratings by rule

  --fairness-ratings-sort-by-key Sort fairness ratings by key (alphabetically) instead of value (default: by value descending)

AGE FILTERING:
  --min-age AGE         Minimum age filter (default: 6, set to None to disable)
  --max-age AGE         Maximum age filter (default: None, set to disable upper bound)
  --include-missing-age Include responses with missing age (default: True)
  --exclude-missing-age Exclude responses with missing age

DATE FILTERING:
  --start-date DATE     Only include responses from this date onwards (format: YYYY-MM-DD or YYYY-MM-DDTHH:MM:SS)
                        ISO 8601 format accepted

EXAMPLES:
  python analyse_responses.py responses.json
  python analyse_responses.py responses.json output.json --no-ratings --min-age 18
  python analyse_responses.py responses.json --start-date 2025-12-20
  python analyse_responses.py responses.json --help
    """
  )
  
  parser.add_argument("json_path", help="Path to the input JSON file with survey responses")
  parser.add_argument("output_path", nargs="?", default=None, help="Optional output JSON file path")
  
  # Feature flags (all disabled by default)
  parser.add_argument("--page-durations", dest="page_durations", action="store_true", default=False,
                      help="Include page duration statistics (default: disabled)")
  parser.add_argument("--no-page-durations", dest="page_durations", action="store_false",
                      help="Exclude page duration statistics")
  
  parser.add_argument("--ratings", dest="ratings", action="store_true", default=False,
                      help="Include instance ratings and feedback (default: disabled)")
  parser.add_argument("--no-ratings", dest="ratings", action="store_false",
                      help="Exclude instance ratings")
  
  parser.add_argument("--participant-times", dest="participant_times", action="store_true", default=False,
                      help="Include participant time summaries (default: disabled)")
  parser.add_argument("--no-participant-times", dest="participant_times", action="store_false",
                      help="Exclude participant time summaries")
  
  parser.add_argument("--lottery-names", dest="lottery_names", action="store_true", default=False,
                      help="Include list of lottery names (default: disabled)")
  parser.add_argument("--no-lottery-names", dest="lottery_names", action="store_false",
                      help="Exclude lottery names")
  
  parser.add_argument("--responses-per-page", dest="responses_per_page", action="store_true", default=False,
                      help="Include page response counts (default: disabled)")
  parser.add_argument("--no-responses-per-page", dest="responses_per_page", action="store_false",
                      help="Exclude page response counts")
  
  parser.add_argument("--fairness-ratings", dest="fairness_ratings", action="store_true", default=False,
                      help="Include average fairness ratings by instance category (default: disabled)")
  parser.add_argument("--no-fairness-ratings", dest="fairness_ratings", action="store_false",
                      help="Exclude fairness ratings")
  
  parser.add_argument("--fairness-ratings-by-rule", dest="fairness_ratings_by_rule", action="store_true", default=False,
                      help="Include average fairness ratings by rule-explanation combination (12 categories) (default: disabled)")
  parser.add_argument("--no-fairness-ratings-by-rule", dest="fairness_ratings_by_rule", action="store_false",
                      help="Exclude fairness ratings by rule")
  
  parser.add_argument("--fairness-ratings-sort-by-key", dest="fairness_ratings_sort_by_key", action="store_true", default=False,
                      help="Sort fairness ratings by key (alphabetically) instead of by value (default: by value descending)")
  
  # Age filtering
  parser.add_argument("--min-age", type=float, default=6,
                      help="Minimum age filter (default: 6)")
  parser.add_argument("--max-age", type=float, default=None,
                      help="Maximum age filter (default: None)")
  parser.add_argument("--include-missing-age", dest="include_missing_age", action="store_true", default=True,
                      help="Include responses with missing age (default: True)")
  parser.add_argument("--exclude-missing-age", dest="include_missing_age", action="store_false",
                      help="Exclude responses with missing age")
  
  # Date filtering
  parser.add_argument("--start-date", type=str, default="2026-02-01",
                      help="Only include responses from this date onwards (format: YYYY-MM-DD or YYYY-MM-DDTHH:MM:SS)")
  
  args = parser.parse_args()
  
  # Set age filtering configuration from args
  MIN_AGE = args.min_age
  MAX_AGE = args.max_age
  INCLUDE_MISSING_AGE = args.include_missing_age
  
  # Parse start date
  start_date = None
  if args.start_date:
    try:
      # Parse the date and make it timezone-aware (UTC) for comparison with submission times
      parsed_date = datetime.fromisoformat(args.start_date)
      # If no timezone info provided, assume UTC
      if parsed_date.tzinfo is None:
        start_date = parsed_date.replace(tzinfo=timezone.utc)
      else:
        start_date = parsed_date
    except ValueError:
      print(f"Invalid date format: {args.start_date}")
      print("Expected format: YYYY-MM-DD or YYYY-MM-DDTHH:MM:SS")
      sys.exit(1)

  try:
    data = load_json(args.json_path)
  except FileNotFoundError:
    print(f"File not found: {args.json_path}")
    sys.exit(1)
  except json.JSONDecodeError as exc:
    print(f"Invalid JSON: {exc}")
    sys.exit(1)

  filtered_data = [
    entry for entry in data 
    if passes_age_filter(entry, MIN_AGE, MAX_AGE, INCLUDE_MISSING_AGE) 
    and passes_date_filter(entry, start_date)
  ]
  
  # Collect lottery names and print summary
  lottery_info = collect_lottery_names(filtered_data)
  print(f"Filtered responses: {len(filtered_data)} out of {len(data)} total responses")
  print(f"Participants with lottery names: {lottery_info['participants_with_names']} out of {lottery_info['total_participants']}")
  
  summary = {
    "filters": {
      "min_age": MIN_AGE,
      "max_age": MAX_AGE,
      "include_missing_age": INCLUDE_MISSING_AGE,
      "start_date": args.start_date,
      "original_response_count": len(data),
      "filtered_response_count": len(filtered_data)
    },
    "participant_summary": summarize_participants(filtered_data),
  }
  
  # Conditionally include features based on command-line flags
  if args.page_durations:
    summary["page_duration_summary"] = summarize_page_durations(filtered_data)
  
  if args.ratings:
    summary["instance_ratings_by_participant"] = summarize_instance_ratings(filtered_data)
  
  if args.participant_times:
    summary["participant_total_minutes"] = summarize_participant_times(filtered_data)
  
  if args.lottery_names:
    summary["lottery_names_data"] = {
      "names": lottery_info["lottery_names"],
      "count_with_names": lottery_info["participants_with_names"],
      "total_participants": lottery_info["total_participants"]
    }
  
  if args.responses_per_page:
    summary["responses_per_page"] = summarize_page_response_counts(filtered_data)
  
  if args.fairness_ratings:
    summary["fairness_ratings_by_category"] = summarize_fairness_ratings(filtered_data, sort_by_value=not args.fairness_ratings_sort_by_key)
  
  if args.fairness_ratings_by_rule:
    summary["fairness_ratings_by_rule"] = summarize_fairness_ratings_by_rule(filtered_data, sort_by_value=not args.fairness_ratings_sort_by_key)
  
  print(json.dumps(summary, indent=2, ensure_ascii=False))
  # If an output path is provided, write raw UTF-8 JSON there (no bidi wrapping).
  raw = json.dumps(summary, indent=2, ensure_ascii=False)
  if args.output_path:
    Path(args.output_path).parent.mkdir(parents=True, exist_ok=True)
    with Path(args.output_path).open("w", encoding="utf-8") as out:
      out.write(raw)
    print(f"Wrote summary to {args.output_path}")
    return

  # Otherwise print to stdout with RTL wrapping for lines that contain Hebrew.
  try:
    sys.stdout.reconfigure(encoding="utf-8")
  except Exception:
    pass

  lines = raw.splitlines()
  hebrew_re = re.compile(r"[\u0590-\u05FF]")
  wrapped: list[str] = []
  for line in lines:
    if hebrew_re.search(line):
      # Wrap the entire line in RLE ... PDF so it's rendered RTL as a whole.
      line = "\u202b" + line + "\u202c"
    wrapped.append(line)

  print("\n".join(wrapped))


if __name__ == "__main__":
  main()
