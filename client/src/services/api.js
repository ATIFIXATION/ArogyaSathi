/**
 * SwasthyaSetu API Services Client
 */

// Helper to make API GET requests
async function apiGet(endpoint) {
  const response = await fetch(endpoint);
  if (!response.ok) {
    throw new Error(`API Request failed for ${endpoint} with status ${response.status}`);
  }
  return response.json();
}

// Helper to make API POST requests
async function apiPost(endpoint, data) {
  const response = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });
  if (!response.ok) {
    const errorBody = await response.json().catch(() => ({}));
    throw new Error(errorBody.error || `API POST Request failed for ${endpoint} with status ${response.status}`);
  }
  return response.json();
}

// ----------------------------------------------------------------------------
// Citizen Portal Services
// ----------------------------------------------------------------------------
export async function getCitizenProfile(id) {
  const query = id ? `?id=${id}` : '';
  return apiGet(`/api/citizen/profile${query}`);
}

export async function getCitizenNotifications(userId) {
  const query = userId ? `?userId=${userId}` : '';
  return apiGet(`/api/citizen/notifications${query}`);
}

export async function getCitizenActiveCare(id) {
  const query = id ? `?id=${id}` : '';
  return apiGet(`/api/citizen/active-care${query}`);
}

export async function getCitizenMedicines(id) {
  const query = id ? `?id=${id}` : '';
  return apiGet(`/api/citizen/medicines${query}`);
}

export async function getCitizenDiagnostics(id) {
  const query = id ? `?id=${id}` : '';
  return apiGet(`/api/citizen/diagnostics${query}`);
}

export async function getNearbyFacilities() {
  return apiGet('/api/citizen/nearby-facilities');
}

export async function createCitizenCareRequest(payload) {
  return apiPost('/api/citizen/care-requests', payload);
}

// ----------------------------------------------------------------------------
// ASHA Worker Services
// ----------------------------------------------------------------------------
export async function getAshaProfile(id) {
  const query = id ? `?id=${id}` : '';
  return apiGet(`/api/asha/profile${query}`);
}

export async function getAshaKpis(id) {
  const query = id ? `?id=${id}` : '';
  return apiGet(`/api/asha/kpis${query}`);
}

export async function getAshaCareRequests(id) {
  const query = id ? `?id=${id}` : '';
  return apiGet(`/api/asha/care-requests${query}`);
}

export async function submitAshaTriage(payload) {
  return apiPost('/api/asha/triage', payload);
}

export async function getAshaCommunities(id) {
  const query = id ? `?id=${id}` : '';
  return apiGet(`/api/asha/communities${query}`);
}

export async function getAshaPriorityTasks(id) {
  const query = id ? `?id=${id}` : '';
  return apiGet(`/api/asha/priority-tasks${query}`);
}

export async function getAshaReferrals(id) {
  const query = id ? `?id=${id}` : '';
  return apiGet(`/api/asha/referrals${query}`);
}

export async function createServiceIssue(payload) {
  return apiPost('/api/asha/service-issues', payload);
}

// ----------------------------------------------------------------------------
// Health Officer / CMO Services
// ----------------------------------------------------------------------------
export async function authorizeIntervention(payload) {
  return apiPost('/api/officer/interventions', payload);
}

export async function getOfficerDistricts() {
  return apiGet('/api/officer/districts');
}

export async function getOfficerKpis() {
  return apiGet('/api/officer/kpis');
}

export async function getOfficerAlerts() {
  return apiGet('/api/officer/alerts');
}

export async function getOfficerTrends() {
  return apiGet('/api/officer/trends');
}

export async function getOfficerPriorityAreas() {
  return apiGet('/api/officer/priority-areas');
}

export async function getOfficerNoCasesFacilities() {
  return apiGet('/api/officer/no-cases-facilities');
}

export async function getOfficerAiInsight() {
  return apiGet('/api/officer/ai-insight');
}

export async function getOfficerMapDistricts() {
  return apiGet('/api/officer/map-districts');
}

export async function getOfficerProfile(id) {
  const query = id ? `?id=${id}` : '';
  return apiGet(`/api/officer/profile${query}`);
}

// ----------------------------------------------------------------------------
// Landing Page Services
// ----------------------------------------------------------------------------
export async function getHomeStats() {
  return apiGet('/api/home/stats');
}
