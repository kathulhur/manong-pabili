import type {
  QueryResolvers,
  MutationResolvers,
  ImageRelationResolvers,
} from "types/graphql";

import { db } from "src/lib/db";
import { pusher } from "src/functions/broadcast/broadcast";

export const images: QueryResolvers["images"] = () => {
  return db.image.findMany();
};

export const image: QueryResolvers["image"] = ({ id }) => {
  return db.image.findUnique({
    where: { id },
  });
};

export const createImage: MutationResolvers["createImage"] = async ({ input }) => {

  const newImage = await db.image.create({
    data: input,
  });

  pusher.trigger(process.env.PUSHER_CHANNEL, "image-create", {
    newImage: {
      __typename: "Image",
      ...newImage,
    }
  });

  return newImage
};

export const updateImage: MutationResolvers["updateImage"] = ({
  id,
  input,
}) => {
  return db.image.update({
    data: input,
    where: { id },
  });
};

export const deleteImage: MutationResolvers["deleteImage"] = ({ id }) => {
  return db.image.delete({
    where: { id },
  });
};

export const Image: ImageRelationResolvers = {
  user: (_obj, { root }) => {
    return db.image.findUnique({ where: { id: root?.id } }).user();
  },
};
