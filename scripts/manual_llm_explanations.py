#!/usr/bin/env python3
"""Interactive helper for drafting and storing rule-level explanations via ChatGPT."""

from __future__ import annotations

import argparse
import ast
import json
import re
import subprocess
import sys
from pathlib import Path
from textwrap import dedent
from typing import Dict, List, Sequence, Tuple

ROOT = Path(__file__).resolve().parents[1]
INSTANCE_DATA_PATH = ROOT / 'frontend' / 'survey-website' / 'src' / 'config' / 'instance-data.ts'
DEFAULT_MAX_PROMPTS = 16
DEFAULT_RESPONSES_PATH = ROOT / 'scripts' / 'manual_llm_responses.json'
RULE_ORDER = ['approval', 'equal_shares', 'phragmen', 'unit_cost']
RULE_LABELS = {
    'approval': 'Approval voting',
    'equal_shares': 'Method of Equal Shares (MES)',
    'phragmen': 'Phragmen load balancing (PP)',
    'unit_cost': 'Perpetual unit-cost (PUC)',
}
PROMPT_INSTRUCTIONS = dedent(
    """
    You are generating Hebrew explanations for a simulated perpetual voting process.
    Focus on the single rule listed below.
    Goals:
    - Make sure you know the voting rule that is used, they are all established rules in literature.
    - Write in modern Hebrew, using the candidate IDs exactly as shown (A, B, C, ...).
    - Explain each day's winning candidate by describing the logic behind the rule's choice (e.g. if the rule gives weights 
      to voters, you can refer to a decision as being carried by some high weight voter, if relevant), do not 
      refer directly to the rule's mechanism or numeric calculations.
    - When describing Day N, rely only on details from Days 1..N (no references to future days).
    - Do not refer to the candidates and voters as if they are real people with wants and goals, only refer to logic 
      inherent to the instance data and do not make up stories. Do not add superfluous flavor text.

    Output format:
    Day 1: <Hebrew explanation>
    Day 2: <Hebrew explanation>
    ... continue until the last recorded day for this rule.
    """
).strip()
DAY_LINE = re.compile(r'^\s*(?:[-*]\s*)?(?:Day|יום)\s+(\d+)\s*[:\-\.\)]?\s*(.*)$', re.IGNORECASE)


class UserQuit(Exception):
    """Raised when the operator explicitly quits the workflow."""


def parse_export(source: str, export_name: str):
    marker = f'export const {export_name}'
    start = source.find(marker)
    if start == -1:
        raise ValueError(f'Could not find export {export_name!r} in {INSTANCE_DATA_PATH}')
    brace_start = source.find('{', start)
    if brace_start == -1:
        raise ValueError(f'Could not locate opening brace for {export_name!r}')
    depth = 0
    end = brace_start
    while end < len(source):
        char = source[end]
        if char == '{':
            depth += 1
        elif char == '}':
            depth -= 1
            if depth == 0:
                end += 1
                break
        end += 1
    if depth != 0:
        raise ValueError(f'Unbalanced braces while parsing {export_name!r}')
    literal = source[brace_start:end]
    return ast.literal_eval(literal)


def format_ts(value, indent=0) -> str:
    indent_str = '  ' * indent
    if isinstance(value, dict):
        if not value:
            return '{}'
        lines = ['{']
        for key in sorted(value.keys()):
            formatted = format_ts(value[key], indent + 1)
            lines.append(f"{indent_str}  '{key}': {formatted},")
        lines.append(f'{indent_str}}}')
        return '\n'.join(lines)
    if isinstance(value, list):
        if not value:
            return '[]'
        lines = ['[']
        for item in value:
            formatted = format_ts(item, indent + 1)
            lines.append(f'{indent_str}  {formatted},')
        lines.append(f'{indent_str}]')
        return '\n'.join(lines)
    if isinstance(value, str):
        escaped = value.replace('\\', '\\\\').replace("'", "\\'")
        escaped = escaped.replace('\n', '\\n')
        return f"'{escaped}'"
    return str(value)


