import { InMemoryUsersRepository } from '../../repositories/in-memory/InMemoryUsersRepository';
import { CreateUserError } from './CreateUserError';
import { CreateUserUseCase } from './CreateUserUseCase';

let createUserUseCase: CreateUserUseCase;
let userRepositoryInMemory: InMemoryUsersRepository;

describe("Create Car", () => {
  beforeEach(() => {
    userRepositoryInMemory = new InMemoryUsersRepository();
    createUserUseCase = new CreateUserUseCase(userRepositoryInMemory);
  });

  it("should be able to create a new user", async () => {
    const user = await createUserUseCase.execute({
      name: "Matheus do Carmo",
      email: "teste@gmail.com",
      password: '123456'
    });
    expect(user).toHaveProperty("id");
  });

  it("should not be able to create a user with exists email", async () => {
    await createUserUseCase.execute({
      name: "Matheus do Carmo",
      email: "teste@gmail.com",
      password: '123456'
    });


    await expect(
      createUserUseCase.execute({
        name: "Matheus do Carmo",
        email: "teste@gmail.com",
        password: '123456'
      })
    ).rejects.toEqual(new CreateUserError());;
  })


});
