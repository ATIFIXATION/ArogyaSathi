-- ============================================================================
-- SWASTHYASETU DATABASE SEED SCRIPT (22 TABLES)
-- Compatible with PostgreSQL 18
-- ============================================================================

-- ----------------------------------------------------------------------------
-- Clean Existing Data (IDEMPOTENCY)
-- ----------------------------------------------------------------------------
TRUNCATE TABLE 
    notifications,
    interventions,
    service_issues,
    water_quality_reports,
    health_education_sessions,
    household_visits,
    followups,
    referrals,
    diagnostic_orders,
    prescriptions,
    consultations,
    triage_assessments,
    care_requests,
    health_officers,
    citizens,
    asha_workers,
    users,
    healthcare_facilities,
    households,
    communities,
    blocks,
    districts
CASCADE;

-- ----------------------------------------------------------------------------
-- 1. Districts (21 Rows)
-- ----------------------------------------------------------------------------
INSERT INTO districts (id, name, state, region, population) VALUES
('nandurbar', 'Nandurbar District', 'Maharashtra', 'Khandesh', 1648292),
('gadchiroli', 'Gadchiroli District', 'Maharashtra', 'Vidarbha', 1072942),
('palghar', 'Palghar District', 'Maharashtra', 'Konkan', 2995428),
('pune', 'Pune District', 'Maharashtra', 'Western Maharashtra', 9429408),
('nashik', 'Nashik District', 'Maharashtra', 'Khandesh', 6107187),
('thane', 'Thane District', 'Maharashtra', 'Konkan', 11060148),
('nagpur', 'Nagpur District', 'Maharashtra', 'Vidarbha', 4653570),
('dhule', 'Dhule District', 'Maharashtra', 'Khandesh', 2050862),
('jalgaon', 'Jalgaon District', 'Maharashtra', 'Khandesh', 4229917),
('aurangabad', 'Chhatrapati Sambhajinagar', 'Maharashtra', 'Marathwada', 3701282),
('amravati', 'Amravati District', 'Maharashtra', 'Vidarbha', 2888445),
('akola', 'Akola District', 'Maharashtra', 'Vidarbha', 1813906),
('yavatmal', 'Yavatmal District', 'Maharashtra', 'Vidarbha', 2772348),
('chandrapur', 'Chandrapur District', 'Maharashtra', 'Vidarbha', 2204307),
('gondia', 'Gondia District', 'Maharashtra', 'Vidarbha', 1322507),
('ratnagiri', 'Ratnagiri District', 'Maharashtra', 'Konkan', 1615069),
('sindhudurg', 'Sindhudurg District', 'Maharashtra', 'Konkan', 849651),
('kolhapur', 'Kolhapur District', 'Maharashtra', 'Western Maharashtra', 3876001),
('satara', 'Satara District', 'Maharashtra', 'Western Maharashtra', 3003741),
('solapur', 'Solapur District', 'Maharashtra', 'Western Maharashtra', 4317756),
('ahmednagar', 'Ahilyanagar (Ahmednagar)', 'Maharashtra', 'Western Maharashtra', 4543159);

-- ----------------------------------------------------------------------------
-- 2. Blocks (10 Rows)
-- ----------------------------------------------------------------------------
INSERT INTO blocks (id, district_id, name) VALUES
('bbbbbbbb-bbbb-bbbb-bbbb-000000000001', 'nandurbar', 'Akkalkuwa Block'),
('bbbbbbbb-bbbb-bbbb-bbbb-000000000002', 'nandurbar', 'Taloda Block'),
('bbbbbbbb-bbbb-bbbb-bbbb-000000000003', 'nandurbar', 'Dhadgaon Block'),
('bbbbbbbb-bbbb-bbbb-bbbb-000000000004', 'nandurbar', 'Shahada Block'),
('bbbbbbbb-bbbb-bbbb-bbbb-000000000005', 'nandurbar', 'Nandurbar Block'),
('bbbbbbbb-bbbb-bbbb-bbbb-000000000006', 'gadchiroli', 'Etapalli Block'),
('bbbbbbbb-bbbb-bbbb-bbbb-000000000007', 'gadchiroli', 'Bhamragad Block'),
('bbbbbbbb-bbbb-bbbb-bbbb-000000000008', 'palghar', 'Jawhar Block'),
('bbbbbbbb-bbbb-bbbb-bbbb-000000000009', 'palghar', 'Mokhada Block'),
('bbbbbbbb-bbbb-bbbb-bbbb-000000000010', 'yavatmal', 'Ralegaon Block');

-- ----------------------------------------------------------------------------
-- 3. Communities (6 Rows)
-- ----------------------------------------------------------------------------
-- assigned_asha_id is initialized as NULL. Will be updated in step 7.
INSERT INTO communities (id, block_id, name, total_households) VALUES
('cccccccc-cccc-cccc-cccc-000000000001', 'bbbbbbbb-bbbb-bbbb-bbbb-000000000001', 'Akkalkuwa', 236),
('cccccccc-cccc-cccc-cccc-000000000002', 'bbbbbbbb-bbbb-bbbb-bbbb-000000000003', 'Dhadgaon', 189),
('cccccccc-cccc-cccc-cccc-000000000003', 'bbbbbbbb-bbbb-bbbb-bbbb-000000000005', 'Nandurbar Rural', 201),
('cccccccc-cccc-cccc-cccc-000000000004', 'bbbbbbbb-bbbb-bbbb-bbbb-000000000002', 'Taloda', 154),
('cccccccc-cccc-cccc-cccc-000000000005', 'bbbbbbbb-bbbb-bbbb-bbbb-000000000004', 'Shahada', 178),
('cccccccc-cccc-cccc-cccc-000000000006', 'bbbbbbbb-bbbb-bbbb-bbbb-000000000006', 'Gadchiroli Rural', 165);

