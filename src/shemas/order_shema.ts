import mongoose from "mongoose";

export const UserSchema = new mongoose.Schema({
  id: String,
  name: String,
  email: String,
  password: String,
  tel: String,
  role: String,
  favourites_id: String,
});

export const User = mongoose.model("users", UserSchema);
