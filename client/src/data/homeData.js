// Centralized structured data for SwasthyaSetu Homepage / Landing Page
// Aligned with SIH 2026 Problem Statement SIH26133: Rural Public Healthcare Access & Continuity

export const HERO_DATA = {
  eyebrow: 'RURAL PUBLIC HEALTHCARE ACCESS',
  titlePrefix: 'Healthcare that',
  titleEmphasis: 'every',
  titleSuffix: 'village.',
  description:
    'SwasthyaSetu connects rural citizens, frontline health workers and public healthcare facilities — from first symptoms to consultation, referral, treatment and follow-up.',
  primaryCta: 'Explore SwasthyaSetu',
  secondaryCta: 'How it works',
  signalCard: {
    title: 'HEALTHCARE SIGNAL',
    coverageValue: '78%',
    coverageLabel: 'Care Access Coverage',
    subtext: 'District services connected',
    accessLevel: 'High'
  },
  stats: [
    {
      id: 'facilities',
      value: '120+',
      label: 'Healthcare Facilities',
      icon: 'Building2'
    },
    {
      id: 'citizens',
      value: '1.2K+',
      label: 'Citizens Assisted',
      icon: 'Users'
    },
    {
      id: 'followup',
      value: '86%',
      label: 'Referral Follow-up',
      icon: 'RotateCw'
    },
    {
      id: 'support',
      value: '24/7',
      label: 'Care Access Support',
      icon: 'Headphones'
    }
  ]
};

export const HOW_IT_WORKS_STEPS = [
  {
    stepNumber: '01',
    title: 'CONNECT',
    description: 'Citizens find the right healthcare service and report their health concerns.',
    icon: 'Smartphone',
    color: '#405642'
  },
  {
    stepNumber: '02',
    title: 'CARE',
    description: 'Triage, consultation and diagnostics help deliver timely and appropriate care.',
    icon: 'Stethoscope',
    color: '#B94A25'
  },
  {
    stepNumber: '03',
    title: 'CONTINUE',
    description: 'Medicine, referral and follow-up ensure continuity of care.',
    icon: 'ClipboardCheck',
    color: '#3D6B8C'
  },
  {
    stepNumber: '04',
    title: 'IMPACT',
    description: 'Communities get healthier and data helps improve healthcare access continuously.',
    icon: 'TrendingUp',
    color: '#D98A2C'
  }
];

export const THREE_CONNECTED_ROLES = [
  {
    id: 'citizen',
    title: 'CITIZEN',
    tagline: 'Access Care & Support',
    description: 'Access care, consultation, referrals and follow-up.',
    features: [
      'Find nearby Primary Health Centres (PHCs) & Sub-Centres',
      'Report symptoms and receive instant triage guidance',
      'Track doctor consultations, e-prescriptions & diagnostic tests',
      'Receive timely referral status alerts and follow-up reminders'
    ],
    badgeColor: 'bg-[#EFF4EF] text-[#405642]',
    iconColor: 'bg-[#EAF0E6] text-[#405642]',
    actionLabel: 'Citizen Portal'
  },
  {
    id: 'asha',
    title: 'ASHA WORKER',
    tagline: 'Frontline Field Coordination',
    description: 'Assist communities, collect information and coordinate care.',
    features: [
      'Conduct doorstep health screenings and household surveys',
      'Verify citizen symptom reports in rural habitations',
      'Assist patients with tele-consultations and medicine delivery',
      'Ensure high referral adherence through automated follow-up'
    ],
    badgeColor: 'bg-[#FBF0EB] text-[#B94A25]',
    iconColor: 'bg-[#FBF0EB] text-[#B94A25]',
    actionLabel: 'ASHA Dashboard',
    actionRoute: '#asha'
  },
  {
    id: 'officer',
    title: 'HEALTH OFFICER',
    tagline: 'District Surveillance & Analytics',
    description: 'Monitor healthcare access, identify gaps and coordinate action.',
    features: [
      'Real-time GIS mapping of healthcare accessibility across districts',
      'Track bed availability, doctor rosters & essential medicine stock',
      'Monitor referral loop closures and clinical outcome indicators',
      'Allocate mobile health units and resources to underserved blocks'
    ],
    badgeColor: 'bg-[#EBF2F7] text-[#3D6B8C]',
    iconColor: 'bg-[#EBF2F7] text-[#3D6B8C]',
    actionLabel: 'Officer Dashboard',
    actionRoute: '#dashboard'
  }
];

export const CARE_JOURNEY_STAGES = [
  { stage: '1. Citizen', desc: 'Rural resident notes health symptom' },
  { stage: '2. Access Care', desc: 'Finds nearest sub-center / ASHA' },
  { stage: '3. Triage', desc: 'Clinical symptom categorization' },
  { stage: '4. Consultation', desc: 'Tele-health / In-person MO visit' },
  { stage: '5. Diagnostics', desc: 'Point-of-care lab investigations' },
  { stage: '6. Medicine', desc: 'Essential drug dispensing & tracking' },
  { stage: '7. Referral', desc: 'Seamless transfer to CHC / DH' },
  { stage: '8. Follow-up', desc: 'ASHA verified post-treatment check' }
];
