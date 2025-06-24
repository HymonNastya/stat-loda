// routes/index.js
import express from 'express';
const router = express.Router();

import districtRoutes from './district.js';
import communityRoutes from './community.js';
import healthcareFacilityRoutes from './healthcareFacility.js';
import newsRoutes from './news.js';
import datasetRoutes from './dataset.js';

router.use('/districts', districtRoutes);
router.use('/communities', communityRoutes);
router.use('/healthcare-facilities', healthcareFacilityRoutes);
router.use('/news', newsRoutes);
router.use('/datasets', datasetRoutes);

export default router;
