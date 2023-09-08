import type {
  QueryResolvers,
  MutationResolvers,
  ImageRelationResolvers,
} from "types/graphql";

import { db } from "src/lib/db";

const IMAGES_PER_PAGE = 5;
export const imagePage: QueryResolvers["imagePage"] = async ({
  page = 1,
  filter
}) => {
  const filteredFilter = Object.fromEntries(
    Object.entries(filter || {}).filter(([_, value]) => value !== null && value !== undefined)
  );

  const offset = (page - 1) * IMAGES_PER_PAGE;


  const images = await db.image.findMany({
    take: IMAGES_PER_PAGE,
    skip: offset,
    where: {...filteredFilter}
  });

  const count = await db.image.count({
    where: {...filteredFilter}
  });
  return {
    images,
    count,
  };
}

export const softDeleteImage: MutationResolvers["softDeleteImage"] = async ({
  id,
}) => {
  const image = await db.image.update({
    where: { id },
    data: {
      deleted: true,
      deletedAt: new Date(),
    },
  });

  return image;
}