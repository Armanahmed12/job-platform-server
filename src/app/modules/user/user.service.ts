import { IUser } from "./user.interface.js";
import { User } from "./user.model.js";

const createUserInDB = async(userData : Object) =>{

      const user = await User.create(userData);
      return user;

};

export const UserServices = {
  createUserInDB
};





