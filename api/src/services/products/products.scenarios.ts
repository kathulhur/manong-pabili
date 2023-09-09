import type { Prisma, Product } from "@prisma/client";
import type { ScenarioData } from "@redwoodjs/testing/api";

export const standard = defineScenario<Prisma.ProductCreateArgs>({
  product: {
    one: {
      data: {
        name: "String",
        availability: true,
        user: {
          create: {
            email: "String444216",
            username: "String6757584",
            name: "String",
            gender: "String",
            mobileNumber: "String",
          },
        },
      },
    },
    two: {
      data: {
        name: "String",
        availability: true,
        user: {
          create: {
            email: "String2367247",
            username: "String381799",
            name: "String",
            gender: "String",
            mobileNumber: "String",
          },
        },
      },
    },
  },
});

export type StandardScenario = ScenarioData<Product, "product">;
