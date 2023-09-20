import { createContext } from 'react'

export interface MarkersPageContextProps {
    userId: number | string
    children: React.ReactNode
}

export interface MarkersPageContextValue {
    userId: number
}

export const MarkersPageContext = createContext<MarkersPageContextValue>(null)

export const MarkersPageContextProvider = ({
    userId,
    children,
}: MarkersPageContextProps) => {
    return (
        <MarkersPageContext.Provider
            value={{
                userId: typeof userId === 'string' ? parseInt(userId) : userId,
            }}
        >
            {children}
        </MarkersPageContext.Provider>
    )
}
