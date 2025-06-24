import { UUIDV4 } from 'sequelize';

export default(sequelize, DataTypes) =>
  sequelize.define('user', {
    id: {
      type: DataTypes.UUID,
      defaultValue: UUIDV4,
      primaryKey: true,
    },
    username: DataTypes.STRING,
    email: DataTypes.STRING,
    pass: DataTypes.STRING,
    created_at: DataTypes.DATE,
  }, {
    tableName: 'user',
    timestamps: false,
  });
