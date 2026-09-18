// Centralized structured demo data for ArogyaSathi Health Officer Dashboard
// Aligned with SIH 2026 Problem Statement SIH26133: Maharashtra Public Healthcare Access & Continuity

export let DISTRICT_OPTIONS = [
  { id: 'nandurbar', name: 'Nandurbar District', state: 'Maharashtra', activeCases: 24, facilities: 8, pendingReferrals: 11, followUpsDue: 19, accessLevel: 'Priority Gap', accessColor: '#C0392B' },
  { id: 'gadchiroli', name: 'Gadchiroli District', state: 'Maharashtra', activeCases: 31, facilities: 6, pendingReferrals: 14, followUpsDue: 22, accessLevel: 'Priority Gap', accessColor: '#C0392B' },
  { id: 'palghar', name: 'Palghar District', state: 'Maharashtra', activeCases: 19, facilities: 11, pendingReferrals: 9, followUpsDue: 14, accessLevel: 'Limited Access', accessColor: '#E26D38' },
  { id: 'pune', name: 'Pune District', state: 'Maharashtra', activeCases: 42, facilities: 34, pendingReferrals: 6, followUpsDue: 18, accessLevel: 'Good Access', accessColor: '#5C8A5E' },
  { id: 'nashik', name: 'Nashik District', state: 'Maharashtra', activeCases: 26, facilities: 18, pendingReferrals: 8, followUpsDue: 15, accessLevel: 'Good Access', accessColor: '#5C8A5E' },
  { id: 'thane', name: 'Thane District', state: 'Maharashtra', activeCases: 35, facilities: 28, pendingReferrals: 7, followUpsDue: 12, accessLevel: 'Good Access', accessColor: '#5C8A5E' },
  { id: 'nagpur', name: 'Nagpur District', state: 'Maharashtra', activeCases: 28, facilities: 22, pendingReferrals: 5, followUpsDue: 10, accessLevel: 'Good Access', accessColor: '#5C8A5E' },
  { id: 'dhule', name: 'Dhule District', state: 'Maharashtra', activeCases: 17, facilities: 12, pendingReferrals: 6, followUpsDue: 9, accessLevel: 'Moderate Access', accessColor: '#E8B958' },
  { id: 'jalgaon', name: 'Jalgaon District', state: 'Maharashtra', activeCases: 22, facilities: 16, pendingReferrals: 8, followUpsDue: 13, accessLevel: 'Good Access', accessColor: '#5C8A5E' },
  { id: 'aurangabad', name: 'Chhatrapati Sambhajinagar', state: 'Maharashtra', activeCases: 25, facilities: 19, pendingReferrals: 7, followUpsDue: 11, accessLevel: 'Moderate Access', accessColor: '#E8B958' },
  { id: 'amravati', name: 'Amravati District', state: 'Maharashtra', activeCases: 18, facilities: 14, pendingReferrals: 8, followUpsDue: 12, accessLevel: 'Moderate Access', accessColor: '#E8B958' },
  { id: 'akola', name: 'Akola District', state: 'Maharashtra', activeCases: 14, facilities: 11, pendingReferrals: 5, followUpsDue: 8, accessLevel: 'Moderate Access', accessColor: '#E8B958' },
  { id: 'yavatmal', name: 'Yavatmal District', state: 'Maharashtra', activeCases: 23, facilities: 13, pendingReferrals: 10, followUpsDue: 17, accessLevel: 'Limited Access', accessColor: '#E26D38' },
  { id: 'chandrapur', name: 'Chandrapur District', state: 'Maharashtra', activeCases: 16, facilities: 12, pendingReferrals: 7, followUpsDue: 9, accessLevel: 'Moderate Access', accessColor: '#E8B958' },
  { id: 'gondia', name: 'Gondia District', state: 'Maharashtra', activeCases: 15, facilities: 9, pendingReferrals: 8, followUpsDue: 11, accessLevel: 'Limited Access', accessColor: '#E26D38' },
  { id: 'ratnagiri', name: 'Ratnagiri District', state: 'Maharashtra', activeCases: 12, facilities: 15, pendingReferrals: 4, followUpsDue: 7, accessLevel: 'Moderate Access', accessColor: '#E8B958' },
  { id: 'sindhudurg', name: 'Sindhudurg District', state: 'Maharashtra', activeCases: 8, facilities: 14, pendingReferrals: 3, followUpsDue: 5, accessLevel: 'Good Access', accessColor: '#5C8A5E' },
  { id: 'kolhapur', name: 'Kolhapur District', state: 'Maharashtra', activeCases: 16, facilities: 19, pendingReferrals: 4, followUpsDue: 8, accessLevel: 'Good Access', accessColor: '#5C8A5E' },
  { id: 'satara', name: 'Satara District', state: 'Maharashtra', activeCases: 14, facilities: 17, pendingReferrals: 5, followUpsDue: 6, accessLevel: 'Good Access', accessColor: '#5C8A5E' },
  { id: 'solapur', name: 'Solapur District', state: 'Maharashtra', activeCases: 21, facilities: 16, pendingReferrals: 6, followUpsDue: 10, accessLevel: 'Moderate Access', accessColor: '#E8B958' },
  { id: 'ahmednagar', name: 'Ahilyanagar (Ahmednagar)', state: 'Maharashtra', activeCases: 20, facilities: 18, pendingReferrals: 6, followUpsDue: 9, accessLevel: 'Good Access', accessColor: '#5C8A5E' }
];

