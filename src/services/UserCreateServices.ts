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

  async execute_update({ id, name, email }: { id: number; name: string; email: string }) {
    const user = await this.userRepository.verifyUserExists(id);

    if (!user) throw new AppError("Usuário não encontrado");

    const update = await this.userRepository.update({ id, name, email });

    return update;
  }
}

export { UserCreateServices };
