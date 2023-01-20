import sequelize from '../db/db';
import { DataType, DataTypes } from 'sequelize';
import {v4 as uuid} from 'uuid';

export const User = sequelize.define('user', {
    id: {type:DataTypes.UUIDV4, primaryKey:true},
    email:{type:DataTypes.STRING, unique:true},
    password: {type:DataTypes.STRING},
    role:{type:DataTypes.STRING, defaultValue:'User'}
})

export const Basket = sequelize.define('basket', {
    id: {type:DataTypes.UUIDV4, primaryKey:true},
})

export const BascetDevice = sequelize.define('bascet_device', {
    id: {type:DataTypes.UUIDV4, primaryKey:true},
})

export const Chosen = sequelize.define('chosen', {
    id: {type:DataTypes.UUIDV4, primaryKey:true},
})

export const ChosenDevice = sequelize.define('chosen_device', {
    id: {type:DataTypes.UUIDV4, primaryKey:true},
})

export const Device = sequelize.define('device', {
    id: {type:DataTypes.UUIDV4, primaryKey:true},
    name:{type:DataTypes.STRING, unique:true, allowNull:false},
    price: {type:DataTypes.INTEGER, allowNull:false},
    img:{type:DataTypes.STRING},
    exists:{type:DataTypes.BOOLEAN,allowNull:false}
})

export const DeviceInfo = sequelize.define('divice_info', {
    id:{type:DataTypes.UUIDV4, primaryKey:true},
    title:{type:DataTypes.STRING, allowNull:false},
    description:{type:DataTypes.STRING, allowNull:false}
})

export const Type = sequelize.define('type', {
    id: {type:DataTypes.UUIDV4, primaryKey:true},
    name:{type:DataTypes.STRING, unique:true, allowNull:false},
})

export const Rating = sequelize.define('rating', {
    id: {type:DataTypes.UUIDV4, primaryKey:true},
    rate:{type:DataTypes.INTEGER, unique:true, allowNull:false},
    comment:{type:DataTypes.STRING, unique:true, allowNull:false},
})


User.hasOne(Basket)
Basket.belongsTo(User)

User.hasOne(Chosen)
Chosen.belongsTo(User)

User.hasMany(Rating)
Rating.belongsTo(User)

Basket.hasMany(BascetDevice)
BascetDevice.belongsTo(Basket)
// BascetDevice.belongsTo(Device)

Chosen.hasMany(ChosenDevice)
ChosenDevice.belongsTo(Chosen)
// ChosenDevice.belongsTo(Device)

Type.hasMany(Device)
Device.belongsTo(Type)

Device.hasMany(Rating)
Rating.belongsTo(Device)

Device.hasMany(DeviceInfo)
DeviceInfo.belongsTo(Device)

