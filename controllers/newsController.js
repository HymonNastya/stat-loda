const { News, Tag } = require('../models');

const getAllNews = async (req, res) => {
  try {
    const news = await News.findAll({ include: Tag });
    res.json(news);
  } catch (err) {
    console.error('Error fetching news:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = {
  getAllNews,
};
