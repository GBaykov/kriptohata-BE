import mongoose, { Schema } from 'mongoose';

export const CallbackSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  tel: {
    type: String,
    requred: true,
  },
});

export const Callback = mongoose.model('Callback', CallbackSchema);
