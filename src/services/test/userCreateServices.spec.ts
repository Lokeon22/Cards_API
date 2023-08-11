import { UserRepositoryInMemory } from "../../repositories/repo_memory/UserRepositoryInMemory";
import { AppError } from "../../utils/AppError";
import { UserCreateServices } from "../UserCreateServices";

describe("Create user", () => {
  let userRepositoryInMemory: UserRepositoryInMemory;
  let userCreateService: UserCreateServices;

  beforeEach(() => {
    userRepositoryInMemory = new UserRepositoryInMemory();
    userCreateService = new UserCreateServices(userRepositoryInMemory);
  });

  it("user should be created", async () => {
    const userData = {
      name: "test",
      email: "test@gmail.com",
      password: "123",
    };

    const userCreated = await userCreateService.execute(userData);

    expect(userCreated).toHaveProperty("id");
  });

  it("If email exists return error", async () => {
    const user1 = {
      name: "test1",
      email: "teste@gmail.com",
      password: "123",
    };

    const user2 = {
      name: "test2",
      email: "teste@gmail.com",
      password: "123",
    };

    await userCreateService.execute(user1);
    await expect(userCreateService.execute(user2)).rejects.toEqual(new AppError("Email já existe"));
  });
});
