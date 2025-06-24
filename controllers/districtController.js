const { District, Community } = require('../models');

const getAllDistricts = async (req, res) => {
  try {
    const districts = await District.findAll({ include: Community });
    res.json(districts);
  } catch (err) {
    console.error('Error fetching districts:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = {
  getAllDistricts,
};