export const DATE_RANGE_OPTIONS = [
  '18 May – 24 May 2026',
  '11 May – 17 May 2026',
  '04 May – 10 May 2026',
  '27 Apr – 03 May 2026',
  'Month of May 2026'
];

export let KPI_DATA = [
  {
    id: 'active-alerts',
    title: 'Active Service Alerts',
    value: '12',
    trend: '↑ 20% vs last week',
    trendType: 'warning',
    icon: 'AlertTriangle',
    iconBg: 'bg-[#FBF0EB] text-[#B94A25]',
    borderColor: 'border-[#DCCDBB]'
  },
  {
    id: 'high-priority-areas',
    title: 'High-Priority Areas',
    value: '18',
    trend: '↑ 8% vs last week',
    trendType: 'warning',
    icon: 'ShieldAlert',
    iconBg: 'bg-[#FCE8E6] text-[#C0392B]',
    borderColor: 'border-[#DCCDBB]'
  },
  {
    id: 'total-cases',
    title: 'Citizen Cases',
    value: '235',
    trend: '↑ 15% vs last week',
    trendType: 'warning',
    icon: 'Activity',
    iconBg: 'bg-[#EAF0E6] text-[#405642]',
    borderColor: 'border-[#DCCDBB]'
  },
  {
    id: 'referrals-pending',
    title: 'Referrals Pending',
    value: '27',
    trend: '↓ 6% vs last week',
    trendType: 'positive',
    icon: 'RotateCw',
    iconBg: 'bg-[#EBF2F7] text-[#3D6B8C]',
    borderColor: 'border-[#DCCDBB]'
  }
];

export const SUPPORTING_METRICS = {
  facilitiesWithGaps: 14,
  medicineStockAlerts: 9,
  followUpsDue: 42
};