-- ----------------------------------------------------------------------------
-- 4. Households (4 Rows)
-- ----------------------------------------------------------------------------
INSERT INTO households (id, community_id, household_number, pada_or_sector, head_of_family_name, contact_phone) VALUES
('77777777-7777-7777-7777-000000000001', 'cccccccc-cccc-cccc-cccc-000000000001', '42', 'Near Gram Panchayat', 'Rashida Tadvi Family', '+91 98221 44521'),
('77777777-7777-7777-7777-000000000002', 'cccccccc-cccc-cccc-cccc-000000000001', '118', 'Akkalkuwa East', 'Pawara Family', '+91 94220 88712'),
('77777777-7777-7777-7777-000000000003', 'cccccccc-cccc-cccc-cccc-000000000002', '3', 'Tribal Hamlet #3', 'Gavit Family', '+91 98501 33290'),
('77777777-7777-7777-7777-000000000004', 'cccccccc-cccc-cccc-cccc-000000000003', '2', 'Wadi Pada Sector 2', 'Valvi Family', '+91 97632 11489');

-- ----------------------------------------------------------------------------
-- 5. Healthcare Facilities (14 Rows)
-- ----------------------------------------------------------------------------
INSERT INTO healthcare_facilities (id, district_id, block_id, name, facility_type, address, phone, doctor_on_duty, operating_hours, status) VALUES
('44444444-4444-4444-4444-000000000001', 'nandurbar', 'bbbbbbbb-bbbb-bbbb-bbbb-000000000001', 'Primary Health Centre — Akkalkuwa', 'PHC', 'Main Road, Akkalkuwa, Nandurbar District, Maharashtra', '+91 2567 222100', 'Dr. K. Patil (Medical Officer)', 'Open 24/7 (OPD: 09:00 AM – 04:00 PM)', 'Operational'),
('44444444-4444-4444-4444-000000000002', 'nandurbar', 'bbbbbbbb-bbbb-bbbb-bbbb-000000000002', 'Taloda Community Health Centre (CHC)', 'CHC', 'Station Road, Taloda, Nandurbar District, Maharashtra', '+91 2567 232210', 'Dr. V. Deshmukh & Specialist Team', 'Open 24/7', 'Operational'),
('44444444-4444-4444-4444-000000000003', 'dhule', NULL, 'Dhule District Civil Hospital', 'District Hospital', 'Civil Lines, Sakri Road, Dhule, Maharashtra', '+91 2562 288400', 'Full Clinical Specialist Faculty', 'Open 24/7', 'Referral Center'),
('44444444-4444-4444-4444-000000000004', 'nandurbar', 'bbbbbbbb-bbbb-bbbb-bbbb-000000000003', 'Dhadgaon Health Sub-Centre Cluster', 'Sub-Centre', 'Dhadgaon Tribal Block, Maharashtra', '+91 2567 244105', 'Community Health Officer (CHO)', '08:30 AM – 04:30 PM', 'Operational'),
('44444444-4444-4444-4444-000000000005', 'nandurbar', 'bbbbbbbb-bbbb-bbbb-bbbb-000000000005', 'Nandurbar Rural Health Post', 'Sub-Centre', 'Wadi Pada, Nandurbar Block, Maharashtra', '+91 2567 211044', 'CHO & ASHA Team', '09:00 AM – 05:00 PM', 'Operational'),
('44444444-4444-4444-4444-000000000006', 'gadchiroli', 'bbbbbbbb-bbbb-bbbb-bbbb-000000000006', 'Etapalli Primary Health Centre', 'PHC', 'Main Market Road, Etapalli, Gadchiroli, Maharashtra', '+91 2564 244101', 'Dr. S. Madavi', 'Open 24/7', 'Operational'),
('44444444-4444-4444-4444-000000000007', 'palghar', 'bbbbbbbb-bbbb-bbbb-bbbb-000000000009', 'Mokhada Community Health Centre', 'CHC', 'Mokhada Block Road, Palghar, Maharashtra', '+91 2520 223405', 'Dr. V. Patil', 'Open 24/7', 'Operational'),
('44444444-4444-4444-4444-000000000008', 'yavatmal', 'bbbbbbbb-bbbb-bbbb-bbbb-000000000010', 'Ralegaon Rural Hospital', 'SDH', 'Ralegaon Block, Yavatmal, Maharashtra', '+91 7233 222120', 'Dr. S. Deshmukh', 'Open 24/7', 'Operational'),
('44444444-4444-4444-4444-000000000009', 'sindhudurg', NULL, 'Vengurla Coastal PHC', 'PHC', 'Coastal Road, Vengurla, Sindhudurg, Maharashtra', '+91 2366 224102', 'Dr. R. Sawant', '09:00 AM – 05:00 PM', 'Operational'),
('44444444-4444-4444-4444-000000000010', 'satara', NULL, 'Mahabaleshwar Rural Sub-Centre', 'Sub-Centre', 'Mahabaleshwar Block, Satara, Maharashtra', '+91 2168 260105', 'Community Health Officer', '08:30 AM – 04:30 PM', 'Operational'),
('44444444-4444-4444-4444-000000000011', 'gadchiroli', 'bbbbbbbb-bbbb-bbbb-bbbb-000000000007', 'Bhamragad Remote Sub-Centre', 'Sub-Centre', 'Remote Hamlet, Bhamragad Block, Gadchiroli', '+91 2564 290144', 'Vacant', '09:00 AM – 04:00 PM', 'Offline / Inactive Sync'),
('44444444-4444-4444-4444-000000000012', 'nandurbar', NULL, 'Nandurbar Civil Hospital', 'District Hospital', 'Kacheri Road, Nandurbar, Maharashtra', '+91 2564 224021', 'Dr. V. Gavit & Specialist Staff', 'Open 24/7', 'Operational'),
('44444444-4444-4444-4444-000000000013', 'gadchiroli', NULL, 'Gadchiroli Rural Hospital', 'SDH', 'Civil Lines, Gadchiroli, Maharashtra', '+91 2564 224102', 'Specialist Medical Roster', 'Open 24/7', 'Operational'),
('44444444-4444-4444-4444-000000000014', 'nandurbar', 'bbbbbbbb-bbbb-bbbb-bbbb-000000000004', 'Shahada Sub-District Hospital', 'SDH', 'Dondaicha Road, Shahada, Nandurbar, Maharashtra', '+91 2565 229104', 'Roster Medical Officers', 'Open 24/7', 'Operational');

