# CSV Extraction Tool

Extract survey response data into three organized CSV files for analysis.

## Usage

```bash
python scripts/extract_csvs.py <responses_json_file> [-o OUTPUT_DIR]
```

### Arguments

- `responses_json_file`: Path to the `responses.json` file containing survey responses
- `-o, --output`: Output directory for CSV files (default: current directory)

### Example

```bash
python scripts/extract_csvs.py backend/storage-bucket/responses.json -o ./data_exports
```

## Output Files

### 1. `lottery_participants.csv`

Data for lottery drawing. Contains all participants who provided their name and/or email.

**Columns:**
- `id`: Arbitrary participant index
- `name`: Participant name
- `email`: Participant email address

**Use case:** Lottery drawing for prize distribution

---

### 2. `participant_data.csv`

Demographic and performance data for each participant.

**Columns:**
- `id`: Arbitrary participant index
- `gender`: Self-reported gender (m/f/other)
- `age`: Age in years
- `education`: Education level (student/highschool/bachelor/master/phd)
- `attempts`: Number of attempts on knowledge check (started from 1)
- `feedback`: Free-text feedback from feedback page

**Use case:** Demographic analysis, correlation with performance/ratings

---

### 3. `question_ratings.csv`

Detailed ratings for each voting rule instance shown to participants.

**Columns:**
- `id`: Arbitrary rating index (per participant)
- `instance`: Voting instance type (simple/few_rounds/complicated)
- `rule`: Voting rule (approval/equal_shares/unit_cost/phragmen)
- `explanation`: Explanation type shown (none/mechanical/instance_based)
- `rating`: Participant rating (numeric)
- `max_rating`: Maximum possible rating (typically 7)
- `additional_feedback`: Free-text feedback for specific rule (if provided)
- `time`: Time spent on this page in milliseconds
- `participant_id`: Reference to participant from `participant_data.csv`

**Use case:** Analyzing preference for different voting rules and explanations

---

## Data Extraction Details

### Source Locations

- **Lottery Data**: `survey-response.responses.thank-you.submission.lottery`
- **Demographics**: `survey-response.responses.demographic.submission.participant`
- **Knowledge Check**: `survey-response.responses.knowledge-check.submission.knowledgeCheck`
- **Feedback**: `survey-response.responses.feedback.value`
- **Instance Ratings**: `survey-response.responses.instance-*` (all keys matching pattern)
- **Page Times**: `survey-response.pageDurationsMs`

### Instance Key Format

Instance keys follow the pattern: `instance-{instance}-{rule}-{explanation}`

Examples:
- `instance-simple-approval-mechanical`
- `instance-complicated-equal_shares-none`
- `instance-few_rounds-phragmen-instance_based`

---

## Notes

- All three CSV files are generated together in a single pass
- UTF-8 encoding is used for all files (supports non-ASCII characters)
- Empty values are represented as empty strings (no quotes)
- Rating IDs within each participant reset to 1
- Participants with no lottery data are excluded from lottery_participants.csv but included in participant_data.csv
