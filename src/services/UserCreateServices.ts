import { UserRepository } from "../repositories/UserRepository";
import { UserCreateProps } from "../@types/User";

import { hash } from "bcrypt";
import { AppError } from "../utils/AppError";

class UserCreateServices {
  userRepository;
  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository;
  }

  async execute({ name, email, password }: UserCreateProps) {
    if (!name || !email || !password) {
      throw new AppError("Preencha todos os campos");
    }

    const verifyEmail = await this.userRepository.verifyEmailExists(email);

    if (verifyEmail) throw new AppError("Email já existe");

    const hashPass = await hash(password, 8);

    const userCreated = await this.userRepository.create({
      name,
      email,
      password: hashPass,
    });

    return userCreated;
  }
}

export { UserCreateServices };
