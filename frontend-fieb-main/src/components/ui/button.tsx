import Lottie from "lottie-react";

import Loading from '@/animations/loading.json';
import clsx from "clsx";
import { ButtonHTMLAttributes } from "react";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
    children?: React.ReactNode;
    isLoading?: boolean;
    onClick?: () => void;
    variant?: Variants;
    className?: string;
    disabled?: boolean;
}

type Variants = 'primary' | 'secondary' | 'danger';

export function Button({ children, isLoading = false, onClick, variant = 'primary', className, disabled = false }: ButtonProps) {
    return (
        <button disabled={isLoading || disabled} onClick={onClick} className={clsx(
            `${isLoading && 'opacity-70'} gap-2 w-full font-semibold disabled:opacity-30 disabled:cursor-not-allowed p-2.5 rounded-lg transition-all flex items-center justify-center ${className}`,

            variant === 'primary' && 'bg-blue-500 text-white hover:bg-blue-600',
            variant === 'secondary' && 'bg-gray-100 text-gray-800 hover:bg-gray-200',
            variant === 'danger' && 'bg-red-500 text-white hover:bg-red-600',



        )}>
            {
                isLoading ? (
                    <Lottie animationData={Loading} loop={true} className="size-6" />
                ) : (
                    children
                )
            }
        </button>
    )
}