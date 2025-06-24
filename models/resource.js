import { UUIDV4 } from 'sequelize';

export default(sequelize, DataTypes) =>
  sequelize.define('resource', {
    id: {
      type: DataTypes.UUID,
      defaultValue: UUIDV4,
      primaryKey: true,
    },
    dataset_id: DataTypes.UUID,
    name: DataTypes.STRING(255),
    format: DataTypes.STRING(10),
    url: DataTypes.TEXT,
    size: DataTypes.INTEGER,
    created_at: DataTypes.DATE,
  }, {
    tableName: 'resource',
    timestamps: false,
  });
