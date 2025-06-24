export default(sequelize, DataTypes) =>
    sequelize.define('dataset_tag', {
      dataset_id: {
        type: DataTypes.UUID,
        primaryKey: true,
      },
      tag_id: {
        type: DataTypes.UUID,
        primaryKey: true,
      },
    }, {
      tableName: 'dataset_tag',
      timestamps: false,
    });