const db = require('../config/db');

// Helper to calculate relative time
function formatRelativeTime(dateString) {
  const date = new Date(dateString);
  const now = new Date();
  const diffMs = now - date;
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMins / 60);
  const diffDays = Math.floor(diffHours / 24);

  if (diffMins < 1) return 'Just now';
  if (diffMins < 60) return `${diffMins}m ago`;
  if (diffHours < 24) return `${diffHours}h ago`;
  return `${diffDays}d ago`;
}

// Health Endpoint
exports.getHealth = async (req, res) => {
  try {
    const result = await db.query('SELECT 1');
    if (result.rowCount > 0) {
      return res.json({ status: "ok", database: "connected" });
    }
    throw new Error("No database response");
  } catch (error) {
    console.error("Health check database failure:", error.message);
    return res.status(500).json({ status: "error", database: "disconnected", details: error.message });
  }
};

// ============================================================================
// CITIZEN PORTAL CONTROLLERS
// ============================================================================

exports.getCitizenProfile = async (req, res) => {
  try {
    const id = req.query.id || '11111111-1111-1111-1111-000000000010'; // Default Suman Valvi
    const sql = `
      SELECT 
        c.id, c.full_name as name, c.age, c.gender, 
        comm.name as village, b.name as block, 
        d.name || ', ' || d.state as district, 
        c.phone, c.abha_id as "abhaId",
        aw.full_name as "ashaName", aw.phone as "ashaPhone", 
        comm.name || ' Community' as "ashaCommunity",
        aw.availability_status as "ashaAvailability"
      FROM citizens c
      JOIN communities comm ON c.community_id = comm.id
      JOIN blocks b ON comm.block_id = b.id
      JOIN districts d ON b.district_id = d.id
      LEFT JOIN asha_workers aw ON c.assigned_asha_id = aw.id
      WHERE c.id = $1;
    `;
    const result = await db.query(sql, [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Citizen profile not found" });
    }
    const row = result.rows[0];
    const profile = {
      id: row.id,
      name: row.name,
      age: row.age,
      gender: row.gender,
      village: row.village,
      block: row.block,
      district: row.district,
      phone: row.phone,
      abhaId: row.abhaId,
      avatar: '/assets/citizen-avatar.png',
      avatarInitials: row.name.split(' ').map(n => n[0]).join('').substring(0, 2),
      assignedAsha: row.ashaName ? {
        name: row.ashaName,
        phone: row.ashaPhone,
        community: row.ashaCommunity,
        availability: row.ashaAvailability
      } : null
    };
    return res.json(profile);
  } catch (error) {
    console.error("Error loading citizen profile:", error);
    return res.status(500).json({ error: "Unable to load citizen profile" });
  }
};

exports.getCitizenNotifications = async (req, res) => {
  try {
    const userId = req.query.userId || '99999999-9999-9999-9999-000000000010'; // Default Suman Valvi User
    const sql = `
      SELECT id, title, subtitle, category as type, is_unread as unread, created_at
      FROM notifications
      WHERE user_id = $1
      ORDER BY created_at DESC;
    `;
    const result = await db.query(sql, [userId]);
    const notifications = result.rows.map(row => ({
      id: row.id,
      title: row.title,
      subtitle: row.subtitle,
      time: formatRelativeTime(row.created_at),
      unread: row.unread,
      type: row.type ? row.type.toLowerCase() : 'consultation'
    }));
    return res.json(notifications);
  } catch (error) {
    console.error("Error loading citizen notifications:", error);
    return res.status(500).json({ error: "Unable to load citizen notifications" });
  }
};

exports.getCitizenActiveCare = async (req, res) => {
  try {
    const id = req.query.id || '11111111-1111-1111-1111-000000000010'; // Suman Valvi
    
    // 1. Consultation
    const consultSql = `
      SELECT c.id, c.reference_code, c.doctor_name, c.department, fac.name as facility, fac.address as facility_address, c.scheduled_datetime, c.consultation_type, c.reason
      FROM consultations c
      JOIN healthcare_facilities fac ON c.facility_id = fac.id
      WHERE c.citizen_id = $1 AND c.status IN ('Confirmed', 'Scheduled')
      ORDER BY c.scheduled_datetime ASC LIMIT 1;
    `;
    const consultRes = await db.query(consultSql, [id]);
    let activeConsultation = null;
    if (consultRes.rows.length > 0) {
      const c = consultRes.rows[0];
      const date = new Date(c.scheduled_datetime);
      activeConsultation = {
        id: c.reference_code,
        doctor: c.doctor_name,
        department: c.department,
        facility: c.facility,
        facilityAddress: c.facility_address,
        datetime: `Tomorrow • ${date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`,
        dateShort: 'Tomorrow',
        timeShort: date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        status: 'Confirmed',
        type: c.consultation_type === 'Teleconsultation' ? 'Teleconsultation' : 'In-Person Consultation',
        reason: c.reason
      };
    }

    // 2. Referral
    const refSql = `
      SELECT r.id, r.reference_code, r.referral_type, fac_orig.name as origin_facility, fac_dest.name as destination_facility, r.status, r.referral_date, r.appointment_date, r.reason, r.action_required
      FROM referrals r
      JOIN healthcare_facilities fac_orig ON r.origin_facility_id = fac_orig.id
      JOIN healthcare_facilities fac_dest ON r.destination_facility_id = fac_dest.id
      WHERE r.citizen_id = $1 AND r.status IN ('Pending Transfer', 'Appointment Confirmed')
      ORDER BY r.created_at DESC LIMIT 1;
    `;
    const refRes = await db.query(refSql, [id]);
    let activeReferral = null;
    if (refRes.rows.length > 0) {
      const r = refRes.rows[0];
      const refDate = new Date(r.referral_date);
      const apptDate = r.appointment_date ? new Date(r.appointment_date) : null;
      activeReferral = {
        id: r.reference_code,
        type: r.referral_type,
        originFacility: r.origin_facility,
        destinationFacility: r.destination_facility,
        status: r.status,
        referralDate: refDate.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' }),
        appointmentDate: apptDate ? apptDate.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' }) : 'Pending Set',
        reason: r.reason,
        notes: r.action_required
      };
    }

    // 3. Followup
    const fupSql = `
      SELECT f.id, f.reference_code, f.followup_type, f.due_date, aw.full_name as asha_name, f.status, f.checklist_notes
      FROM followups f
      JOIN asha_workers aw ON f.assigned_asha_id = aw.id
      WHERE f.citizen_id = $1 AND f.status IN ('Scheduled', 'Due Today')
      ORDER BY f.due_date ASC LIMIT 1;
    `;
    const fupRes = await db.query(fupSql, [id]);
    let activeFollowup = null;
    if (fupRes.rows.length > 0) {
      const f = fupRes.rows[0];
      const dueDate = new Date(f.due_date);
      const diffDays = Math.ceil((dueDate - new Date()) / (1000 * 60 * 60 * 24));
      activeFollowup = {
        id: f.reference_code,
        type: f.followup_type,
        dueDate: dueDate.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' }),
        dueInDays: diffDays <= 0 ? 'Due Today' : `${diffDays} days`,
        assignedAsha: f.asha_name,
        status: f.status,
        notes: f.checklist_notes
      };
    }

    // 4. Latest Care Request & Care Journey Stage calculation
    const crSql = `
      SELECT cr.id, cr.reference_code, cr.category, cr.symptoms, cr.status, cr.preferred_care_mode, cr.created_at, cr.updated_at,
             ta.id as triage_id, ta.severity_grade, ta.recommended_action, ta.assessed_at,
             aw.full_name as asha_name
      FROM care_requests cr
      LEFT JOIN triage_assessments ta ON cr.id = ta.care_request_id
      LEFT JOIN asha_workers aw ON cr.assigned_asha_id = aw.id
      WHERE cr.citizen_id = $1
      ORDER BY cr.created_at DESC LIMIT 1;
    `;
    const crRes = await db.query(crSql, [id]);
    let latestCareRequest = null;
    let journeyStages = [
      { step: '01', label: 'Access Care', status: 'completed', desc: 'Health inquiry submitted' },
      { step: '02', label: 'Triage', status: 'completed', desc: 'Frontline ASHA verification' },
      { step: '03', label: 'Consultation', status: 'current', desc: 'Doctor appointment confirmed', isCurrent: true },
      { step: '04', label: 'Diagnostics', status: 'upcoming', desc: 'Lab tests & vitals panel' },
      { step: '05', label: 'Medicine', status: 'upcoming', desc: 'Prescription dispensation' },
      { step: '06', label: 'Referral', status: 'upcoming', desc: 'Specialist care transfer' },
      { step: '07', label: 'Follow-up', status: 'upcoming', desc: 'Recovery & adherence check' }
    ];
    let activeStatusText = '03 Consultation Scheduled';

    if (crRes.rows.length > 0) {
      const cr = crRes.rows[0];
      latestCareRequest = {
        id: cr.reference_code,
        category: cr.category,
        symptoms: cr.symptoms,
        status: cr.status,
        preferredCareMode: cr.preferred_care_mode,
        ashaName: cr.asha_name,
        triageSeverity: cr.severity_grade,
        recommendedAction: cr.recommended_action,
        createdAt: cr.created_at
      };

      if (cr.status === 'Pending') {
        journeyStages = [
          { step: '01', label: 'Access Care', status: 'completed', desc: `Submitted: ${cr.reference_code}` },
          { step: '02', label: 'Triage', status: 'current', desc: 'Frontline ASHA verification', isCurrent: true },
          { step: '03', label: 'Consultation', status: 'upcoming', desc: 'Doctor appointment booking' },
          { step: '04', label: 'Diagnostics', status: 'upcoming', desc: 'Lab tests & vitals panel' },
          { step: '05', label: 'Medicine', status: 'upcoming', desc: 'Prescription dispensation' },
          { step: '06', label: 'Referral', status: 'upcoming', desc: 'Specialist care transfer' },
          { step: '07', label: 'Follow-up', status: 'upcoming', desc: 'Recovery & adherence check' }
        ];
        activeStatusText = `02 ASHA Triage In Progress (${cr.reference_code})`;
      } else if (cr.status === 'Verified') {
        journeyStages = [
          { step: '01', label: 'Access Care', status: 'completed', desc: `Submitted: ${cr.reference_code}` },
          { step: '02', label: 'Triage', status: 'completed', desc: `ASHA Verified (${cr.severity_grade || 'Moderate'})` },
          { step: '03', label: 'Consultation', status: 'current', desc: cr.recommended_action || 'Doctor appointment confirmed', isCurrent: true },
          { step: '04', label: 'Diagnostics', status: 'upcoming', desc: 'Lab tests & vitals panel' },
          { step: '05', label: 'Medicine', status: 'upcoming', desc: 'Prescription dispensation' },
          { step: '06', label: 'Referral', status: 'upcoming', desc: 'Specialist care transfer' },
          { step: '07', label: 'Follow-up', status: 'upcoming', desc: 'Recovery & adherence check' }
        ];
        activeStatusText = `03 Triage Verified — Care Coordinated (${cr.reference_code})`;
      }
    }

    return res.json({
      activeConsultation,
      activeReferral,
      activeFollowup,
      latestCareRequest,
      journeyStages,
      activeStatusText
    });
  } catch (error) {
    console.error("Error loading citizen active care:", error);
    return res.status(500).json({ error: "Unable to load citizen active care details" });
  }
};

exports.createCitizenCareRequest = async (req, res) => {
  try {
    const {
      citizenId = '11111111-1111-1111-1111-000000000010', // Suman Valvi default
      patientName,
      age,
      gender,
      phone,
      village,
      communityId,
      category,
      symptoms,
      symptomDuration,
      preferredCareMode,
      notes
    } = req.body;

    const finalPatientName = (patientName && patientName.trim()) || 'Suman Valvi';
    // If no phone provided for a non-default patient, generate a unique placeholder
    // to avoid colliding with existing seeded phone numbers (unique constraint on users.phone)
    const hasExplicitPhone = phone && phone.trim();
    const generatedPhone = `+91 ${String(Math.floor(70000 + Math.random() * 29999))} ${String(Math.floor(10000 + Math.random() * 89999))}`;
    const finalPhone = hasExplicitPhone ? phone.trim() : (finalPatientName === 'Suman Valvi' ? '+91 98221 44521' : generatedPhone);
    const finalCategory = (category && category.trim()) || 'Fever & General Weakness';
    const finalSymptoms = Array.isArray(symptoms) && symptoms.length > 0
      ? symptoms
      : (typeof symptoms === 'string' && symptoms.length > 0 ? [symptoms] : ['Fever']);
    const finalDuration = symptomDuration || '2 days';
    const finalCareMode = preferredCareMode || 'Request Doorstep ASHA Visit';
    const finalAge = parseInt(age) || 28;
    const finalGender = (gender === 'Male' || gender === 'Female' || gender === 'Other') ? gender : 'Female';

    // Resolve community and assigned ASHA
    let finalCommunityId = communityId;
    let finalAshaId = null;

    if (!finalCommunityId) {
      if (village) {
        const commRes = await db.query(
          'SELECT id, assigned_asha_id FROM communities WHERE name ILIKE $1 LIMIT 1;',
          [`%${village.trim()}%`]
        );
        if (commRes.rows.length > 0) {
          finalCommunityId = commRes.rows[0].id;
          finalAshaId = commRes.rows[0].assigned_asha_id;
        }
      }
      if (!finalCommunityId) {
        finalCommunityId = 'cccccccc-cccc-cccc-cccc-000000000001';
        finalAshaId = '22222222-2222-2222-2222-000000000002';
      }
    }

    if (!finalAshaId) {
      const aRes = await db.query(
        'SELECT assigned_asha_id FROM communities WHERE id = $1;',
        [finalCommunityId]
      );
      finalAshaId = (aRes.rows[0] && aRes.rows[0].assigned_asha_id) || '22222222-2222-2222-2222-000000000002';
    }

    // Dynamic citizen creation/lookup for non-default patients (like Priya)
    let finalCitizenId = citizenId;
    if (finalPatientName.toLowerCase().includes('priya') || finalPatientName !== 'Suman Valvi') {
      const priyaCit = await db.query('SELECT id, community_id, assigned_asha_id FROM citizens WHERE full_name ILIKE $1 LIMIT 1;', [`%${finalPatientName}%`]);
      if (priyaCit.rows.length > 0) {
        finalCitizenId = priyaCit.rows[0].id;
      } else {
        // Build a unique email; if it collides, suffix with a random number
        const baseEmail = `${finalPatientName.toLowerCase().replace(/[^a-z0-9]/g, '')}@citizen.com`;
        const uniqueSuffix = Math.floor(1000 + Math.random() * 9000);
        const uniqueEmail = baseEmail.replace('@', `${uniqueSuffix}@`);
        const userRes = await db.query(
          `INSERT INTO users (id, phone, email, password_hash, role, is_active) 
           VALUES (gen_random_uuid(), $1, $2, '$2a$10$dXJ3B5UfD7Uf7j8W2q.3eOnC5dF6lF4mF7nF8oF9pFaFbFcFdFeFf', 'citizen', TRUE)
           ON CONFLICT (phone) DO UPDATE SET updated_at = NOW()
           RETURNING id;`,
          [finalPhone, uniqueEmail]
        );
        // If ON CONFLICT triggered, the RETURNING id may point to the existing row — fetch by phone
        let newUserId = userRes.rows[0] && userRes.rows[0].id;
        if (!newUserId) {
          const existing = await db.query('SELECT id FROM users WHERE phone = $1 LIMIT 1;', [finalPhone]);
          newUserId = existing.rows[0].id;
        }
        const newCitRes = await db.query(
          `INSERT INTO citizens (
            id, user_id, full_name, age, gender, phone, abha_id, community_id, address_line, assigned_asha_id, created_at, updated_at
          ) VALUES (
            gen_random_uuid(), $1, $2, $3, $4, $5, $6, $7, $8, $9, NOW(), NOW()
          ) RETURNING id;`,
          [
            newUserId,
            finalPatientName,
            finalAge,
            finalGender,
            finalPhone,
            `91-${Math.floor(1000 + Math.random() * 9000)}-${Math.floor(1000 + Math.random() * 9000)}-${Math.floor(1000 + Math.random() * 9000)}`,
            finalCommunityId,
            village ? `${village}, Akkalkuwa Block` : 'Akkalkuwa, Nandurbar District, Maharashtra',
            finalAshaId
          ]
        );
        finalCitizenId = newCitRes.rows[0].id;
      }
    }

    // Generate unique reference code
    const refCodeRes = await db.query(
      "SELECT reference_code FROM care_requests WHERE reference_code ~ '^SS-[0-9]+$' ORDER BY reference_code DESC LIMIT 1;"
    );
    let nextNum = 192;
    if (refCodeRes.rows.length > 0) {
      const match = refCodeRes.rows[0].reference_code.match(/^SS-0*([0-9]+)$/);
      if (match) {
        nextNum = parseInt(match[1]) + 1;
      }
    }
    const referenceCode = `SS-${String(nextNum).padStart(5, '0')}`;

    const insertSql = `
      INSERT INTO care_requests (
        id, reference_code, citizen_id, patient_name, age, gender,
        phone, community_id, category, symptoms, symptom_duration,
        preferred_care_mode, notes, status, assigned_asha_id, created_at, updated_at
      ) VALUES (
        gen_random_uuid(), $1, $2, $3, $4, $5,
        $6, $7, $8, $9, $10,
        $11, $12, 'Pending', $13, NOW(), NOW()
      ) RETURNING *;
    `;

    const result = await db.query(insertSql, [
      referenceCode,
      finalCitizenId,
      finalPatientName,
      finalAge,
      finalGender,
      finalPhone,
      finalCommunityId,
      finalCategory,
      finalSymptoms,
      finalDuration,
      finalCareMode,
      notes || null,
      finalAshaId
    ]);

    const createdRow = result.rows[0];

    return res.status(201).json({
      success: true,
      message: 'Care request submitted successfully.',
      careRequest: createdRow,
      id: createdRow.reference_code,
      referenceCode: createdRow.reference_code
    });
  } catch (error) {
    console.error('Error creating citizen care request:', error);
    return res.status(500).json({ error: 'Unable to submit care request', details: error.message });
  }
};

exports.createServiceIssue = async (req, res) => {
  try {
    const {
      facility = 'Primary Health Centre — Akkalkuwa',
      issueType = 'Essential Medicine / Antibiotic Stockout',
      severity = 'High Priority',
      description,
      districtId = 'nandurbar',
      affectedCases = 1,
      actionRequired = 'Urgent emergency medicine supply dispatch requested by frontline ASHA.'
    } = req.body;

    // Resolve facility ID
    let finalFacilityId = '44444444-4444-4444-4444-000000000001'; // Akkalkuwa PHC default
    const facRes = await db.query(
      'SELECT id, district_id FROM healthcare_facilities WHERE name ILIKE $1 LIMIT 1;',
      [`%${facility.trim()}%`]
    );
    if (facRes.rows.length > 0) {
      finalFacilityId = facRes.rows[0].id;
    }

    const reportedByUserId = '99999999-9999-9999-9999-000000000002'; // Ayesha Begum

    // Generate unique reference code
    const countRes = await db.query('SELECT COUNT(*) as count FROM service_issues;');
    const refNum = 200 + parseInt(countRes.rows[0].count) + 1;
    const referenceCode = `ISS-00${refNum}`;

    let finalSeverity = 'High Priority';
    if (severity === 'Low Priority' || severity === 'Medium Priority' || severity === 'High Priority') {
      finalSeverity = severity;
    } else if (severity.toLowerCase().includes('high') || severity.toLowerCase().includes('critical')) {
      finalSeverity = 'High Priority';
    }

    const insertSql = `
      INSERT INTO service_issues (
        id, reference_code, facility_id, district_id, issue_type,
        severity, service_gap_summary, action_required, reported_by_user_id,
        status, affected_cases_count, created_at, updated_at
      ) VALUES (
        gen_random_uuid(), $1, $2, $3, $4,
        $5, $6, $7, $8,
        'Reported', $9, NOW(), NOW()
      ) RETURNING *;
    `;

    const result = await db.query(insertSql, [
      referenceCode,
      finalFacilityId,
      districtId,
      issueType,
      finalSeverity,
      description || 'Essential medicines unavailable at local facility point.',
      actionRequired,
      reportedByUserId,
      affectedCases
    ]);

    return res.status(201).json({
      success: true,
      message: 'Service issue reported and dispatched to Health Officer alerts.',
      serviceIssue: result.rows[0],
      referenceCode
    });
  } catch (error) {
    console.error('Error logging service issue:', error);
    return res.status(500).json({ error: 'Unable to log service issue', details: error.message });
  }
};

exports.authorizeIntervention = async (req, res) => {
  const client = await db.pool.connect();
  try {
    const {
      serviceIssueId,
      actionType = 'Emergency Medicine Dispatch',
      targetFacility = 'Primary Health Centre — Akkalkuwa',
      orderDescription = 'Emergency medicine supply dispatch authorized for patient care.'
    } = req.body;

    await client.query('BEGIN');

    let issueRow = null;
    if (serviceIssueId) {
      const sRes = await client.query(
        `SELECT id, facility_id, reference_code, district_id FROM service_issues WHERE id::text = $1 OR reference_code = $1 LIMIT 1;`,
        [serviceIssueId]
      );
      if (sRes.rows.length > 0) {
        issueRow = sRes.rows[0];
      }
    }

    if (!issueRow) {
      const sRes = await client.query(
        `SELECT id, facility_id, reference_code, district_id FROM service_issues WHERE status IN ('Reported', 'Intervention Required') ORDER BY created_at DESC LIMIT 1;`
      );
      if (sRes.rows.length > 0) {
        issueRow = sRes.rows[0];
      } else {
        const anyRes = await client.query(`SELECT id, facility_id, reference_code, district_id FROM service_issues ORDER BY created_at DESC LIMIT 1;`);
        issueRow = anyRes.rows[0];
      }
    }

    const finalTargetFacilityId = (issueRow && issueRow.facility_id) || '44444444-4444-4444-4444-000000000001';
    const officerId = '33333333-3333-3333-3333-000000000001'; // Dr. Rajesh Shinde

    const insertSql = `
      INSERT INTO interventions (
        id, service_issue_id, target_facility_id, authorized_by_id,
        action_type, order_description, status, authorized_at
      ) VALUES (
        gen_random_uuid(), $1, $2, $3,
        $4, $5, 'Dispatched', NOW()
      ) RETURNING *;
    `;

    const intRes = await client.query(insertSql, [
      issueRow.id,
      finalTargetFacilityId,
      officerId,
      actionType,
      orderDescription
    ]);

    await client.query(
      `UPDATE service_issues SET status = 'Dispatch In Progress', updated_at = NOW() WHERE id = $1;`,
      [issueRow.id]
    );

    await client.query('COMMIT');

    return res.status(200).json({
      success: true,
      message: 'Intervention authorized and dispatched successfully.',
      intervention: intRes.rows[0],
      serviceIssue: issueRow
    });
  } catch (error) {
    await client.query('ROLLBACK');
    console.error('Error authorizing intervention:', error);
    return res.status(500).json({ error: 'Unable to authorize intervention', details: error.message });
  } finally {
    client.release();
  }
};

exports.getCitizenMedicines = async (req, res) => {
  try {
    const id = req.query.id || '11111111-1111-1111-1111-000000000010'; // Suman Valvi
    const sql = `
      SELECT 
        p.id, p.reference_code, p.medicine_name, p.dosage, p.timing, 
        p.prescribed_for, p.total_days, p.status, fac.name as pharmacy, aw.full_name as asha_name
      FROM prescriptions p
      LEFT JOIN healthcare_facilities fac ON p.dispensed_by_facility_id = fac.id
      LEFT JOIN asha_workers aw ON p.dispensed_by_asha_id = aw.id
      WHERE p.citizen_id = $1
      ORDER BY p.created_at DESC;
    `;
    const result = await db.query(sql, [id]);
    const medicines = result.rows.map(row => ({
      id: row.reference_code,
      name: row.medicine_name,
      dosage: row.dosage,
      timing: row.timing,
      prescribedFor: row.prescribed_for,
      remainingDays: row.status === 'Home First-Aid Kit' ? 'Distributed in home kit' : `${row.total_days} days course`,
      status: row.status,
      pharmacy: row.status === 'Home First-Aid Kit' ? `ASHA Worker ${row.asha_name || ''}`.trim() : row.pharmacy || 'PHC Pharmacy'
    }));
    return res.json(medicines);
  } catch (error) {
    console.error("Error loading citizen prescriptions:", error);
    return res.status(500).json({ error: "Unable to load prescriptions" });
  }
};

exports.getCitizenDiagnostics = async (req, res) => {
  try {
    const id = req.query.id || '11111111-1111-1111-1111-000000000010'; // Suman Valvi
    const sql = `
      SELECT d.id, d.reference_code, d.test_name, d.test_date, fac.name as facility, d.status, d.result_summary, d.doctor_reviewed, d.report_file_url
      FROM diagnostic_orders d
      JOIN healthcare_facilities fac ON d.facility_id = fac.id
      WHERE d.citizen_id = $1
      ORDER BY d.test_date DESC;
    `;
    const result = await db.query(sql, [id]);
    const diagnostics = result.rows.map(row => {
      const date = new Date(row.test_date);
      return {
        id: row.reference_code,
        testName: row.test_name,
        date: date.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' }),
        facility: row.facility,
        status: row.status,
        resultSummary: row.result_summary,
        doctorReviewed: row.doctor_reviewed,
        pdfAvailable: !!row.report_file_url
      };
    });
    return res.json(diagnostics);
  } catch (error) {
    console.error("Error loading citizen diagnostics:", error);
    return res.status(500).json({ error: "Unable to load diagnostic orders" });
  }
};

exports.getNearbyFacilities = async (req, res) => {
  try {
    const sql = `
      SELECT id, name, facility_type, address, phone, doctor_on_duty, operating_hours, status
      FROM healthcare_facilities
      ORDER BY name ASC;
    `;
    const result = await db.query(sql);
    
    // Mapping static mock distances to retain identical layout presentation
    const mockData = [
      { distance: '1.2 km away', travelTime: '8 mins by auto / bike', services: ['General Consultation', 'Maternal & Child Care', 'Essential Diagnostics', 'Free Medicines', '24/7 Delivery Ward'] },
      { distance: '14.5 km away', travelTime: '25 mins by state transport', services: ['Specialist OB-GYN', 'Pediatric Unit', 'Blood Storage', 'Radiology / USG', 'Emergency Trauma'] },
      { distance: '38 km away', travelTime: '55 mins via Highway 753J', services: ['Multi-Specialty OPD', 'Surgical Ward', 'Advanced Pathology', 'Dialysis Unit', 'ICU / NICU'] },
      { distance: '18 km away', travelTime: '35 mins by road', services: ['Routine Immunization', 'Antenatal Screening', 'First-Aid & ORS', 'Tele-Triage Node'] }
    ];

    const facilities = result.rows.map((row, idx) => {
      const mockMeta = mockData[idx % mockData.length];
      return {
        id: row.id,
        name: row.name,
        type: row.facility_type,
        distance: mockMeta.distance,
        travelTime: mockMeta.travelTime,
        address: row.address,
        phone: row.phone,
        services: mockMeta.services,
        doctorAvailable: row.doctor_on_duty,
        timing: row.operating_hours,
        status: row.status,
        badgeClass: row.status === 'Referral Center' ? 'bg-[#3D6B8C] text-white' : 'bg-[#5C8A5E] text-white'
      };
    });
    return res.json(facilities);
  } catch (error) {
    console.error("Error loading nearby facilities:", error);
    return res.status(500).json({ error: "Unable to load facilities list" });
  }
};

// ============================================================================
// ASHA WORKER DASHBOARD CONTROLLERS
// ============================================================================

exports.getAshaProfile = async (req, res) => {
  try {
    const id = req.query.id || '22222222-2222-2222-2222-000000000002'; // Ayesha Begum
    const sql = `
      SELECT aw.id, aw.full_name as name, aw.phone, b.name as block, d.name || ', ' || d.state as district,
             (SELECT COUNT(*) FROM communities WHERE assigned_asha_id = aw.id) as "assignedCommunitiesCount",
             (SELECT COALESCE(SUM(total_households), 0) FROM communities WHERE assigned_asha_id = aw.id) as "totalHouseholdsCovered"
      FROM asha_workers aw
      JOIN blocks b ON aw.block_id = b.id
      JOIN districts d ON b.district_id = d.id
      WHERE aw.id = $1;
    `;
    const result = await db.query(sql, [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: "ASHA Profile not found" });
    }
    const row = result.rows[0];
    const profile = {
      name: row.name,
      role: 'Frontline ASHA Worker',
      block: row.block,
      district: row.district,
      locationBreadcrumb: `${row.district} • ${row.block}`,
      avatar: '/assets/asha-worker.png',
      phone: row.phone,
      assignedCommunitiesCount: parseInt(row.assignedCommunitiesCount),
      totalHouseholdsCovered: parseInt(row.totalHouseholdsCovered),
      notificationsCount: 3, // Retaining frontend static alert layout counters
      notifications: [
        { id: 1, title: 'New Citizen Request: SS-00184 (Fever / weakness in Akkalkuwa)', time: '15m ago', unread: true, category: 'Care Request' },
        { id: 2, title: 'Specialist Referral Confirmed: Pooja Pawara at Taloda CHC', time: '1h ago', unread: true, category: 'Referral' },
        { id: 3, title: 'Follow-up Due: 3 Post-natal recovery visits in Dhadgaon', time: '3h ago', unread: false, category: 'Follow-up' }
      ]
    };
    return res.json(profile);
  } catch (error) {
    console.error("Error loading ASHA profile:", error);
    return res.status(500).json({ error: "Unable to load ASHA worker details" });
  }
};

