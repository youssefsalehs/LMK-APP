import { Button } from "@/components/ui/button";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { verifyOtpSchema } from "@/schemas/auth.schema";
import generateOrGetIdempotencyKey from "@/shared/utils/idempotency";
import type { VerifyEmailPayload } from "@/types/authModel";
import { zodResolver } from "@hookform/resolvers/zod";
import { REGEXP_ONLY_DIGITS } from "input-otp";
import type { SubmitHandler } from "react-hook-form";
import { Controller, useForm } from "react-hook-form";
import { Navigate, useLocation } from "react-router";
import useSendOtp from "../../hooks/useSendOtp";
import Form from "../form/Form";

interface IPrpos {
  mutate: (data: VerifyEmailPayload) => void;
  isPending: boolean;
  isLogin?: boolean;
}
export default function VerifyForm({
  mutate,
  isPending,
  isLogin = false,
}: IPrpos) {
  const location = useLocation();
  const savedEmail: string = location.state?.email ?? "";
  const { mutate: sendOtp, isPending: sendingOtp } = useSendOtp();
  const idempotencyKey = generateOrGetIdempotencyKey();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<VerifyEmailPayload>({
    resolver: zodResolver(verifyOtpSchema),
    defaultValues: {
      email: savedEmail,
      code: "",
    },
  });

  const onSubmit: SubmitHandler<VerifyEmailPayload> = (data) => {
    mutate(data);
  };

  const handleResend = () => {
    sendOtp({ data: { email: savedEmail }, idempotency: idempotencyKey });
  };

  if (!savedEmail) return <Navigate to="/register" replace />;
  return (
    <Form
      title={isLogin ? "Complete your sign-in" : "Verify your account"}
      subtitle="Enter the 6-digit code we sent to your email."
    >
      <form onSubmit={handleSubmit(onSubmit)} className="form">
        <div className="fieldGroup">
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
                <InputOTPGroup className="bg-primary-foreground! text-primary!">
                  {[0, 1, 2, 3, 4, 5].map((i) => (
                    <InputOTPSlot key={i} index={i} />
                  ))}
                </InputOTPGroup>
              </InputOTP>
            )}
          />

          {errors.code && <p className="errorText">{errors.code.message}</p>}
        </div>

        <Button type="submit" disabled={isPending} className="submitButton">
          {isPending ? "Verifying..." : "Verify"}
        </Button>

        {isLogin ? (
          <p className="text-center text-muted-foreground">
            login in again in case the otp expired
          </p>
        ) : (
          <p className="text-center text-muted-foreground">
            didn't receive otp?{" "}
            <Button type="button" disabled={sendingOtp} onClick={handleResend}>
              {sendingOtp ? `resending...` : "resend"}
            </Button>
          </p>
        )}
      </form>
    </Form>
  );
}