def replace_export_value(source: str, export_name: str, new_literal: str) -> str:
    marker = f'export const {export_name}'
    start = source.find(marker)
    if start == -1:
        raise ValueError(f'Could not find export {export_name!r}')
    brace_start = source.find('{', start)
    if brace_start == -1:
        raise ValueError(f'Could not locate opening brace for {export_name!r}')
    depth = 0
    end = brace_start
    while end < len(source):
        char = source[end]
        if char == '{':
            depth += 1
        elif char == '}':
            depth -= 1
            if depth == 0:
                end += 1
                break
        end += 1
    if depth != 0:
        raise ValueError(f'Unbalanced braces while locating {export_name!r}')
    return source[:brace_start] + new_literal + source[end:]


def load_instance_data():
    text = INSTANCE_DATA_PATH.read_text(encoding='utf-8')
    voters = parse_export(text, 'instanceVoters')
    days = parse_export(text, 'instanceDays')
    llm_generated = parse_export(text, 'llmGeneratedExplanations')
    return text, voters, days, llm_generated


def sorted_instances(available: Sequence[str]) -> List[str]:
    preferred = ['simple', 'complicated', 'few_rounds_1', 'few_rounds_2']
    ordered = [name for name in preferred if name in available]
    ordered.extend(name for name in available if name not in ordered)
    return ordered


def collect_candidates(days: List[Dict]) -> List[str]:
    seen = set()
    for day in days:
        winner = day.get('winner')
        if winner:
            seen.add(winner)
        for vote in day.get('votes', []):
            for selection in vote.get('selections', []):
                seen.add(selection)
    return sorted(seen)


def format_votes(day: Dict, voter_lookup: Dict[int, str]) -> List[str]:
    lines = []
    for vote in day.get('votes', []):
        voter_id = vote.get('voterId')
        label = voter_lookup.get(voter_id, f'voter {voter_id}')
        selections = ', '.join(vote.get('selections', [])) or '-'
        lines.append(f"v{voter_id} ({label}): {selections}")
    return lines


def build_rule_prompt(instance: str, rule: str, voters: List[Dict], days: List[Dict]) -> str:
    voter_lookup = {entry['id']: entry.get('label') or f'Voter {entry["id"]}' for entry in voters}
    voter_lines = [f"- v{entry['id']}: {entry.get('label') or f'Voter {entry['id']}'}" for entry in voters]
    candidates = collect_candidates(days)
    friendly = RULE_LABELS.get(rule, rule)
    sections = [PROMPT_INSTRUCTIONS, '']
    sections.append(f'Instance: {instance}')
    sections.append(f'Rule: {friendly} (`{rule}`)')
    sections.append(f'Voters ({len(voters)} total):\n' + '\n'.join(voter_lines))
    sections.append(f'Candidates mentioned in this rule: {", ".join(candidates)}')
    sections.append('Daily votes and winners:')
    for day in days:
        winner = day.get('winner', '?')
        sections.append(f"  Day {day['day']} (winner {winner}):")
        for line in format_votes(day, voter_lookup):
            sections.append(f'    {line}')
    sections.append('Remember to output one line per day in the requested format above.')
    return '\n'.join(sections)


def copy_to_clipboard(text: str) -> str | None:
    try:
        import pyperclip

        pyperclip.copy(text)
        return 'pyperclip'
    except ImportError:
        pass
    except Exception:
        return None

    tool_by_platform = {
        'win32': ['clip'],
        'darwin': ['pbcopy'],
    }
    cmd = tool_by_platform.get(sys.platform, ['xclip', '-selection', 'clipboard'])
    try:
        subprocess.run(cmd, input=text, text=True, check=True)
        return cmd[0]
    except Exception:
        return None


def normalize_line(line: str) -> str:
    stripped = line.strip()
    while stripped.startswith('*') and stripped.endswith('*') and len(stripped) > 1:
        stripped = stripped.strip('*')
    return stripped


