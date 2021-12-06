/* eslint-disable no-console */
import { getRepository } from "typeorm";
import { User } from "../entities/User";

export const seedUser = async () => {
  const user = new User();
  const userRepository = await getRepository(User);

  user.firstName = "Prince";
  user.lastName = "Juguilon";
  user.email = "princejoogie@gmail.com";
  user.password = "admin";
  user.hashPassword();
  await userRepository.save(user);
  console.log("user created: ", user);
};
