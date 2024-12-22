import mongoose, { Schema } from 'mongoose';

export const UserSchema = new mongoose.Schema({
  id: Schema.Types.ObjectId,
  name: {
    type: String,
    minLength: [2, 'name слишком короткое'],
    maxLength: [12, 'name слишком длинное'],
    required: [true, 'name не может быть пустым'],
  },
  email: {
    type: String,
    match: [/\w+@\w+\.\w+/, 'Неправильный адрес электронной почты'],
    required: [true, 'Email не может быть пустым'],
    // unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  tel: {
    type: String,
    required: [true, 'tel не может быть пустым'],
    // unique: true,
  },
  role: {
    type: String,
    enum: ['Admin', 'Customer'],
  },
  favourites_id: String,
  favourites: {
    type: Schema.Types.ObjectId,
    ref: 'Favorite',
  },
});

export const User = mongoose.model('User', UserSchema);
