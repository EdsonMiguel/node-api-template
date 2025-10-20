import User from "@modules/user/infra/typeorm/entities/User";
import { faker } from "@faker-js/faker";

export function makeUser(override: Partial<User> = {}) {
  const user = new User();
  user.id = override.id || faker.string.uuid();
  user.name = override.name || faker.person.fullName();
  user.email = override.email || faker.internet.email();
  user.password = override.password || faker.internet.password();

  return user;
}