export let RECENT_ALERTS = [
  {
    id: 'alt-001',
    severity: 'High Priority',
    severityColor: 'bg-[#C0392B] text-white',
    badgeColor: 'text-[#C0392B] bg-[#FDF2F0]',
    iconColor: 'bg-[#FBEBEA] text-[#C0392B]',
    icon: 'AlertOctagon',
    title: 'Primary care facility operating below capacity',
    location: 'Nandurbar Block, Nandurbar',
    timeAgo: '2 hrs ago',
    activeCases: 24,
    facility: 'Akkalkuwa Rural Health Unit',
    serviceGap: 'Doctor vacant on duty roster + ultrasound unit offline',
    actionRequired: 'Mobilize MO from Taloda CHC & arrange tele-triage specialist',
    reportedBy: 'ASHA Block Lead Smt. Kavita Padvi',
    status: 'Intervention Required'
  },
  {
    id: 'alt-002',
    severity: 'Medium Priority',
    severityColor: 'bg-[#E07A2B] text-white',
    badgeColor: 'text-[#E07A2B] bg-[#FEF6EE]',
    iconColor: 'bg-[#FEF6EE] text-[#E07A2B]',
    icon: 'Pill',
    title: 'Essential medicine stock below threshold',
    location: 'Gadchiroli District (Etapalli PHC)',
    timeAgo: '5 hrs ago',
    activeCases: 19,
    facility: 'Etapalli Primary Health Centre',
    serviceGap: 'Oral rehydration salts, anti-venom & iron-folic stock < 15%',
    actionRequired: 'Dispatch emergency medicine buffer from Gadchiroli Civil Hospital',
    reportedBy: 'Pharmacist R. Meshram',
    status: 'Dispatch In Progress'
  },
  {
    id: 'alt-003',
    severity: 'Medium Priority',
    severityColor: 'bg-[#E07A2B] text-white',
    badgeColor: 'text-[#E07A2B] bg-[#FEF6EE]',
    iconColor: 'bg-[#FEF6EE] text-[#D98A2C]',
    icon: 'Activity',
    title: 'Diagnostic service unavailable at rural facility',
    location: 'Palghar District (Mokhada Block)',
    timeAgo: '1 day ago',
    activeCases: 14,
    facility: 'Mokhada Community Health Centre',
    serviceGap: 'Hematology analyzer reagent expired; Hb & malaria tests paused',
    actionRequired: 'Route specimen samples to Jawhar Sub-District Lab',
    reportedBy: 'Lab Technician V. Patil',
    status: 'Sample Rerouted'
  },
  {
    id: 'alt-004',
    severity: 'Low Priority',
    severityColor: 'bg-[#405642] text-white',
    badgeColor: 'text-[#405642] bg-[#EFF4EF]',
    iconColor: 'bg-[#EFF4EF] text-[#405642]',
    icon: 'UserCheck',
    title: 'Follow-up backlog above expected level',
    location: 'Yavatmal District (Ralegaon Block)',
    timeAgo: '1 day ago',
    activeCases: 11,
    facility: 'Ralegaon Rural Hospital',
    serviceGap: '18 post-discharge surgical patients overdue for 7-day ASHA home check',
    actionRequired: 'Assign automated SMS reminders & notify sector ASHA facilitators',
    reportedBy: 'Block Medical Officer Dr. S. Deshmukh',
    status: 'Reminders Sent'
  },
  {
    id: 'alt-005',
    severity: 'High Priority',
    severityColor: 'bg-[#C0392B] text-white',
    badgeColor: 'text-[#C0392B] bg-[#FDF2F0]',
    iconColor: 'bg-[#FBEBEA] text-[#C0392B]',
    icon: 'AlertOctagon',
    title: 'Specialist referral backlog in tribal cluster',
    location: 'Akkalkuwa Tribal Cluster, Nandurbar',
    timeAgo: '2 days ago',
    activeCases: 21,
    facility: 'Akkalkuwa Sub-Centre Cluster',
    serviceGap: 'Obstetrician and pediatrician consult wait time > 72 hours',
    actionRequired: 'Schedule dedicated e-Sanjeevani tele-consultation camp on Thursday',
    reportedBy: 'Medical Officer Dr. V. Gavit',
    status: 'Camp Scheduled'
  }
];

