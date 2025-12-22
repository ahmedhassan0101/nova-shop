import { Control, FieldValues, Path } from "react-hook-form";

import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

// FormRadioGroup Component
interface RadioOption {
  value: string;
  label: string;
}

interface FormRadioGroupProps<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  label?: string;
  description?: string;
  options: RadioOption[];
  disabled?: boolean;
  className?: string;
}

export function FormRadioGroup<T extends FieldValues>({
  control,
  name,
  label,
  description,
  options,
  disabled,
  className,
}: FormRadioGroupProps<T>) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className={`space-y-3 ${className}`}>
          {label && <FormLabel>{label}</FormLabel>}
          <FormControl>
            <RadioGroup
              onValueChange={field.onChange}
              defaultValue={field.value}
              disabled={disabled}
              className="grid w-full grid-cols-2"
            >
              {options.map((option) => (
                <div key={option.value} className="flex gap-3 items-center ">
                  <FormControl>
                    <RadioGroupItem value={option.value} id={option.value} />
                  </FormControl>
                  <FormLabel className="font-normal" htmlFor={option.value}>
                    {option.label}
                  </FormLabel>
                </div>
              ))}
            </RadioGroup>
          </FormControl>
          {description && <FormDescription>{description}</FormDescription>}
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
