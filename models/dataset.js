import { UUIDV4 } from 'sequelize';

export default(sequelize, DataTypes) =>
  sequelize.define('dataset', {
    id: {
      type: DataTypes.UUID,
      defaultValue: UUIDV4,
      primaryKey: true,
    },
    org_id: DataTypes.UUID,
    title: DataTypes.STRING(255),
    notes: DataTypes.TEXT,
    author: {
      type: DataTypes.UUID,
      allowNull: false
    },
    maintainer: DataTypes.STRING(100),
    created_at: DataTypes.DATE,
    updated_at: DataTypes.DATE,
  }, {
    tableName: 'dataset',
    timestamps: false,
  });