def parse_response_block(block: str, day_count: int) -> List[str]:
    mapping: Dict[int, str] = {}
    current_day = None
    for raw_line in block.splitlines():
        line = normalize_line(raw_line)
        if not line:
            continue
        match = DAY_LINE.match(line)
        if match:
            day = int(match.group(1))
            if day < 1 or day > day_count:
                raise ValueError(f'day {day} is outside the expected range 1..{day_count}')
            text = match.group(2).strip()
            mapping[day] = text
            current_day = day
        elif current_day is not None:
            mapping[current_day] = (mapping[current_day] + ' ' + line).strip()
    missing = [str(day) for day in range(1, day_count + 1) if day not in mapping]
    if missing:
        raise ValueError(f'missing entries for day(s): {", ".join(missing)}')
    return [mapping[day] for day in range(1, day_count + 1)]


def capture_response(instance: str, rule: str, day_count: int) -> List[str] | None:
    print('Paste ChatGPT\'s response for this rule. Finish with /end. Commands: /skip, /quit.')
    while True:
        lines: List[str] = []
        while True:
            try:
                line = input()
            except EOFError:
                return None
            command = line.strip().lower()
            if command == '/skip':
                print('Skipping capture for this rule.')
                return None
            if command == '/quit':
                raise UserQuit()
            if command == '/end':
                break
            lines.append(line)
        block = '\n'.join(lines).strip()
        if not block:
            print('No text received. Paste again or enter /skip to move on.')
            continue
        try:
            parsed = parse_response_block(block, day_count)
        except ValueError as exc:
            print(f'Could not parse the response ({exc}). Paste again or /skip.')
            continue
        print('Captured explanations:')
        for idx, text in enumerate(parsed, start=1):
            print(f'  Day {idx}: {text}')
        confirm = input('Save this response? [Y/n] ').strip().lower()
        if confirm in ('', 'y', 'yes'):  # accept default yes
            return parsed
        print('Discarded. Paste the response again, or use /skip to move on.')


def save_responses_json(responses: Dict[str, Dict[str, List[str]]], path: Path) -> None:
    if not responses:
        return
    payload = {inst: rules for inst, rules in responses.items()}
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(json.dumps(payload, ensure_ascii=False, indent=2), encoding='utf-8')
    print(f'Wrote {sum(len(r) for r in responses.values())} rule response(s) to {path}')


def apply_updates(updates: Dict[str, Dict[str, List[str]]], dry_run: bool) -> None:
    if not updates:
        print('No updates to apply.')
        return
    text = INSTANCE_DATA_PATH.read_text(encoding='utf-8')
    llm_generated = parse_export(text, 'llmGeneratedExplanations')
    for instance, rules in updates.items():
        bucket = llm_generated.setdefault(instance, {})
        for rule, explanations in rules.items():
            bucket[rule] = explanations
    new_literal = format_ts(llm_generated)
    updated = replace_export_value(text, 'llmGeneratedExplanations', new_literal)
    if dry_run:
        print('Dry run enabled; not writing to instance-data.ts.')
        return
    INSTANCE_DATA_PATH.write_text(updated, encoding='utf-8')
    print(f'Updated instance-data.ts with {sum(len(r) for r in updates.values())} rule response(s).')


def load_responses_file(path: Path) -> Dict[str, Dict[str, List[str]]]:
    data = json.loads(path.read_text(encoding='utf-8'))
    normalized: Dict[str, Dict[str, List[str]]] = {}
    for instance, rules in data.items():
        normalized[instance] = {}
        for rule, explanations in rules.items():
            normalized[instance][rule] = list(explanations)
    return normalized


def build_prompt_queue(instances: Sequence[str], instance_voters, instance_days,
                       rules_filter: Sequence[str] | None, max_prompts: int) -> List[Tuple[str, str, str, int]]:
    queue: List[Tuple[str, str, str, int]] = []
    for instance in instances:
        for rule in RULE_ORDER:
            if rules_filter and rule not in rules_filter:
                continue
            if rule not in instance_days.get(instance, {}):
                continue
            prompt_text = build_rule_prompt(instance, rule, instance_voters[instance], instance_days[instance][rule])
            day_count = len(instance_days[instance][rule])
            queue.append((instance, rule, prompt_text, day_count))
            if len(queue) >= max_prompts:
                return queue
    return queue


