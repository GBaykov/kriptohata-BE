import mongoose, { Schema } from 'mongoose';

export const CurrencySchema = new mongoose.Schema({
  // type: [String],
  name: String,
  short_name: String,
});

export const VideocardSchema = new mongoose.Schema({
  type: {
    enum: ['Videocard'],
    // required: true,
  },
  memory: {
    type: [String],
    // required: true,
  },
  manufacturer: {
    type: String,
    // required: true,
  },
});

export const MinerSchema = new mongoose.Schema({
  type: {
    enum: ['OldMiner', 'NewMiner'],
    // required: true,
  },
  energy_consumption: {
    type: Number,
    // required: true,
  },
  hash_power: {
    type: Number,
    // required: true,
  },
  hash_algorithm: {
    type: String,
    // required: true,
  },
});

export const DeviceSchema = new mongoose.Schema({
  id: Schema.Types.ObjectId,
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  exists: {
    enum: ['exist', 'onOrder', 'notExist'],
    // required: true,
  },
  article_number: {
    type: String,
    required: true,
  },
  img: {
    type: String,
    required: true,
  },
  currency: {
    type: [CurrencySchema],
    required: true,
  },

  // miner: [MinerSchema],
  // videocard: [VideocardSchema],
  devce_type: {
    enum: ['Videocard', 'OldMiner', 'NewMiner'],
    // required: true,
  },
  device_features: {
    type: [MinerSchema || VideocardSchema],
    required: true,
  },
});

export const Device = mongoose.model('Device', DeviceSchema);
