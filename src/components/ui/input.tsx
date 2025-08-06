import * as React from "react";
import { cn } from "@/lib/utils";

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "w-full rounded-md border border-gray-300 bg-transparent text-base placeholder:text-muted-foreground placeholder:opacity-100 shadow-xs outline-none transition-[color,box-shadow,border-color] disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 focus:border-blue-200 focus:ring-primary dark:bg-input/30",
        className
      )}
      {...props}
    />
  );
}

export { Input };
