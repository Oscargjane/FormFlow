'use client';

import * as React from 'react';
import { Textarea } from '@/components/ui/textarea.js';
import { cn } from '@/lib/utils';

const QuestionInput = React.forwardRef(
  ({ className, register, watch, setValue, applyChanges, ...props }, ref) => {
    const fieldName = 'question';
    register(fieldName);
    const fieldValue = watch(fieldName, '');

    const handleChange = React.useCallback(
      (e) => {
        setValue(fieldName, e.target.value);
        applyChanges();
      },
      [setValue, applyChanges],
    );

    return (
      <Textarea
        ref={ref}
        rows={1}
        name={fieldName}
        value={fieldValue}
        onChange={handleChange}
        maxLength={150}
        className={cn(
          'resize-none w-full min-h-min my-3 bg-transparent border-0 border-transparent rounded-none text-[15px] font-medium text-neutral-700 focus:bg-neutral-100 y focus:border-b-2 focus:border-blue-400 focus:outline-none focus:ring-0 focus-visible:ring-0 overflow-hidden',
          className,
        )}
        {...props}
      />
    );
  },
);

QuestionInput.displayName = 'QuestionInput';

export default QuestionInput;
