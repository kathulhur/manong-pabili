import { ReactNode } from 'react'

const Skeleton = ({ children }: { children: ReactNode }) => {
    return <div className="animate-pulse">{children}</div>
}

Skeleton.Circle = ({ size = 60 }: { size?: number }) => {
    return (
        <div
            style={{ width: size, height: size }}
            className="bg-gray-200 rounded-full"
        ></div>
    )
}

Skeleton.Rectangle = ({
    width = '100%',
    height = 40,
    lines = 1,
    gap = 4,
}: {
    width?: number | string
    height?: number
    lines?: number
    gap?: number
}) => {
    return (
        <div className="flex flex-col" style={{ gap }}>
            {Array(lines)
                .fill(null)
                .map(() => {
                    return (
                        <div
                            style={{ width, height }}
                            className="bg-gray-200 rounded-md"
                        ></div>
                    )
                })}
        </div>
    )
}

export default Skeleton
