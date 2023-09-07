import { ButtonHTMLAttributes, ReactElement, ReactNode } from "react";
import { clsx } from 'clsx';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'danger' | 'subtle';
  icon?: ReactNode;
  fullWidth?: boolean;
  className?: string;
}

const Button = ({ variant = 'primary', icon, fullWidth, className, children, ...props }: ButtonProps) => {
  return (
    <button className={clsx(
      'flex items-center justify-center gap-2 p-2 rounded-lg font-semibold ease-in-out transition disabled:text-slate-500 disabled:bg-slate-200 disabled:cursor-not-allowed',
      !props.disabled && 'hover:translate-y-[2px] hover:opacity-90 active:translate-y-[4px]',
      variant === 'primary' && 'bg-green-600 text-slate-50',
      variant === 'secondary' && 'border-2 border-solid border-slate-200 text-slate-900',
      variant === 'outline' && 'border-2 border-solid border-green-600 text-green-600',
      variant === 'danger' && 'border-2 border-solid border-red-200 text-red-700',
      variant === 'subtle' && 'px-0 text-green-600',
      fullWidth && 'w-full',
      className,
    )} {...props}>
      {icon && <span className="w-6 h-6">{icon}</span>}
      {children}
    </button>
  );
};

export default Button;
