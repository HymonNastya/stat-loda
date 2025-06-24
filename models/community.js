
import { UUIDV4 } from 'sequelize';


export default(sequelize, DataTypes) =>
  sequelize.define('community', {
    id: {
      type: DataTypes.UUID,
      defaultValue: UUIDV4,
      primaryKey: true,
    },
    name: DataTypes.STRING,
    area_km2: DataTypes.DECIMAL(10, 2),
    facebook_url: DataTypes.TEXT,
    website_url: DataTypes.TEXT,
    katottg_code: DataTypes.STRING,
    established_date: DataTypes.DATE,
    address: DataTypes.TEXT,
    postal_code: DataTypes.STRING,
    description: DataTypes.TEXT,
    logo_url: DataTypes.TEXT,
    num_settlements: DataTypes.INTEGER,
    num_cities: DataTypes.INTEGER,
    num_villages: DataTypes.INTEGER,
    district_id: DataTypes.UUID,
    created_at: DataTypes.DATE,
  }, {
    tableName: 'community',
    timestamps: false,
  });