export let SERVICE_TRENDS_DATA = [
  { week: 'Wk 1', CitizenRequests: 140, ConsultationsCompleted: 118, Referrals: 22, FollowUpsCompleted: 34 },
  { week: 'Wk 2', CitizenRequests: 165, ConsultationsCompleted: 132, Referrals: 28, FollowUpsCompleted: 40 },
  { week: 'Wk 3', CitizenRequests: 180, ConsultationsCompleted: 148, Referrals: 31, FollowUpsCompleted: 45 },
  { week: 'Wk 4', CitizenRequests: 205, ConsultationsCompleted: 164, Referrals: 29, FollowUpsCompleted: 52 },
  { week: 'Wk 5', CitizenRequests: 218, ConsultationsCompleted: 175, Referrals: 34, FollowUpsCompleted: 58 },
  { week: 'Wk 6', CitizenRequests: 235, ConsultationsCompleted: 192, Referrals: 27, FollowUpsCompleted: 64 }
];

export let PRIORITY_AREAS = [
  {
    id: 'area-1',
    name: 'Nandurbar Rural',
    district: 'Nandurbar',
    priorityLevel: 'Priority Gap',
    badgeClass: 'bg-[#FCE8E6] text-[#C0392B] border border-[#F5C2BC]',
    cases: 24,
    facilities: 8,
    pendingReferrals: 11,
    weeklyChange: '+14%',
    population: '68,400',
    primaryGap: 'Referral + specialist access delay',
    ashaLead: 'Kavita Padvi (Taloda)',
    lastSync: '10 mins ago'
  },
  {
    id: 'area-2',
    name: 'Gadchiroli Rural',
    district: 'Gadchiroli',
    priorityLevel: 'Priority Gap',
    badgeClass: 'bg-[#FCE8E6] text-[#C0392B] border border-[#F5C2BC]',
    cases: 31,
    facilities: 6,
    pendingReferrals: 14,
    weeklyChange: '+22%',
    population: '54,200',
    primaryGap: 'Essential medicine stockout & terrain transit',
    ashaLead: 'Sunita Madavi (Etapalli)',
    lastSync: '25 mins ago'
  },
  {
    id: 'area-3',
    name: 'Palghar Tribal Belt',
    district: 'Palghar',
    priorityLevel: 'Limited Access',
    badgeClass: 'bg-[#FDF0E7] text-[#D45E28] border border-[#FAD3BD]',
    cases: 19,
    facilities: 11,
    pendingReferrals: 9,
    weeklyChange: '+9%',
    population: '92,100',
    primaryGap: 'Diagnostic turnaround & lab technician vacancy',
    ashaLead: 'Anjali Vartha (Jawhar)',
    lastSync: '1 hr ago'
  },
  {
    id: 'area-4',
    name: 'Dharni (Melghat)',
    district: 'Amravati',
    priorityLevel: 'Limited Access',
    badgeClass: 'bg-[#FDF0E7] text-[#D45E28] border border-[#FAD3BD]',
    cases: 16,
    facilities: 7,
    pendingReferrals: 8,
    weeklyChange: '+6%',
    population: '48,600',
    primaryGap: 'High-risk antenatal triage & neonatal care',
    ashaLead: 'Rekha Kasdekar (Dharni)',
    lastSync: '2 hrs ago'
  },
  {
    id: 'area-5',
    name: 'Akkalkuwa Cluster',
    district: 'Nandurbar',
    priorityLevel: 'Priority Gap',
    badgeClass: 'bg-[#FCE8E6] text-[#C0392B] border border-[#F5C2BC]',
    cases: 21,
    facilities: 5,
    pendingReferrals: 10,
    weeklyChange: '+18%',
    population: '38,900',
    primaryGap: 'Emergency ambulance dispatch & tele-consults',
    ashaLead: 'Sharda Gavit (Akkalkuwa)',
    lastSync: '30 mins ago'
  }
];

