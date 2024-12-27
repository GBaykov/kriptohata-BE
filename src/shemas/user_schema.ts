import mongoose, { Schema } from 'mongoose';

export const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    minLength: 2,
    maxLength: 12,
    required: true,
  },
  email: {
    type: String,
    match: [/\w+@\w+\.\w+/, 'Incorrect email address format'],
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  tel: {
    type: String,
    required: true,
    unique: true,
  },
  role: {
    type: String,
    enum: ['Admin', 'Customer'],
  },
  favourites_id: {
    type: Schema.Types.ObjectId,
    ref: 'Favorite',
  },
});

export const User = mongoose.model('User', UserSchema);
