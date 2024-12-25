import mongoose, { Schema } from 'mongoose';
import { MinerMongSchema, VideocardMongoSchema } from './device_schema';
// import { DeviceSchema } from './device_schema';

export const FavoriteSchema = new Schema({
  user_id: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  items: [MinerMongSchema || VideocardMongoSchema],
});

export const Favorite = mongoose.model('Favorite', FavoriteSchema);
