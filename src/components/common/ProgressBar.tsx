import React from 'react';
import { cn } from '@/lib/utils';

interface ProgressBarProps {
  progress: number; // 0 to 100
  size?: 'sm' | 'md' | 'lg';
  color?: 'primary' | 'success' | 'warning' | 'purple';
  showLabel?: boolean;
  label?: string;
  className?: string;
}

export default function ProgressBar({
  progress,
  size = 'md',
  color = 'primary',
  showLabel = false,
  label,
  className,
}: ProgressBarProps) {
  const clampedProgress = Math.min(100, Math.max(0, progress));

  const heightClasses = {
    sm: 'h-1.5',
    md: 'h-2.5',
    lg: 'h-3.5',
  };

  const colorClasses = {
    primary: 'bg-[#1a73e8]',
    success: 'bg-[#16a34a]',
    warning: 'bg-[#f59e0b]',
    purple: 'bg-[#7c3aed]',
  };

  return (
    <div className={cn('w-full', className)}>
      {showLabel && (
        <div className="flex justify-between items-center text-xs font-medium text-[#6b7280] mb-1.5">
          <span>{label || 'Progress'}</span>
          <span className="font-semibold text-[#1f2937]">{Math.round(clampedProgress)}%</span>
        </div>
      )}
      <div className={cn('w-full bg-[#f3f4f6] rounded-full overflow-hidden', heightClasses[size])}>
        <div
          className={cn('h-full rounded-full transition-all duration-500 ease-out', colorClasses[color])}
          style={{ width: `${clampedProgress}%` }}
        />
      </div>
    </div>
  );
}