-- ----------------------------------------------------------------------------
-- 6. Users (15 Rows)
-- ----------------------------------------------------------------------------
INSERT INTO users (id, phone, email, password_hash, role, is_active) VALUES
-- Health Officers
('99999999-9999-9999-9999-000000000001', '+91 90000 11111', 'rajesh.shinde@maharashtra.gov.in', '$2a$10$dXJ3B5UfD7Uf7j8W2q.3eOnC5dF6lF4mF7nF8oF9pFaFbFcFdFeFf', 'health_officer', TRUE),
-- ASHA Workers
('99999999-9999-9999-9999-000000000002', '+91 94230 45678', 'ayesha.begum@swasthyasetu.org', '$2a$10$dXJ3B5UfD7Uf7j8W2q.3eOnC5dF6lF4mF7nF8oF9pFaFbFcFdFeFf', 'asha_worker', TRUE),
('99999999-9999-9999-9999-000000000003', '+91 94230 11111', 'kavita.padvi@swasthyasetu.org', '$2a$10$dXJ3B5UfD7Uf7j8W2q.3eOnC5dF6lF4mF7nF8oF9pFaFbFcFdFeFf', 'asha_worker', TRUE),
('99999999-9999-9999-9999-000000000004', '+91 94230 22222', 'sunita.madavi@swasthyasetu.org', '$2a$10$dXJ3B5UfD7Uf7j8W2q.3eOnC5dF6lF4mF7nF8oF9pFaFbFcFdFeFf', 'asha_worker', TRUE),
('99999999-9999-9999-9999-000000000005', '+91 94230 33333', 'anjali.vartha@swasthyasetu.org', '$2a$10$dXJ3B5UfD7Uf7j8W2q.3eOnC5dF6lF4mF7nF8oF9pFaFbFcFdFeFf', 'asha_worker', TRUE),
('99999999-9999-9999-9999-000000000006', '+91 94230 44444', 'rekha.kasdekar@swasthyasetu.org', '$2a$10$dXJ3B5UfD7Uf7j8W2q.3eOnC5dF6lF4mF7nF8oF9pFaFbFcFdFeFf', 'asha_worker', TRUE),
('99999999-9999-9999-9999-000000000007', '+91 94230 55555', 'sharda.gavit@swasthyasetu.org', '$2a$10$dXJ3B5UfD7Uf7j8W2q.3eOnC5dF6lF4mF7nF8oF9pFaFbFcFdFeFf', 'asha_worker', TRUE),
-- Citizens
('99999999-9999-9999-9999-000000000010', '+91 98221 44521', 'suman.valvi@citizen.com', '$2a$10$dXJ3B5UfD7Uf7j8W2q.3eOnC5dF6lF4mF7nF8oF9pFaFbFcFdFeFf', 'citizen', TRUE),
('99999999-9999-9999-9999-000000000011', '+91 98221 11111', 'rashida.tadvi@citizen.com', '$2a$10$dXJ3B5UfD7Uf7j8W2q.3eOnC5dF6lF4mF7nF8oF9pFaFbFcFdFeFf', 'citizen', TRUE),
('99999999-9999-9999-9999-000000000012', '+91 97632 11489', 'ramesh.valvi@citizen.com', '$2a$10$dXJ3B5UfD7Uf7j8W2q.3eOnC5dF6lF4mF7nF8oF9pFaFbFcFdFeFf', 'citizen', TRUE),
('99999999-9999-9999-9999-000000000013', '+91 94220 88712', 'pooja.pawara@citizen.com', '$2a$10$dXJ3B5UfD7Uf7j8W2q.3eOnC5dF6lF4mF7nF8oF9pFaFbFcFdFeFf', 'citizen', TRUE),
('99999999-9999-9999-9999-000000000014', '+91 98501 33290', 'aarav.gavit@citizen.com', '$2a$10$dXJ3B5UfD7Uf7j8W2q.3eOnC5dF6lF4mF7nF8oF9pFaFbFcFdFeFf', 'citizen', TRUE),
('99999999-9999-9999-9999-000000000015', '+91 99999 55555', 'suresh.patil@citizen.com', '$2a$10$dXJ3B5UfD7Uf7j8W2q.3eOnC5dF6lF4mF7nF8oF9pFaFbFcFdFeFf', 'citizen', TRUE),
('99999999-9999-9999-9999-000000000016', '+91 98221 22222', 'anita.tadvi@citizen.com', '$2a$10$dXJ3B5UfD7Uf7j8W2q.3eOnC5dF6lF4mF7nF8oF9pFaFbFcFdFeFf', 'citizen', TRUE),
('99999999-9999-9999-9999-000000000017', '+91 98221 33333', 'kishore.gavit@citizen.com', '$2a$10$dXJ3B5UfD7Uf7j8W2q.3eOnC5dF6lF4mF7nF8oF9pFaFbFcFdFeFf', 'citizen', TRUE);

