import { TaskDto } from "../dto/TaskDto";
import { UserDto } from "../dto/UserDto";

declare global {
  namespace Express {
    interface Request {
      user?: UserDto;
      task?: TaskDto;
    }
  }
}
