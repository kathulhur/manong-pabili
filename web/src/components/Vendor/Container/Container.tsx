import { ReactNode } from 'react'

const Container = ({ children }: { children: ReactNode }) => {
    return <div className="max-w-2xl mx-auto p-8">{children}</div>
}

export default Container
