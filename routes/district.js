const express = require('express');
const router = express.Router();
const { getAllDistricts } = require('../controllers/districtController');

router.get('/', getAllDistricts);

module.exports = router;
