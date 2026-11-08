import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { useAuth } from "@/features/auth/context/authContext";
import useVerify2FA from "@/features/auth/hooks/useVerify2FA";
import { zodResolver } from "@hookform/resolvers/zod";
import { REGEXP_ONLY_DIGITS } from "input-otp";
import { KeyRound, RefreshCw } from "lucide-react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
const verifyCodeSchema = z.object({
  code: z.string().length(6, "Passcode must be exactly 6 digits."),
});

type VerifyCodeFormValues = z.infer<typeof verifyCodeSchema>;

export default function Verify2FA() {
  const { user } = useAuth();
  const { mutate, isPending } = useVerify2FA();
  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<VerifyCodeFormValues>({
    resolver: zodResolver(verifyCodeSchema),
    defaultValues: { code: "" },
  });
  const otpValue = watch("code") || "";

  const onVerifyCode = (data: VerifyCodeFormValues) => {
    const currentEmail = user?.email || "";
    const payload = {
      email: currentEmail,
      code: data.code,
    };
    mutate(payload);
  };

  return (
    <form onSubmit={handleSubmit(onVerifyCode)} className="space-y-6">
      <div className="flex flex-col items-center text-center space-y-3">
        <div className="w-12 h-12 bg-primary/10 border border-primary/20 rounded-full flex items-center justify-center text-primary mb-2">
          <KeyRound className="w-6 h-6" />
        </div>
        <h2 className="text-2xl font-bold tracking-tight text-foreground">
          2FA Verification Code
        </h2>
        <p className="text-xs text-muted-foreground">
          We sent a 6-digit code to{" "}
          <span className="text-foreground font-medium">{user?.email}</span>
        </p>
      </div>

      <div className="flex flex-col items-center space-y-2">
        <Controller
          name="code"
          control={control}
          render={({ field }) => (
            <InputOTP
              maxLength={6}
              pattern={REGEXP_ONLY_DIGITS}
              value={field.value}
              onChange={field.onChange}
              onBlur={field.onBlur}
              aria-invalid={!!errors.code}
            >
              <InputOTPGroup>
                {[0, 1, 2, 3, 4, 5].map((i) => (
                  <InputOTPSlot key={i} index={i} />
                ))}
              </InputOTPGroup>
            </InputOTP>
          )}
        />

        {errors.code && (
          <p className="text-xs text-destructive mt-1">{errors.code.message}</p>
        )}
      </div>

      <button
        type="submit"
        disabled={isPending || otpValue.length < 6}
        className="w-full bg-primary hover:bg-primary/95 text-primary-foreground font-medium py-3 rounded-xl transition-all flex items-center justify-center gap-2 shadow-sm disabled:opacity-50 cursor-pointer text-xs"
      >
        {isPending ? (
          <RefreshCw className="w-4 h-4 animate-spin" />
        ) : (
          "Verify & Continue"
        )}
      </button>
    </form>
  );
}
