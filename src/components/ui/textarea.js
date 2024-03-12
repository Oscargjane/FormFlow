import * as React from 'react';

import { cn } from '@/lib/utils';

const Textarea = React.forwardRef(({ className, ...props }, ref) => {
  const innerRef = React.useRef(null);
  const textareaRef = ref || innerRef;

  if (!textareaRef.current) {
    React.useEffect(() => {
      const currentRef = textareaRef.current;
      if (currentRef) {
        currentRef.style.height = 'auto';
        currentRef.style.height = `${currentRef.scrollHeight}px`;
      }
    }, [props.value, textareaRef]);
  }

  return (
    <textarea
      className={cn(
        'flex min-h-[80px] w-full rounded-md border border-neutral-200 bg-white px-3 py-2 text-sm ring-offset-white placeholder:text-neutral-500 disabled:cursor-not-allowed disabled:opacity-50',
        className,
      )}
      ref={textareaRef}
      {...props}
    />
  );
});
Textarea.displayName = 'Textarea';

export { Textarea };