exports.getAshaKpis = async (req, res) => {
  try {
    const id = req.query.id || '22222222-2222-2222-2222-000000000002'; // Ayesha Begum
    
    // 1. Completed visits vs total visits today
    const visitSql = `
      SELECT COUNT(*) as total, 
             COUNT(*) FILTER (WHERE visit_date = CURRENT_DATE) as completed
      FROM household_visits
      WHERE asha_worker_id = $1;
    `;
    const visitRes = await db.query(visitSql, [id]);
    const completedToday = parseInt(visitRes.rows[0].completed || '3');
    const totalToday = 12; // Mapped denominator to represent target quota of ASHA's workday roster
    
    // 2. Pending care requests
    const crSql = `
      SELECT COUNT(*) as count FROM care_requests 
      WHERE (assigned_asha_id = $1 OR assigned_asha_id IS NULL) AND status = 'Pending';
    `;
    const crRes = await db.query(crSql, [id]);

    // 3. Pending referrals
    const refSql = `
      SELECT COUNT(*) as count FROM referrals 
      WHERE assigned_asha_id = $1 AND status = 'Pending Transfer';
    `;
    const refRes = await db.query(refSql, [id]);

    // 4. Overdue and due followups
    const fupSql = `
      SELECT COUNT(*) as count FROM followups 
      WHERE assigned_asha_id = $1 AND status IN ('Scheduled', 'Due Today', 'Overdue');
    `;
    const fupRes = await db.query(fupSql, [id]);

    const kpis = [
      {
        id: 'visits-today',
        value: totalToday.toString(),
        title: 'Visits Today',
        subtext: `${completedToday} Completed • ${totalToday - completedToday} Pending`,
        statusType: 'neutral',
        icon: 'Home',
        iconBg: 'bg-[#EAF0E6] text-[#405642]'
      },
      {
        id: 'care-requests',
        value: crRes.rows[0].count.toString(),
        title: 'Citizen Care Requests',
        subtext: 'Needs Verification',
        statusType: 'action',
        icon: 'FileText',
        iconBg: 'bg-[#FBF0EB] text-[#B94A25]'
      },
      {
        id: 'pending-referrals',
        value: refRes.rows[0].count.toString(),
        title: 'Pending Referrals',
        subtext: 'Needs Follow-up',
        statusType: 'warning',
        icon: 'RotateCw',
        iconBg: 'bg-[#EBF2F7] text-[#3D6B8C]'
      },
      {
        id: 'followups-due',
        value: fupRes.rows[0].count.toString(),
        title: 'Follow-ups Due',
        subtext: 'Priority Actions',
        statusType: 'alert',
        icon: 'Clock',
        iconBg: 'bg-[#FDF0E7] text-[#D45E28]'
      }
    ];

    return res.json(kpis);
  } catch (error) {
    console.error("Error loading ASHA KPIs:", error);
    return res.status(500).json({ error: "Unable to load KPI numbers" });
  }
};

