# SwasthyaSetu Database Seeding & Integration Guide

This directory contains the database seeding assets for the SwasthyaSetu project.

## Database Profile
* **Database Name:** `swasthyasetu`
* **Target DBMS:** PostgreSQL 18
* **Schema Schema Script:** [docs/database.md](../docs/database.md) (Lines 60-619 contain the DDL)
* **Seed Script:** [database/seed.sql](./seed.sql)

## Created Datasets Summary (22 Tables)
The seed file inserts the following rows across the 22 application tables:

| Seq | Table Name | Rows Seeded | Description |
|---|---|:---:|---|
| 1 | `districts` | 21 | High-level districts in Maharashtra (Nandurbar, Gadchiroli, Satara, etc.). |
| 2 | `blocks` | 10 | Administrative subdivisions mapped to districts (Akkalkuwa, Taloda, etc.). |
| 3 | `communities` | 6 | Local villages/communities (assigned to blocks) with household counts. |
| 4 | `households` | 4 | Registered family households (contact name, address details, phone numbers). |
| 5 | `healthcare_facilities` | 14 | Hospitals, PHCs, CHCs, and Sub-Centres with rosters and sync status. |
| 6 | `users` | 15 | Credentials (hashed password, phone, role) for logins. |
| 7 | `asha_workers` | 6 | Frontline ASHA workers assigned to specific facilities and blocks. |
| 8 | `citizens` | 8 | Rural citizens with demographic data, ABHA IDs, and assigned ASHA workers. |
| 9 | `health_officers` | 1 | Chief Medical Officer (surveillance) with a state-level jurisdiction. |
| 10 | `care_requests` | 4 | Active and completed symptoms reports from citizens (SS-00184 to SS-00187). |
| 11 | `triage_assessments` | 2 | Doorstep assessments conducted by ASHA workers verifying symptoms/vitals. |
| 12 | `consultations` | 2 | Scheduled or completed appointments with PHC doctors (CON-9402, CON-9403). |
| 13 | `prescriptions` | 3 | Medicine orders dispensed or added to home first-aid kits (MED-1 to MED-3). |
| 14 | `diagnostic_orders` | 3 | Ordered lab tests, sample collection records, and results (DIAG-101 to DIAG-103). |
| 15 | `referrals` | 2 | Specialist transfers from PHCs to tertiary hospitals (REF-801, REF-798). |
| 16 | `followups` | 2 | Planned doorstep checkups for medicine adherence and recovery (FUP-402, FUP-399). |
| 17 | `household_visits` | 3 | Step-by-step logs of doorstep visits completed by ASHA workers. |
| 18 | `health_education_sessions` | 2 | Communal hygiene and preventive nutrition sessions held by ASHAs. |
| 19 | `water_quality_reports` | 2 | Jal Jeevan water checkups (visual, turbidity, odour) in tribal padas. |
| 20 | `service_issues` | 5 | Escalations for staff vacancies, equipment breakdowns, or medicine stockouts. |
| 21 | `interventions` | 2 | Direct actions authorized by CMOs to resolve service issues. |
| 22 | `notifications` | 6 | Alerts pushed to citizens, ASHA workers, or health officers. |

## Running the Seed Script

### Method A: Using pgAdmin 4 (Recommended)
1. Open **pgAdmin 4** on your machine.
2. In the left browser tree, expand **Servers** -> **PostgreSQL 18** -> **Databases**.
3. Right-click on the database list and select **Create** -> **Database...** if `swasthyasetu` does not exist yet. Name it `swasthyasetu` and click **Save**.
4. Right-click on the `swasthyasetu` database and select **Query Tool**.
5. First, run the table schema definition (if you haven't already):
   * Copy the DDL SQL code from the [database.md](../docs/database.md) file (everything under `## 3. Production PostgreSQL DDL Script`).
   * Paste it into the Query Editor and click the **Execute/Refresh (F5)** button.
6. Once the tables are successfully created, open a new Query Editor tab (or clear the current editor).
7. Drag and drop the [seed.sql](./seed.sql) file into pgAdmin (or copy and paste the contents of `seed.sql` into the editor).
8. Click **Execute (F5)**. You will see a message confirming successful execution.

### Method B: Using command line (psql)
Run the following commands in your shell (PowerShell/CMD). If PostgreSQL is password protected, you will be prompted for credentials:

```powershell
# Navigate to project folder
cd C:\Users\atif6\Desktop\swasthyasetu

# Run the DDL Schema Script first (if tables do not exist yet)
# Copy the DDL from docs/database.md into a separate schema.sql file or run it via pgAdmin.

# Execute the seed script:
& "C:\Program Files\PostgreSQL\18\bin\psql.exe" -U postgres -d swasthyasetu -f database/seed.sql
```

## Idempotency Design
The script uses `TRUNCATE TABLE ... CASCADE` at the beginning. This clears all tables in the correct order, ensuring that multiple runs of `seed.sql` reset the database to a clean, consistent demo state without duplicating entries or causing primary key/unique constraint violations.
