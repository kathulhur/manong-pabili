import { ButtonHTMLAttributes, ReactElement, ReactNode } from 'react'
import { clsx } from 'clsx'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'outline' | 'danger' | 'subtle'
    icon?: ReactNode
    fullWidth?: boolean
    className?: string
}

const Button = ({
    variant = 'primary',
    icon,
    fullWidth,
    className,
    children,
    ...props
}: ButtonProps) => {
    return (
        <button
            className={clsx(
                'inline-flex items-center justify-center gap-x-1.5 rounded-md px-3 py-2 text-sm font-semibold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600 disabled:text-gray-500 disabled:bg-gray-100 disabled:cursor-not-allowed',
                variant === 'primary' &&
                    'bg-green-600 text-white shadow-sm hover:bg-green-500',
                variant === 'secondary' &&
                    'ring-1 ring-inset ring-gray-300 text-gray-900 hover:bg-gray-50',
                variant === 'outline' &&
                    'ring-1 ring-inset ring-green-600 text-green-600 hover:bg-green-50',
                variant === 'danger' &&
                    'ring-1 ring-inset ring-red-300 text-red-900 hover:bg-red-50',
                variant === 'subtle' && 'px-0 text-green-600',
                fullWidth && 'w-full',
                className
            )}
            {...props}
        >
            {icon && <span className="w-5 h-5">{icon}</span>}
            {children}
        </button>
    )
}

export default Button
