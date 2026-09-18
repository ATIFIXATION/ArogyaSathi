// Centralized structured data for ArogyaSathi Citizen Portal
// Aligned with SIH 2026 Problem Statement SIH26133: Healthcare Access & Care Continuity

export const CITIZEN_PROFILE = {
  name: 'Suman Valvi',
  age: 28,
  gender: 'Female',
  village: 'Akkalkuwa',
  block: 'Akkalkuwa Block',
  district: 'Dhule / Nandurbar District, Maharashtra',
  phone: '+91 98221 44521',
  abhaId: '91-4829-1029-4412',
  avatar: '/assets/citizen-avatar.png',
  avatarInitials: 'SV',
  assignedAsha: {
    name: 'Ayesha Begum',
    phone: '+91 94230 45678',
    community: 'Akkalkuwa Community',
    availability: 'Available Today (08:00 AM – 06:00 PM)'
  }
};

export const CITIZEN_NOTIFICATIONS = [
  {
    id: 1,
    title: 'Consultation Confirmed: Dr. Sneha Patil (General Medicine)',
    subtitle: 'Tomorrow at 11:30 AM • Dhule District Hospital',
    time: '2 hours ago',
    unread: true,
    type: 'consultation'
  },
  {
    id: 2,
    title: 'Specialist Referral Authorized: Taloda CHC (OB-GYN)',
    subtitle: 'Referral ID: REF-801 • Transport coordinated with ASHA',
    time: '5 hours ago',
    unread: true,
    type: 'referral'
  },
  {
    id: 3,
    title: 'Diagnostic Result Ready: Complete Blood Count (CBC)',
    subtitle: 'Normal hemoglobin levels (11.8 g/dL). View lab report.',
    time: '1 day ago',
    unread: false,
    type: 'diagnostics'
  }
];

export const CARE_JOURNEY_STAGES = [
  { step: '01', label: 'Access Care', status: 'completed', desc: 'Health inquiry submitted' },
  { step: '02', label: 'Triage', status: 'completed', desc: 'Frontline ASHA verification' },
  { step: '03', label: 'Consultation', status: 'current', desc: 'Doctor appointment confirmed', isCurrent: true },
  { step: '04', label: 'Diagnostics', status: 'upcoming', desc: 'Lab tests & vitals panel' },
  { step: '05', label: 'Medicine', status: 'upcoming', desc: 'Prescription dispensation' },
  { step: '06', label: 'Referral', status: 'upcoming', desc: 'Specialist care transfer' },
  { step: '07', label: 'Follow-up', status: 'upcoming', desc: 'Recovery & adherence check' }
];

export const PRIMARY_ACTIONS = [
  {
    id: 'report-concern',
    title: 'Report a Health Concern',
    description: 'Share your symptoms for doorstep triage, guidance, and consultation support.',
    icon: 'HeartPulse',
    actionText: 'Report Concern →',
    accentColor: '#B94A25',
    bgClass: 'bg-[#FAF7F2] hover:bg-[#FDF3EE] border-[#DCCDBB] hover:border-[#B94A25]'
  },
  {
    id: 'find-facility',
    title: 'Find a Healthcare Facility',
    description: 'Locate nearby Sub-Centres, PHCs, CHCs, and District Hospitals across Maharashtra.',
    icon: 'Building2',
    actionText: 'Browse Facilities →',
    accentColor: '#405642',
    bgClass: 'bg-[#FAF7F2] hover:bg-[#F2F7F2] border-[#DCCDBB] hover:border-[#405642]'
  },
  {
    id: 'request-consultation',
    title: 'Request Consultation',
    description: 'Book an in-person or teleconsultation with a qualified medical officer.',
    icon: 'Stethoscope',
    actionText: 'Book Appointment →',
    accentColor: '#3D6B8C',
    bgClass: 'bg-[#FAF7F2] hover:bg-[#F0F6FA] border-[#DCCDBB] hover:border-[#3D6B8C]'
  },
  {
    id: 'track-referral',
    title: 'Track Referral & Follow-up',
    description: 'Check appointment confirmation, doctor referral slips, and follow-up schedules.',
    icon: 'RotateCw',
    actionText: 'View Care Status →',
    accentColor: '#D98A2C',
    bgClass: 'bg-[#FAF7F2] hover:bg-[#FEF8EC] border-[#DCCDBB] hover:border-[#D98A2C]'
  }
];

