import { UserDto } from "../dto/UserDto";
import { TaskDto } from "../dto/TaskDto";

declare global {
  namespace Express {
    interface Request {
      user?: UserDto;
      task?: TaskDto;
    }
  }
}
