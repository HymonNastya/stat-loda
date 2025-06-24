const { HealthcareFacility } = require('../models');

const getAllHealthcareFacilities = async (req, res) => {
  try {
    const facilities = await HealthcareFacility.findAll();
    res.json(facilities);
  } catch (err) {
    console.error('Error fetching healthcare facilities:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = {
  getAllHealthcareFacilities,
};
