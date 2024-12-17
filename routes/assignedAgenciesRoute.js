const express = require('express');
const router = express.Router();
const assignedAgenciesController = require('../controllers/assignedAgenciesController');

// Create an assignment
router.post('/', assignedAgenciesController.create);

// Get assignments by agency ID
router.get('/agency/:agencyId', assignedAgenciesController.getByAgency);

// Get assignments by agency ID with agency details
router.get('/agency/:agencyId/details', assignedAgenciesController.getAssignmentsWithAgencyDetails);

// Get assignments by child ID
router.get('/child/:childId', assignedAgenciesController.getByChild);

// Update an assignment (status and remarks)
router.put('/:agencyId/:childId', assignedAgenciesController.update);

// Delete an assignment
router.delete('/:agencyId/:childId', assignedAgenciesController.delete);

module.exports = router;
