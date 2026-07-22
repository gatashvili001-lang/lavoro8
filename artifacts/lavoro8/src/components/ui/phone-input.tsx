import * as React from "react";
import PhoneInputLib from "react-phone-number-input";
import type { Country } from "react-phone-number-input";
import { cn } from "@/lib/utils";

interface PhoneInputProps {
  value?: string;
  onChange?: (value: string) => void;
  defaultCountry?: Country;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
}

export function PhoneInput({
  value,
  onChange,
  defaultCountry = "IT",
  placeholder,
  className,
  disabled,
}: PhoneInputProps) {
  return (
    <div className={cn("phone-input-wrapper flex items-center border rounded-md bg-background focus-within:ring-1 focus-within:ring-ring overflow-hidden", className)}>
      <PhoneInputLib
        international
        defaultCountry={defaultCountry}
        value={value}
        onChange={(val) => onChange?.(val ?? "")}
        placeholder={placeholder}
        disabled={disabled}
        className="flex-1"
      />
    </div>
  );
}
