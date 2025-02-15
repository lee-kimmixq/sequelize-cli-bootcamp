import { Sequelize } from 'sequelize';
import allConfig from '../config/config.js';

import initAttractionModel from './attraction.mjs';
import initCategoryModel from './category.mjs';
import initTripModel from './trip.mjs';

const env = process.env.NODE_ENV || 'development';
const config = allConfig[env];
const db = {};

const sequelize = new Sequelize(config.database, config.username, config.password, config);

db.Attraction = initAttractionModel(sequelize, Sequelize.DataTypes);
db.Trip = initTripModel(sequelize, Sequelize.DataTypes);
db.Category = initCategoryModel(sequelize, Sequelize.DataTypes);

db.Attraction.belongsTo(db.Trip);
db.Trip.hasMany(db.Attraction);

db.Attraction.belongsTo(db.Category);
db.Category.hasMany(db.Attraction);

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;
