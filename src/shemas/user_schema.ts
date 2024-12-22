import mongoose, { Schema } from 'mongoose';

export const UserSchema = new mongoose.Schema({
  id: Schema.Types.ObjectId,
  name: {
    type: String,
    minLength: [2, 'Имя слишком короткое'],
    maxLength: [12, 'Имя слишком длинное'],
    required: [true, 'Имя не может быть пустым'],
  },
  email: {
    type: String,
    match: [/\w+@\w+\.\w+/, 'Неправильный адрес электронной почты'],
    requred: [true, 'Email не может быть пустым'],
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  tel: {
    type: String,
    requred: [true, 'tel не может быть пустым'],
    unique: true,
  },
  role: {
    enum: ['Admin', 'Customer'],
    required: true,
  },
  favourites_id: String,
  favourites: {
    type: Schema.Types.ObjectId,
    ref: 'Favorite',
  },

  // favourites_id: String,
});

export const User = mongoose.model('User', UserSchema);
