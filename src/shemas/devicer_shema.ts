import mongoose from "mongoose";

export const VideocardSchema = new mongoose.Schema({
  id: String,

  type: {
    type: String,
    required: true,
  },
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
    type: [String],
    required: true,
    name: String,
    short_name: String,
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
  id: String,

  type: {
    type: String,
    required: true,
  },
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
    type: [String],
    required: true,
    name: String,
    short_name: String,
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

export const Device = mongoose.model("devices", VideocardSchema || MinerSchema);
