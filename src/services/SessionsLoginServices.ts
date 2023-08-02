import { UserRepository } from "../repositories/UserRepository";
import { authConfigs } from "../configs/auth";
import { compare } from "bcrypt";
import { sign } from "jsonwebtoken";

import { AppError } from "../utils/AppError";

class SessionsLoginServices {
  userRepository;
  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository;
  }

  async execute({ email, password }: { email: string; password: string }) {
    const user = await this.userRepository.verifyEmailExists(email);

    if (!user) throw new AppError("Email e/ou senha incorretas");

    const verifyPass = await compare(password, user.password);

    if (!verifyPass) throw new AppError("Email e/ou senha incorretas");

    const { secret, expiresIn } = authConfigs.jwt;

    const token: string = sign({}, secret, {
      subject: String(user.id),
      expiresIn,
    });

    return { user, token };
  }
}

export { SessionsLoginServices };
