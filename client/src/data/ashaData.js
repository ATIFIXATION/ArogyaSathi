// Centralized structured data for ArogyaSathi ASHA Worker Dashboard
// Aligned with SIH 2026 Problem Statement SIH26133: Maharashtra Frontline Healthcare Access & Care Coordination

export const ASHA_PROFILE = {
  name: 'Ayesha Begum',
  role: 'Frontline ASHA Worker',
  block: 'Akkalkuwa Block',
  district: 'Dhule District, Maharashtra',
  locationBreadcrumb: 'Dhule District, Maharashtra • Akkalkuwa Block',
  avatar: '/assets/asha-worker.png',
  phone: '+91 94230 45678',
  assignedCommunitiesCount: 6,
  totalHouseholdsCovered: 1123,
  notificationsCount: 3,
  notifications: [
    {
      id: 1,
      title: 'New Citizen Request: SS-00184 (Fever / weakness in Akkalkuwa)',
      time: '15m ago',
      unread: true,
      category: 'Care Request'
    },
    {
      id: 2,
      title: 'Specialist Referral Confirmed: Pooja Pawara at Taloda CHC',
      time: '1h ago',
      unread: true,
      category: 'Referral'
    },
    {
      id: 3,
      title: 'Follow-up Due: 3 Post-natal recovery visits in Dhadgaon',
      time: '3h ago',
      unread: false,
      category: 'Follow-up'
    }
  ]
};

export const ASHA_KPI_DATA = [
  {
    id: 'visits-today',
    value: '12',
    title: 'Visits Today',
    subtext: '3 Completed • 9 Pending',
    statusType: 'neutral',
    icon: 'Home',
    iconBg: 'bg-[#EAF0E6] text-[#405642]'
  },
  {
    id: 'care-requests',
    value: '7',
    title: 'Citizen Care Requests',
    subtext: 'Needs Verification',
    statusType: 'action',
    icon: 'FileText',
    iconBg: 'bg-[#FBF0EB] text-[#B94A25]'
  },
  {
    id: 'pending-referrals',
    value: '4',
    title: 'Pending Referrals',
    subtext: 'Needs Follow-up',
    statusType: 'warning',
    icon: 'RotateCw',
    iconBg: 'bg-[#EBF2F7] text-[#3D6B8C]'
  },
  {
    id: 'followups-due',
    value: '6',
    title: 'Follow-ups Due',
    subtext: 'Priority Actions',
    statusType: 'alert',
    icon: 'Clock',
    iconBg: 'bg-[#FDF0E7] text-[#D45E28]'
  }
];

export const CITIZEN_CARE_REQUESTS = [
  {
    id: 'SS-00184',
    patientName: 'Rashida Tadvi',
    age: 28,
    gender: 'Female',
    symptoms: 'Fever / weakness',
    symptomTags: ['Fever', 'Body Weakness', 'Loss of Appetite'],
    community: 'Akkalkuwa',
    timeAgo: '2 hrs ago',
    avatarInitials: 'RT',
    avatarBg: 'bg-[#FDF0E7] text-[#B94A25]',
    phone: '+91 98221 44521',
    address: 'Near Gram Panchayat, House #42, Akkalkuwa',
    notes: 'Citizen noted high temperature since yesterday evening. Requesting ASHA doorstep check.',
    verified: false,
    severity: 'Moderate',
    triageCategory: 'Primary Care Consultation'
  },
  {
    id: 'SS-00185',
    patientName: 'Ramesh Valvi',
    age: 45,
    gender: 'Male',
    symptoms: 'Respiratory symptoms',
    symptomTags: ['Persistent Cough', 'Shortness of Breath'],
    community: 'Nandurbar Rural',
    timeAgo: '5 hrs ago',
    avatarInitials: 'RV',
    avatarBg: 'bg-[#EBF2F7] text-[#3D6B8C]',
    phone: '+91 97632 11489',
    address: 'Wadi Pada, Nandurbar Rural Sector 2',
    notes: 'Difficulty breathing during night. Needs basic pulse oximetry and PHC doctor referral.',
    verified: false,
    severity: 'High',
    triageCategory: 'Urgent PHC Referral'
  },
  {
    id: 'SS-00186',
    patientName: 'Pooja Pawara',
    age: 22,
    gender: 'Female',
    symptoms: 'Maternal health consultation',
    symptomTags: ['Antenatal Check', 'Mild Dizziness'],
    community: 'Akkalkuwa',
    timeAgo: '1 day ago',
    avatarInitials: 'PP',
    avatarBg: 'bg-[#EAF0E6] text-[#405642]',
    phone: '+91 94220 88712',
    address: 'Akkalkuwa East, House #118',
    notes: 'Second trimester routine checkup guidance and iron-folic acid refill requested.',
    verified: false,
    severity: 'Routine',
    triageCategory: 'Maternal Care'
  },
  {
    id: 'SS-00187',
    patientName: 'Master Aarav Gavit',
    age: 3,
    gender: 'Male',
    symptoms: 'Child health concern',
    symptomTags: ['Vomiting', 'Mild Dehydration', 'Diarrhoea'],
    community: 'Dhadgaon',
    timeAgo: '1 day ago',
    avatarInitials: 'AG',
    avatarBg: 'bg-[#F0EEFB] text-[#4F46E5]',
    phone: '+91 98501 33290',
    address: 'Dhadgaon Tribal Hamlet #3',
    notes: 'Pediatric dehydration symptoms noted. Immediate ORS zinc distribution needed.',
    verified: false,
    severity: 'High',
    triageCategory: 'Pediatric Care'
  }
];

