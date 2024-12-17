import { User } from "../shemas/user_shema";
import { CreateUserDto, User as UserType } from "../types";

export const createMongoUser = async (data: CreateUserDto) => {
  const default_user = {
    name: "Default",
    email: "Default@gmail.com",
    password: "Default",
    tel: "+375 29 195-75-44",
    role: "Admin",
  };
  //     const newUser = new User({
  //         id: "Admin2",
  //         name: "Admin2",
  //         email: "admin2@gmail.com",
  //         password: "Admin2",
  //         tel: "+375 29 195-75-44",
  //         role: "Admin",
  //         favourites_id: "admin_favorite_id",
  //       });
  const newUser = new User(data || default_user);

  newUser.save().then(() => console.log("Saved new user"));
  return newUser;
};
