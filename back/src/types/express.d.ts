import { IUser } from "../entities/User";

declare global {
  namespace Express {
    interface Request {
      user?: IUser;
      task?: ITasks;
    }
  }
}