-- ----------------------------------------------------------------------------
-- 7. ASHA Workers (6 Rows)
-- ----------------------------------------------------------------------------
INSERT INTO asha_workers (id, user_id, full_name, cadre_id, phone, primary_facility_id, block_id, availability_status) VALUES
('22222222-2222-2222-2222-000000000002', '99999999-9999-9999-9999-000000000002', 'Ayesha Begum', 'ASHA-NND-AK-001', '+91 94230 45678', '44444444-4444-4444-4444-000000000001', 'bbbbbbbb-bbbb-bbbb-bbbb-000000000001', 'Available Today (08:00 AM – 06:00 PM)'),
('22222222-2222-2222-2222-000000000003', '99999999-9999-9999-9999-000000000003', 'Kavita Padvi', 'ASHA-NND-TL-002', '+91 94230 11111', '44444444-4444-4444-4444-000000000002', 'bbbbbbbb-bbbb-bbbb-bbbb-000000000002', 'Available Today (08:00 AM – 06:00 PM)'),
('22222222-2222-2222-2222-000000000004', '99999999-9999-9999-9999-000000000004', 'Sunita Madavi', 'ASHA-GDC-ET-003', '+91 94230 22222', '44444444-4444-4444-4444-000000000006', 'bbbbbbbb-bbbb-bbbb-bbbb-000000000006', 'Available Today (08:00 AM – 06:00 PM)'),
('22222222-2222-2222-2222-000000000005', '99999999-9999-9999-9999-000000000005', 'Anjali Vartha', 'ASHA-PLG-JW-004', '+91 94230 33333', '44444444-4444-4444-4444-000000000007', 'bbbbbbbb-bbbb-bbbb-bbbb-000000000009', 'Available Today (08:00 AM – 06:00 PM)'),
('22222222-2222-2222-2222-000000000006', '99999999-9999-9999-9999-000000000006', 'Rekha Kasdekar', 'ASHA-AMR-DH-005', '+91 94230 44444', '44444444-4444-4444-4444-000000000004', 'bbbbbbbb-bbbb-bbbb-bbbb-000000000003', 'Available Today (08:00 AM – 06:00 PM)'),
('22222222-2222-2222-2222-000000000007', '99999999-9999-9999-9999-000000000007', 'Sharda Gavit', 'ASHA-NND-AQ-006', '+91 94230 55555', '44444444-4444-4444-4444-000000000001', 'bbbbbbbb-bbbb-bbbb-bbbb-000000000001', 'Available Today (08:00 AM – 06:00 PM)');

-- Resolve self-reference loop back into Communities
UPDATE communities SET assigned_asha_id = '22222222-2222-2222-2222-000000000002' WHERE id = 'cccccccc-cccc-cccc-cccc-000000000001';
UPDATE communities SET assigned_asha_id = '22222222-2222-2222-2222-000000000006' WHERE id = 'cccccccc-cccc-cccc-cccc-000000000002';
UPDATE communities SET assigned_asha_id = '22222222-2222-2222-2222-000000000003' WHERE id = 'cccccccc-cccc-cccc-cccc-000000000003';
UPDATE communities SET assigned_asha_id = '22222222-2222-2222-2222-000000000007' WHERE id = 'cccccccc-cccc-cccc-cccc-000000000004';
UPDATE communities SET assigned_asha_id = '22222222-2222-2222-2222-000000000007' WHERE id = 'cccccccc-cccc-cccc-cccc-000000000005';
UPDATE communities SET assigned_asha_id = '22222222-2222-2222-2222-000000000004' WHERE id = 'cccccccc-cccc-cccc-cccc-000000000006';

-- ----------------------------------------------------------------------------
-- 8. Citizens (8 Rows)
-- ----------------------------------------------------------------------------
INSERT INTO citizens (id, user_id, full_name, age, gender, phone, abha_id, community_id, household_id, address_line, assigned_asha_id) VALUES
('11111111-1111-1111-1111-000000000010', '99999999-9999-9999-9999-000000000010', 'Suman Valvi', 28, 'Female', '+91 98221 44521', '91-4829-1029-4412', 'cccccccc-cccc-cccc-cccc-000000000001', '77777777-7777-7777-7777-000000000004', 'Near Gram Panchayat, Akkalkuwa', '22222222-2222-2222-2222-000000000002'),
('11111111-1111-1111-1111-000000000011', '99999999-9999-9999-9999-000000000011', 'Rashida Tadvi', 28, 'Female', '+91 98221 44521', '91-4829-1029-1111', 'cccccccc-cccc-cccc-cccc-000000000001', '77777777-7777-7777-7777-000000000001', 'Near Gram Panchayat, House #42, Akkalkuwa', '22222222-2222-2222-2222-000000000002'),
('11111111-1111-1111-1111-000000000012', '99999999-9999-9999-9999-000000000012', 'Ramesh Valvi', 45, 'Male', '+91 97632 11489', '91-4829-1029-2222', 'cccccccc-cccc-cccc-cccc-000000000003', '77777777-7777-7777-7777-000000000004', 'Wadi Pada, Nandurbar Rural Sector 2', '22222222-2222-2222-2222-000000000003'),
('11111111-1111-1111-1111-000000000013', '99999999-9999-9999-9999-000000000013', 'Pooja Pawara', 22, 'Female', '+91 94220 88712', '91-4829-1029-3333', 'cccccccc-cccc-cccc-cccc-000000000001', '77777777-7777-7777-7777-000000000002', 'Akkalkuwa East, House #118', '22222222-2222-2222-2222-000000000002'),
('11111111-1111-1111-1111-000000000014', '99999999-9999-9999-9999-000000000014', 'Master Aarav Gavit', 3, 'Male', '+91 98501 33290', '91-4829-1029-4444', 'cccccccc-cccc-cccc-cccc-000000000002', '77777777-7777-7777-7777-000000000003', 'Dhadgaon Tribal Hamlet #3', '22222222-2222-2222-2222-000000000006'),
('11111111-1111-1111-1111-000000000015', '99999999-9999-9999-9999-000000000015', 'Suresh Patil', 52, 'Male', '+91 99999 55555', '91-4829-1029-5555', 'cccccccc-cccc-cccc-cccc-000000000003', NULL, 'Nandurbar Sector 1', '22222222-2222-2222-2222-000000000003'),
('11111111-1111-1111-1111-000000000016', '99999999-9999-9999-9999-000000000016', 'Anita Tadvi', 31, 'Female', '+91 98221 22222', '91-4829-1029-6666', 'cccccccc-cccc-cccc-cccc-000000000001', '77777777-7777-7777-7777-000000000001', 'Akkalkuwa Sector 4', '22222222-2222-2222-2222-000000000002'),
('11111111-1111-1111-1111-000000000017', '99999999-9999-9999-9999-000000000017', 'Kishore Gavit', 48, 'Male', '+91 98221 33333', '91-4829-1029-7777', 'cccccccc-cccc-cccc-cccc-000000000002', '77777777-7777-7777-7777-000000000003', 'Dhadgaon Colony', '22222222-2222-2222-2222-000000000006');

