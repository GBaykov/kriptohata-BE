import mongoose from 'mongoose';
import { DeviceSchema } from './device_schema';

export const OrderSchema = new mongoose.Schema({
  user_id: String,

  date: {
    type: Date,
    default: Date.now(),
  },
  user_name: {
    type: String,
    required: true,
  },
  user_tel: {
    type: String,
    required: true,
  },
  items: {
    type: [DeviceSchema],
    required: true,
  },
});

export const Order = mongoose.model('Order', OrderSchema);
