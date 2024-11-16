const express = require('express');
const childController = require('../controllers/childController');

const router = express.Router();

router.post('/', childController.createChild); // Add a new child
router.get('/', childController.getAllChildren); // Get all children
router.get('/:id', childController.getChildById); // Get child by ID
router.put('/:id', childController.updateChild); // Update child details
router.delete('/:id', childController.deleteChild);

module.exports = router;
