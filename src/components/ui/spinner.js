import * as React from 'react';
import { cn } from '@/lib/utils';

import Icon from '@/components/ui/icon.js';

const Spinner = React.forwardRef(({ size = '10', color = 'neutral', className }, ref) => {
  // Mapeo de tamaños y colores a clases de Tailwind
  const sizeMap = {
    4: 'h-4 w-4',
    6: 'h-6 w-6',
    8: 'h-8 w-8',
    10: 'h-10 w-10',
  };
  const colorMap = {
    neutral: 'text-neutral-500',
    yellow: 'text-yellow-500',
  };

  const sizeClass = sizeMap[size] || sizeMap['10'];
  const colorClass = colorMap[color] || colorMap['neutral'];

  return (
    <Icon
      name="LoaderCircle"
      className={cn(
        `animate-spin flex justify-center items-center ${sizeClass} ${colorClass}`,
        className,
      )}
      ref={ref}
    />
  );
});

Spinner.displayName = 'Spinner';

export { Spinner };
