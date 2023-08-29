import { ButtonHTMLAttributes, ReactElement, ReactNode } from "react";
import { clsx } from 'clsx';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'subtle';
  icon?: ReactNode;
  fullWidth?: boolean;
  className?: string;
}

const Button = ({ variant = 'primary', icon, fullWidth, className, children, ...props }: ButtonProps) => {
  return (
    <button className={clsx(
      'p-2 rounded-lg font-semibold ease-in-out transition disabled:text-slate-500 disabled:bg-slate-200',
      !props.disabled && 'hover:translate-y-[2px] hover:opacity-90 active:translate-y-[4px]',
      variant === 'primary' && 'bg-green-600 text-slate-50',
      variant === 'secondary' && 'bg-slate-100 text-slate-500',
      variant === 'outline' && 'border-2 border-solid border-green-600 text-green-600',
      variant === 'subtle' && 'text-green-600',
      fullWidth && 'w-full',
      className,
    )} {...props}>
      {icon && <span className="w-6 h-6 text-slate-100">{icon}</span>}
      {children}
    </button>
  );
};

export default Button;