export let NO_ACTIVE_CASES_FACILITIES = [
  {
    id: 'nac-1',
    facilityName: 'Vengurla Coastal PHC',
    district: 'Sindhudurg',
    type: 'Primary Health Centre',
    status: 'Operational',
    lastReported: '2 hrs ago',
    citizenReports: 0,
    followUpsDue: 0,
    reportingStatus: 'Active & Verified',
    healthStatus: 'Stabilized Health Profile',
    notes: 'Regular OPD conducting baseline preventive screenings. No critical triages.'
  },
  {
    id: 'nac-2',
    facilityName: 'Mahabaleshwar Rural Sub-Centre',
    district: 'Satara',
    type: 'Sub-Centre',
    status: 'Operational',
    lastReported: '4 hrs ago',
    citizenReports: 0,
    followUpsDue: 0,
    reportingStatus: 'Active & Verified',
    healthStatus: 'Stabilized Health Profile',
    notes: '100% antenatal checkups completed. No pending referral backlogs.'
  },
  {
    id: 'nac-3',
    facilityName: 'Bhamragad Remote Sub-Centre',
    district: 'Gadchiroli',
    type: 'Sub-Centre',
    status: 'Offline / Inactive Sync',
    lastReported: '8 days ago',
    citizenReports: 0,
    followUpsDue: 4,
    reportingStatus: 'ATTENTION: Potential Data Silence',
    healthStatus: 'Unmonitored / Network Gap',
    notes: 'Zero cases recorded due to solar microgrid battery failure at sub-centre.'
  }
];