exports.getAshaCareRequests = async (req, res) => {
  try {
    const id = req.query.id || '22222222-2222-2222-2222-000000000002'; // Ayesha Begum
    const statusFilter = req.query.status;

    let whereClause = `WHERE (cr.assigned_asha_id = $1 OR cr.assigned_asha_id IS NULL)`;
    const params = [id];

    if (statusFilter) {
      whereClause += ` AND cr.status = $2`;
      params.push(statusFilter);
    }

    const sql = `
      SELECT cr.id, cr.reference_code, cr.patient_name, cr.age, cr.gender, cr.category,
             cr.symptoms, comm.name as community_name, cr.created_at, cr.phone,
             h.household_number, h.pada_or_sector, cr.notes, cr.status,
             ta.id as triage_id, ta.severity_grade as triage_severity, ta.recommended_action
      FROM care_requests cr
      LEFT JOIN communities comm ON cr.community_id = comm.id
      LEFT JOIN citizens c ON cr.citizen_id = c.id
      LEFT JOIN households h ON c.household_id = h.id
      LEFT JOIN triage_assessments ta ON cr.id = ta.care_request_id
      ${whereClause}
      ORDER BY cr.created_at DESC;
    `;
    const result = await db.query(sql, params);
    
    const colors = [
      { initials: 'RT', bg: 'bg-[#FDF0E7] text-[#B94A25]' },
      { initials: 'RV', bg: 'bg-[#EBF2F7] text-[#3D6B8C]' },
      { initials: 'PP', bg: 'bg-[#EAF0E6] text-[#405642]' },
      { initials: 'AG', bg: 'bg-[#F0EEFB] text-[#4F46E5]' },
      { initials: 'SV', bg: 'bg-[#EAF0E6] text-[#405642]' }
    ];

    const requests = result.rows.map((row, idx) => {
      const color = colors[idx % colors.length];
      const initials = (row.patient_name || 'Citizen').split(' ').map(n => n[0]).join('').substring(0, 2);
      
      let severity = row.triage_severity || 'Moderate';
      if (!row.triage_severity) {
        if (row.category && (row.category.toLowerCase().includes('respiratory') || row.category.toLowerCase().includes('dehydration') || row.category.toLowerCase().includes('emergency'))) {
          severity = 'High Priority';
        } else if (row.category && row.category.toLowerCase().includes('maternal')) {
          severity = 'Routine';
        }
      }

      const isVerified = row.status === 'Verified' || row.status === 'Completed' || row.status === 'In Progress';

      return {
        id: row.reference_code,
        dbId: row.id,
        patientName: row.patient_name,
        age: row.age,
        gender: row.gender,
        symptoms: row.category,
        symptomTags: row.symptoms || [],
        community: row.community_name || 'Akkalkuwa',
        timeAgo: formatRelativeTime(row.created_at),
        avatarInitials: initials || color.initials,
        avatarBg: color.bg,
        phone: row.phone,
        address: row.pada_or_sector ? `House #${row.household_number || 'N/A'}, ${row.pada_or_sector}, ${row.community_name || ''}` : `Community Area, ${row.community_name || 'Akkalkuwa'}`,
        notes: row.notes || 'Care request submitted via ArogyaSathi Citizen Portal.',
        verified: isVerified,
        status: row.status,
        severity,
        triageCategory: row.category,
        recommendedAction: row.recommended_action || null
      };
    });

    return res.json(requests);
  } catch (error) {
    console.error("Error loading ASHA care requests:", error);
    return res.status(500).json({ error: "Unable to load citizen care requests" });
  }
};

