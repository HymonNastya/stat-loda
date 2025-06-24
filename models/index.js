// models/index.js
import { DataTypes } from 'sequelize';

import UserModel from './user.js';
import DistrictModel from './district.js';
import CommunityModel from './community.js';
import HealthcareFacilityModel from './healthcare_facility.js';
import CommunalEnterpriseModel from './communal_enterprise.js';
import NewsModel from './news.js';
import DatasetModel from './dataset.js';
import ResourceModel from './resource.js';
import TagModel from './tag.js';
import GroupModel from './group.js';
import ActivityLogModel from './activity_log.js';

import DatasetTagModel from './dataset_tag.js';
import DatasetGroupModel from './dataset_group.js';
import NewsTagModel from './news_tag.js';

export default function initModels(sequelize) {
  const User = UserModel(sequelize, DataTypes);
  const District = DistrictModel(sequelize, DataTypes);
  const Community = CommunityModel(sequelize, DataTypes);
  const HealthcareFacility = HealthcareFacilityModel(sequelize, DataTypes);
  const CommunalEnterprise = CommunalEnterpriseModel(sequelize, DataTypes);
  const News = NewsModel(sequelize, DataTypes);
  const Dataset = DatasetModel(sequelize, DataTypes);
  const Resource = ResourceModel(sequelize, DataTypes);
  const Tag = TagModel(sequelize, DataTypes);
  const Group = GroupModel(sequelize, DataTypes);
  const ActivityLog = ActivityLogModel(sequelize, DataTypes);

  const DatasetTag = DatasetTagModel(sequelize, DataTypes);
  const DatasetGroup = DatasetGroupModel(sequelize, DataTypes);
  const NewsTag = NewsTagModel(sequelize, DataTypes);

  // Визначення зв’язків між моделями
  District.hasMany(Community, { foreignKey: 'district_id' });
  Community.belongsTo(District, { foreignKey: 'district_id' });

  Community.hasMany(HealthcareFacility, { foreignKey: 'community_id' });
  HealthcareFacility.belongsTo(Community, { foreignKey: 'community_id' });

  Community.hasMany(CommunalEnterprise, { foreignKey: 'community_id' });
  CommunalEnterprise.belongsTo(Community, { foreignKey: 'community_id' });

  Community.hasMany(News, { foreignKey: 'community_id' });
  News.belongsTo(Community, { foreignKey: 'community_id' });

  User.hasMany(Dataset, { foreignKey: 'author_id' });
  Dataset.belongsTo(User, { foreignKey: 'author_id' });

  Dataset.hasMany(Resource, { foreignKey: 'dataset_id' });
  Resource.belongsTo(Dataset, { foreignKey: 'dataset_id' });

  // Many-to-many зв’язки Dataset - Tag
  Dataset.belongsToMany(Tag, { through: DatasetTag, foreignKey: 'dataset_id' });
  Tag.belongsToMany(Dataset, { through: DatasetTag, foreignKey: 'tag_id' });

  // Many-to-many зв’язки Dataset - Group
  Dataset.belongsToMany(Group, { through: DatasetGroup, foreignKey: 'dataset_id' });
  Group.belongsToMany(Dataset, { through: DatasetGroup, foreignKey: 'group_id' });

  // Many-to-many зв’язки News - Tag
  News.belongsToMany(Tag, { through: NewsTag, foreignKey: 'news_id' });
  Tag.belongsToMany(News, { through: NewsTag, foreignKey: 'tag_id' });

  User.hasMany(ActivityLog, { foreignKey: 'user_id' });
  ActivityLog.belongsTo(User, { foreignKey: 'user_id' });

  Dataset.hasMany(ActivityLog, { foreignKey: 'dataset_id' });
  ActivityLog.belongsTo(Dataset, { foreignKey: 'dataset_id' });

  return {
    User,
    District,
    Community,
    HealthcareFacility,
    CommunalEnterprise,
    News,
    Dataset,
    Resource,
    Tag,
    Group,
    ActivityLog,
    DatasetTag,
    DatasetGroup,
    NewsTag,
    sequelize,
  };
}
