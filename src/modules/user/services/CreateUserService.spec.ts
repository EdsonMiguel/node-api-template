import "reflect-metadata";

import { beforeEach, describe, expect, it } from "vitest";
import CreateUserService from "./CreateUserService";
import InMemoryUsersRepository from "@test/repositories/in-memory-users-repository";
import FakeHashProvider from "@test/cryptography/fake-hash";
import AppError from "@shared/errors/AppError";

let inMemoryUsersRepository: InMemoryUsersRepository;
let fakeHashProvider: FakeHashProvider;
let sut: CreateUserService;

describe("CreateUserService", () => {
  beforeEach(() => {
    inMemoryUsersRepository = new InMemoryUsersRepository();
    fakeHashProvider = new FakeHashProvider();
    sut = new CreateUserService(inMemoryUsersRepository, fakeHashProvider);
  });

  it("should be able to create a new user", async () => {
    const createUserService = await sut.execute({
      name: "Lucas Camargo",
      email: "lfqcamargo@gmail.com",
      password: "123456",
    });

    expect(createUserService).toBeDefined();
    expect(createUserService.name).toBe("Lucas Camargo");
    expect(createUserService.email).toBe("lfqcamargo@gmail.com");
    expect(createUserService.password).toBe("123456-hashed");
  });

  it("should not be able to create a new user with an email that already exists", async () => {
    await sut.execute({
      name: "Lucas Camargo",
      email: "lfqcamargo@gmail.com",
      password: "123456",
    });

    try {
      await sut.execute({
        name: "Camargo Lucas",
        email: "lfqcamargo@gmail.com",
        password: "654321",
      });
    } catch (error) {
      expect(error).toBeInstanceOf(AppError);
      expect((error as AppError).message).toBe(
        "Este endereço de email já está em uso."
      );
      expect((error as AppError).statusCode).toBe(409);
    }
  });
});