exports.submitAshaTriage = async (req, res) => {
  const client = await db.pool.connect();
  try {
    const {
      careRequestId, // can be UUID or reference_code like SS-00184
      ashaWorkerId = '22222222-2222-2222-2222-000000000002',
      observedSymptoms,
      severityGrade,
      recommendedAction,
      vitalsChecked,
      guidanceGiven,
      orsMedProvided,
      referralInitiated,
      fieldNotes
    } = req.body;

    if (!careRequestId) {
      return res.status(400).json({ error: 'careRequestId is required' });
    }

    await client.query('BEGIN');

    // 1. Find the care request record
    const crCheck = await client.query(
      `SELECT id, reference_code, citizen_id, assigned_asha_id, status 
       FROM care_requests 
       WHERE id::text = $1 OR reference_code = $1 
       FOR UPDATE;`,
      [careRequestId]
    );

    if (crCheck.rows.length === 0) {
      await client.query('ROLLBACK');
      return res.status(404).json({ error: `Care request not found for ID ${careRequestId}` });
    }

    const careRequest = crCheck.rows[0];
    const finalAshaId = ashaWorkerId || careRequest.assigned_asha_id || '22222222-2222-2222-2222-000000000002';
    
    // Severity mapping to PostgreSQL enum
    let finalSeverity = 'Moderate';
    if (severityGrade === 'Routine' || severityGrade === 'Moderate' || severityGrade === 'High Priority') {
      finalSeverity = severityGrade;
    } else if (severityGrade === 'High') {
      finalSeverity = 'High Priority';
    }

    const finalObservedSymptoms = Array.isArray(observedSymptoms) && observedSymptoms.length > 0 
      ? observedSymptoms 
      : ['Fever', 'Body Weakness'];

    const finalAction = recommendedAction || 'Frontline Triage Verification Completed';

    // 2. Insert into triage_assessments table
    const triageInsertSql = `
      INSERT INTO triage_assessments (
        id, care_request_id, asha_worker_id, observed_symptoms,
        severity_grade, recommended_action, vitals_checked,
        guidance_given, ors_med_provided, referral_initiated,
        field_notes, assessed_at
      ) VALUES (
        gen_random_uuid(), $1, $2, $3,
        $4, $5, $6,
        $7, $8, $9,
        $10, NOW()
      ) RETURNING *;
    `;

    const triageRes = await client.query(triageInsertSql, [
      careRequest.id,
      finalAshaId,
      finalObservedSymptoms,
      finalSeverity,
      finalAction,
      vitalsChecked !== undefined ? !!vitalsChecked : true,
      guidanceGiven !== undefined ? !!guidanceGiven : true,
      orsMedProvided !== undefined ? !!orsMedProvided : false,
      referralInitiated !== undefined ? !!referralInitiated : false,
      fieldNotes || 'Field check completed. Citizen verified.'
    ]);

    // 3. Update care_requests status to 'Verified'
    const updateCrSql = `
      UPDATE care_requests 
      SET status = 'Verified', updated_at = NOW()
      WHERE id = $1
      RETURNING *;
    `;
    const updatedCrRes = await client.query(updateCrSql, [careRequest.id]);

    await client.query('COMMIT');

    return res.status(200).json({
      success: true,
      message: 'Triage assessment recorded and care request verified successfully.',
      assessment: triageRes.rows[0],
      careRequest: updatedCrRes.rows[0]
    });
  } catch (error) {
    await client.query('ROLLBACK');
    console.error('Error recording ASHA triage assessment:', error);
    return res.status(500).json({ error: 'Unable to record triage assessment', details: error.message });
  } finally {
    client.release();
  }
};

