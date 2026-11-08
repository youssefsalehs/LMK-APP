import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff, Check } from "lucide-react";
import { useState } from "react";
import { type UseFormRegisterReturn } from "react-hook-form";
interface PasswordInputProps {
  id: string;
  label: string;
  placeholder: string;
  register: UseFormRegisterReturn;
  error?: string;
  value: string;
  showSuccessIcon?: boolean;
  isValid?: boolean;
}

export function PasswordInput({
  id,
  label,
  placeholder,
  register,
  error,
  value,
  showSuccessIcon = false,
  isValid = false,
}: PasswordInputProps) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between">
        <Label
          htmlFor={id}
          className="text-xs font-semibold text-muted flex items-center gap-1.5"
        >
          {label}
          {showSuccessIcon && value.length > 0 && isValid && (
            <Check className="w-3.5 h-3.5 text-emerald-500" />
          )}
        </Label>
      </div>
      <div className="relative">
        <Input
          id={id}
          type={showPassword ? "text" : "password"}
          placeholder={placeholder}
          {...register}
          className={`h-11 pr-10 bg-transparent text-muted placeholder:text-primary/80 rounded-xl transition-all ${
            value.length > 0 && isValid
              ? "border-emerald-500/80 focus-visible:ring-emerald-500/30"
              : value.length > 0 && error
                ? "border-destructive/80 focus-visible:ring-destructive/30"
                : "border-input focus-visible:ring-ring"
          }`}
        />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-3.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-primary-foreground transition-colors cursor-pointer"
          aria-label="Toggle password visibility"
        >
          {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
        </button>
      </div>
      {error && <p className="text-xs text-destructive font-medium">{error}</p>}
    </div>
  );
}
