import type { Prisma, User } from "@prisma/client";
import type { ScenarioData } from "@redwoodjs/testing/api";

export const standard = defineScenario<Prisma.UserCreateArgs>({
  user: {
    one: {
      data: {
        username: "String5933644",
        hashedPassword: "String",
        salt: "String",
      },
    },
    two: {
      data: {
        username: "String5166121",
        hashedPassword: "String",
        salt: "String",
      },
    },
  },
});

export type StandardScenario = ScenarioData<User, "user">;
