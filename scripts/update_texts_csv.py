#!/usr/bin/env python3
"""Download the Google Sheets texts CSV and update the bundled copy."""
from __future__ import annotations

import argparse
import os
import re
import sys
from pathlib import Path
from typing import Iterable, Optional
from urllib.error import HTTPError, URLError
from urllib.parse import urlencode
from urllib.request import Request, urlopen

REPO_ROOT = Path(__file__).resolve().parents[1]
DEFAULT_OUTPUT = REPO_ROOT / 'frontend' / 'survey-website' / 'src' / 'config' / 'texts.csv'
DEFAULT_ENV_FILES = ['.env.local', '.env', '.env.development']
DEFAULT_ENV_DIRS = [REPO_ROOT, REPO_ROOT / 'frontend' / 'survey-website']
ENV_KEY = 'VITE_TEXTS_CSV_URL'


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(
        description='Fetch the Google Sheets CSV used for survey texts and replace the local copy.',
    )
    parser.add_argument(
        '--url',
        help='Full Google Sheets link or export URL. Overrides environment variables and .env files.',
    )
    parser.add_argument(
        '--gid',
        help='Optional gid of the sheet tab to export. If omitted, the gid from the URL (if any) is used.',
    )
    parser.add_argument(
        '--output',
        default=str(DEFAULT_OUTPUT),
        help=f'Output path for texts.csv (default: {DEFAULT_OUTPUT}).',
    )
    parser.add_argument(
        '--env-file',
        action='append',
        help='Additional .env files to search for VITE_TEXTS_CSV_URL (searched before defaults).',
    )
    return parser.parse_args()


def iter_env_candidates(entries: Iterable[str]) -> Iterable[Path]:
    seen: set[Path] = set()
    for entry in entries:
        if not entry:
            continue
        candidate_path = Path(entry)
        paths: list[Path]
        if candidate_path.is_absolute():
            paths = [candidate_path]
        elif candidate_path.parent != Path('.'):
            paths = [REPO_ROOT / candidate_path]
        else:
            paths = [(base / candidate_path.name) for base in DEFAULT_ENV_DIRS]
        for path in paths:
            resolved = path.resolve()
            if resolved in seen:
                continue
            seen.add(resolved)
            yield resolved


def discover_env_url(env_files: Iterable[str] | None) -> Optional[str]:
    search_order = list(env_files or []) + DEFAULT_ENV_FILES
    for candidate in iter_env_candidates(search_order):
        if not candidate.is_file():
            continue
        try:
            with candidate.open('r', encoding='utf-8') as handle:
                for raw_line in handle:
                    line = raw_line.strip()
                    if not line or line.startswith('#'):
                        continue
                    if line.startswith('export '):
                        line = line[len('export '):].lstrip()
                    if '=' not in line:
                        continue
                    key, value = line.split('=', 1)
                    if key.strip() == ENV_KEY:
                        return value.strip().strip('\'"')
        except OSError:
            continue
    return None


def normalize_google_sheet_url(url: str, gid_override: Optional[str]) -> str:
    if 'docs.google.com/spreadsheets' not in url:
        return url
    match = re.search(r'/d/([a-zA-Z0-9-_]+)', url)
    if not match:
        raise ValueError('Unable to locate spreadsheet ID in URL.')
    doc_id = match.group(1)
    params = {'format': 'csv'}
    gid = gid_override
    if not gid:
        gid_match = re.search(r'[?&]gid=(\d+)', url)
        if gid_match:
            gid = gid_match.group(1)
    if gid:
        params['gid'] = gid
    return f'https://docs.google.com/spreadsheets/d/{doc_id}/export?{urlencode(params)}'


def download_csv(url: str) -> str:
    request = Request(url, headers={'User-Agent': 'perpetual-voting-sync/1.0'})
    with urlopen(request) as response:  # nosec B310
        charset = response.headers.get_content_charset() or 'utf-8'
        return response.read().decode(charset)


def write_if_changed(path: Path, content: str) -> bool:
    path.parent.mkdir(parents=True, exist_ok=True)
    try:
        current = path.read_text(encoding='utf-8')
    except FileNotFoundError:
        current = None
    if current == content:
        return False
    path.write_text(content, encoding='utf-8', newline='\n')
    return True


def main() -> int:
    args = parse_args()
    source_url = args.url or os.environ.get(ENV_KEY)
    if not source_url and args.env_file:
        source_url = discover_env_url(args.env_file)
    if not source_url:
        source_url = discover_env_url([])
    if not source_url:
        print('Error: No Google Sheets URL provided via --url, environment, or .env files.', file=sys.stderr)
        return 1

    try:
        normalized_url = normalize_google_sheet_url(source_url, args.gid)
    except ValueError as error:
        print(f'Error: {error}', file=sys.stderr)
        return 1

    try:
        csv_content = download_csv(normalized_url)
    except HTTPError as error:
        print(f'HTTP error while downloading CSV: {error.code} {error.reason}', file=sys.stderr)
        return 1
    except URLError as error:
        print(f'Network error while downloading CSV: {error.reason}', file=sys.stderr)
        return 1

    output_path = Path(args.output)
    if not output_path.is_absolute():
        output_path = REPO_ROOT / output_path

    changed = write_if_changed(output_path, csv_content)
    if changed:
        print(f'Updated {output_path.relative_to(REPO_ROOT)} with {len(csv_content.splitlines())} lines.')
    else:
        print('Local texts.csv already matches the remote content; no changes written.')
    return 0


if __name__ == '__main__':
    raise SystemExit(main())
