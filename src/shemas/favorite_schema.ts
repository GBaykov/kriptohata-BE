import mongoose, { Schema } from 'mongoose';
import { DeviceSchema } from './device_schema';

export const FavoriteSchema = new Schema({
  user_id: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  // items: [DeviceSchema],
  items: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Device',
    },
  ],
});

export const Favorite = mongoose.model('Favorite', FavoriteSchema);