exports.getAshaCommunities = async (req, res) => {
  try {
    const id = req.query.id || '22222222-2222-2222-2222-000000000002'; // Ayesha Begum
    const sql = `
      SELECT c.id, c.name, c.total_households as households,
             (SELECT COUNT(*) FROM household_visits hv WHERE hv.community_id = c.id AND hv.asha_worker_id = $1) as visits,
             (SELECT COUNT(*) FROM followups f WHERE f.assigned_asha_id = $1 AND f.status = 'Due Today') as followups,
             (SELECT COUNT(*) FROM referrals r WHERE r.assigned_asha_id = $1 AND r.status = 'Pending Transfer') as referrals
      FROM communities c
      WHERE c.assigned_asha_id = $1;
    `;
    const result = await db.query(sql, [id]);

    const staticCoordinates = [
      { x: 38, y: 32 },
      { x: 52, y: 25 },
      { x: 62, y: 48 },
      { x: 45, y: 55 },
      { x: 74, y: 62 },
      { x: 82, y: 78 }
    ];

    const communities = result.rows.map((row, idx) => {
      const coords = staticCoordinates[idx % staticCoordinates.length];
      
      // Let's compute a completed count based on visits
      // Mocking realistic figures if DB visits are zero initially
      const completed = row.visits > 0 ? parseInt(row.visits) : Math.floor(row.households * 0.75) + idx;
      const coveragePct = Math.round((completed / row.households) * 100);
      
      let status = 'In Progress';
      if (coveragePct >= 85) status = 'Completed';
      else if (coveragePct <= 73) status = 'Priority Focus';

      return {
        id: row.id,
        name: row.name,
        households: row.households,
        visitsCompleted: completed,
        followUpsDue: parseInt(row.followups) || 12,
        pendingReferrals: parseInt(row.referrals) || 5,
        status,
        coveragePct: `${coveragePct}%`,
        coordinates: coords
      };
    });

    return res.json(communities);
  } catch (error) {
    console.error("Error loading ASHA communities:", error);
    return res.status(500).json({ error: "Unable to load assigned communities details" });
  }
};

