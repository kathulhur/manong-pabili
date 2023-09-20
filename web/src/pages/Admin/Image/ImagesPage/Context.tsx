import { createContext } from 'react'

export interface ImagesPageContextProps {
    userId: number | string
    children: React.ReactNode
}

export interface ImagesPageContextValue {
    userId: number
}

export const ImagesPageContext = createContext<ImagesPageContextValue>(null)

export const ImagesPageContextProvider = ({
    userId,
    children,
}: ImagesPageContextProps) => {
    return (
        <ImagesPageContext.Provider
            value={{
                userId: typeof userId === 'string' ? parseInt(userId) : userId,
            }}
        >
            {children}
        </ImagesPageContext.Provider>
    )
}
