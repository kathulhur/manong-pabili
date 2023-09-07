import type { Prisma, Image } from "@prisma/client";
import type { ScenarioData } from "@redwoodjs/testing/api";

export const standard = defineScenario<Prisma.ImageCreateArgs>({
  image: {
    one: {
      data: {
        title: "String",
        url: "String",
        user: {
          create: {
            username: "String3187742",
            hashedPassword: "String",
            salt: "String",
          },
        },
      },
    },
    two: {
      data: {
        title: "String",
        url: "String",
        user: {
          create: {
            username: "String8553485",
            hashedPassword: "String",
            salt: "String",
          },
        },
      },
    },
  },
});

export type StandardScenario = ScenarioData<Image, "image">;
