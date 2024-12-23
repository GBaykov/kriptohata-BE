import mongoose, { Schema } from 'mongoose';
import { DeviceSchema } from './device_schema';

export const OrderSchema = new mongoose.Schema({
  user_id: String,

  date: {
    type: Date,
    default: Date.now(),
  },
  user_name: {
    type: String,
    requred: [true, 'user_name не может быть пустым'],
  },
  user_tel: {
    type: String,
    requred: [true, 'user_tel не может быть пустым'],
  },
  items: {
    type: [DeviceSchema],
    requred: [true, 'items не может быть пустым'],
  },
});

export const Order = mongoose.model('Order', OrderSchema);