exports.getAshaPriorityTasks = async (req, res) => {
  try {
    const id = req.query.id || '22222222-2222-2222-2222-000000000002'; // Ayesha Begum
    
    // We aggregate tasks from referrals and followups that need action
    const refSql = `
      SELECT r.reference_code, r.referral_type, r.reason, comm.name as community_name, r.created_at, c.full_name as patient_name, fac.name as destination_facility, r.urgency
      FROM referrals r
      JOIN citizens c ON r.citizen_id = c.id
      JOIN communities comm ON c.community_id = comm.id
      JOIN healthcare_facilities fac ON r.destination_facility_id = fac.id
      WHERE r.assigned_asha_id = $1 AND r.status = 'Pending Transfer'
      ORDER BY r.created_at DESC;
    `;
    const refRes = await db.query(refSql, [id]);

    const fupSql = `
      SELECT f.reference_code, f.followup_type, f.checklist_notes, comm.name as community_name, f.created_at, c.full_name as patient_name, f.status
      FROM followups f
      JOIN citizens c ON f.citizen_id = c.id
      JOIN communities comm ON c.community_id = comm.id
      WHERE f.assigned_asha_id = $1 AND f.status IN ('Due Today', 'Overdue')
      ORDER BY f.due_date ASC;
    `;
    const fupRes = await db.query(fupSql, [id]);

    const tasks = [];
    
    refRes.rows.forEach(r => {
      tasks.push({
        id: r.reference_code,
        severity: r.urgency === 'Emergency' ? 'High Priority' : 'Medium Priority',
        badgeClass: r.urgency === 'Emergency' ? 'bg-[#C0392B] text-white' : 'bg-[#E07A2B] text-white',
        title: 'Specialist referral pending',
        description: `Citizen requires specialist consultation (${r.referral_type} at ${r.destination_facility}).`,
        location: r.community_name,
        actionLabel: 'Start Follow-up',
        timeAgo: formatRelativeTime(r.created_at),
        patientName: r.patient_name,
        facilityTarget: r.destination_facility,
        referralType: r.referral_type
      });
    });

    fupRes.rows.forEach(f => {
      tasks.push({
        id: f.reference_code,
        severity: f.status === 'Overdue' ? 'High Priority' : 'Medium Priority',
        badgeClass: f.status === 'Overdue' ? 'bg-[#C0392B] text-white' : 'bg-[#E07A2B] text-white',
        title: f.status === 'Overdue' ? 'Follow-up overdue' : 'Follow-up due today',
        description: f.checklist_notes || `Conduct scheduled ${f.followup_type.toLowerCase()} recovery visit.`,
        location: f.community_name,
        actionLabel: 'Contact Citizen',
        timeAgo: formatRelativeTime(f.created_at),
        patientName: f.patient_name,
        facilityTarget: 'Home Visit',
        referralType: 'Adherence Check'
      });
    });

    // Fallback if DB is empty to retain visual continuity
    if (tasks.length === 0) {
      return res.json([
        { id: 'task-1', severity: 'High Priority', badgeClass: 'bg-[#C0392B] text-white', title: 'Specialist referral pending', description: 'Citizen requires specialist consultation (Obstetrics/Gynecology at Taloda CHC).', location: 'Akkalkuwa', actionLabel: 'Start Follow-up', timeAgo: '2 hrs ago', patientName: 'Pooja Pawara', facilityTarget: 'Taloda Community Health Centre', referralType: 'Specialist OB-GYN' }
      ]);
    }

    return res.json(tasks);
  } catch (error) {
    console.error("Error loading ASHA tasks:", error);
    return res.status(500).json({ error: "Unable to load priority tasks" });
  }
};

exports.getAshaReferrals = async (req, res) => {
  try {
    const id = req.query.id || '22222222-2222-2222-2222-000000000002'; // Ayesha Begum
    
    // We fetch a list of referrals and followups mapped to the single dashboard grid
    const refSql = `
      SELECT r.id, r.reference_code, c.full_name as patient_name, c.age, comm.name as community_name,
             r.referral_type as service, fac_orig.name as orig_facility, fac_dest.name as dest_facility, r.status, r.created_at, r.action_required
      FROM referrals r
      JOIN citizens c ON r.citizen_id = c.id
      JOIN communities comm ON c.community_id = comm.id
      JOIN healthcare_facilities fac_orig ON r.origin_facility_id = fac_orig.id
      JOIN healthcare_facilities fac_dest ON r.destination_facility_id = fac_dest.id
      WHERE r.assigned_asha_id = $1
      ORDER BY r.created_at DESC;
    `;
    const refRes = await db.query(refSql, [id]);

    const fupSql = `
      SELECT f.id, f.reference_code, c.full_name as patient_name, c.age, comm.name as community_name,
             f.followup_type as service, f.status, f.due_date, f.checklist_notes
      FROM followups f
      JOIN citizens c ON f.citizen_id = c.id
      JOIN communities comm ON c.community_id = comm.id
      WHERE f.assigned_asha_id = $1
      ORDER BY f.due_date ASC;
    `;
    const fupRes = await db.query(fupSql, [id]);

    const referrals = [];

    refRes.rows.forEach(r => {
      referrals.push({
        id: r.reference_code,
        patientName: r.patient_name,
        age: r.age,
        community: r.community_name,
        service: r.service,
        referralFrom: r.orig_facility,
        referralTo: r.dest_facility,
        status: r.status,
        statusColor: r.status === 'Completed' ? 'bg-[#E8F3E9] text-[#405642] border border-[#C5DEC8]' : 'bg-[#FEF6EE] text-[#B94A25] border border-[#FAD3BD]',
        date: formatRelativeTime(r.created_at),
        actionRequired: r.action_required
      });
    });

    fupRes.rows.forEach(f => {
      const isOverdue = f.status === 'Overdue';
      const isDue = f.status === 'Due Today';
      let statusColor = 'bg-[#F0EEFB] text-[#4F46E5] border border-[#D5CEF5]'; // Scheduled / Tomorrow
      if (isOverdue) statusColor = 'bg-[#FCE8E6] text-[#C0392B] border border-[#F5C2BC]';
      else if (isDue) statusColor = 'bg-[#FEF8EC] text-[#B87A1E] border border-[#F9E5BE]';

      referrals.push({
        id: f.reference_code,
        patientName: f.patient_name,
        age: f.age,
        community: f.community_name,
        service: f.service,
        referralFrom: 'Medical Facility',
        referralTo: 'Home Visit',
        status: f.status,
        statusColor,
        date: f.status === 'Due Today' ? 'Due Today' : new Date(f.due_date).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' }),
        actionRequired: f.checklist_notes
      });
    });

    return res.json(referrals);
  } catch (error) {
    console.error("Error loading ASHA referrals list:", error);
    return res.status(500).json({ error: "Unable to load referrals list" });
  }
};

// ============================================================================
// HEALTH OFFICER / CMO DASHBOARD CONTROLLERS
// ============================================================================

exports.getOfficerDistricts = async (req, res) => {
  try {
    const sql = `
      SELECT district_id as id, district_name as name, state, region, total_facilities as "facilities", active_cases as "activeCases", pending_referrals as "pendingReferrals", followups_due as "followUpsDue"
      FROM v_district_access_kpis
      ORDER BY active_cases DESC;
    `;
    const result = await db.query(sql);
    const districts = result.rows.map(row => {
      let accessLevel = 'Good Access';
      let accessColor = '#5C8A5E';
      if (row.activeCases > 20) {
        accessLevel = 'Priority Gap';
        accessColor = '#C0392B';
      } else if (row.activeCases > 15) {
        accessLevel = 'Limited Access';
        accessColor = '#E26D38';
      } else if (row.activeCases > 10) {
        accessLevel = 'Moderate Access';
        accessColor = '#E8B958';
      }
      return {
        id: row.id,
        name: row.name,
        state: row.state,
        activeCases: parseInt(row.activeCases),
        facilities: parseInt(row.facilities),
        pendingReferrals: parseInt(row.pendingReferrals),
        followUpsDue: parseInt(row.followUpsDue),
        accessLevel,
        accessColor
      };
    });
    return res.json(districts);
  } catch (error) {
    console.error("Error loading officer districts list:", error);
    return res.status(500).json({ error: "Unable to load districts data" });
  }
};

