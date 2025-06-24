const { Dataset, Resource, Tag, Group } = require('../models');

const getAllDatasets = async (req, res) => {
  try {
    const datasets = await Dataset.findAll({
      include: [Resource, Tag, Group],
    });
    res.json(datasets);
  } catch (err) {
    console.error('Error fetching datasets:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = {
  getAllDatasets,
};
