import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface BadgeProps {
  children: ReactNode;
  variant?: "brand" | "success" | "neutral" | "warning";
  className?: string;
  icon?: ReactNode;
}

export default function Badge({
  children,
  variant = "neutral",
  className,
  icon,
}: BadgeProps) {
  const variantStyles = {
    brand: "bg-brand-50 text-brand-800 border-brand-200",
    success: "bg-emerald-50 text-emerald-800 border-emerald-200",
    neutral: "bg-stone-100 text-stone-700 border-stone-200",
    warning: "bg-amber-50 text-amber-800 border-amber-200",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border",
        variantStyles[variant],
        className
      )}
    >
      {icon && <span className="flex-shrink-0">{icon}</span>}
      <span>{children}</span>
    </span>
  );
}
