import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import React from 'react';
import type { Control, RegisterOptions } from 'react-hook-form';


interface ECInputFieldProps {
  name: string;
  title: string;
  placeholder?: string;
  description?: string;
  control: Control<any>;
  className?: string;
  wrapClassName?: string;
  rules?: RegisterOptions;
  inputType?: string;
}

const labelStyle =
  'absolute cursor-text bg-white overflow-hidden  left-0 -top-3 !text-sm bg-inherit mx-1 px-3 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-placeholder-shown:top-3 peer-focus:-top-3  peer-focus:text-[12px] transition-all';
const inputBaseStyle =
  'peer bg-transparent h-12 rounded-[4px] placeholder-transparent px-2 focus:outline-none border';

const ECInputField: React.FC<ECInputFieldProps> = ({
  name,
  title,
  placeholder,
  description,
  control,
  className,
  wrapClassName,
  rules,
  inputType
}) => {
  return (
    <FormField
      control={control}
      name={name}
      rules={rules}
      render={({ field, fieldState }) => (
        <FormItem className={cn('w-full', wrapClassName)}>
          <FormControl>
            <div className="bg-white rounded-4px">
              <div className="relative bg-inherit">
                <Input
                  type={inputType || 'text'}
                  onChange={(e) => {
                    const value =
                      inputType === 'number' ? Number(e.target.value) : e.target.value;
                    field.onChange(value);
                  }}
                  value={field.value}
                  name={field.name}
                  onBlur={field.onBlur}
                  ref={field.ref}
                  id={name}
                  className={cn(
                    inputBaseStyle,
                    fieldState.error
                      ? 'border-red-500 focus:ring-red-500'
                      : 'border-gray-300 focus:ring-primary',
                    className
                  )}
                  placeholder={placeholder}
                />


                <label htmlFor={name} className={labelStyle}>
                  {title}
                </label>
              </div>
            </div>
          </FormControl>
          {description && <FormDescription>{description}</FormDescription>}
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default ECInputField;
