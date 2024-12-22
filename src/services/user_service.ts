import { User } from '../shemas/user_shema';
import { CreateUserDto, User as UserType } from '../types';

export const createMongoUser = async (data: CreateUserDto) => {
  const newUser = new User(data);
  return newUser.save().then(() => console.log('Saved new user'));
};