def count_possible_prompts(instances: Sequence[str], instance_days, rules_filter: Sequence[str] | None) -> int:
    total = 0
    for instance in instances:
        for rule in RULE_ORDER:
            if rules_filter and rule not in rules_filter:
                continue
            if rule in instance_days.get(instance, {}):
                total += 1
    return total


def main() -> None:
    parser = argparse.ArgumentParser(description='Generate prompts per rule and capture ChatGPT responses.')
    parser.add_argument('-i', '--instances', nargs='+', help='Restrict to specific instance ids.')
    parser.add_argument('-r', '--rules', nargs='+', choices=RULE_ORDER,
                        help='Restrict to specific rule ids (default: all).')
    parser.add_argument('--max-prompts', type=int, default=DEFAULT_MAX_PROMPTS,
                        help=f'Maximum prompts to emit (default: {DEFAULT_MAX_PROMPTS}).')
    parser.add_argument('--copy', action='store_true', help='Copy each prompt to the clipboard.')
    parser.add_argument('--interactive', action='store_true',
                        help='Wait for ENTER between prompts when not capturing responses.')
    parser.add_argument('--prompts-only', action='store_true',
                        help='Show prompts without collecting ChatGPT responses.')
    parser.add_argument('--responses-json', type=Path, default=DEFAULT_RESPONSES_PATH,
                        help='Path to store captured responses as JSON (default: %(default)s).')
    parser.add_argument('--no-json', action='store_true', help='Skip writing the responses JSON file.')
    parser.add_argument('--apply-responses', type=Path,
                        help='Apply responses from a JSON file without generating prompts.')
    parser.add_argument('--dry-run', action='store_true', help='Do not write to instance-data.ts.')
    args = parser.parse_args()

    if args.apply_responses:
        updates = load_responses_file(args.apply_responses)
        apply_updates(updates, dry_run=args.dry_run)
        return

    _, instance_voters, instance_days, _ = load_instance_data()
    available_instances = sorted_instances(list(instance_days.keys()))

    if args.instances:
        missing = [name for name in args.instances if name not in instance_days]
        if missing:
            raise SystemExit(f'Unknown instance id(s): {", ".join(missing)}')
        instances = args.instances
    else:
        instances = available_instances

    total_possible = count_possible_prompts(instances, instance_days, args.rules)
    prompts = build_prompt_queue(instances, instance_voters, instance_days, args.rules, args.max_prompts)
    if not prompts:
        raise SystemExit('No prompts produced. Adjust filters or max-prompts.')
    if len(prompts) < total_possible:
        print(f'Warning: emitted {len(prompts)} of {total_possible} prompt(s). Increase --max-prompts to cover all.',
              file=sys.stderr)

    captured: Dict[str, Dict[str, List[str]]] = {}
    for idx, (instance, rule, text, day_count) in enumerate(prompts, start=1):
        header = f'===== Prompt {idx}/{len(prompts)} - {instance}/{rule} ====='
        print(header)
        print(text)
        print()
        if args.copy:
            copied_via = copy_to_clipboard(text)
            if copied_via:
                print(f'(Copied to clipboard via {copied_via}. Paste into ChatGPT now.)')
            else:
                print('(Unable to copy to clipboard automatically.)')
        if args.prompts_only:
            if args.interactive and idx < len(prompts):
                try:
                    input('Press ENTER for the next prompt...')
                except KeyboardInterrupt:
                    print('\nStopping at user request.')
                    break
            continue
        try:
            parsed = capture_response(instance, rule, day_count)
        except UserQuit:
            print('Stopping at user request.')
            break
        if parsed:
            captured.setdefault(instance, {})[rule] = parsed

    if not captured:
        print('No responses captured during this session.')
        return

    if not args.no_json and args.responses_json:
        save_responses_json(captured, args.responses_json)
    apply_updates(captured, dry_run=args.dry_run)


if __name__ == '__main__':
    main()
