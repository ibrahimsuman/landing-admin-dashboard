import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
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
            <div className=" rounded-4px">
              <div className="relative bg-inherit">
                  <Label htmlFor={name} className="mb-2">
                  {title}
                </Label>
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
                  className={cn( "p-2",
                    fieldState.error
                      ? 'border-red-500 focus:ring-red-500'
                      : 'border-gray-300 focus:ring-primary',
                    className
                  )}
                  placeholder={placeholder}
                />
              
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
