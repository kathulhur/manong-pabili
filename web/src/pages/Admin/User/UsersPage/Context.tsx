import { Dispatch, createContext, useState } from 'react'

export interface UsersPageContextProps {
    page: number
    pageSize?: number
}

const PaginationContext = createContext<UsersPageContextProps>({
    page: 1,
    pageSize: 10,
})

const PaginationContextProvider = ({ children, page, pageSize }) => {
    return (
        <PaginationContext.Provider
            value={{
                page: typeof page === 'string' ? parseInt(page, 10) : page,
                pageSize:
                    typeof pageSize === 'string'
                        ? parseInt(pageSize, 10)
                        : pageSize,
            }}
        >
            {children}
        </PaginationContext.Provider>
    )
}

export { PaginationContext, PaginationContextProvider }
