import React from 'react';
import { STATUS_COLORS, STATUS_LABELS } from '@/lib/utils';
import { cn } from '@/lib/utils';

interface StatusBadgeProps {
  status: string;
  size?: 'sm' | 'md' | 'lg';
  showDot?: boolean;
  className?: string;
}

export default function StatusBadge({
  status,
  size = 'md',
  showDot = true,
  className,
}: StatusBadgeProps) {
  const colors = STATUS_COLORS[status] || STATUS_COLORS.DRAFT;
  const label = STATUS_LABELS[status] || status;

  const sizeStyles = {
    sm: 'text-[11px] px-2 py-0.5 gap-1.5',
    md: 'text-xs px-2.5 py-1 gap-1.5',
    lg: 'text-sm px-3.5 py-1.5 gap-2',
  };

  const dotSizes = {
    sm: 'w-1.5 h-1.5',
    md: 'w-2 h-2',
    lg: 'w-2.5 h-2.5',
  };

  return (
    <span
      className={cn(
        'inline-flex items-center font-medium rounded-full transition-colors',
        colors.bg,
        colors.text,
        sizeStyles[size],
        className
      )}
    >
      {showDot && (
        <span
          className={cn('rounded-full shrink-0 animate-pulse', colors.dot, dotSizes[size])}
        />
      )}
      <span>{label}</span>
    </span>
  );
}
