import type {
  QueryResolvers,
  MutationResolvers,
  ProductRelationResolvers,
} from 'types/graphql'

import { db } from 'src/lib/db'

export const productsByUser: QueryResolvers['productsByUser'] = ({
  userId,
}) => {
  return db.product.findMany({
      where: {
        userId,
        deleted: false
      },
      orderBy: { id: 'desc' },
  })
}

export const vendorProducts: QueryResolvers['vendorProducts'] = () => {
  return db.product.findMany({
      where: {
        availability: true,
        user: {
          deleted: false,
          roles: {
            contains: "VENDOR"
          },
          verified: true,
          locationHidden: false
        }
      },
      orderBy: { id: 'desc' },
  })
}

const PRODUCTS_PER_PAGE = 5

export const productPage: QueryResolvers['productPage'] = async ({
  page = 1,
  filter
}) => {
  const filteredFilter = Object.fromEntries(
    Object.entries(filter || {}).filter(([_, value]) => value !== null && value !== undefined)
  );

  const offset = (page - 1) * PRODUCTS_PER_PAGE

  const products = await db.product.findMany({
    take: 5,
    skip: offset,
    where: {...filteredFilter}
  })

  const count = await db.product.count({
    where: {...filteredFilter}
  })
  return {
    products,
    count,
  }
}

