import { UUIDV4 } from 'sequelize';


export default(sequelize, DataTypes) =>
  sequelize.define('group', {
    id: {
      type: DataTypes.UUID,
      defaultValue: UUIDV4,
      primaryKey: true,
    },
    name: DataTypes.STRING(100),
  }, {
    tableName: 'group',
    timestamps: false,
  });
