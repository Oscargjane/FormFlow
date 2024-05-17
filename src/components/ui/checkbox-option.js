'use client';

import { Controller } from 'react-hook-form';
import { useState, forwardRef } from 'react';
import { Textarea } from '@/components/ui/textarea.js';
import { Button } from '@/components/ui/button.js';
import Icon from '@/components/ui/icon.js';

const CheckboxOption = forwardRef(
  ({ option: { id, value }, index, isEditing, control, applyChanges, onRemove }, ref) => {
    const fieldName = `options[${index}].value`;

    const [isHovered, setIsHovered] = useState(false);

    return (
      <div
        className="relative w-full space-y-4 p-2 px-3 backdrop:cursor-pointer"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="flex items-center justify-center">
          <div className="flex-shrink-0 box-border bg-white border rounded-full w-5 h-5" />
          <Controller
            control={control}
            name={fieldName}
            defaultValue={value}
            render={({ field }) => (
              <Textarea
                {...field}
                ref={ref}
                rows={1}
                onBlur={(e) => {
                  field.onChange(e);
                  applyChanges();
                }}
                onChange={(e) => {
                  field.onChange(e);
                }}
                className="resize-none w-full min-h-min ml-3 p-3
                   rounded-md border border-neutral-300 shadow-sm focus:border-neutral-500 focus:ring-neutral-500  focus:outline-none bg-transparent text-neutral-800 text-[15px] overflow-hidden"
              />
            )}
          />
          <div className="ml-3 w-5 h-5">
            {isHovered && (
              <Button
                role="button"
                size="icon"
                variant="ghost"
                onClick={() => onRemove(index)}
                className="w-full h-full text-gray-500 hover:text-red-500 hover:bg-transparent"
              >
                <Icon name="Trash" className="w-4 h-4" />
              </Button>
            )}
          </div>
        </div>
      </div>
    );
  },
);

export default CheckboxOption;
