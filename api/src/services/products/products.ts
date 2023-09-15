import type {
  QueryResolvers,
  MutationResolvers,
  ProductRelationResolvers,
} from "types/graphql";
import { pusher } from "src/lib/pusher";
import { db } from "src/lib/db";

export const products: QueryResolvers["products"] = () => {
  return db.product.findMany();
};

export const product: QueryResolvers["product"] = ({ id }) => {
  return db.product.findUnique({
    where: { id },
  });
};

export const createProduct: MutationResolvers["createProduct"] = ({
  input,
}) => {
  return db.product.create({
    data: input,
  });
};

export const updateProduct: MutationResolvers["updateProduct"] = async ({
  id,
  input,
}) => {

  const updatedProduct = await db.product.update({
    data: input,
    where: { id },
  });

  pusher.trigger(process.env.PUSHER_CHANNEL, "product-update", {
    updatedProduct: {
      __typename: "Product",
      ...updatedProduct,
    }
  });

  return updatedProduct

};

export const deleteProduct: MutationResolvers["deleteProduct"] = ({ id }) => {
  return db.product.delete({
    where: { id },
  });
};

export const Product: ProductRelationResolvers = {
  user: (_obj, { root }) => {
    return db.product.findUnique({ where: { id: root?.id } }).user();
  },
};
