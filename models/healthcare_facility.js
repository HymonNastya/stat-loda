export default(sequelize, DataTypes) => {
  const HealthcareFacility = sequelize.define('HealthcareFacility', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    name: DataTypes.STRING,
    status: DataTypes.STRING,
    community_id: {  // 🔄 зміна назви і типу
      type: DataTypes.UUID,
      allowNull: false
    },
    edrpou_code: DataTypes.STRING,
    registration_address: DataTypes.TEXT,
    latitude: DataTypes.DECIMAL(9, 6),
    longitude: DataTypes.DECIMAL(9, 6),
    director_name: DataTypes.STRING,
    director_position: DataTypes.STRING,
    email: DataTypes.STRING,
    website_url: DataTypes.TEXT,
    facebook_url: DataTypes.TEXT
  }, {
    tableName: 'healthcare_facility',
    timestamps: false
  });

  return HealthcareFacility;
};
