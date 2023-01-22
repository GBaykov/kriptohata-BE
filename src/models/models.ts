import sequelize from "../db/db";
import { DataTypes } from "sequelize";

export const User = sequelize.define("user", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  email: { type: DataTypes.STRING, unique: true },
  password: { type: DataTypes.STRING },
  role: { type: DataTypes.STRING, defaultValue: "User" },
});

export const Basket = sequelize.define("basket", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
});

export const BascetDevice = sequelize.define("bascet_device", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
});

export const Chosen = sequelize.define("chosen", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
});

export const ChosenDevice = sequelize.define("chosen_device", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
});

export const Device = sequelize.define("device", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, unique: true, allowNull: false },
  price: { type: DataTypes.INTEGER, allowNull: false },
  img: { type: DataTypes.STRING },
  exists: { type: DataTypes.BOOLEAN, allowNull: false },
  rating: { type: DataTypes.INTEGER, defaultValue: 0 },
});

export const DeviceInfo = sequelize.define("divice_info", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  title: { type: DataTypes.STRING, allowNull: false },
  description: { type: DataTypes.STRING, allowNull: false },
});

export const Type = sequelize.define("type", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, unique: true, allowNull: false },
});

export const Rating = sequelize.define("rating", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  rate: { type: DataTypes.INTEGER, unique: true, allowNull: false },
  comment: { type: DataTypes.STRING, unique: true, allowNull: false },
});
// export default {User, Type, Basket, BascetDevice, Chosen, ChosenDevice, Device, DeviceInfo, Rating}

User.hasOne(Basket);
Basket.belongsTo(User);

User.hasOne(Chosen);
Chosen.belongsTo(User);

User.hasMany(Rating);
Rating.belongsTo(User);

Basket.hasMany(BascetDevice);
BascetDevice.belongsTo(Basket);
// BascetDevice.belongsTo(Device)

Chosen.hasMany(ChosenDevice);
ChosenDevice.belongsTo(Chosen);
// ChosenDevice.belongsTo(Device)

Type.hasMany(Device);
Device.belongsTo(Type);

Device.hasMany(Rating);
Rating.belongsTo(Device);

Device.hasMany(DeviceInfo, { as: "info" });
DeviceInfo.belongsTo(Device);