export const ACTIVE_CARE_DATA = {
  activeConsultation: {
    id: 'CON-9402',
    doctor: 'Dr. Sneha Patil',
    department: 'General Medicine & Maternal Care',
    facility: 'Dhule District Hospital',
    facilityAddress: 'Civil Lines, Dhule, Maharashtra',
    datetime: 'Tomorrow • 11:30 AM',
    dateShort: 'Tomorrow',
    timeShort: '11:30 AM',
    status: 'Confirmed',
    type: 'In-Person Consultation',
    reason: 'Second trimester maternal checkup & routine hemoglobin screening'
  },
  activeReferral: {
    id: 'REF-801',
    type: 'Specialist OB-GYN Consultation',
    originFacility: 'Akkalkuwa Primary Health Centre',
    destinationFacility: 'Nandurbar Civil Hospital',
    status: 'Appointment Confirmed',
    referralDate: '24 August 2026',
    appointmentDate: '12 September 2026',
    reason: 'Advanced maternal fetal ultrasound & specialist review',
    notes: 'Transport coordination supported by ASHA worker Ayesha Begum.'
  },
  activeFollowup: {
    id: 'FUP-402',
    type: 'Medicine Adherence & Recovery Check',
    dueDate: '1 September 2026',
    dueInDays: '3 days',
    assignedAsha: 'Ayesha Begum',
    status: 'Scheduled',
    notes: 'Doorstep vitals check, blood pressure check, and IFA tablet refill check.'
  }
};

export const MEDICINES_DATA = [
  {
    id: 'MED-1',
    name: 'Iron & Folic Acid Tablets (IFA)',
    dosage: '1 Tablet Daily',
    timing: 'Night after meals',
    prescribedFor: 'Maternal health & anemia prevention',
    remainingDays: '26 days left',
    status: 'Active Dispensed',
    pharmacy: 'Akkalkuwa PHC Pharmacy'
  },
  {
    id: 'MED-2',
    name: 'Calcium & Vitamin D3 Tablets',
    dosage: '1 Tablet Daily',
    timing: 'Morning after breakfast',
    prescribedFor: 'Bone health & prenatal nourishment',
    remainingDays: '26 days left',
    status: 'Active Dispensed',
    pharmacy: 'Akkalkuwa PHC Pharmacy'
  },
  {
    id: 'MED-3',
    name: 'Oral Rehydration Salts (ORS) & Zinc',
    dosage: '1 Sachet in 1 Litre boiled water',
    timing: 'As needed for hydration',
    prescribedFor: 'Household emergency hydration',
    remainingDays: '2 packets in home kit',
    status: 'Home First-Aid Kit',
    pharmacy: 'Distributed by ASHA Worker'
  }
];

export const DIAGNOSTICS_DATA = [
  {
    id: 'DIAG-101',
    testName: 'Complete Blood Count (CBC) & Hemoglobin',
    date: '20 August 2026',
    facility: 'Akkalkuwa PHC Diagnostic Unit',
    status: 'Result Available',
    resultSummary: 'Hemoglobin 11.8 g/dL (Normal). Platelets & WBC within normal range.',
    doctorReviewed: true,
    pdfAvailable: true
  },
  {
    id: 'DIAG-102',
    testName: 'Fasting Blood Glucose (Sugar Panel)',
    date: '20 August 2026',
    facility: 'Akkalkuwa PHC Diagnostic Unit',
    status: 'Result Available',
    resultSummary: 'Fasting Glucose 92 mg/dL (Normal).',
    doctorReviewed: true,
    pdfAvailable: true
  },
  {
    id: 'DIAG-103',
    testName: 'Prenatal Routine Ultrasonography (USG)',
    date: 'Scheduled for 12 September 2026',
    facility: 'Nandurbar Civil Hospital (Radiology Dept.)',
    status: 'Referral Booked',
    resultSummary: 'Pending scan appointment at district hospital.',
    doctorReviewed: false,
    pdfAvailable: false
  }
];

