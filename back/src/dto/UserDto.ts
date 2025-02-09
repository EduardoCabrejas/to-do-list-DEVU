import { TaskDto } from "./TaskDto";

export class UserDto {
  id: string;
  name: string;
  email: string;
  age: number;
  gender?: string;
  tasks?: TaskDto[];

  constructor(user: any) {
    this.id = user._id.toString();
    this.name = user.name;
    this.email = user.email;
    this.age = user.age;
    this.gender = user.gender || undefined;
    this.tasks = user.tasks ? user.tasks.map((task: any) => new TaskDto(task)) : [];
  }

  static fromUser(user: any): UserDto {
    return new UserDto(user);
  }
}