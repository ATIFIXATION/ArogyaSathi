const express = require('express');
const router = express.Router();
const apiController = require('../controllers/apiController');

// Healthcheck
router.get('/health', apiController.getHealth);

// Citizen Portal
router.get('/citizen/profile', apiController.getCitizenProfile);
router.get('/citizen/notifications', apiController.getCitizenNotifications);
router.get('/citizen/active-care', apiController.getCitizenActiveCare);
router.get('/citizen/medicines', apiController.getCitizenMedicines);
router.get('/citizen/diagnostics', apiController.getCitizenDiagnostics);
router.get('/citizen/nearby-facilities', apiController.getNearbyFacilities);
router.post('/citizen/care-requests', apiController.createCitizenCareRequest);

// ASHA Dashboard
router.get('/asha/profile', apiController.getAshaProfile);
router.get('/asha/kpis', apiController.getAshaKpis);
router.get('/asha/care-requests', apiController.getAshaCareRequests);
router.get('/asha/communities', apiController.getAshaCommunities);
router.get('/asha/priority-tasks', apiController.getAshaPriorityTasks);
router.get('/asha/referrals', apiController.getAshaReferrals);
router.post('/asha/triage', apiController.submitAshaTriage);
router.post('/asha/service-issues', apiController.createServiceIssue);

// Officer Dashboard
router.get('/officer/districts', apiController.getOfficerDistricts);
router.get('/officer/kpis', apiController.getOfficerKpis);
router.get('/officer/alerts', apiController.getOfficerAlerts);
router.get('/officer/trends', apiController.getOfficerTrends);
router.get('/officer/priority-areas', apiController.getOfficerPriorityAreas);
router.get('/officer/no-cases-facilities', apiController.getOfficerNoCasesFacilities);
router.get('/officer/ai-insight', apiController.getOfficerAiInsight);
router.get('/officer/map-districts', apiController.getOfficerMapDistricts);
router.get('/officer/profile', apiController.getOfficerProfile);
router.post('/officer/interventions', apiController.authorizeIntervention);

// Landing / Home stats
router.get('/home/stats', apiController.getHomeStats);

module.exports = router;
