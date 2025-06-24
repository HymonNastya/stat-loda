const express = require('express');
const router = express.Router();
const { getAllHealthcareFacilities } = require('../controllers/healthcareFacilityController');

router.get('/', getAllHealthcareFacilities);

module.exports = router;
