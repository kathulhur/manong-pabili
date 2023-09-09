import type { Prisma, User } from "@prisma/client";
import type { ScenarioData } from "@redwoodjs/testing/api";

export const standard = defineScenario<Prisma.UserCreateArgs>({
  user: {
    one: {
      data: {
        email: "String5354092",
        username: "String3341131",
        name: "String",
        gender: "String",
        mobileNumber: "String",
      },
    },
    two: {
      data: {
        email: "String3638701",
        username: "String872993",
        name: "String",
        gender: "String",
        mobileNumber: "String",
      },
    },
  },
});

export type StandardScenario = ScenarioData<User, "user">;
