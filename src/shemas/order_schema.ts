import mongoose, { Schema } from 'mongoose';
import { DeviceSchema } from './device_schema';

export const OrderSchema = new mongoose.Schema({
  id: Schema.Types.ObjectId,
  user_id: String,
  date: {
    type: Date,
    default: Date.now(),
  },
  user_name: {
    type: String,
    require: true,
  },
  user_tel: {
    type: String,
    require: true,
  },

  items: [DeviceSchema],
});

export const Order = mongoose.model('Order', OrderSchema);
