import { UUIDV4 } from 'sequelize';

export default(sequelize, DataTypes) =>
  sequelize.define('news', {
    id: {
      type: DataTypes.UUID,
      defaultValue: UUIDV4,
      primaryKey: true,
    },
    title: DataTypes.STRING(255),
    publish_date: DataTypes.DATEONLY,
    preview_text: DataTypes.TEXT,
  }, {
    tableName: 'news',
    timestamps: false,
  });
