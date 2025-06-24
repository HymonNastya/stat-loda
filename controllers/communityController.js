const { Community } = require('../models');

const getAllCommunities = async (req, res) => {
  try {
    const communities = await Community.findAll();
    res.json(communities);
  } catch (err) {
    console.error('Error fetching communities:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = {
  getAllCommunities,
};
