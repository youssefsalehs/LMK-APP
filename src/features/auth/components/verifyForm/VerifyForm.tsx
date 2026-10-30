import { Button } from "@/components/ui/button";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { verifyOtpSchema } from "@/schemas/verifyOtpSchema";
import type { TverifyOtpData } from "@/types/verifyOtpData";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import type { SubmitHandler } from "react-hook-form";
import { Controller, useForm } from "react-hook-form";
import styles from "./VerifyForm.module.css";

const RESEND_SECONDS = 30;

export default function VerifyForm() {
  const [cooldown, setCooldown] = useState(RESEND_SECONDS);

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<TverifyOtpData>({
    resolver: zodResolver(verifyOtpSchema),
    defaultValues: {
      otp: "",
    },
  });

  useEffect(() => {
    if (cooldown <= 0) return;
    const timer = setTimeout(() => setCooldown((c) => c - 1), 1000);
    return () => clearTimeout(timer);
  }, [cooldown]);

  const onSubmit: SubmitHandler<TverifyOtpData> = (data) => {
    console.log("Submitted data:", data);
  };

  const handleResend = () => {
    console.log("Resend code");
    setCooldown(RESEND_SECONDS);
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2 className={styles.title}>Verify your account</h2>
        <p className={styles.subtitle}>
          Enter the 6-digit code we sent to your email.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        <div className={styles.fieldGroup}>
          <Controller
            name="otp"
            control={control}
            render={({ field }) => (
              <InputOTP
                maxLength={6}
                value={field.value}
                onChange={field.onChange}
                onBlur={field.onBlur}
                aria-invalid={!!errors.otp}
              >
                <InputOTPGroup className="bg-primary-foreground! text-primary!">
                  <InputOTPSlot index={0} />
                  <InputOTPSlot index={1} />
                  <InputOTPSlot index={2} />
                  <InputOTPSlot index={3} />
                  <InputOTPSlot index={4} />
                  <InputOTPSlot index={5} />
                </InputOTPGroup>
              </InputOTP>
            )}
          />

          {errors.otp && (
            <p className={styles.errorText}>{errors.otp.message}</p>
          )}
        </div>

        <Button type="submit" disabled={isSubmitting} className="submitButton ">
          {isSubmitting ? "Verifying..." : "Verify"}
        </Button>

        <p className="text-center text-muted-foreground">
          didn't receive otp?{" "}
          <Button disabled={cooldown > 0} onClick={handleResend}>
            {cooldown > 0 ? `resend in ${cooldown} seconds` : `resend`}
          </Button>
        </p>
      </form>
    </div>
  );
}