exports.getOfficerKpis = async (req, res) => {
  try {
    // We aggregate counts from districts and alerts
    const alertsSql = `SELECT COUNT(*) as count FROM service_issues WHERE status != 'Resolved';`;
    const alertsRes = await db.query(alertsSql);

    const casesSql = `SELECT COUNT(*) as count FROM care_requests WHERE status IN ('Pending', 'Verified', 'In Progress');`;
    const casesRes = await db.query(casesSql);

    const refSql = `SELECT COUNT(*) as count FROM referrals WHERE status = 'Pending Transfer';`;
    const refRes = await db.query(refSql);

    const highPrioritySql = `
      SELECT COUNT(*) as count FROM v_district_access_kpis d
      WHERE (SELECT COUNT(*) FROM service_issues WHERE district_id = d.district_id AND severity = 'High Priority') > 0;
    `;
    const hpRes = await db.query(highPrioritySql);

    const kpis = [
      { id: 'active-alerts', title: 'Active Service Alerts', value: alertsRes.rows[0].count.toString(), trend: '↑ 20% vs last week', trendType: 'warning', icon: 'AlertTriangle', iconBg: 'bg-[#FBF0EB] text-[#B94A25]', borderColor: 'border-[#DCCDBB]' },
      { id: 'high-priority-areas', title: 'High-Priority Areas', value: hpRes.rows[0].count > 0 ? hpRes.rows[0].count.toString() : '18', trend: '↑ 8% vs last week', trendType: 'warning', icon: 'ShieldAlert', iconBg: 'bg-[#FCE8E6] text-[#C0392B]', borderColor: 'border-[#DCCDBB]' },
      { id: 'total-cases', title: 'Citizen Cases', value: casesRes.rows[0].count.toString(), trend: '↑ 15% vs last week', trendType: 'warning', icon: 'Activity', iconBg: 'bg-[#EAF0E6] text-[#405642]', borderColor: 'border-[#DCCDBB]' },
      { id: 'referrals-pending', title: 'Referrals Pending', value: refRes.rows[0].count.toString(), trend: '↓ 6% vs last week', trendType: 'positive', icon: 'RotateCw', iconBg: 'bg-[#EBF2F7] text-[#3D6B8C]', borderColor: 'border-[#DCCDBB]' }
    ];

    return res.json(kpis);
  } catch (error) {
    console.error("Error loading officer KPIs:", error);
    return res.status(500).json({ error: "Unable to load officer KPIs" });
  }
};

exports.getOfficerAlerts = async (req, res) => {
  try {
    const sql = `
      SELECT si.id, si.reference_code, si.severity, si.issue_type as title, d.name as location, si.created_at, fac.name as facility, si.service_gap_summary as "serviceGap", si.action_required as "actionRequired", u.email as "reportedBy", si.status, si.affected_cases_count as "activeCases"
      FROM service_issues si
      JOIN healthcare_facilities fac ON si.facility_id = fac.id
      JOIN districts d ON si.district_id = d.id
      JOIN users u ON si.reported_by_user_id = u.id
      ORDER BY si.created_at DESC;
    `;
    const result = await db.query(sql);

    const alerts = result.rows.map(row => {
      let severityColor = 'bg-[#E07A2B] text-white';
      let badgeColor = 'text-[#E07A2B] bg-[#FEF6EE]';
      let iconColor = 'bg-[#FEF6EE] text-[#E07A2B]';
      let icon = 'Pill';

      if (row.severity === 'High Priority') {
        severityColor = 'bg-[#C0392B] text-white';
        badgeColor = 'text-[#C0392B] bg-[#FDF2F0]';
        iconColor = 'bg-[#FBEBEA] text-[#C0392B]';
        icon = 'AlertOctagon';
      } else if (row.severity === 'Low Priority') {
        severityColor = 'bg-[#405642] text-white';
        badgeColor = 'text-[#405642] bg-[#EFF4EF]';
        iconColor = 'bg-[#EFF4EF] text-[#405642]';
        icon = 'UserCheck';
      }

      return {
        id: row.reference_code,
        severity: row.severity,
        severityColor,
        badgeColor,
        iconColor,
        icon,
        title: row.title,
        location: `${row.location} Block, ${row.location}`,
        timeAgo: formatRelativeTime(row.created_at),
        activeCases: row.activeCases,
        facility: row.facility,
        serviceGap: row.serviceGap,
        actionRequired: row.actionRequired,
        reportedBy: row.reportedBy,
        status: row.status
      };
    });

    return res.json(alerts);
  } catch (error) {
    console.error("Error loading service alerts:", error);
    return res.status(500).json({ error: "Unable to load recent service issues" });
  }
};

exports.getOfficerTrends = async (req, res) => {
  // Returns historical weekly trend analysis for UI charts
  const trends = [
    { week: 'Wk 1', CitizenRequests: 140, ConsultationsCompleted: 118, Referrals: 22, FollowUpsCompleted: 34 },
    { week: 'Wk 2', CitizenRequests: 165, ConsultationsCompleted: 132, Referrals: 28, FollowUpsCompleted: 40 },
    { week: 'Wk 3', CitizenRequests: 180, ConsultationsCompleted: 148, Referrals: 31, FollowUpsCompleted: 45 },
    { week: 'Wk 4', CitizenRequests: 205, ConsultationsCompleted: 164, Referrals: 29, FollowUpsCompleted: 52 },
    { week: 'Wk 5', CitizenRequests: 218, ConsultationsCompleted: 175, Referrals: 34, FollowUpsCompleted: 58 },
    { week: 'Wk 6', CitizenRequests: 235, ConsultationsCompleted: 192, Referrals: 27, FollowUpsCompleted: 64 }
  ];
  return res.json(trends);
};

exports.getOfficerPriorityAreas = async (req, res) => {
  try {
    const sql = `
      SELECT district_id as id, district_name as name, state, region, total_facilities as "facilities", active_cases as "activeCases", pending_referrals as "pendingReferrals"
      FROM v_district_access_kpis
      ORDER BY active_cases DESC
      LIMIT 5;
    `;
    const result = await db.query(sql);
    
    const staticAshaLeads = [
      { lead: 'Kavita Padvi (Taloda)', gap: 'Referral + specialist access delay', lastSync: '10 mins ago' },
      { lead: 'Sunita Madavi (Etapalli)', gap: 'Essential medicine stockout & terrain transit', lastSync: '25 mins ago' },
      { lead: 'Anjali Vartha (Jawhar)', gap: 'Diagnostic turnaround & lab technician vacancy', lastSync: '1 hr ago' },
      { lead: 'Sharda Gavit (Akkalkuwa)', gap: 'Emergency ambulance dispatch & tele-consults', lastSync: '30 mins ago' }
    ];

    const areas = result.rows.map((row, idx) => {
      const staticLead = staticAshaLeads[idx % staticAshaLeads.length];
      const priorityLevel = row.activeCases > 20 ? 'Priority Gap' : 'Limited Access';
      
      return {
        id: `area-${idx + 1}`,
        name: `${row.name} Rural`,
        district: row.name,
        priorityLevel,
        badgeClass: priorityLevel === 'Priority Gap' ? 'bg-[#FCE8E6] text-[#C0392B] border border-[#F5C2BC]' : 'bg-[#FDF0E7] text-[#D45E28] border border-[#FAD3BD]',
        cases: row.activeCases,
        facilities: row.facilities,
        pendingReferrals: row.pendingReferrals,
        weeklyChange: idx % 2 === 0 ? '+14%' : '+9%',
        population: idx % 2 === 0 ? '68,400' : '92,100',
        primaryGap: staticLead.gap,
        ashaLead: staticLead.lead,
        lastSync: staticLead.lastSync
      };
    });

    return res.json(areas);
  } catch (error) {
    console.error("Error loading priority areas:", error);
    return res.status(500).json({ error: "Unable to load priority areas list" });
  }
};

exports.getOfficerNoCasesFacilities = async (req, res) => {
  try {
    const sql = `
      SELECT id, facility_name, district_name, facility_type, operational_status, last_sync_at, active_cases_count, reporting_status, health_status_category, notes
      FROM v_facility_reporting_status
      WHERE active_cases_count = 0;
    `;
    const result = await db.query(sql);
    const facilities = result.rows.map(row => ({
      id: row.id,
      facilityName: row.facility_name,
      district: row.district_name,
      type: row.facility_type,
      status: row.operational_status,
      lastReported: formatRelativeTime(row.last_sync_at),
      citizenReports: 0,
      followUpsDue: 0,
      reportingStatus: row.reporting_status,
      healthStatus: row.health_status_category,
      notes: row.notes || 'Regular preventative operations.'
    }));
    return res.json(facilities);
  } catch (error) {
    console.error("Error loading inactive facilities:", error);
    return res.status(500).json({ error: "Unable to load zero-case facilities" });
  }
};

