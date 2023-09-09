import type { Prisma, Marker } from "@prisma/client";
import type { ScenarioData } from "@redwoodjs/testing/api";

export const standard = defineScenario<Prisma.MarkerCreateArgs>({
  marker: {
    one: {
      data: {
        url: "String",
        user: {
          create: {
            email: "String4152539",
            username: "String4674175",
            name: "String",
            gender: "String",
            mobileNumber: "String",
          },
        },
      },
    },
    two: {
      data: {
        url: "String",
        user: {
          create: {
            email: "String6829726",
            username: "String2608296",
            name: "String",
            gender: "String",
            mobileNumber: "String",
          },
        },
      },
    },
  },
});

export type StandardScenario = ScenarioData<Marker, "marker">;
