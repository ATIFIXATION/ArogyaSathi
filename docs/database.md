# ArogyaSathi — PostgreSQL Database Architecture & DDL Specification

**Database Target:** PostgreSQL 18 (`swasthyasetu`)  
**Domain Alignment:** SIH 2026 Problem Statement `SIH26133` (Rural Public Healthcare Access & Continuity)

---

## 1. Schema Architecture Decisions

### 1.1 Core vs. Phase 2 Classification
- **`households` (`CORE NOW`):** Normalizes village household numbering, ASHA coverage quota denominators, and doorstep visit records.
- **`water_quality_reports` (`CORE NOW`):** Implements Jal Jeevan sentinel surveillance workflows actively modeled in `WaterCheckModal.jsx` and `HealthIntelligence.jsx`.
- **`offline_sync_queue` (`PHASE 2`):** Client-side PWA delta sync will be added during field tablet deployment.
- **`facility_inventory` (`PHASE 2`):** Supply shortages are managed via qualitative frontline escalations (`service_issues`). Full SKU ledger will be added in Phase 2.
- **`doctor_roster_schedules` (`PHASE 2`):** Captured at the facility level via `doctor_on_duty` and consult slots (`scheduled_datetime`).

### 1.2 Dual ID Strategy
- **Internal System Keys:** `UUID` with `gen_random_uuid()` for all primary and foreign key constraints.
- **Human-Facing Reference Codes:** `VARCHAR(20) UNIQUE NOT NULL` for frontline verbal and slip tracking (`SS-00184`, `CON-9402`, `REF-801`, `FUP-402`, `MED-1`, `DIAG-101`, `ALT-001`).

### 1.3 Definition of Facility Active Cases
In `v_facility_reporting_status`, a facility's active caseload represents the sum of ongoing clinical responsibilities directly tied to that facility:
1. Active Consultations (`consultations` with `status IN ('Scheduled', 'Confirmed')`)
2. Inbound Pending/Confirmed Specialist Referrals (`referrals` with `destination_facility_id = facility.id` and `status IN ('Pending Transfer', 'Appointment Confirmed')`)

### 1.4 District KPI Aggregation Architecture
In `v_district_access_kpis`, independent CTEs are used for facility counts, active cases, pending referrals, overdue follow-ups, and service alerts to eliminate Cartesian row multiplication.

---

## 2. Dependency-Safe Table Sequence (22 Tables)

1. `districts`
2. `blocks`
3. `communities`
4. `households`
5. `healthcare_facilities`
6. `users`
7. `asha_workers`
8. `citizens`
9. `health_officers`
10. `care_requests`
11. `triage_assessments`
12. `consultations`
13. `prescriptions`
14. `diagnostic_orders`
15. `referrals`
16. `followups`
17. `household_visits`
18. `health_education_sessions`
19. `water_quality_reports`
20. `service_issues`
21. `interventions`
22. `notifications`

---

## 3. Production PostgreSQL DDL Script