export let AI_INSIGHT_DATA = {
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

// District polygons and metadata for the Interactive Maharashtra Healthcare Access Map
export let MAHARASHTRA_MAP_DISTRICTS = [
  {
    id: 'nandurbar',
    name: 'Nandurbar',
    region: 'Khandesh',
    accessLevel: 'Priority Gap',
    fillColor: '#C0392B',
    strokeColor: '#9B261A',
    facilities: 8,
    activeCases: 24,
    pendingReferrals: 11,
    followUpsDue: 19,
    weeklyChange: '+14%',
    lastUpdated: '10 mins ago',
    path: 'M 180,45 L 260,35 L 240,90 L 160,85 Z',
    labelPos: { x: 210, y: 65 }
  },
  {
    id: 'dhule',
    name: 'Dhule',
    region: 'Khandesh',
    accessLevel: 'Moderate Access',
    fillColor: '#E8B958',
    strokeColor: '#D3A23A',
    facilities: 12,
    activeCases: 17,
    pendingReferrals: 6,
    followUpsDue: 9,
    weeklyChange: '+4%',
    lastUpdated: '1 hr ago',
    path: 'M 160,85 L 240,90 L 270,165 L 190,155 Z',
    labelPos: { x: 215, y: 125 }
  },
  {
    id: 'jalgaon',
    name: 'Jalgaon',
    region: 'Khandesh',
    accessLevel: 'Good Access',
    fillColor: '#5C8A5E',
    strokeColor: '#456B47',
    facilities: 16,
    activeCases: 22,
    pendingReferrals: 8,
    followUpsDue: 13,
    weeklyChange: '+2%',
    lastUpdated: '45 mins ago',
    path: 'M 240,90 L 375,90 L 360,175 L 270,165 Z',
    labelPos: { x: 305, y: 130 }
  },
  {
    id: 'buldhana',
    name: 'Buldhana',
    region: 'Vidarbha',
    accessLevel: 'Moderate Access',
    fillColor: '#E8B958',
    strokeColor: '#D3A23A',
    facilities: 13,
    activeCases: 18,
    pendingReferrals: 7,
    followUpsDue: 10,
    weeklyChange: '+5%',
    lastUpdated: '2 hrs ago',
    path: 'M 375,90 L 455,130 L 420,210 L 360,175 Z',
    labelPos: { x: 405, y: 150 }
  },
  {
    id: 'amravati',
    name: 'Amravati',
    region: 'Vidarbha',
    accessLevel: 'Moderate Access',
    fillColor: '#E8B958',
    strokeColor: '#D3A23A',
    facilities: 14,
    activeCases: 18,
    pendingReferrals: 8,
    followUpsDue: 12,
    weeklyChange: '+6%',
    lastUpdated: '3 hrs ago',
    path: 'M 455,130 L 565,95 L 530,195 L 420,210 Z',
    labelPos: { x: 490, y: 150 }
  },
  {
    id: 'nagpur',
    name: 'Nagpur',
    region: 'Vidarbha',
    accessLevel: 'Good Access',
    fillColor: '#5C8A5E',
    strokeColor: '#456B47',
    facilities: 22,
    activeCases: 28,
    pendingReferrals: 5,
    followUpsDue: 10,
    weeklyChange: '-2%',
    lastUpdated: '1 hr ago',
    path: 'M 565,95 L 675,105 L 630,205 L 530,195 Z',
    labelPos: { x: 600, y: 150 }
  },
  {
    id: 'wardha',
    name: 'Wardha',
    region: 'Vidarbha',
    accessLevel: 'Good Access',
    fillColor: '#7D9E74',
    strokeColor: '#63845A',
    facilities: 11,
    activeCases: 12,
    pendingReferrals: 4,
    followUpsDue: 6,
    weeklyChange: '+0%',
    lastUpdated: '4 hrs ago',
    path: 'M 530,195 L 630,205 L 600,270 L 510,250 Z',
    labelPos: { x: 565, y: 230 }
  },
  {
    id: 'chandrapur',
    name: 'Chandrapur',
    region: 'Vidarbha',
    accessLevel: 'Moderate Access',
    fillColor: '#E8B958',
    strokeColor: '#D3A23A',
    facilities: 12,
    activeCases: 16,
    pendingReferrals: 7,
    followUpsDue: 9,
    weeklyChange: '+3%',
    lastUpdated: '2 hrs ago',
    path: 'M 600,270 L 700,225 L 670,350 L 570,320 Z',
    labelPos: { x: 635, y: 285 }
  },
  {
    id: 'gadchiroli',
    name: 'Gadchiroli',
    region: 'Vidarbha',
    accessLevel: 'Priority Gap',
    fillColor: '#C0392B',
    strokeColor: '#9B261A',
    facilities: 6,
    activeCases: 31,
    pendingReferrals: 14,
    followUpsDue: 22,
    weeklyChange: '+22%',
    lastUpdated: '25 mins ago',
    path: 'M 670,350 L 770,320 L 730,500 L 640,430 Z',
    labelPos: { x: 705, y: 410 }
  },
  {
    id: 'nashik',
    name: 'Nashik',
    region: 'North Maharashtra',
    accessLevel: 'Good Access',
    fillColor: '#5C8A5E',
    strokeColor: '#456B47',
    facilities: 18,
    activeCases: 26,
    pendingReferrals: 8,
    followUpsDue: 15,
    weeklyChange: '+1%',
    lastUpdated: '1 hr ago',
    path: 'M 130,165 L 190,155 L 260,250 L 175,280 L 130,225 Z',
    labelPos: { x: 195, y: 215 }
  },
  {
    id: 'palghar',
    name: 'Palghar',
    region: 'Konkan',
    accessLevel: 'Limited Access',
    fillColor: '#E26D38',
    strokeColor: '#C85624',
    facilities: 11,
    activeCases: 19,
    pendingReferrals: 9,
    followUpsDue: 14,
    weeklyChange: '+9%',
    lastUpdated: '1 hr ago',
    path: 'M 90,215 L 130,225 L 140,295 L 85,290 Z',
    labelPos: { x: 110, y: 255 }
  },
  {
    id: 'aurangabad',
    name: 'Chhatrapati Sambhajinagar',
    region: 'Marathwada',
    accessLevel: 'Moderate Access',
    fillColor: '#E8B958',
    strokeColor: '#D3A23A',
    facilities: 19,
    activeCases: 25,
    pendingReferrals: 7,
    followUpsDue: 11,
    weeklyChange: '+4%',
    lastUpdated: '3 hrs ago',
    path: 'M 270,165 L 360,175 L 390,270 L 260,250 Z',
    labelPos: { x: 320, y: 215 }
  },
  {
    id: 'ahmednagar',
    name: 'Ahilyanagar',
    region: 'Western Maharashtra',
    accessLevel: 'Good Access',
    fillColor: '#5C8A5E',
    strokeColor: '#456B47',
    facilities: 18,
    activeCases: 20,
    pendingReferrals: 6,
    followUpsDue: 9,
    weeklyChange: '+2%',
    lastUpdated: '2 hrs ago',
    path: 'M 175,280 L 260,250 L 360,335 L 245,395 L 175,340 Z',
    labelPos: { x: 255, y: 320 }
  },
  {
    id: 'pune',
    name: 'Pune',
    region: 'Western Maharashtra',
    accessLevel: 'Good Access',
    fillColor: '#5C8A5E',
    strokeColor: '#456B47',
    facilities: 34,
    activeCases: 42,
    pendingReferrals: 6,
    followUpsDue: 18,
    weeklyChange: '+3%',
    lastUpdated: '30 mins ago',
    path: 'M 115,315 L 175,340 L 245,395 L 210,480 L 130,440 Z',
    labelPos: { x: 175, y: 405 }
  },
  {
    id: 'beed',
    name: 'Beed',
    region: 'Marathwada',
    accessLevel: 'Priority Gap',
    fillColor: '#C0392B',
    strokeColor: '#9B261A',
    facilities: 10,
    activeCases: 28,
    pendingReferrals: 12,
    followUpsDue: 18,
    weeklyChange: '+19%',
    lastUpdated: '40 mins ago',
    path: 'M 360,335 L 430,270 L 490,360 L 390,405 Z',
    labelPos: { x: 420, y: 345 }
  },
  {
    id: 'latur',
    name: 'Latur',
    region: 'Marathwada',
    accessLevel: 'Priority Gap',
    fillColor: '#DF6638',
    strokeColor: '#C85624',
    facilities: 11,
    activeCases: 22,
    pendingReferrals: 9,
    followUpsDue: 15,
    weeklyChange: '+11%',
    lastUpdated: '1 hr ago',
    path: 'M 390,405 L 490,360 L 515,480 L 435,490 Z',
    labelPos: { x: 460, y: 435 }
  },
  {
    id: 'osmanabad',
    name: 'Dharashiv (Osmanabad)',
    region: 'Marathwada',
    accessLevel: 'Priority Gap',
    fillColor: '#DF6638',
    strokeColor: '#C85624',
    facilities: 9,
    activeCases: 19,
    pendingReferrals: 8,
    followUpsDue: 14,
    weeklyChange: '+10%',
    lastUpdated: '2 hrs ago',
    path: 'M 360,450 L 435,490 L 415,570 L 335,530 Z',
    labelPos: { x: 380, y: 510 }
  },
  {
    id: 'solapur',
    name: 'Solapur',
    region: 'Western Maharashtra',
    accessLevel: 'Moderate Access',
    fillColor: '#E8B958',
    strokeColor: '#D3A23A',
    facilities: 16,
    activeCases: 21,
    pendingReferrals: 6,
    followUpsDue: 10,
    weeklyChange: '+3%',
    lastUpdated: '3 hrs ago',
    path: 'M 245,395 L 360,450 L 335,530 L 260,515 Z',
    labelPos: { x: 295, y: 470 }
  },
  {
    id: 'satara',
    name: 'Satara',
    region: 'Western Maharashtra',
    accessLevel: 'Good Access',
    fillColor: '#5C8A5E',
    strokeColor: '#456B47',
    facilities: 17,
    activeCases: 14,
    pendingReferrals: 5,
    followUpsDue: 6,
    weeklyChange: '-1%',
    lastUpdated: '2 hrs ago',
    path: 'M 130,440 L 210,480 L 200,560 L 135,530 Z',
    labelPos: { x: 170, y: 500 }
  },
  {
    id: 'ratnagiri',
    name: 'Ratnagiri',
    region: 'Konkan',
    accessLevel: 'Moderate Access',
    fillColor: '#E8B958',
    strokeColor: '#D3A23A',
    facilities: 15,
    activeCases: 12,
    pendingReferrals: 4,
    followUpsDue: 7,
    weeklyChange: '+1%',
    lastUpdated: '4 hrs ago',
    path: 'M 85,420 L 130,440 L 135,560 L 95,550 Z',
    labelPos: { x: 110, y: 490 }
  },
  {
    id: 'kolhapur',
    name: 'Kolhapur',
    region: 'Western Maharashtra',
    accessLevel: 'Good Access',
    fillColor: '#5C8A5E',
    strokeColor: '#456B47',
    facilities: 19,
    activeCases: 16,
    pendingReferrals: 4,
    followUpsDue: 8,
    weeklyChange: '+0%',
    lastUpdated: '3 hrs ago',
    path: 'M 135,560 L 200,560 L 190,640 L 135,630 Z',
    labelPos: { x: 165, y: 600 }
  },
  {
    id: 'sindhudurg',
    name: 'Sindhudurg',
    region: 'Konkan',
    accessLevel: 'Good Access',
    fillColor: '#5C8A5E',
    strokeColor: '#456B47',
    facilities: 14,
    activeCases: 8,
    pendingReferrals: 3,
    followUpsDue: 5,
    weeklyChange: '-3%',
    lastUpdated: '5 hrs ago',
    path: 'M 95,550 L 135,560 L 140,680 L 105,670 Z',
    labelPos: { x: 120, y: 615 }
  }
];

export let OFFICER_PROFILE = {
  name: 'Dr. Rajesh Shinde',
  role: 'Chief Medical Officer (Surveillance & Access)',
  district: 'Maharashtra State Public Health Directorate',
  avatar: '/assets/reference/swasthyasetu_extracted_assets/07-health-officer.png',
  unreadCount: 3,
  notifications: [
    {
      id: 1,
      title: 'High Priority Alert: Doctor Vacancy in Akkalkuwa PHC (Nandurbar)',
      time: '14m ago',
      unread: true,
      category: 'Service Alert'
    },
    {
      id: 2,
      title: 'Emergency Medicine Buffer Dispatched to Etapalli (Gadchiroli)',
      time: '1h ago',
      unread: true,
      category: 'Supply Chain'
    },
    {
      id: 3,
      title: 'Weekly Referral Loop Closure Report: 86% across 22 Districts',
      time: '3h ago',
      unread: true,
      category: 'Continuity Report'
    }
  ]
};

export function set_DISTRICT_OPTIONS(val) { DISTRICT_OPTIONS = val; }
export function set_KPI_DATA(val) { KPI_DATA = val; }
export function set_RECENT_ALERTS(val) { RECENT_ALERTS = val; }
export function set_SERVICE_TRENDS_DATA(val) { SERVICE_TRENDS_DATA = val; }
export function set_PRIORITY_AREAS(val) { PRIORITY_AREAS = val; }
export function set_NO_ACTIVE_CASES_FACILITIES(val) { NO_ACTIVE_CASES_FACILITIES = val; }
export function set_AI_INSIGHT_DATA(val) { AI_INSIGHT_DATA = val; }
export function set_MAHARASHTRA_MAP_DISTRICTS(val) { MAHARASHTRA_MAP_DISTRICTS = val; }
export function set_OFFICER_PROFILE(val) { OFFICER_PROFILE = val; }