export const ASSIGNED_COMMUNITIES = [
  {
    id: 'comm-1',
    name: 'Akkalkuwa',
    households: 236,
    visitsCompleted: 182,
    followUpsDue: 17,
    pendingReferrals: 8,
    status: 'In Progress',
    coveragePct: '77%',
    coordinates: { x: 38, y: 32 }
  },
  {
    id: 'comm-2',
    name: 'Dhadgaon',
    households: 189,
    visitsCompleted: 142,
    followUpsDue: 12,
    pendingReferrals: 5,
    status: 'Pending',
    coveragePct: '75%',
    coordinates: { x: 52, y: 25 }
  },
  {
    id: 'comm-3',
    name: 'Nandurbar Rural',
    households: 201,
    visitsCompleted: 160,
    followUpsDue: 14,
    pendingReferrals: 6,
    status: 'In Progress',
    coveragePct: '80%',
    coordinates: { x: 62, y: 48 }
  },
  {
    id: 'comm-4',
    name: 'Taloda',
    households: 154,
    visitsCompleted: 118,
    followUpsDue: 9,
    pendingReferrals: 4,
    status: 'Completed',
    coveragePct: '88%',
    coordinates: { x: 45, y: 55 }
  },
  {
    id: 'comm-5',
    name: 'Shahada',
    households: 178,
    visitsCompleted: 135,
    followUpsDue: 11,
    pendingReferrals: 5,
    status: 'Completed',
    coveragePct: '84%',
    coordinates: { x: 74, y: 62 }
  },
  {
    id: 'comm-6',
    name: 'Gadchiroli Rural',
    households: 165,
    visitsCompleted: 120,
    followUpsDue: 15,
    pendingReferrals: 7,
    status: 'Priority Focus',
    coveragePct: '73%',
    coordinates: { x: 82, y: 78 }
  }
];

export const PRIORITY_CARE_TASKS = [
  {
    id: 'task-1',
    severity: 'High Priority',
    badgeClass: 'bg-[#C0392B] text-white',
    title: 'Specialist referral pending',
    description: 'Citizen requires specialist consultation (Obstetrics/Gynecology at Taloda CHC).',
    location: 'Akkalkuwa',
    actionLabel: 'Start Follow-up',
    timeAgo: '2 hrs ago',
    patientName: 'Pooja Pawara',
    facilityTarget: 'Taloda Community Health Centre',
    referralType: 'Specialist OB-GYN'
  },
  {
    id: 'task-2',
    severity: 'Medium Priority',
    badgeClass: 'bg-[#E07A2B] text-white',
    title: 'Diagnostic service unavailable',
    description: 'Assigned primary health sub-centre currently unavailable for required CBC test; sample routing required.',
    location: 'Nandurbar Rural',
    actionLabel: 'Find Alternative',
    timeAgo: '5 hrs ago',
    patientName: 'Ramesh Valvi',
    facilityTarget: 'Nandurbar Civil Hospital Lab',
    referralType: 'Diagnostic Routing'
  },
  {
    id: 'task-3',
    severity: 'Medium Priority',
    badgeClass: 'bg-[#E07A2B] text-white',
    title: 'Follow-up overdue',
    description: 'Citizen has not completed scheduled 7-day post-consultation recovery follow-up.',
    location: 'Dhadgaon',
    actionLabel: 'Contact Citizen',
    timeAgo: '1 day ago',
    patientName: 'Kishore Gavit',
    facilityTarget: 'Dhadgaon Sub-Centre',
    referralType: 'Adherence Check'
  }
];