-- ----------------------------------------------------------------------------
-- 9. Health Officers (1 Row)
-- ----------------------------------------------------------------------------
INSERT INTO health_officers (id, user_id, full_name, designation, district_id, jurisdiction_level, phone) VALUES
('33333333-3333-3333-3333-000000000001', '99999999-9999-9999-9999-000000000001', 'Dr. Rajesh Shinde', 'Chief Medical Officer (Surveillance & Access)', NULL, 'state', '+91 90000 11111');

-- ----------------------------------------------------------------------------
-- 10. Care Requests (4 Rows)
-- ----------------------------------------------------------------------------
INSERT INTO care_requests (id, reference_code, citizen_id, patient_name, age, gender, phone, community_id, category, symptoms, symptom_duration, preferred_care_mode, notes, status, assigned_asha_id) VALUES
('55555555-5555-5555-5555-000000000184', 'SS-00184', '11111111-1111-1111-1111-000000000011', 'Rashida Tadvi', 28, 'Female', '+91 98221 44521', 'cccccccc-cccc-cccc-cccc-000000000001', 'Fever / weakness', ARRAY['Fever', 'Body Weakness', 'Loss of Appetite'], '2 days', 'Doorstep ASHA Visit', 'Citizen noted high temperature since yesterday evening. Requesting ASHA doorstep check.', 'Pending', '22222222-2222-2222-2222-000000000002'),
('55555555-5555-5555-5555-000000000185', 'SS-00185', '11111111-1111-1111-1111-000000000012', 'Ramesh Valvi', 45, 'Male', '+91 97632 11489', 'cccccccc-cccc-cccc-cccc-000000000003', 'Respiratory symptoms', ARRAY['Persistent Cough', 'Shortness of Breath'], '4 days', 'PHC Doctor Consultation', 'Difficulty breathing during night. Needs basic pulse oximetry and PHC doctor referral.', 'In Progress', '22222222-2222-2222-2222-000000000003'),
('55555555-5555-5555-5555-000000000186', 'SS-00186', '11111111-1111-1111-1111-000000000013', 'Pooja Pawara', 22, 'Female', '+91 94220 88712', 'cccccccc-cccc-cccc-cccc-000000000001', 'Maternal health consultation', ARRAY['Antenatal Check', 'Mild Dizziness'], 'Routine Trimester Check', 'Maternal Care PHC Visit', 'Second trimester routine checkup guidance and iron-folic acid refill requested.', 'Completed', '22222222-2222-2222-2222-000000000002'),
('55555555-5555-5555-5555-000000000187', 'SS-00187', '11111111-1111-1111-1111-000000000014', 'Master Aarav Gavit', 3, 'Male', '+91 98501 33290', 'cccccccc-cccc-cccc-cccc-000000000002', 'Child health concern', ARRAY['Vomiting', 'Mild Dehydration', 'Diarrhoea'], '1 day', 'Doorstep ORS Distribution', 'Pediatric dehydration symptoms noted. Immediate ORS zinc distribution needed.', 'Verified', '22222222-2222-2222-2222-000000000006');

-- ----------------------------------------------------------------------------
-- 11. Triage Assessments (2 Rows)
-- ----------------------------------------------------------------------------
INSERT INTO triage_assessments (id, care_request_id, asha_worker_id, observed_symptoms, severity_grade, recommended_action, vitals_checked, guidance_given, ors_med_provided, referral_initiated, field_notes) VALUES
('66666666-6666-6666-6666-000000000001', '55555555-5555-5555-5555-000000000185', '22222222-2222-2222-2222-000000000003', ARRAY['Persistent Cough', 'Shortness of Breath'], 'High Priority', 'Refer to PHC for doctor consultation and oxygen saturation check', TRUE, TRUE, FALSE, TRUE, 'Patient has mild wheezing, SpO2 checked at 94%. Fast breathing detected.'),
('66666666-6666-6666-6666-000000000002', '55555555-5555-5555-5555-000000000187', '22222222-2222-2222-2222-000000000006', ARRAY['Vomiting', 'Diarrhoea'], 'High Priority', 'Distribute ORS and Zinc, monitor dehydration status, refer if symptoms persist', TRUE, TRUE, TRUE, FALSE, 'Dehydration checked: skin pinch goes back slowly. Distributed 2 ORS packets and 14 Zinc tablets.');

