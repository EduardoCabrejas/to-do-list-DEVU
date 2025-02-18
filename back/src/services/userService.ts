import { User } from "../entities/User";
import { UserDto } from "../dto/UserDto";
import { Task } from "../entities/Task";

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

  export const updateUser = async (id: string, userData: UserDto): Promise<UserDto> => {
    const allowedFields: (keyof UserDto)[] = ['name', 'gender', 'birthdate'];
    const updateData: Partial<UserDto> = {};
  
    // We just allow to update the fields described in allowedFields
    allowedFields.forEach((field) => {
      if (userData[field] !== undefined) {
        updateData[field] = userData[field] as any;
      }
    });
  
    // Si el email está siendo enviado como parte de la solicitud, lo ignoramos
    if (userData.email) {
      console.log("Email not updated: ", userData.email);
    }
  
    // Si el campo birthdate está presente, recalculamos la edad
    if (userData.birthdate) {
      const birthDateObj = new Date(userData.birthdate);
      const today = new Date();
      let calculatedAge = today.getFullYear() - birthDateObj.getFullYear();
      const monthDiff = today.getMonth() - birthDateObj.getMonth();
      const dayDiff = today.getDate() - birthDateObj.getDate();
  
      // Ajustar edad si el cumpleaños no ha pasado este año
      if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
        calculatedAge--;
      }
  
      // Actualizamos la edad
      updateData.age = calculatedAge;
  
      // Si la edad es menor que 9, lanzamos un error
      if (calculatedAge < 9) {
        throw new Error("Age must be at least 9 years old.");
      }
    }
  
    // If there are no fields to update, we show an error
    if (Object.keys(updateData).length === 0) {
      throw new Error("No valid fields provided for update.");
    }
  
    // Realizamos la actualización
    const user = await User.findByIdAndUpdate(id, updateData, { new: true });
  
    if (!user) throw new Error(`User does not exist`);
  
    console.log('Updated user data:', user);
    return new UserDto(user);
  };  

  export const deleteUser = async (id: string) => {
    const user = await User.findByIdAndDelete(id);
    if (!user) throw new Error(`User does not exist`);
  
    await Task.deleteMany({ userId: id });  
    return { message: "User deleted successfully", deletedUser: new UserDto(user) };
  };