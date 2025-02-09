import { User } from "../entities/User";
import { UserDto } from "../dto/UserDto";
import { Task } from "../entities/Task";

interface UpdateUserData {
  name?: string;
  email?: string;
  age?: number;
  gender?: string;
}

export const getAllUsers = async (): Promise<UserDto[]> => {
  const usersData = await User.find().populate("tasks", "title type");

  if (!usersData || usersData.length === 0) {
    return [];
  }

  return usersData.map(UserDto.fromUser);
};

  export const getUserById = async (userId: string): Promise<UserDto> => {
    const user = await User.findById(userId).populate("tasks", "title type");

    if (!user) {
      throw new Error("User not found");
    }

    return new UserDto(user);
  }

  export const updateUser = async (userId: string, userData: UpdateUserData): Promise<UserDto> =>{
    const user = await User.findByIdAndUpdate(userId, userData, { new: true });
    if (!user) throw new Error(`User does not exist`);
    return await new UserDto(user);
  }

  export const deleteUser = async (id: string) => {
    const user = await User.findByIdAndDelete(id);
    if (!user) throw new Error(`User does not exist`);
  
    await Task.deleteMany({ userId: id });  
    return { message: "User deleted successfully", deletedUser: new UserDto(user) };
  };