import "reflect-metadata";

import FakeHashProvider from "@test/cryptography/fake-hash";
import InMemoryUsersRepository from "@test/repositories/in-memory-users-repository";

import { beforeEach, describe, expect, it } from "vitest";
import AuthenticateUserService from "./AuthenticateUserService";
import InMemoryUserTokensRepository from "@test/repositories/in-memory-user-tokens-repository";
import { makeUser } from "@test/factories/make-user";
import AppError from "@shared/errors/AppError";

let inMemoryUsersRepository: InMemoryUsersRepository;
let inMemoryUserTokensRepository: InMemoryUserTokensRepository;

let fakeHashProvider: FakeHashProvider;

let sut: AuthenticateUserService;

describe("AuthenticateUserService", () => {
  beforeEach(() => {
    inMemoryUsersRepository = new InMemoryUsersRepository();
    fakeHashProvider = new FakeHashProvider();
    inMemoryUserTokensRepository = new InMemoryUserTokensRepository();

    sut = new AuthenticateUserService(
      inMemoryUsersRepository,
      inMemoryUserTokensRepository,
      fakeHashProvider
    );
  });

  it("should be able to authenticate a user", async () => {
    const user = makeUser();

    await inMemoryUsersRepository.create(user);

    const response = await sut.execute({
      email: user.email,
      password: user.password,
    });

    expect(response).toBeDefined();
    expect(response.user).toBeDefined();
    expect(response.user.id).toBe(user.id);
    expect(response.token).toBeDefined();
    expect(response.refresh_token).toBeDefined();
  });

  it("should not be able to authenticate a user with an invalid email", async () => {
    try {
      await sut.execute({
        email: "invalid-email@example.com",
        password: "123456",
      });
    } catch (error) {
      expect(error).toBeInstanceOf(AppError);
      expect((error as AppError).message).toBe("Email ou senha incorretos.");
      expect((error as AppError).statusCode).toBe(401);
    }
  });

  it("should not be able to authenticate a user with an invalid password", async () => {
    const user = makeUser();
    await inMemoryUsersRepository.create(user);

    try {
      await sut.execute({
        email: user.email,
        password: "wrong-password",
      });
    } catch (error) {
      expect(error).toBeInstanceOf(AppError);
      expect((error as AppError).message).toBe("Email ou senha incorretos.");
      expect((error as AppError).statusCode).toBe(401);
    }
  });
});
