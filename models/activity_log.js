export default (sequelize, DataTypes) => {
  return sequelize.define('ActivityLog', {
    id: {
      type: DataTypes.CHAR(36),
      primaryKey: true,
    },
    action: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    user_id: {
      type: DataTypes.CHAR(36),
      allowNull: false,
    },
    dataset_id: {
      type: DataTypes.CHAR(36),
      allowNull: true,
    },
    timestamp: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    }
  }, {
    tableName: 'activity_log',
    timestamps: false,
  });
};
