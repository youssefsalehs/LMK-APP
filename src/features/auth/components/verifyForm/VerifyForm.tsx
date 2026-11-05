import { Button } from "@/components/ui/button";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { verifyOtpSchema } from "@/schemas/verifyOtpSchema";
import type { TverifyOtpData } from "@/types/verifyOtpData";
import { zodResolver } from "@hookform/resolvers/zod";
import { REGEXP_ONLY_DIGITS } from "input-otp";
import { useEffect, useState } from "react";
import type { SubmitHandler } from "react-hook-form";
import { Controller, useForm } from "react-hook-form";
import { Navigate, useLocation } from "react-router";
import useSendOtp from "../../hooks/useSendOtp";
import Form from "../form/Form";

const RESEND_SECONDS = 30;

export default function VerifyForm({
  mutate,
  isPending,
}: {
  mutate: (data: { data: TverifyOtpData; idempotency: string }) => void;
  isPending: boolean;
}) {
  const [cooldown, setCooldown] = useState(RESEND_SECONDS);
  const location = useLocation();
  const savedEmail: string = location.state?.email ?? "";
  const { mutate: sendOtp, isPending: sendingOtp } = useSendOtp();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<TverifyOtpData>({
    resolver: zodResolver(verifyOtpSchema),
    defaultValues: {
      email: savedEmail,
      code: "",
    },
  });

  useEffect(() => {
    if (cooldown <= 0) return;
    const timer = setTimeout(() => setCooldown((c) => c - 1), 1000);
    return () => clearTimeout(timer);
  }, [cooldown]);

  if (!savedEmail) return <Navigate to="/register" replace />;
  function generateOrGetIdempotencyKey(): string {
    const idempotency = localStorage.getItem("idempotency");
    if (idempotency) {
      return idempotency;
    }
    const newIdempotency = crypto.randomUUID();
    localStorage.setItem("idempotency", newIdempotency);
    return newIdempotency;
  }
  const idempotencyKey = generateOrGetIdempotencyKey();

  const onSubmit: SubmitHandler<TverifyOtpData> = (data) => {
    mutate({ data });
  };

  const handleResend = () => {
    sendOtp(
      { data: { email: savedEmail }, idempotency: idempotencyKey },
      { onSuccess: () => setCooldown(RESEND_SECONDS) },
    );
  };

  return (
    <Form
      title="Verify your account"
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

        <p className="text-center text-muted-foreground">
          didn't receive otp?{" "}
          <Button
            type="button"
            disabled={cooldown > 0 || sendingOtp}
            onClick={handleResend}
          >
            {cooldown > 0 ? `resend in ${cooldown} seconds` : "resend"}
          </Button>
        </p>
      </form>
    </Form>
  );
}
