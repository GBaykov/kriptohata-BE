import mongoose, { Schema } from 'mongoose';

export const CurrencySchema = new mongoose.Schema({
  // type: [String],
  name: String,
  short_name: String,
});

export const VideocardSchema = new mongoose.Schema({
  type: {
    type: String,
    required: true,
    enum: ['Videocard'],
  },
  memory: {
    type: [String],
    required: true,
  },
  manufacturer: {
    type: String,
    required: true,
  },
});

export const MinerSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ['OldMiner', 'NewMiner'],
    required: true,
  },
  energy_consumption: {
    type: Number,
    required: true,
  },
  hash_power: {
    type: Number,
    required: true,
  },
  hash_algorithm: {
    type: String,
    required: true,
  },
});

// export const DeviceSchema = new mongoose.Schema({
//   name: {
//     type: String,
//     required: true,
//   },
//   price: {
//     type: Number,
//     required: true,
//   },
//   exists: {
//     type: String,
//     required: true,
//     enum: ['exist', 'onOrder', 'notExist'],
//   },
//   article_number: {
//     type: String,
//     required: true,
//   },
//   img: {
//     type: String,
//     required: true,
//   },
//   currency: {
//     type: [CurrencySchema],
//     required: true,
//   },

//   device_type: {
//     type: String,
//     required: true,
//     enum: ['Videocard', 'OldMiner', 'NewMiner'],
//   },
//   device_features: {
//     type: Map,
//     of: [MinerSchema || VideocardSchema],
//     // required: true,
//   },
// });
export const VideocardMongoSchema = new mongoose.Schema({
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
    enum: ['Videocard'],
  },

  memory: {
    type: [String],
    required: true,
  },
  manufacturer: {
    type: String,
    required: true,
  },
});

export const MinerMongSchema = new mongoose.Schema({
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
    enum: ['OldMiner', 'NewMiner'],
  },

  energy_consumption: {
    type: Number,
    required: true,
  },
  hash_power: {
    type: Number,
    required: true,
  },
  hash_algorithm: {
    type: String,
    required: true,
  },
});

export const Device = mongoose.model(
  'Device',
  VideocardMongoSchema || MinerMongSchema,
);