exports.getOfficerAiInsight = async (req, res) => {
  const insight = {
    title: 'AI Healthcare Access Insight',
    summary: 'Priority access gap detected in Nandurbar based on citizen requests, facility capacity, referral backlog and follow-up delays.',
    confidenceScore: 92,
    modelName: 'ArogyaSathi Care Continuity Engine v2.4 (Demo)',
    factors: [
      { label: 'Access Gap Score', value: '78/100 (Severe triage & referral bottleneck)', impact: 'High' },
      { label: 'Demand Velocity', value: '+18% increase in rural consultation requests in 7 days', impact: 'High' },
      { label: 'Facility Capacity', value: '2 of 8 PHCs operating with single nurse on duty', impact: 'Severe' },
      { label: 'Referral Delay', value: 'Average specialist appointment transfer lag is 4.2 days', impact: 'High' },
      { label: 'Follow-up Adherence', value: '62% completed (Target: > 85%)', impact: 'Medium' }
    ],
    recommendedActions: [
      'Deploy Mobile Tele-Health Unit to Akkalkuwa and Taloda blocks',
      'Pre-position essential antibiotics and ORS buffer at 8 primary sub-centres',
      'Expedite 11 pending tertiary referrals to Dhule Government Medical College',
      'Notify District Health Officer & State NHM Access Coordinator'
    ]
  };
  return res.json(insight);
};

exports.getOfficerMapDistricts = async (req, res) => {
  try {
    const sql = `
      SELECT district_id as id, district_name as name, region, total_facilities as "facilities", active_cases as "activeCases", pending_referrals as "pendingReferrals", followups_due as "followUpsDue"
      FROM v_district_access_kpis;
    `;
    const result = await db.query(sql);
    
    // We map our database access details to the existing static district SVG paths
    const mapPaths = {
      'nandurbar': { path: 'M 180,45 L 260,35 L 240,90 L 160,85 Z', labelPos: { x: 210, y: 65 } },
      'dhule': { path: 'M 160,85 L 240,90 L 270,165 L 190,155 Z', labelPos: { x: 215, y: 125 } },
      'jalgaon': { path: 'M 240,90 L 375,90 L 360,175 L 270,165 Z', labelPos: { x: 305, y: 130 } },
      'buldhana': { path: 'M 375,90 L 455,130 L 420,210 L 360,175 Z', labelPos: { x: 405, y: 150 } },
      'amravati': { path: 'M 455,130 L 565,95 L 530,195 L 420,210 Z', labelPos: { x: 490, y: 150 } },
      'nagpur': { path: 'M 565,95 L 675,105 L 630,205 L 530,195 Z', labelPos: { x: 600, y: 150 } },
      'wardha': { path: 'M 530,195 L 630,205 L 600,270 L 510,250 Z', labelPos: { x: 565, y: 230 } },
      'chandrapur': { path: 'M 600,270 L 700,225 L 670,350 L 570,320 Z', labelPos: { x: 635, y: 285 } },
      'gadchiroli': { path: 'M 670,350 L 770,320 L 730,500 L 640,430 Z', labelPos: { x: 705, y: 410 } },
      'nashik': { path: 'M 130,165 L 190,155 L 260,250 L 175,280 L 130,225 Z', labelPos: { x: 195, y: 215 } },
      'palghar': { path: 'M 90,215 L 130,225 L 140,295 L 85,290 Z', labelPos: { x: 110, y: 255 } },
      'aurangabad': { path: 'M 270,165 L 360,175 L 390,270 L 260,250 Z', labelPos: { x: 320, y: 215 } },
      'ahmednagar': { path: 'M 175,280 L 260,250 L 360,335 L 245,395 L 175,340 Z', labelPos: { x: 255, y: 320 } },
      'pune': { path: 'M 115,315 L 175,340 L 245,395 L 210,480 L 130,440 Z', labelPos: { x: 175, y: 405 } },
      'beed': { path: 'M 360,335 L 430,270 L 490,360 L 390,405 Z', labelPos: { x: 420, y: 345 } },
      'latur': { path: 'M 390,405 L 490,360 L 515,480 L 435,490 Z', labelPos: { x: 460, y: 435 } },
      'osmanabad': { path: 'M 360,450 L 435,490 L 415,570 L 335,530 Z', labelPos: { x: 380, y: 510 } },
      'solapur': { path: 'M 245,395 L 360,450 L 335,530 L 260,515 Z', labelPos: { x: 295, y: 470 } },
      'satara': { path: 'M 130,440 L 210,480 L 200,560 L 135,530 Z', labelPos: { x: 170, y: 500 } },
      'ratnagiri': { path: 'M 85,420 L 130,440 L 135,560 L 95,550 Z', labelPos: { x: 110, y: 490 } },
      'kolhapur': { path: 'M 135,560 L 200,560 L 190,640 L 135,630 Z', labelPos: { x: 165, y: 600 } },
      'sindhudurg': { path: 'M 95,550 L 135,560 L 140,680 L 105,670 Z', labelPos: { x: 120, y: 615 } }
    };

    const mapDistricts = result.rows.map(row => {
      const pathMeta = mapPaths[row.id] || { path: 'M 0,0 Z', labelPos: { x: 0, y: 0 } };
      let accessLevel = 'Good Access';
      let fillColor = '#5C8A5E';
      let strokeColor = '#456B47';

      if (row.activeCases > 20) {
        accessLevel = 'Priority Gap';
        fillColor = '#C0392B';
        strokeColor = '#9B261A';
      } else if (row.activeCases > 15) {
        accessLevel = 'Limited Access';
        fillColor = '#E26D38';
        strokeColor = '#C85624';
      } else if (row.activeCases > 10) {
        accessLevel = 'Moderate Access';
        fillColor = '#E8B958';
        strokeColor = '#D3A23A';
      }

      return {
        id: row.id,
        name: row.name.replace(' District', ''),
        region: row.region,
        accessLevel,
        fillColor,
        strokeColor,
        facilities: parseInt(row.facilities),
        activeCases: parseInt(row.activeCases),
        pendingReferrals: parseInt(row.pendingReferrals),
        followUpsDue: parseInt(row.followUpsDue),
        weeklyChange: '+4%',
        lastUpdated: '10 mins ago',
        path: pathMeta.path,
        labelPos: pathMeta.labelPos
      };
    });

    return res.json(mapDistricts);
  } catch (error) {
    console.error("Error loading map districts:", error);
    return res.status(500).json({ error: "Unable to load map details" });
  }
};

exports.getOfficerProfile = async (req, res) => {
  try {
    const id = req.query.id || '33333333-3333-3333-3333-000000000001'; // Dr. Rajesh Shinde
    const sql = `
      SELECT ho.id, ho.full_name as name, ho.designation as role, COALESCE(d.name, 'Maharashtra State Public Health Directorate') as district
      FROM health_officers ho
      LEFT JOIN districts d ON ho.district_id = d.id
      WHERE ho.id = $1;
    `;
    const result = await db.query(sql, [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Officer profile not found" });
    }
    const row = result.rows[0];
    const profile = {
      name: row.name,
      role: row.role,
      district: row.district,
      avatar: '/assets/reference/swasthyasetu_extracted_assets/07-health-officer.png',
      unreadCount: 3,
      notifications: [
        { id: 1, title: 'High Priority Alert: Doctor Vacancy in Akkalkuwa PHC (Nandurbar)', time: '14m ago', unread: true, category: 'Service Alert' },
        { id: 2, title: 'Emergency Medicine Buffer Dispatched to Etapalli (Gadchiroli)', time: '1h ago', unread: true, category: 'Supply Chain' },
        { id: 3, title: 'Weekly Referral Loop Closure Report: 86% across 22 Districts', time: '3h ago', unread: true, category: 'Continuity Report' }
      ]
    };
    return res.json(profile);
  } catch (error) {
    console.error("Error loading officer profile:", error);
    return res.status(500).json({ error: "Unable to load officer details" });
  }
};

// ============================================================================
// HOME / LANDING ENDPOINT
// ============================================================================

exports.getHomeStats = async (req, res) => {
  try {
    const facCountSql = `SELECT COUNT(*) as count FROM healthcare_facilities;`;
    const facRes = await db.query(facCountSql);

    const citCountSql = `SELECT COUNT(*) as count FROM citizens;`;
    const citRes = await db.query(citCountSql);

    // Calculate referral follow-up rate dynamically:
    // Mapped as completed followups / total followups
    const fupRateSql = `
      SELECT 
        COUNT(*) FILTER (WHERE status = 'Completed') as completed,
        COUNT(*) as total
      FROM followups;
    `;
    const fupRes = await db.query(fupRateSql);
    let referralRate = 86; // Fallback default
    if (fupRes.rows[0].total > 0) {
      referralRate = Math.round((fupRes.rows[0].completed / fupRes.rows[0].total) * 100);
    }

    return res.json({
      facilitiesCount: parseInt(facRes.rows[0].count) || 120,
      citizensCount: parseInt(citRes.rows[0].count) || 1200,
      referralFollowUpRate: `${referralRate}%`
    });
  } catch (error) {
    console.error("Error loading homepage stats:", error);
    return res.status(500).json({ error: "Unable to load platform statistics" });
  }
};
