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
            email: "String9195689",
            username: "String6946601",
            name: "String",
            gender: "String",
            mobileNumber: "String",
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
            email: "String5921601",
            username: "String1278643",
            name: "String",
            gender: "String",
            mobileNumber: "String",
          },
        },
      },
    },
  },
});

export type StandardScenario = ScenarioData<Image, "image">;
