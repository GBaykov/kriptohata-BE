import mongoose, { Schema } from 'mongoose';

export const CallbackSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Имя не может быть пустым'],
  },
  tel: {
    type: String,
    requred: [true, 'tel не может быть пустым'],
  },
});

export const Callback = mongoose.model('Callback', CallbackSchema);
