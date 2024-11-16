const express = require('express');
const agencyController = require('../controllers/agencyController');

const router = express.Router();

router.post('/', agencyController.createAgency); // Add an agency
router.get('/', agencyController.getAllAgencies); // Get all agencies
router.get('/:id', agencyController.getAgencyById); // Get agency by ID
router.put('/:id', agencyController.updateAgency); // Update agency details
router.delete('/:id', agencyController.deleteAgency); // Delete agency

module.exports = router;