-- ----------------------------------------------------------------------------
-- 12. Consultations (2 Rows)
-- ----------------------------------------------------------------------------
INSERT INTO consultations (id, reference_code, citizen_id, care_request_id, facility_id, doctor_name, department, consultation_type, scheduled_datetime, reason, clinical_notes, status) VALUES
('77777777-7777-7777-7777-000000009402', 'CON-9402', '11111111-1111-1111-1111-000000000010', NULL, '44444444-4444-4444-4444-000000000003', 'Dr. Sneha Patil', 'General Medicine & Maternal Care', 'In-Person PHC Visit', NOW() + INTERVAL '1 day', 'Second trimester maternal checkup & routine hemoglobin screening', 'Antenatal checkup: patient in second trimester. Routine blood work ordered. Iron and Calcium prescribed.', 'Confirmed'),
('77777777-7777-7777-7777-000000009403', 'CON-9403', '11111111-1111-1111-1111-000000000013', '55555555-5555-5555-5555-000000000186', '44444444-4444-4444-4444-000000000001', 'Dr. K. Patil', 'Maternal Care', 'In-Person PHC Visit', NOW() - INTERVAL '4 days', 'Second trimester routine checkup guidance', 'Patient checked, normal blood pressure. Advised on nutrition. Referral initiated for fetal ultrasound.', 'Completed');

-- ----------------------------------------------------------------------------
-- 13. Prescriptions (3 Rows)
-- ----------------------------------------------------------------------------
INSERT INTO prescriptions (id, reference_code, consultation_id, citizen_id, medicine_name, dosage, timing, prescribed_for, total_days, status, dispensed_by_facility_id, dispensed_by_asha_id, dispensed_at) VALUES
('88888888-8888-8888-8888-000000000001', 'MED-1', '77777777-7777-7777-7777-000000009402', '11111111-1111-1111-1111-000000000010', 'Iron & Folic Acid Tablets (IFA)', '1 Tablet Daily', 'Night after meals', 'Maternal health & anemia prevention', 30, 'Active Dispensed', '44444444-4444-4444-4444-000000000001', NULL, NOW() - INTERVAL '4 days'),
('88888888-8888-8888-8888-000000000002', 'MED-2', '77777777-7777-7777-7777-000000009402', '11111111-1111-1111-1111-000000000010', 'Calcium & Vitamin D3 Tablets', '1 Tablet Daily', 'Morning after breakfast', 'Bone health & prenatal nourishment', 30, 'Active Dispensed', '44444444-4444-4444-4444-000000000001', NULL, NOW() - INTERVAL '4 days'),
('88888888-8888-8888-8888-000000000003', 'MED-3', NULL, '11111111-1111-1111-1111-000000000010', 'Oral Rehydration Salts (ORS) & Zinc', '1 Sachet in 1 Litre boiled water', 'As needed for hydration', 'Household emergency hydration', 14, 'Home First-Aid Kit', NULL, '22222222-2222-2222-2222-000000000002', NOW() - INTERVAL '2 days');

-- ----------------------------------------------------------------------------
-- 14. Diagnostic Orders (3 Rows)
-- ----------------------------------------------------------------------------
INSERT INTO diagnostic_orders (id, reference_code, citizen_id, consultation_id, facility_id, test_name, status, result_summary, doctor_reviewed, report_file_url, test_date) VALUES
('99999999-9999-9999-9999-000000000101', 'DIAG-101', '11111111-1111-1111-1111-000000000010', '77777777-7777-7777-7777-000000009402', '44444444-4444-4444-4444-000000000001', 'Complete Blood Count (CBC) & Hemoglobin', 'Result Available', 'Hemoglobin 11.8 g/dL (Normal). Platelets & WBC within normal range.', TRUE, 'http://example.com/reports/cbc_101.pdf', NOW() - INTERVAL '8 days'),
('99999999-9999-9999-9999-000000000102', 'DIAG-102', '11111111-1111-1111-1111-000000000010', '77777777-7777-7777-7777-000000009402', '44444444-4444-4444-4444-000000000001', 'Fasting Blood Glucose (Sugar Panel)', 'Result Available', 'Fasting Glucose 92 mg/dL (Normal).', TRUE, 'http://example.com/reports/glucose_102.pdf', NOW() - INTERVAL '8 days'),
('99999999-9999-9999-9999-000000000103', 'DIAG-103', '11111111-1111-1111-1111-000000000010', '77777777-7777-7777-7777-000000009402', '44444444-4444-4444-4444-000000000012', 'Prenatal Routine Ultrasonography (USG)', 'Referral Booked', 'Pending scan appointment at district hospital.', FALSE, NULL, NOW() + INTERVAL '15 days');

-- ----------------------------------------------------------------------------
-- 15. Referrals (2 Rows)
-- ----------------------------------------------------------------------------
INSERT INTO referrals (id, reference_code, citizen_id, care_request_id, origin_facility_id, destination_facility_id, referral_type, reason, urgency, status, referral_date, appointment_date, assigned_asha_id, action_required) VALUES
('aaaaaaaa-aaaa-aaaa-aaaa-000000000801', 'REF-801', '11111111-1111-1111-1111-000000000013', '55555555-5555-5555-5555-000000000186', '44444444-4444-4444-4444-000000000001', '44444444-4444-4444-4444-000000000012', 'Specialist OB-GYN Consultation', 'Advanced maternal fetal ultrasound & specialist review', 'Routine', 'Appointment Confirmed', CURRENT_DATE - INTERVAL '4 days', CURRENT_DATE + INTERVAL '15 days', '22222222-2222-2222-2222-000000000002', 'Verify patient transport & appointment slip'),
('aaaaaaaa-aaaa-aaaa-aaaa-000000000798', 'REF-798', '11111111-1111-1111-1111-000000000015', NULL, '44444444-4444-4444-4444-000000000005', '44444444-4444-4444-4444-000000000012', 'Complete Blood Count & Malaria Panel', 'Urgent diagnostics setup for severe fever patient', 'Urgent', 'Completed', CURRENT_DATE - INTERVAL '1 day', CURRENT_DATE - INTERVAL '1 day', '22222222-2222-2222-2222-000000000003', 'Review digital diagnostic report with MO');

