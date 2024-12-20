import mongoose from "mongoose";

export const UserSchema = new mongoose.Schema({
  id: String,
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  tel: {
    type: String,
    required: true,
  },
  role: String,
  favourites_id: String,
});

export const User = mongoose.model("users", UserSchema);
