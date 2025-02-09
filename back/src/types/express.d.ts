import { IUser } from "../entities/User";
import { ITasks } from "../entities/Tasks";

declare global {
  namespace Express {
    interface Request {
      user?: IUser;
      task?: ITasks;
    }
  }
}