-- ----------------------------------------------------------------------------
-- 16. Follow-ups (2 Rows)
-- ----------------------------------------------------------------------------
INSERT INTO followups (id, reference_code, citizen_id, referral_id, consultation_id, assigned_asha_id, followup_type, due_date, status, checklist_notes, outcome_notes, completed_at) VALUES
('ffffffff-ffff-ffff-ffff-000000000402', 'FUP-402', '11111111-1111-1111-1111-000000000016', NULL, '77777777-7777-7777-7777-000000009403', '22222222-2222-2222-2222-000000000002', 'Post-consultation medicine adherence check', CURRENT_DATE, 'Due Today', 'Check antibiotic course completion, doorstep vitals check, blood pressure check', 'Patient recovering well, continuing antibiotic course.', NULL),
('ffffffff-ffff-ffff-ffff-000000000399', 'FUP-399', '11111111-1111-1111-1111-000000000017', NULL, NULL, '22222222-2222-2222-2222-000000000006', 'Post-operative wound dressing follow-up', CURRENT_DATE + INTERVAL '1 day', 'Scheduled', 'Inspect surgical dressing & vital signs', NULL, NULL);

-- ----------------------------------------------------------------------------
-- 17. Household Visits (3 Rows)
-- ----------------------------------------------------------------------------
INSERT INTO household_visits (id, asha_worker_id, community_id, household_id, household_pada, citizen_name, visit_date, visit_category, symptoms_checked, supplies_provided, referral_recommended, field_notes, synced_offline) VALUES
('dddddddd-dddd-dddd-dddd-000000000001', '22222222-2222-2222-2222-000000000002', 'cccccccc-cccc-cccc-cccc-000000000001', '77777777-7777-7777-7777-000000000001', 'Near Gram Panchayat', 'Rashida Tadvi', CURRENT_DATE, 'Antenatal Care Visit', ARRAY['Mild Dizziness', 'Backache'], 'Iron Folic Acid refills, Calcium tablets', 'No Referral Needed', 'Regular second trimester checkup. Hemoglobin levels checked, normal.', FALSE),
('dddddddd-dddd-dddd-dddd-000000000002', '22222222-2222-2222-2222-000000000002', 'cccccccc-cccc-cccc-cccc-000000000001', '77777777-7777-7777-7777-000000000002', 'Akkalkuwa East', 'Pooja Pawara', CURRENT_DATE - INTERVAL '3 days', 'Referral Support Visit', ARRAY['None'], 'Appointment slip, transport coordinate info', 'Taloda CHC Specialist Referral', 'Supported Pooja with coordinating transportation for her upcoming ultrasound scan at Taloda CHC.', FALSE),
('dddddddd-dddd-dddd-dddd-000000000003', '22222222-2222-2222-2222-000000000002', 'cccccccc-cccc-cccc-cccc-000000000001', NULL, 'Akkalkuwa Sector 4', 'Anita Tadvi', CURRENT_DATE - INTERVAL '1 day', 'Routine Non-Communicable Screening', ARRAY['Joint Pain'], 'Paracetamol', 'No Referral Needed', 'Conducted baseline hypertension screening. Blood pressure normal: 124/82 mmHg.', FALSE);

-- ----------------------------------------------------------------------------
-- 18. Health Education Sessions (2 Rows)
-- ----------------------------------------------------------------------------
INSERT INTO health_education_sessions (id, asha_worker_id, community_id, topic, attendees_count, materials_distributed, feedback_notes, session_date) VALUES
('eeeeeeee-eeee-eeee-eeee-000000000001', '22222222-2222-2222-2222-000000000002', 'cccccccc-cccc-cccc-cccc-000000000001', 'Maternal & Prenatal Nutrition', 12, 'Nutrition charts, recipe booklets for local millets', 'Attendees asked questions about iron-rich food recipes and IFA side-effect management.', CURRENT_DATE - INTERVAL '5 days'),
('eeeeeeee-eeee-eeee-eeee-000000000002', '22222222-2222-2222-2222-000000000002', 'cccccccc-cccc-cccc-cccc-000000000001', 'Monsoon Clean Water & ORS Guide', 18, 'ORS packets, chlorine tablets, boiling water infographics', 'High engagement due to recent seasonal cholera cases. Distributed water treatment tablets.', CURRENT_DATE - INTERVAL '1 day');

-- ----------------------------------------------------------------------------
-- 19. Water Quality Reports (2 Rows)
-- ----------------------------------------------------------------------------
INSERT INTO water_quality_reports (id, asha_worker_id, community_id, location_name, water_source, visual_condition, odour, community_complaints, suspected_contamination_source, field_notes, reported_at) VALUES
('11110000-1111-0000-1111-000000000001', '22222222-2222-2222-2222-000000000002', 'cccccccc-cccc-cccc-cccc-000000000001', 'Village Main Standpost', 'Piped Water Supply', 'Clear', 'None', 'None', 'None', 'Field test: chlorine levels checked at 0.2 mg/l (safe). Visual and odour checks clean.', CURRENT_DATE),
('11110000-1111-0000-1111-000000000002', '22222222-2222-2222-2222-000000000002', 'cccccccc-cccc-cccc-cccc-000000000001', 'Pada 3 Community Well', 'Open Hand Pump Well', 'Turbid / Muddy', 'Earthy', 'Fever and stomach ache reported in nearby households', 'Agricultural runoff filter gap', 'Well water highly turbid after heavy rains. Advised community to boil water. Reported to Block Health Officer.', CURRENT_DATE - INTERVAL '2 days');

