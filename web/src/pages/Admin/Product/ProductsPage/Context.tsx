import { createContext } from 'react'

export interface ProductsPageContextProps {
    userId: number | string
    children: React.ReactNode
}

export interface ProductsPageContextValue {
    userId: number
}

export const ProductsPageContext = createContext<ProductsPageContextValue>(null)

export const ProductsPageContextProvider = ({
    userId,
    children,
}: ProductsPageContextProps) => {
    return (
        <ProductsPageContext.Provider
            value={{
                userId: typeof userId === 'string' ? parseInt(userId) : userId,
            }}
        >
            {children}
        </ProductsPageContext.Provider>
    )
}
