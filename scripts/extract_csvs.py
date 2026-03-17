#!/usr/bin/env python3
"""
Extract survey responses into organized CSV files.

Generates three CSV files:
1. lottery_participants.csv - Names and emails for the lottery drawing
2. participant_data.csv - Demographic and performance data for each participant
3. question_ratings.csv - Detailed ratings for each survey instance/rule combination
"""

import json
import csv
import sys
import re
import argparse
from pathlib import Path
from typing import Any, Dict, List, Optional, Tuple
from datetime import datetime, timezone


def load_json(path: str) -> list:
    """Load JSON data from file."""
    with Path(path).open(encoding="utf-8") as file:
        return json.load(file)


def extract_lottery_participant(entry: Dict[str, Any], participant_id: int) -> Optional[Dict[str, str]]:
    """
    Extract lottery participant info (name, email).
    
    Returns dict with keys: id, name, email
    Returns None if no name/email found.
    """
    survey_response = entry.get("survey-response", {})
    responses = survey_response.get("responses", {})
    
    thank_you = responses.get("thank-you", {})
    submission = thank_you.get("submission", {})
    lottery = submission.get("lottery", {})
    
    name = lottery.get("name")
    email = lottery.get("email")
    
    # Only include if at least one field is present
    if name or email:
        return {
            "id": str(participant_id),
            "name": name or "",
            "email": email or ""
        }
    return None


def extract_participant_data(entry: Dict[str, Any], participant_id: int) -> Optional[Dict[str, Any]]:
    """
    Extract participant demographic and performance data.
    
    Returns dict with keys: id, gender, age, education, attempts, feedback
    """
    survey_response = entry.get("survey-response", {})
    responses = survey_response.get("responses", {})
    
    # Extract demographic data
    demographic = responses.get("demographic", {})
    participant_info = demographic.get("submission", {}).get("participant", {})
    
    gender = participant_info.get("gender", "")
    age = participant_info.get("age", "")
    education = participant_info.get("education", "")
    
    # Extract knowledge check attempts
    knowledge_check = responses.get("knowledge-check", {})
    submission = knowledge_check.get("submission", {})
    kc_info = submission.get("knowledgeCheck", {})
    attempts = kc_info.get("attempts", "")
    
    # Extract feedback
    feedback = responses.get("feedback", {})
    feedback_text = feedback.get("value", "")
    
    return {
        "id": str(participant_id),
        "gender": str(gender) if gender else "",
        "age": str(age) if age else "",
        "education": str(education) if education else "",
        "attempts": str(attempts) if attempts else "",
        "feedback": str(feedback_text) if feedback_text else ""
    }


def parse_instance_key(key: str) -> Optional[Tuple[str, str, str]]:
    """
    Parse instance key into (instance_name, rule, explanation_type).
    
    Expected format: instance-{instance}-{rule}-{explanation}
    Example: instance-simple-phragmen-instance_based
    
    Returns None if key doesn't match expected pattern.
    """
    if not key.startswith("instance-"):
        return None
    
    # Remove "instance-" prefix
    parts = key[9:].split("-")
    
    if len(parts) < 3:
        return None
    
    # Last part is explanation type
    explanation = parts[-1]
    
    # Everything before the last part forms the rule (could be multi-word)
    rule = parts[-2]
    
    # Everything before the rule is the instance name (could be multi-word)
    instance = "-".join(parts[:-2])
    
    return (instance, rule, explanation)


