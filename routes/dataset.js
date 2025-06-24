const express = require('express');
const router = express.Router();
const { getAllDatasets } = require('../controllers/datasetController');

router.get('/', getAllDatasets);

module.exports = router;
