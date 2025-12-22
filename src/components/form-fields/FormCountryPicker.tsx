import React from "react";
import { Control, FieldValues, Path } from "react-hook-form";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { CountryDropdown, Country } from "@/components/ui/country-dropdown";

interface FormCountryPickerProps<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  label?: string;
  description?: string;
  placeholder?: string;
  disabled?: boolean;
  slim?: boolean;
  className?: string;
}

export function FormCountryPicker<T extends FieldValues>({
  control,
  name,
  label,
  description,
  placeholder = "Select a country",
  disabled,
  slim = false,
  className = "",
}: FormCountryPickerProps<T>) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          {label && <FormLabel>{label}</FormLabel>}
          <FormControl>
            <CountryDropdown
              placeholder={placeholder}
              defaultValue={field.value}
              onChange={(country: Country) => {
                field.onChange(country.alpha3);
              }}
              disabled={disabled}
              slim={slim}
              {...(className && { className })}
            />
          </FormControl>
          {description && <FormDescription>{description}</FormDescription>}
          <FormMessage />
        </FormItem>
      )}
    />
  );
}