export const NEARBY_FACILITIES = [
  {
    id: 'fac-1',
    name: 'Primary Health Centre — Akkalkuwa',
    type: 'Primary Health Centre (PHC)',
    distance: '1.2 km away',
    travelTime: '8 mins by auto / bike',
    address: 'Main Road, Akkalkuwa, Nandurbar District, Maharashtra',
    phone: '+91 2567 222100',
    services: ['General Consultation', 'Maternal & Child Care', 'Essential Diagnostics', 'Free Medicines', '24/7 Delivery Ward'],
    doctorAvailable: 'Dr. K. Patil (Medical Officer)',
    timing: 'Open 24/7 (OPD: 09:00 AM – 04:00 PM)',
    status: 'Operational',
    badgeClass: 'bg-[#5C8A5E] text-white'
  },
  {
    id: 'fac-2',
    name: 'Taloda Community Health Centre (CHC)',
    type: 'Community Health Centre (CHC)',
    distance: '14.5 km away',
    travelTime: '25 mins by state transport',
    address: 'Station Road, Taloda, Nandurbar District, Maharashtra',
    phone: '+91 2567 232210',
    services: ['Specialist OB-GYN', 'Pediatric Unit', 'Blood Storage', 'Radiology / USG', 'Emergency Trauma'],
    doctorAvailable: 'Dr. V. Deshmukh & Specialist Team',
    timing: 'Open 24/7',
    status: 'Operational',
    badgeClass: 'bg-[#5C8A5E] text-white'
  },
  {
    id: 'fac-3',
    name: 'Dhule District Civil Hospital',
    type: 'District Hospital (Tertiary Referral)',
    distance: '38 km away',
    travelTime: '55 mins via Highway 753J',
    address: 'Civil Lines, Sakri Road, Dhule, Maharashtra',
    phone: '+91 2562 288400',
    services: ['Multi-Specialty OPD', 'Surgical Ward', 'Advanced Pathology', 'Dialysis Unit', 'ICU / NICU'],
    doctorAvailable: 'Full Clinical Specialist Faculty',
    timing: 'Open 24/7',
    status: 'Referral Center',
    badgeClass: 'bg-[#3D6B8C] text-white'
  },
  {
    id: 'fac-4',
    name: 'Dhadgaon Health Sub-Centre Cluster',
    type: 'Health & Wellness Sub-Centre',
    distance: '18 km away',
    travelTime: '35 mins by road',
    address: 'Dhadgaon Tribal Block, Maharashtra',
    phone: '+91 2567 244105',
    services: ['Routine Immunization', 'Antenatal Screening', 'First-Aid & ORS', 'Tele-Triage Node'],
    doctorAvailable: 'Community Health Officer (CHO) & ASHA Team',
    timing: '08:30 AM – 04:30 PM',
    status: 'Operational',
    badgeClass: 'bg-[#5C8A5E] text-white'
  }
];

export const COMMUNITY_HEALTH_TOPICS = [
  {
    id: 'topic-1',
    title: 'Maternal & Prenatal Nutrition',
    summary: 'Guidelines on daily iron-rich foods, folic acid, clean water, and regular antenatal checkups.',
    category: 'Maternal Health',
    readTime: '3 min read',
    icon: 'Apple'
  },
  {
    id: 'topic-2',
    title: 'Childhood Immunization Schedule',
    summary: 'Essential vaccine timelines from birth to 5 years, protected free of cost at all Sub-Centres.',
    category: 'Child Care',
    readTime: '4 min read',
    icon: 'ShieldCheck'
  },
  {
    id: 'topic-3',
    title: 'Monsoon Clean Water & ORS Guide',
    summary: 'How to boil drinking water and prepare homemade oral rehydration salts for dehydration.',
    category: 'Preventive Care',
    readTime: '2 min read',
    icon: 'Droplet'
  },
  {
    id: 'topic-4',
    title: 'Managing Seasonal Fevers & Cough',
    summary: 'When to manage symptoms at home and warning signs that require immediate PHC consultation.',
    category: 'Seasonal Care',
    readTime: '3 min read',
    icon: 'Thermometer'
  }
];

export const EMERGENCY_NUMBERS = {
  ambulance: '108',
  healthHelp: '104',
  localPhcDesk: '+91 2567 222100',
  description: 'For medical emergencies, call 108 for a free government ambulance or 104 for round-the-clock medical advice.'
};
