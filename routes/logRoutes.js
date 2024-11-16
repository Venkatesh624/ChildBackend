const express = require('express');
const logController = require('../controllers/logController');

const router = express.Router();

router.post('/', logController.createLog); // Add a log entry
router.get('/child/:childId', logController.getLogsByChildId); // Get logs for a specific child
router.delete('/:id', logController.deleteLog); // Delete a log

module.exports = router;