def extract_question_ratings(entry: Dict[str, Any], participant_id: int) -> List[Dict[str, Any]]:
    """
    Extract ratings for all survey instances.
    
    Returns list of dicts with keys:
    id, instance, rule, explanation, rating, max_rating, additional_feedback, time, participant_id
    """
    survey_response = entry.get("survey-response", {})
    responses = survey_response.get("responses", {})
    page_durations = survey_response.get("pageDurationsMs", {})
    
    ratings = []
    rating_id = 1
    
    for key, value in responses.items():
        # Only process instance keys
        parsed = parse_instance_key(key)
        if not parsed:
            continue
        
        instance, rule, explanation = parsed
        
        rating = value.get("rating")
        max_rating = value.get("maxRating")
        additional_feedback = value.get("additionalFeedback", "")
        time_ms = page_durations.get(key, "")
        
        ratings.append({
            "id": str(rating_id),
            "instance": instance,
            "rule": rule,
            "explanation": explanation,
            "rating": str(rating) if rating is not None else "",
            "max_rating": str(max_rating) if max_rating is not None else "",
            "additional_feedback": str(additional_feedback) if additional_feedback else "",
            "time": str(time_ms) if time_ms else "",
            "participant_id": str(participant_id)
        })
        rating_id += 1
    
    return ratings


def extract_all_data(responses: List[Dict[str, Any]]) -> Tuple[List[Dict], List[Dict], List[Dict]]:
    """
    Extract all data from responses.
    
    Returns:
    - list of lottery participants
    - list of participant data
    - list of question ratings
    """
    lottery_participants = []
    participant_data = []
    question_ratings = []
    
    for idx, entry in enumerate(responses, 1):
        # Extract lottery participant
        lottery = extract_lottery_participant(entry, idx)
        if lottery:
            lottery_participants.append(lottery)
        
        # Extract participant data
        participant = extract_participant_data(entry, idx)
        if participant:
            participant_data.append(participant)
        
        # Extract question ratings
        ratings = extract_question_ratings(entry, idx)
        question_ratings.extend(ratings)
    
    return lottery_participants, participant_data, question_ratings


def write_csv(filepath: Path, fieldnames: List[str], rows: List[Dict[str, Any]]) -> None:
    """Write data to CSV file with UTF-8 BOM for Excel compatibility."""
    # Use utf-8-sig to add BOM (Byte Order Mark) for proper UTF-8 recognition in Excel and Windows
    with filepath.open("w", newline="", encoding="utf-8-sig") as f:
        writer = csv.DictWriter(f, fieldnames=fieldnames)
        writer.writeheader()
        writer.writerows(rows)
    print(f"Written {len(rows)} rows to {filepath.name}")


def main():
    parser = argparse.ArgumentParser(
        description="Extract survey responses into CSV files"
    )
    parser.add_argument(
        "responses_json",
        help="Path to responses.json file"
    )
    parser.add_argument(
        "-o", "--output",
        type=str,
        default=".",
        help="Output directory for CSV files (default: current directory)"
    )
    
    args = parser.parse_args()
    
    # Load responses
    print(f"Loading responses from {args.responses_json}...")
    responses = load_json(args.responses_json)
    print(f"Loaded {len(responses)} responses")
    
    # Create output directory if needed
    output_dir = Path(args.output)
    output_dir.mkdir(parents=True, exist_ok=True)
    
    # Extract data
    print("Extracting data...")
    lottery_participants, participant_data, question_ratings = extract_all_data(responses)
    
    # Write CSVs
    print(f"\nWriting CSV files to {output_dir}...")
    
    write_csv(
        output_dir / "lottery_participants.csv",
        ["id", "name", "email"],
        lottery_participants
    )
    
    write_csv(
        output_dir / "participant_data.csv",
        ["id", "gender", "age", "education", "attempts", "feedback"],
        participant_data
    )
    
    write_csv(
        output_dir / "question_ratings.csv",
        ["id", "instance", "rule", "explanation", "rating", "max_rating", "additional_feedback", "time", "participant_id"],
        question_ratings
    )
    
    print(f"\nSummary:")
    print(f"  Lottery participants: {len(lottery_participants)}")
    print(f"  Participant data: {len(participant_data)}")
    print(f"  Question ratings: {len(question_ratings)}")


if __name__ == "__main__":
    main()
