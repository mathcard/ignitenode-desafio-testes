import { InMemoryUsersRepository } from '../../repositories/in-memory/InMemoryUsersRepository';
import { IncorrectEmailOrPasswordError } from './IncorrectEmailOrPasswordError';
import { AuthenticateUserUseCase } from './AuthenticateUserUseCase';
import { CreateUserUseCase } from '../createUser/CreateUserUseCase';
import { ICreateUserDTO } from "../createUser/ICreateUserDTO";


let authenticateUserUseCase: AuthenticateUserUseCase;
let createUserUseCase: CreateUserUseCase;
let inMemoryUsersRepository: InMemoryUsersRepository;
/*
describe("Authenticated User", () => {
  beforeEach(() => {
    userRepositoryInMemory = new InMemoryUsersRepository();
    createUserUseCase = new CreateUserUseCase(userRepositoryInMemory);
    authenticateUserUseCase = new AuthenticateUserUseCase(userRepositoryInMemory);
  });

  it("should be able to authenticated user", async () => {
    await createUserUseCase.execute({
      name: "Matheus do Carmo",
      email: "teste@gmail.com",
      password: '123456'
    });

    const auth = await authenticateUserUseCase.execute({
      email: "teste@gmail.com",
      password: '123456'
    })

    expect(auth).toHaveProperty("token");
  });

});*/

describe("Authenticate a user", () => {
  beforeEach(() => {
    inMemoryUsersRepository = new InMemoryUsersRepository();
    authenticateUserUseCase = new AuthenticateUserUseCase(inMemoryUsersRepository);
    createUserUseCase = new CreateUserUseCase(inMemoryUsersRepository);
  });

  it("should be able to authenticate a user", async () => {
    const user: ICreateUserDTO = {
      name: "Name User",
      email: "user@email.com",
      password: "1234",
    };
    await createUserUseCase.execute(user);

    const result = await authenticateUserUseCase.execute({
      email: user.email,
      password: user.password,
    });
    console.log(result)
    expect(result).toHaveProperty("token");
  });

  it("should not be able to authenticate a non-existent user", () => {
    expect(async () => {
      await authenticateUserUseCase.execute({
        email: "error@mail.com",
        password: "1234",
      });
    }).rejects.toBeInstanceOf(IncorrectEmailOrPasswordError);
  });

  it("should not be able to authenticate a user with incorrect password", () => {
    expect(async () => {
      const user: ICreateUserDTO = {
        name: "User Error",
        email: "error@mail.com",
        password: "1234",
      };
      await createUserUseCase.execute(user);

      await authenticateUserUseCase.execute({
        email: user.email,
        password: "incorrectPassword",
      });
    }).rejects.toBeInstanceOf(IncorrectEmailOrPasswordError);
  });
})
