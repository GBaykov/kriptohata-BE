import mongoose from "mongoose";

export const UserSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  tel: String,
  role: String,
  favourites_id: String,
  joined: {
    type: Date,
    default: Date.now,
  },
});

//   export type User = {
//     id: string;
//     name: string;
//     email: string;
// password: string;
// tel: string;
// role: string;
//     favourites_id: string | null;
//   };

export const User = mongoose.model("users", UserSchema);
