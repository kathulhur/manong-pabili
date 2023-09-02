import type {
    QueryResolvers,
    MutationResolvers,
    ProductRelationResolvers,
} from 'types/graphql'

import { db } from 'src/lib/db'
import { validate } from '@redwoodjs/api'

export const products: QueryResolvers['products'] = () => {
    return db.product.findMany()
}

export const productsByUser: QueryResolvers['productsByUser'] = ({
    userId,
}) => {
    return db.product.findMany({
        where: { userId },
        orderBy: { id: 'desc' },
    })
}

export const vendorProducts: QueryResolvers['vendorProducts'] = () => {
    return db.product.findMany({
        where: {
            availability: true,
            user: {
                roles: {
                    contains: 'VENDOR',
                },
                verified: true,
                deleted: false,
                locationHidden: false
            }
        }
    })
}

export const product: QueryResolvers['product'] = ({ id }) => {
    return db.product.findUnique({
        where: { id },
    })
}

export const createProduct: MutationResolvers['createProduct'] = ({
    input,
}) => {
    const { name } = input

    validate(name, "Name", {
        length: { min: 3, max: 50 },
        presence: true,
    })


    return db.product.create({
        data: input,
    })
}

export const updateProduct: MutationResolvers['updateProduct'] = ({
    id,
    input,
}) => {
    return db.product.update({
        data: input,
        where: { id },
    })
}

export const deleteProduct: MutationResolvers['deleteProduct'] = ({ id }) => {
    return db.product.delete({
        where: { id },
    })
}

export const Product: ProductRelationResolvers = {
    user: (_obj, { root }) => {
        return db.product.findUnique({ where: { id: root?.id } }).user()
    },
}
