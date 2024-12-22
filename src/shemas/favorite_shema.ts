import mongoose, { Schema } from 'mongoose';
import { DeviceSchema } from './device_shema';

export const FavoriteSchema = new Schema({
  id: Schema.Types.ObjectId,
  user_id: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  items: [DeviceSchema],
});

export const Favorite = mongoose.model('Favorite', FavoriteSchema);
