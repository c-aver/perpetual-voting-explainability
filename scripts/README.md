# Scripts

## manual_llm_explanations.py

Helper for working through the ChatGPT web UI. It now emits one prompt **per rule** (4 instances × 4 rules = 16 prompts) so that each request stays short enough for the model. After you paste ChatGPT's reply back into the terminal, the script parses the "Day N: ..." lines and writes the explanations straight into `frontend/survey-website/src/config/instance-data.ts`.

Typical workflow:

```powershell
python scripts/manual_llm_explanations.py --copy
```

- `--copy` copies the current prompt to the clipboard (falls back to `clip` on Windows if `pyperclip` is missing).
- `--prompts-only` prints the prompts without asking for pasted answers.
- `--instances` / `--rules` limit the queue. Keep `--max-prompts 16` to cover everything, or set a lower ceiling if you only need a few rules right now.
- `--responses-json path/to/file.json` (default: `scripts/manual_llm_responses.json`) captures every saved response so you can re-apply it later. Add `--no-json` to skip writing this file.
- `--dry-run` validates and parses your pasted text without touching `instance-data.ts`.
- `--apply-responses saved.json` loads a previously exported JSON blob and writes it into `llmGeneratedExplanations` (combine with `--dry-run` to preview the changes).

During the interactive mode the script accepts `/skip`, `/quit`, and `/end` commands while you are pasting ChatGPT's output. Each successful capture prints the detected Day 1..N lines so you can confirm before saving.

The previous automated generator (`generate_llm_explanations.py`) is intentionally absent for now so that all explanations flow through the human-in-the-loop workflow.
