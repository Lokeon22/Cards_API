import { Request, Response } from "express";
import { UserRepository } from "../repositories/UserRepository";
import { SessionsLoginServices } from "../services/SessionsLoginServices";

class SessionsController {
  async create(req: Request, res: Response) {
    const { email, password }: { email: string; password: string } = req.body;

    const userRepository = new UserRepository();
    const sessionsLoginServices = new SessionsLoginServices(userRepository);

    const { user, token } = await sessionsLoginServices.execute({ email, password });

    return res.json({ user, token });
  }
}

export { SessionsController };