-- ----------------------------------------------------------------------------
-- 20. Service Issues (5 Rows)
-- ----------------------------------------------------------------------------
INSERT INTO service_issues (id, reference_code, facility_id, district_id, issue_type, severity, service_gap_summary, action_required, reported_by_user_id, status, affected_cases_count) VALUES
('33330000-3333-0000-3333-000000000001', 'alt-001', '44444444-4444-4444-4444-000000000001', 'nandurbar', 'Doctor vacant on duty roster + ultrasound unit offline', 'High Priority', 'Primary care facility operating below capacity. Critical OB-GYN specialist absent.', 'Mobilize MO from Taloda CHC & arrange tele-triage specialist', '99999999-9999-9999-9999-000000000002', 'Intervention Required', 24),
('33330000-3333-0000-3333-000000000002', 'alt-002', '44444444-4444-4444-4444-000000000006', 'gadchiroli', 'Essential medicine stock below threshold', 'Medium Priority', 'Oral rehydration salts, anti-venom & iron-folic stock < 15% at Etapalli PHC.', 'Dispatch emergency medicine buffer from Gadchiroli Civil Hospital', '99999999-9999-9999-9999-000000000004', 'Dispatch In Progress', 19),
('33330000-3333-0000-3333-000000000003', 'alt-003', '44444444-4444-4444-4444-000000000007', 'palghar', 'Diagnostic service unavailable at rural facility', 'Medium Priority', 'Hematology analyzer reagent expired; Hb & malaria tests paused at Mokhada CHC.', 'Route specimen samples to Jawhar Sub-District Lab', '99999999-9999-9999-9999-000000000005', 'Intervention Required', 14),
('33330000-3333-0000-3333-000000000004', 'alt-004', '44444444-4444-4444-4444-000000000008', 'yavatmal', 'Follow-up backlog above expected level', 'Low Priority', '18 post-discharge surgical patients overdue for 7-day ASHA home check.', 'Assign automated SMS reminders & notify sector ASHA facilitators', '99999999-9999-9999-9999-000000000001', 'Resolved', 11),
('33330000-3333-0000-3333-000000000005', 'alt-005', '44444444-4444-4444-4444-000000000001', 'nandurbar', 'Specialist referral backlog in tribal cluster', 'High Priority', 'Obstetrician and pediatrician consult wait time > 72 hours in Akkalkuwa cluster.', 'Schedule dedicated e-Sanjeevani tele-consultation camp on Thursday', '99999999-9999-9999-9999-000000000007', 'Intervention Required', 21);

-- ----------------------------------------------------------------------------
-- 21. Interventions (2 Rows)
-- ----------------------------------------------------------------------------
INSERT INTO interventions (id, service_issue_id, authorized_by_id, action_type, target_facility_id, order_description, status) VALUES
('44440000-4444-0000-4444-000000000001', '33330000-3333-0000-3333-000000000002', '33333333-3333-3333-3333-000000000001', 'Supply chain dispatch', '44444444-4444-4444-4444-000000000006', 'Dispatch 200 units of ORS, 50 units of snake anti-venom, and 500 units of IFA from Gadchiroli District Civil Hospital to Etapalli PHC.', 'Dispatched'),
('44440000-4444-0000-4444-000000000002', '33330000-3333-0000-3333-000000000001', '33333333-3333-3333-3333-000000000001', 'Roster Mobilization', '44444444-4444-4444-4444-000000000001', 'Temporarily assign Medical Officer from Taloda CHC to Akkalkuwa PHC on Tuesday and Thursday to resolve the OPD consultation gap.', 'Implemented');

-- ----------------------------------------------------------------------------
-- 22. Notifications (6 Rows)
-- ----------------------------------------------------------------------------
INSERT INTO notifications (id, user_id, title, subtitle, category, is_unread) VALUES
('55550000-5555-0000-5555-000000000001', '99999999-9999-9999-9999-000000000010', 'Consultation Confirmed: Dr. Sneha Patil (General Medicine)', 'Tomorrow at 11:30 AM • Dhule District Hospital', 'consultation', TRUE),
('55550000-5555-0000-5555-000000000002', '99999999-9999-9999-9999-000000000010', 'Specialist Referral Authorized: Taloda CHC (OB-GYN)', 'Referral ID: REF-801 • Transport coordinated with ASHA', 'referral', TRUE),
('55550000-5555-0000-5555-000000000003', '99999999-9999-9999-9999-000000000010', 'Diagnostic Result Ready: Complete Blood Count (CBC)', 'Normal hemoglobin levels (11.8 g/dL). View lab report.', 'diagnostics', FALSE),
('55550000-5555-0000-5555-000000000004', '99999999-9999-9999-9999-000000000002', 'New Citizen Request: SS-00184 (Fever / weakness in Akkalkuwa)', 'Awaiting ASHA doorstep screening verification.', 'Care Request', TRUE),
('55550000-5555-0000-5555-000000000005', '99999999-9999-9999-9999-000000000002', 'Specialist Referral Confirmed: Pooja Pawara at Taloda CHC', 'Referral ID: REF-801. Appointment date set for 12 September.', 'Referral', TRUE),
('55550000-5555-0000-5555-000000000006', '99999999-9999-9999-9999-000000000001', 'High Priority Alert: Doctor Vacancy in Akkalkuwa PHC (Nandurbar)', 'OPD operational below capacity. Affected case capacity > 20.', 'Service Alert', TRUE);