export const TODAY_FIELD_PLAN = [
  {
    id: 'fp-1',
    time: '09:30 AM',
    title: 'Household Visit',
    location: 'Akkalkuwa Community',
    status: 'In Progress',
    statusClass: 'bg-[#E8F3E9] text-[#405642] border border-[#C5DEC8]',
    dotColor: '#405642',
    type: 'visit'
  },
  {
    id: 'fp-2',
    time: '11:00 AM',
    title: 'Verify Citizen Care Request',
    location: 'SS-00184 (Rashida Tadvi)',
    status: 'Pending',
    statusClass: 'bg-[#FEF6EE] text-[#B94A25] border border-[#FAD3BD]',
    dotColor: '#B94A25',
    type: 'verify'
  },
  {
    id: 'fp-3',
    time: '02:00 PM',
    title: 'Referral Follow-up',
    location: 'Nandurbar Rural',
    status: 'Pending',
    statusClass: 'bg-[#FEF8EC] text-[#B87A1E] border border-[#F9E5BE]',
    dotColor: '#E8B958',
    type: 'followup'
  },
  {
    id: 'fp-4',
    time: '04:00 PM',
    title: 'Health Education Session',
    location: 'Community Centre',
    status: 'Upcoming',
    statusClass: 'bg-[#F0EEFB] text-[#4F46E5] border border-[#D5CEF5]',
    dotColor: '#4F46E5',
    type: 'education'
  }
];

export const REFERRALS_LIST = [
  {
    id: 'REF-801',
    patientName: 'Pooja Pawara',
    age: 22,
    community: 'Akkalkuwa',
    service: 'Specialist OB-GYN Consultation',
    referralFrom: 'Akkalkuwa Sub-Centre',
    referralTo: 'Taloda Community Health Centre',
    status: 'Pending Transfer',
    statusColor: 'bg-[#FEF6EE] text-[#B94A25] border border-[#FAD3BD]',
    date: 'Today',
    actionRequired: 'Verify patient transport & appointment slip'
  },
  {
    id: 'REF-798',
    patientName: 'Suresh Patil',
    age: 52,
    community: 'Nandurbar Rural',
    service: 'Complete Blood Count & Malaria Panel',
    referralFrom: 'Nandurbar Sub-Centre #2',
    referralTo: 'Nandurbar District Civil Hospital',
    status: 'Completed',
    statusColor: 'bg-[#E8F3E9] text-[#405642] border border-[#C5DEC8]',
    date: 'Yesterday',
    actionRequired: 'Review digital diagnostic report with MO'
  },
  {
    id: 'FUP-402',
    patientName: 'Anita Tadvi',
    age: 31,
    community: 'Akkalkuwa',
    service: 'Post-consultation medicine adherence check',
    referralFrom: 'Taloda CHC',
    referralTo: 'Home Visit',
    status: 'Due Today',
    statusColor: 'bg-[#FEF8EC] text-[#B87A1E] border border-[#F9E5BE]',
    date: 'Due Today',
    actionRequired: 'Check antibiotic course completion'
  },
  {
    id: 'FUP-399',
    patientName: 'Kishore Gavit',
    age: 48,
    community: 'Dhadgaon',
    service: 'Post-operative wound dressing follow-up',
    referralFrom: 'Nandurbar DH',
    referralTo: 'Home Visit',
    status: 'Due Tomorrow',
    statusColor: 'bg-[#F0EEFB] text-[#4F46E5] border border-[#D5CEF5]',
    date: 'Tomorrow',
    actionRequired: 'Inspect surgical dressing & vital signs'
  }
];

export const SERVICE_ISSUE_TYPES = [
  'Diagnostic service unavailable',
  'Medicine stock below threshold',
  'Primary care facility operating below capacity',
  'Doctor / nurse absent on duty roster',
  'Emergency ambulance / transport unavailable',
  'Equipment maintenance required'
];

export const MAHARASHTRA_FACILITIES_LIST = [
  'Akkalkuwa Primary Health Centre',
  'Taloda Community Health Centre',
  'Dhadgaon Sub-Centre Cluster',
  'Nandurbar Rural Health Post',
  'Shahada Sub-District Hospital',
  'Gadchiroli Rural Hospital'
];
