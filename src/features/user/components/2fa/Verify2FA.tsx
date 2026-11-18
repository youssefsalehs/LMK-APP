import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import Form from "@/features/auth/components/form/Form";
import { useAuth } from "@/features/auth/context/authContext";
import useVerify2FA from "@/features/auth/hooks/useVerify2FA";
import { verifyOtpSchema } from "@/schemas/auth.schema";
import type { VerifyEmailPayload } from "@/types/authModel";
import { zodResolver } from "@hookform/resolvers/zod";
import { REGEXP_ONLY_DIGITS } from "input-otp";
import { RefreshCw } from "lucide-react";
import { Controller, useForm } from "react-hook-form";

export default function Verify2FA() {
  const { user } = useAuth();
  const { mutate, isPending } = useVerify2FA();
  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<VerifyEmailPayload>({
    resolver: zodResolver(verifyOtpSchema),
    defaultValues: {
      email: user?.email || "",
      code: "",
    },
  });
  const otpValue = watch("code") || "";

  const onVerifyCode = (data: VerifyEmailPayload) => {
    if (data.email !== "" || data.email != undefined) mutate(data);
  };

  return (
    <Form
      title=" 2FA Verification Code"
      subtitle={`  We sent a 6-digit code to ${user?.email}`}
    >
      <form onSubmit={handleSubmit(onVerifyCode)} className="form">
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
            <p className="text-xs text-destructive mt-1">
              {errors.code.message}
            </p>
          )}
        </div>

        <button
          type="submit"
          disabled={isPending || otpValue.length < 6}
          className="w-full submitButton disabled:opacity-55 disabled:cursor-not-allowed"
        >
          {isPending ? (
            <RefreshCw className="w-4 h-4 animate-spin" />
          ) : (
            "Verify & Continue"
          )}
        </button>
      </form>
    </Form>
  );
}
