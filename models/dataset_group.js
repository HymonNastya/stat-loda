export default(sequelize, DataTypes) =>
    sequelize.define('dataset_group', {
      dataset_id: {
        type: DataTypes.UUID,
        primaryKey: true,
      },
      group_id: {
        type: DataTypes.UUID,
        primaryKey: true,
      },
    }, {
      tableName: 'dataset_group',
      timestamps: false,
    });
  