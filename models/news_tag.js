export default(sequelize, DataTypes) =>
    sequelize.define('news_tag', {
      news_id: {
        type: DataTypes.UUID,
        primaryKey: true,
      },
      tag_id: {
        type: DataTypes.UUID,
        primaryKey: true,
      },
    }, {
      tableName: 'news_tag',
      timestamps: false,
    });