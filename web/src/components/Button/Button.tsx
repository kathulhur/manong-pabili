import { ButtonHTMLAttributes, ReactElement, ReactNode } from "react";
import { clsx } from 'clsx';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary';
  icon?: ReactNode;
  fullWidth?: boolean;
  className?: string;
}

const Button = ({variant = 'primary', icon, fullWidth, className, children, ...props}: ButtonProps) => {

  return (
    <button className={clsx(
      'px-2 py-2 rounded-xl font-semibold',
      variant === 'primary' && 'bg-green-600 text-slate-50',
      fullWidth && 'w-full',
      className,
    )} {...props}>
      {icon && <span className="w-7 h-7">{icon}</span>}
      {children}
    </button>
  );
};

export default Button;
