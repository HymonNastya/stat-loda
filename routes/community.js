const express = require('express');
const router = express.Router();
const { Community, District } = require('../models');
const { Op } = require('sequelize');

router.get('/', async (req, res) => {
  const {
    page = 1,
    limit = 10,
    search = '',
    district_id
  } = req.query;

  const offset = (page - 1) * limit;

  const where = {};
  if (search) {
    where.name = { [Op.like]: `%${search}%` };
  }
  if (district_id) {
    where.district_id = district_id;
  }

  try {
    const result = await Community.findAndCountAll({
      where,
      include: District,
      limit: parseInt(limit),
      offset: parseInt(offset),
      order: [['name', 'ASC']]
    });

    res.json({
      total: result.count,
      page: parseInt(page),
      pages: Math.ceil(result.count / limit),
      data: result.rows
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
