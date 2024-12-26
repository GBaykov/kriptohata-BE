import mongoose, { Schema } from 'mongoose';

export const CurrencySchema = new mongoose.Schema({
  name: String,
  short_name: String,
});

export const DeviceSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  exists: {
    type: String,
    required: true,
    enum: ['exist', 'onOrder', 'notExist'],
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

  device_type: {
    type: String,
    required: true,
    enum: ['Videocard', 'OldMiner', 'NewMiner'],
  },

  memory: {
    type: [String],
  },
  manufacturer: {
    type: String,
  },
  energy_consumption: {
    type: Number,
  },
  hash_power: {
    type: Number,
  },
  hash_algorithm: {
    type: String,
  },
});

export const Device = mongoose.model('Device', DeviceSchema);