```sql
-- ============================================================================
-- SWASTHYASETU PRODUCTION DATABASE SCHEMA (22 TABLES)
-- PostgreSQL 18 Compatible
-- ============================================================================

CREATE EXTENSION IF NOT EXISTS pgcrypto;

-- Step 1: Enums
DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'user_role_enum') THEN
        CREATE TYPE user_role_enum AS ENUM ('citizen', 'asha_worker', 'health_officer', 'admin');
    END IF;
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'gender_enum') THEN
        CREATE TYPE gender_enum AS ENUM ('Female', 'Male', 'Other');
    END IF;
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'facility_type_enum') THEN
        CREATE TYPE facility_type_enum AS ENUM ('Sub-Centre', 'PHC', 'CHC', 'SDH', 'District Hospital');
    END IF;
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'facility_status_enum') THEN
        CREATE TYPE facility_status_enum AS ENUM ('Operational', 'Referral Center', 'Offline / Inactive Sync');
    END IF;
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'care_request_status_enum') THEN
        CREATE TYPE care_request_status_enum AS ENUM ('Pending', 'Verified', 'In Progress', 'Completed', 'Cancelled');
    END IF;
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'triage_severity_enum') THEN
        CREATE TYPE triage_severity_enum AS ENUM ('Routine', 'Moderate', 'High Priority');
    END IF;
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'consultation_format_enum') THEN
        CREATE TYPE consultation_format_enum AS ENUM ('In-Person PHC Visit', 'Teleconsultation');
    END IF;
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'consultation_status_enum') THEN
        CREATE TYPE consultation_status_enum AS ENUM ('Scheduled', 'Confirmed', 'Completed', 'Cancelled', 'No Show');
    END IF;
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'prescription_status_enum') THEN
        CREATE TYPE prescription_status_enum AS ENUM ('Active Dispensed', 'Home First-Aid Kit', 'Completed');
    END IF;
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'diagnostic_status_enum') THEN
        CREATE TYPE diagnostic_status_enum AS ENUM ('Ordered', 'Sample Collected', 'Result Available', 'Referral Booked');
    END IF;
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'referral_status_enum') THEN
        CREATE TYPE referral_status_enum AS ENUM ('Pending Transfer', 'Appointment Confirmed', 'Completed', 'Cancelled');
    END IF;
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'referral_urgency_enum') THEN
        CREATE TYPE referral_urgency_enum AS ENUM ('Routine', 'Urgent', 'Emergency');
    END IF;
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'followup_status_enum') THEN
        CREATE TYPE followup_status_enum AS ENUM ('Scheduled', 'Due Today', 'Completed', 'Overdue');
    END IF;
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'service_issue_severity_enum') THEN
        CREATE TYPE service_issue_severity_enum AS ENUM ('Low Priority', 'Medium Priority', 'High Priority');
    END IF;
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'service_issue_status_enum') THEN
        CREATE TYPE service_issue_status_enum AS ENUM ('Reported', 'Intervention Required', 'Dispatch In Progress', 'Resolved');
    END IF;
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'intervention_status_enum') THEN
        CREATE TYPE intervention_status_enum AS ENUM ('Dispatched', 'In Transit', 'Implemented');
    END IF;
END $$;

-- Step 2: Trigger Function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Step 3: Base Geography
CREATE TABLE IF NOT EXISTS districts (
    id VARCHAR(50) PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    state VARCHAR(100) NOT NULL DEFAULT 'Maharashtra',
    region VARCHAR(50),
    population INTEGER DEFAULT 0 CHECK (population >= 0),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS blocks (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    district_id VARCHAR(50) NOT NULL REFERENCES districts(id) ON DELETE RESTRICT,
    name VARCHAR(100) NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    CONSTRAINT uq_block_per_district UNIQUE (district_id, name)
);

CREATE TABLE IF NOT EXISTS communities (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    block_id UUID NOT NULL REFERENCES blocks(id) ON DELETE RESTRICT,
    name VARCHAR(100) NOT NULL,
    total_households INTEGER NOT NULL DEFAULT 0 CHECK (total_households >= 0),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    CONSTRAINT uq_community_per_block UNIQUE (block_id, name)
);

CREATE TABLE IF NOT EXISTS households (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    community_id UUID NOT NULL REFERENCES communities(id) ON DELETE RESTRICT,
    household_number VARCHAR(50) NOT NULL,
    pada_or_sector VARCHAR(100),
    head_of_family_name VARCHAR(150),
    contact_phone VARCHAR(15),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    CONSTRAINT uq_household_per_community UNIQUE (community_id, household_number)
);

-- Step 4: Healthcare Facilities
CREATE TABLE IF NOT EXISTS healthcare_facilities (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    district_id VARCHAR(50) NOT NULL REFERENCES districts(id) ON DELETE RESTRICT,
    block_id UUID REFERENCES blocks(id) ON DELETE SET NULL,
    name VARCHAR(150) NOT NULL,
    facility_type facility_type_enum NOT NULL,
    address TEXT NOT NULL,
    phone VARCHAR(20),
    doctor_on_duty VARCHAR(150),
    operating_hours VARCHAR(100) NOT NULL DEFAULT 'Open 24/7 (OPD: 09:00 AM – 04:00 PM)',
    status facility_status_enum NOT NULL DEFAULT 'Operational',
    last_sync_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    notes TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

DROP TRIGGER IF EXISTS trg_facilities_updated_at ON healthcare_facilities;
CREATE TRIGGER trg_facilities_updated_at
BEFORE UPDATE ON healthcare_facilities
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Step 5: User & Role Profiles
CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    phone VARCHAR(15) UNIQUE NOT NULL,
    email VARCHAR(255) UNIQUE,
    password_hash VARCHAR(255),
    role user_role_enum NOT NULL,
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

DROP TRIGGER IF EXISTS trg_users_updated_at ON users;
CREATE TRIGGER trg_users_updated_at
BEFORE UPDATE ON users
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TABLE IF NOT EXISTS asha_workers (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID UNIQUE NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    full_name VARCHAR(150) NOT NULL,
    cadre_id VARCHAR(50) UNIQUE,
    phone VARCHAR(15) NOT NULL,
    primary_facility_id UUID NOT NULL REFERENCES healthcare_facilities(id) ON DELETE RESTRICT,
    block_id UUID NOT NULL REFERENCES blocks(id) ON DELETE RESTRICT,
    availability_status VARCHAR(100) DEFAULT 'Available Today (08:00 AM – 06:00 PM)',
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

DROP TRIGGER IF EXISTS trg_asha_workers_updated_at ON asha_workers;
CREATE TRIGGER trg_asha_workers_updated_at
BEFORE UPDATE ON asha_workers
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

ALTER TABLE communities 
ADD COLUMN IF NOT EXISTS assigned_asha_id UUID REFERENCES asha_workers(id) ON DELETE SET NULL;

CREATE TABLE IF NOT EXISTS citizens (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID UNIQUE NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    full_name VARCHAR(150) NOT NULL,
    age INTEGER NOT NULL CHECK (age >= 0 AND age <= 130),
    gender gender_enum NOT NULL,
    phone VARCHAR(15) NOT NULL,
    abha_id VARCHAR(30) UNIQUE,
    community_id UUID NOT NULL REFERENCES communities(id) ON DELETE RESTRICT,
    household_id UUID REFERENCES households(id) ON DELETE SET NULL,
    address_line TEXT,
    assigned_asha_id UUID REFERENCES asha_workers(id) ON DELETE SET NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

DROP TRIGGER IF EXISTS trg_citizens_updated_at ON citizens;
CREATE TRIGGER trg_citizens_updated_at
BEFORE UPDATE ON citizens
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TABLE IF NOT EXISTS health_officers (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID UNIQUE NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    full_name VARCHAR(150) NOT NULL,
    designation VARCHAR(100) NOT NULL,
    district_id VARCHAR(50) REFERENCES districts(id) ON DELETE SET NULL,
    jurisdiction_level VARCHAR(30) NOT NULL CHECK (jurisdiction_level IN ('district', 'block', 'state')),
    phone VARCHAR(15),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

DROP TRIGGER IF EXISTS trg_health_officers_updated_at ON health_officers;
CREATE TRIGGER trg_health_officers_updated_at
BEFORE UPDATE ON health_officers
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Step 6: Clinical Care Continuum
CREATE TABLE IF NOT EXISTS care_requests (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    reference_code VARCHAR(20) UNIQUE NOT NULL,
    citizen_id UUID NOT NULL REFERENCES citizens(id) ON DELETE RESTRICT,
    patient_name VARCHAR(150) NOT NULL,
    age INTEGER NOT NULL CHECK (age >= 0),
    gender gender_enum NOT NULL,
    phone VARCHAR(15) NOT NULL,
    community_id UUID NOT NULL REFERENCES communities(id) ON DELETE RESTRICT,
    category VARCHAR(100) NOT NULL,
    symptoms TEXT[] NOT NULL,
    symptom_duration VARCHAR(50) NOT NULL,
    preferred_care_mode VARCHAR(100) NOT NULL,
    notes TEXT,
    status care_request_status_enum NOT NULL DEFAULT 'Pending',
    assigned_asha_id UUID REFERENCES asha_workers(id) ON DELETE SET NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

DROP TRIGGER IF EXISTS trg_care_requests_updated_at ON care_requests;
CREATE TRIGGER trg_care_requests_updated_at
BEFORE UPDATE ON care_requests
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TABLE IF NOT EXISTS triage_assessments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    care_request_id UUID UNIQUE NOT NULL REFERENCES care_requests(id) ON DELETE RESTRICT,
    asha_worker_id UUID NOT NULL REFERENCES asha_workers(id) ON DELETE RESTRICT,
    observed_symptoms TEXT[] NOT NULL,
    severity_grade triage_severity_enum NOT NULL DEFAULT 'Moderate',
    recommended_action VARCHAR(150) NOT NULL,
    vitals_checked BOOLEAN NOT NULL DEFAULT FALSE,
    guidance_given BOOLEAN NOT NULL DEFAULT FALSE,
    ors_med_provided BOOLEAN NOT NULL DEFAULT FALSE,
    referral_initiated BOOLEAN NOT NULL DEFAULT FALSE,
    field_notes TEXT,
    assessed_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS consultations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    reference_code VARCHAR(20) UNIQUE NOT NULL,
    citizen_id UUID NOT NULL REFERENCES citizens(id) ON DELETE RESTRICT,
    care_request_id UUID REFERENCES care_requests(id) ON DELETE SET NULL,
    facility_id UUID NOT NULL REFERENCES healthcare_facilities(id) ON DELETE RESTRICT,
    doctor_name VARCHAR(150) NOT NULL,
    department VARCHAR(100) NOT NULL,
    consultation_type consultation_format_enum NOT NULL DEFAULT 'In-Person PHC Visit',
    scheduled_datetime TIMESTAMPTZ NOT NULL,
    reason TEXT NOT NULL,
    clinical_notes TEXT,
    status consultation_status_enum NOT NULL DEFAULT 'Confirmed',
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

DROP TRIGGER IF EXISTS trg_consultations_updated_at ON consultations;
CREATE TRIGGER trg_consultations_updated_at
BEFORE UPDATE ON consultations
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TABLE IF NOT EXISTS prescriptions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    reference_code VARCHAR(20) UNIQUE NOT NULL,
    consultation_id UUID REFERENCES consultations(id) ON DELETE SET NULL,
    citizen_id UUID NOT NULL REFERENCES citizens(id) ON DELETE RESTRICT,
    medicine_name VARCHAR(150) NOT NULL,
    dosage VARCHAR(100) NOT NULL,
    timing VARCHAR(100) NOT NULL,
    prescribed_for VARCHAR(150) NOT NULL,
    total_days INTEGER NOT NULL DEFAULT 30 CHECK (total_days > 0),
    status prescription_status_enum NOT NULL DEFAULT 'Active Dispensed',
    dispensed_by_facility_id UUID REFERENCES healthcare_facilities(id) ON DELETE SET NULL,
    dispensed_by_asha_id UUID REFERENCES asha_workers(id) ON DELETE SET NULL,
    dispensed_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS diagnostic_orders (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    reference_code VARCHAR(20) UNIQUE NOT NULL,
    citizen_id UUID NOT NULL REFERENCES citizens(id) ON DELETE RESTRICT,
    consultation_id UUID REFERENCES consultations(id) ON DELETE SET NULL,
    facility_id UUID NOT NULL REFERENCES healthcare_facilities(id) ON DELETE RESTRICT,
    test_name VARCHAR(150) NOT NULL,
    status diagnostic_status_enum NOT NULL DEFAULT 'Ordered',
    result_summary TEXT,
    doctor_reviewed BOOLEAN NOT NULL DEFAULT FALSE,
    report_file_url VARCHAR(255),
    test_date TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS referrals (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    reference_code VARCHAR(20) UNIQUE NOT NULL,
    citizen_id UUID NOT NULL REFERENCES citizens(id) ON DELETE RESTRICT,
    care_request_id UUID REFERENCES care_requests(id) ON DELETE SET NULL,
    origin_facility_id UUID NOT NULL REFERENCES healthcare_facilities(id) ON DELETE RESTRICT,
    destination_facility_id UUID NOT NULL REFERENCES healthcare_facilities(id) ON DELETE RESTRICT,
    referral_type VARCHAR(100) NOT NULL,
    reason TEXT NOT NULL,
    urgency referral_urgency_enum NOT NULL DEFAULT 'Routine',
    status referral_status_enum NOT NULL DEFAULT 'Pending Transfer',
    referral_date DATE NOT NULL DEFAULT CURRENT_DATE,
    appointment_date DATE,
    assigned_asha_id UUID NOT NULL REFERENCES asha_workers(id) ON DELETE RESTRICT,
    action_required TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

DROP TRIGGER IF EXISTS trg_referrals_updated_at ON referrals;
CREATE TRIGGER trg_referrals_updated_at
BEFORE UPDATE ON referrals
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TABLE IF NOT EXISTS followups (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    reference_code VARCHAR(20) UNIQUE NOT NULL,
    citizen_id UUID NOT NULL REFERENCES citizens(id) ON DELETE RESTRICT,
    referral_id UUID REFERENCES referrals(id) ON DELETE SET NULL,
    consultation_id UUID REFERENCES consultations(id) ON DELETE SET NULL,
    assigned_asha_id UUID NOT NULL REFERENCES asha_workers(id) ON DELETE RESTRICT,
    followup_type VARCHAR(100) NOT NULL,
    due_date DATE NOT NULL,
    status followup_status_enum NOT NULL DEFAULT 'Scheduled',
    checklist_notes TEXT,
    outcome_notes TEXT,
    completed_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

DROP TRIGGER IF EXISTS trg_followups_updated_at ON followups;
CREATE TRIGGER trg_followups_updated_at
BEFORE UPDATE ON followups
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Step 7: Frontline Operations & Environmental Surveillance
CREATE TABLE IF NOT EXISTS household_visits (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    asha_worker_id UUID NOT NULL REFERENCES asha_workers(id) ON DELETE RESTRICT,
    community_id UUID NOT NULL REFERENCES communities(id) ON DELETE RESTRICT,
    household_id UUID REFERENCES households(id) ON DELETE SET NULL,
    household_pada VARCHAR(100) NOT NULL,
    citizen_name VARCHAR(150),
    visit_date DATE NOT NULL DEFAULT CURRENT_DATE,
    visit_category VARCHAR(100) NOT NULL,
    symptoms_checked TEXT[] NOT NULL,
    supplies_provided TEXT,
    referral_recommended VARCHAR(100) NOT NULL DEFAULT 'No Referral Needed',
    field_notes TEXT,
    synced_offline BOOLEAN NOT NULL DEFAULT FALSE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS health_education_sessions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    asha_worker_id UUID NOT NULL REFERENCES asha_workers(id) ON DELETE RESTRICT,
    community_id UUID NOT NULL REFERENCES communities(id) ON DELETE RESTRICT,
    topic VARCHAR(150) NOT NULL,
    attendees_count INTEGER NOT NULL CHECK (attendees_count > 0),
    materials_distributed TEXT,
    feedback_notes TEXT,
    session_date DATE NOT NULL DEFAULT CURRENT_DATE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS water_quality_reports (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    asha_worker_id UUID NOT NULL REFERENCES asha_workers(id) ON DELETE RESTRICT,
    community_id UUID NOT NULL REFERENCES communities(id) ON DELETE RESTRICT,
    location_name VARCHAR(150) NOT NULL,
    water_source VARCHAR(100) NOT NULL,
    visual_condition VARCHAR(100) NOT NULL,
    odour VARCHAR(100) NOT NULL,
    community_complaints VARCHAR(100) NOT NULL,
    suspected_contamination_source VARCHAR(150),
    field_notes TEXT,
    reported_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Step 8: Administrative Escalations, Interventions & Alerts
CREATE TABLE IF NOT EXISTS service_issues (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    reference_code VARCHAR(20) UNIQUE NOT NULL,
    facility_id UUID NOT NULL REFERENCES healthcare_facilities(id) ON DELETE RESTRICT,
    district_id VARCHAR(50) NOT NULL REFERENCES districts(id) ON DELETE RESTRICT,
    issue_type VARCHAR(100) NOT NULL,
    severity service_issue_severity_enum NOT NULL DEFAULT 'Medium Priority',
    service_gap_summary TEXT NOT NULL,
    action_required TEXT NOT NULL,
    reported_by_user_id UUID NOT NULL REFERENCES users(id) ON DELETE RESTRICT,
    status service_issue_status_enum NOT NULL DEFAULT 'Reported',
    affected_cases_count INTEGER DEFAULT 0 CHECK (affected_cases_count >= 0),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

DROP TRIGGER IF EXISTS trg_service_issues_updated_at ON service_issues;
CREATE TRIGGER trg_service_issues_updated_at
BEFORE UPDATE ON service_issues
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TABLE IF NOT EXISTS interventions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    service_issue_id UUID NOT NULL REFERENCES service_issues(id) ON DELETE RESTRICT,
    authorized_by_id UUID NOT NULL REFERENCES health_officers(id) ON DELETE RESTRICT,
    action_type VARCHAR(100) NOT NULL,
    target_facility_id UUID NOT NULL REFERENCES healthcare_facilities(id) ON DELETE RESTRICT,
    order_description TEXT NOT NULL,
    status intervention_status_enum NOT NULL DEFAULT 'Dispatched',
    authorized_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS notifications (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    subtitle TEXT,
    category VARCHAR(50) NOT NULL,
    is_unread BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Step 9: Indexes for Sub-10ms Queries
CREATE INDEX IF NOT EXISTS idx_care_requests_citizen ON care_requests(citizen_id);
CREATE INDEX IF NOT EXISTS idx_care_requests_asha_status ON care_requests(assigned_asha_id, status);
CREATE INDEX IF NOT EXISTS idx_care_requests_community ON care_requests(community_id);
CREATE INDEX IF NOT EXISTS idx_care_requests_created_at ON care_requests(created_at DESC);

CREATE INDEX IF NOT EXISTS idx_consultations_citizen ON consultations(citizen_id);
CREATE INDEX IF NOT EXISTS idx_consultations_facility ON consultations(facility_id);
CREATE INDEX IF NOT EXISTS idx_prescriptions_citizen ON prescriptions(citizen_id, status);
CREATE INDEX IF NOT EXISTS idx_diagnostic_orders_citizen ON diagnostic_orders(citizen_id);

CREATE INDEX IF NOT EXISTS idx_referrals_citizen ON referrals(citizen_id);
CREATE INDEX IF NOT EXISTS idx_referrals_asha ON referrals(assigned_asha_id);
CREATE INDEX IF NOT EXISTS idx_referrals_status ON referrals(status);
CREATE INDEX IF NOT EXISTS idx_followups_asha_due ON followups(assigned_asha_id, due_date, status);

CREATE INDEX IF NOT EXISTS idx_household_visits_asha_date ON household_visits(asha_worker_id, visit_date);
CREATE INDEX IF NOT EXISTS idx_household_visits_community ON household_visits(community_id);
CREATE INDEX IF NOT EXISTS idx_citizens_community ON citizens(community_id);
CREATE INDEX IF NOT EXISTS idx_citizens_asha ON citizens(assigned_asha_id);

CREATE INDEX IF NOT EXISTS idx_facilities_district ON healthcare_facilities(district_id);
CREATE INDEX IF NOT EXISTS idx_facilities_heartbeat ON healthcare_facilities(last_sync_at);
CREATE INDEX IF NOT EXISTS idx_service_issues_district_status ON service_issues(district_id, status);
CREATE INDEX IF NOT EXISTS idx_service_issues_facility ON service_issues(facility_id);
CREATE INDEX IF NOT EXISTS idx_notifications_user_unread ON notifications(user_id, is_unread);

-- Step 10: Dynamic Views

-- View 1: Facility Reporting Status ("No Active Cases" vs "Data Silence")
CREATE OR REPLACE VIEW v_facility_reporting_status AS
WITH active_consults AS (
    SELECT facility_id, COUNT(*) AS active_consult_count
    FROM consultations
    WHERE status IN ('Scheduled', 'Confirmed')
    GROUP BY facility_id
),
active_inbound_referrals AS (
    SELECT destination_facility_id AS facility_id, COUNT(*) AS inbound_ref_count
    FROM referrals
    WHERE status IN ('Pending Transfer', 'Appointment Confirmed')
    GROUP BY destination_facility_id
)
SELECT 
    f.id,
    f.name AS facility_name,
    f.district_id,
    d.name AS district_name,
    f.facility_type,
    f.status AS operational_status,
    f.last_sync_at,
    (COALESCE(ac.active_consult_count, 0) + COALESCE(air.inbound_ref_count, 0)) AS active_cases_count,
    CASE 
        WHEN f.last_sync_at >= NOW() - INTERVAL '24 HOURS' THEN 'Active & Verified'
        WHEN f.last_sync_at >= NOW() - INTERVAL '48 HOURS' THEN 'Delayed Sync'
        ELSE 'ATTENTION: Potential Data Silence'
    END AS reporting_status,
    CASE 
        WHEN (COALESCE(ac.active_consult_count, 0) + COALESCE(air.inbound_ref_count, 0)) = 0 
             AND f.last_sync_at >= NOW() - INTERVAL '24 HOURS' 
            THEN 'Stabilized Health Profile'
        WHEN (COALESCE(ac.active_consult_count, 0) + COALESCE(air.inbound_ref_count, 0)) = 0 
             AND f.last_sync_at < NOW() - INTERVAL '24 HOURS' 
            THEN 'Unmonitored / Network Gap'
        ELSE 'Active Caseload'
    END AS health_status_category,
    f.notes
FROM healthcare_facilities f
JOIN districts d ON f.district_id = d.id
LEFT JOIN active_consults ac ON f.id = ac.facility_id
LEFT JOIN active_inbound_referrals air ON f.id = air.facility_id;

-- View 2: District-Level Healthcare Access KPIs (CTE Aggregation)
CREATE OR REPLACE VIEW v_district_access_kpis AS
WITH facility_counts AS (
    SELECT district_id, COUNT(*) AS total_facilities
    FROM healthcare_facilities
    GROUP BY district_id
),
active_case_counts AS (
    SELECT b.district_id, COUNT(*) AS active_cases
    FROM care_requests cr
    JOIN communities c ON cr.community_id = c.id
    JOIN blocks b ON c.block_id = b.id
    WHERE cr.status IN ('Pending', 'Verified', 'In Progress')
    GROUP BY b.district_id
),
pending_referral_counts AS (
    SELECT f.district_id, COUNT(*) AS pending_referrals
    FROM referrals r
    JOIN healthcare_facilities f ON r.origin_facility_id = f.id
    WHERE r.status = 'Pending Transfer'
    GROUP BY f.district_id
),
followups_due_counts AS (
    SELECT b.district_id, COUNT(*) AS followups_due
    FROM followups fu
    JOIN asha_workers aw ON fu.assigned_asha_id = aw.id
    JOIN blocks b ON aw.block_id = b.id
    WHERE fu.status IN ('Scheduled', 'Due Today', 'Overdue')
    GROUP BY b.district_id
),
service_alert_counts AS (
    SELECT district_id, COUNT(*) AS active_service_alerts
    FROM service_issues
    WHERE status != 'Resolved'
    GROUP BY district_id
)
SELECT 
    d.id AS district_id,
    d.name AS district_name,
    d.state,
    d.region,
    COALESCE(fc.total_facilities, 0) AS total_facilities,
    COALESCE(acc.active_cases, 0) AS active_cases,
    COALESCE(prc.pending_referrals, 0) AS pending_referrals,
    COALESCE(fdc.followups_due, 0) AS followups_due,
    COALESCE(sac.active_service_alerts, 0) AS active_service_alerts
FROM districts d
LEFT JOIN facility_counts fc ON d.id = fc.district_id
LEFT JOIN active_case_counts acc ON d.id = acc.district_id
LEFT JOIN pending_referral_counts prc ON d.id = prc.district_id
LEFT JOIN followups_due_counts fdc ON d.id = fdc.district_id
LEFT JOIN service_alert_counts sac ON d.id = sac.district_id;
```
