import type {
  QueryResolvers,
  MutationResolvers,
  UserRelationResolvers,
} from "types/graphql";

import { db } from "src/lib/db";

export const users: QueryResolvers["users"] = () => {
  console.log('users');
  return db.user.findMany();
};

export const user: QueryResolvers["user"] = ({ id }) => {
  return db.user.findUnique({
    where: { id },
  });
};

export const createUser: MutationResolvers["createUser"] = ({ input }) => {
  return db.user.create({
    data: input,
  });
};

export const updateUser: MutationResolvers["updateUser"] = ({ id, input }) => {
  return db.user.update({
    data: {
      ...input,
      updatedAt: new Date(),
    },
    where: { id },
  });
};

export const deleteUser: MutationResolvers["deleteUser"] = ({ id }) => {
  return db.user.delete({
    where: { id },
  });
};

export const User: UserRelationResolvers = {
  products: (_obj, { root }) => {
    return db.user.findUnique({ where: { id: root?.id } }).products();
  },
};
