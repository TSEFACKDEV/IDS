import { cn } from '@/lib/utils';

type NiveauAllemand = 'A1' | 'A2' | 'B1' | 'B2' | 'C1' | 'C2';
type BadgeVariant = NiveauAllemand | 'examen' | 'default';

interface BadgeProps {
  label: string;
  variant?: BadgeVariant;
  className?: string;
}

const variantStyles: Record<BadgeVariant, string> = {
  A1: 'bg-emerald-100 text-emerald-800 border border-emerald-200',
  A2: 'bg-teal-100 text-teal-800 border border-teal-200',
  B1: 'bg-blue-100 text-blue-800 border border-blue-200',
  B2: 'bg-indigo-100 text-indigo-800 border border-indigo-200',
  C1: 'bg-ids-red-100 text-ids-red-700 border border-ids-red-100',
  C2: 'bg-ids-red-500 text-white border border-ids-red-600',
  examen: 'bg-amber-100 text-amber-800 border border-amber-200',
  default: 'bg-ids-gray-100 text-ids-gray-800 border border-ids-gray-200',
};

export default function Badge({
  label,
  variant = 'default',
  className,
}: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold tracking-wide uppercase',
        variantStyles[variant] ?? variantStyles.default,
        className
      )}
    >
      {label}
    </span>
  );
}
