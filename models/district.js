import { UUIDV4 } from 'sequelize';

export default(sequelize, DataTypes) =>
  sequelize.define('district', {
    id: {
      type: DataTypes.UUID,
      defaultValue: UUIDV4,
      primaryKey: true,
    },
    name: DataTypes.STRING,
    description: DataTypes.TEXT,
    website_url: DataTypes.TEXT,
    facebook_url: DataTypes.TEXT,
    area_km2: DataTypes.DECIMAL(10, 2),
    num_settlements: DataTypes.INTEGER,
    num_cities: DataTypes.INTEGER,
    num_villages: DataTypes.INTEGER,
    num_communities: DataTypes.INTEGER,
  }, {
    tableName: 'district',
    timestamps: false,
  });
