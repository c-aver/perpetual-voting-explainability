import csv
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
TARGET_TS = ROOT / 'frontend' / 'survey-website' / 'src' / 'config' / 'instance-data.ts'
SOURCE_DIR = ROOT / 'instance-csvs'
CSV_FILES = {
    'simple': SOURCE_DIR / 'simple.csv',
    'complicated': SOURCE_DIR / 'complicated.csv',
    'few_rounds': SOURCE_DIR / 'few_rounds.csv',
}
RULE_MAP = {
    'APPROVAL': 'approval',
    'APROVAL': 'approval',
    'MES': 'equal_shares',
    'PP': 'phragmen',
    'PUC': 'unit_cost',
}


def parse_csv(path: Path):
    with path.open(newline='', encoding='utf-8') as handle:
        rows = [row for row in csv.reader(handle)]

    if not rows:
        raise ValueError(f'File {path} is empty')

    headers = rows[0][1:]
    day_count = len(headers)

    voter_rows = []
    idx = 1
    while idx < len(rows):
        first = rows[idx][0].strip() if rows[idx] else ''
        if not first:
            break
        voter_rows.append(rows[idx])
        idx += 1

    voters = [f'מצביע {i + 1}' for i in range(len(voter_rows))]
    votes_by_day = [[] for _ in range(day_count)]
    for voter_idx, row in enumerate(voter_rows):
        for day_idx in range(day_count):
            cell = row[day_idx + 1].strip() if day_idx + 1 < len(row) else ''
            selections = [choice.strip() for choice in cell.split(',') if choice.strip()]
            votes_by_day[day_idx].append({
                'voterId': voter_idx + 1,
                'selections': selections,
            })

    def advance_to_content(pos):
        while pos < len(rows):
            cell = rows[pos][0].strip() if rows[pos] else ''
            if cell:
                return pos
            pos += 1
        return pos

    idx = advance_to_content(idx)
    winners = {}
    explanations = {}

    while idx < len(rows):
        cell = rows[idx][0].strip()
        if not cell.lower().startswith('winner'):
            idx += 1
            continue
        _, rule_label = cell.split(None, 1)
        rule_key = RULE_MAP.get(rule_label.strip().upper())
        if not rule_key:
            raise KeyError(f'Unknown rule label {rule_label!r} in {path.name}')
        winners[rule_key] = rows[idx][1:1 + day_count]
        idx += 1
        idx = advance_to_content(idx)
        if idx >= len(rows):
            break
        exp_cell = rows[idx][0].strip()
        if not exp_cell.lower().startswith('explanation'):
            raise ValueError(f'Expected explanation row after winners for {rule_label} in {path.name}')
        explanations[rule_key] = rows[idx][1:1 + day_count]
        idx += 1
        idx = advance_to_content(idx)

    return voters, votes_by_day, winners, explanations


def build_days(votes_by_day, winners):
    days = {}
    for rule, rule_winners in winners.items():
        rule_days = []
        for day_idx, votes in enumerate(votes_by_day):
            winner = rule_winners[day_idx].strip() if day_idx < len(rule_winners) else ''
            rule_days.append({
                'day': day_idx + 1,
                'winner': winner,
                'votes': [
                    {
                        'voterId': vote['voterId'],
                        'selections': list(vote['selections']),
                    }
                    for vote in votes
                ],
            })
        days[rule] = rule_days
    return days


def format_string(value: str) -> str:
    escaped = value.replace('\\', '\\\\').replace('\'', "\\'")
    escaped = escaped.replace('\n', '\\n')
    return f"'{escaped}'"


def format_ts(value, indent=0):
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
        return format_string(value)
    return str(value)


def main():
    voters_data = {}
    days_data = {}
    explanations_data = {}

    for instance, path in CSV_FILES.items():
        voters, votes_by_day, winners, explanations = parse_csv(path)
        voters_data[instance] = [
            {'id': idx + 1, 'label': label}
            for idx, label in enumerate(voters)
        ]
        days_data[instance] = build_days(votes_by_day, winners)
        explanations_data[instance] = explanations

    lines = [
        "import type { InstanceDayConfig, InstanceVoterConfig } from './types.ts';",
        '',
        'export const instanceVoters: Record<string, InstanceVoterConfig[]> =',
        format_ts(voters_data),
        '',
        'export const instanceDays: Record<string, Record<string, InstanceDayConfig[]>> =',
        format_ts(days_data),
        '',
        'export const instanceBasedExplanations: Record<string, Record<string, string[]>> =',
        format_ts(explanations_data),
        '',
    ]

    TARGET_TS.parent.mkdir(parents=True, exist_ok=True)
    TARGET_TS.write_text('\n'.join(lines), encoding='utf-8')


if __name__ == '__main__':
    main()
