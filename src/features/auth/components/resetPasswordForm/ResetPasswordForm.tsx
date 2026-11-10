import { Button } from "@/components/ui/button";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { resetPasswordSchema } from "@/schemas/resetPasswordSchema";
import type { ResetPasswordPayload } from "@/types/authModel";
import { zodResolver } from "@hookform/resolvers/zod";
import { REGEXP_ONLY_DIGITS } from "input-otp";
import { Eye, EyeOff, LockIcon, Mail } from "lucide-react";
import { useState } from "react";
import type { SubmitHandler } from "react-hook-form";
import { Controller, useForm } from "react-hook-form";
import useResetPassword from "../../hooks/useResetPassword";
import Form from "../form/Form";
import { useLocation } from "react-router";
import generateOrGetIdempotencyKey from "@/shared/utils/idempotency";

export default function ResetPasswordForm() {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const location = useLocation();
  const savedEmail: string = location.state?.email ?? "";
  const { mutate, isPending } = useResetPassword();
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetPasswordPayload>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      email: savedEmail,
      newPassword: "",
      code: "",
    },
  });

  const idempotencyKey = generateOrGetIdempotencyKey();
  const onSubmit: SubmitHandler<ResetPasswordPayload> = (data) => {
    mutate({ data, idempotency: idempotencyKey });
  };

  return (
    <Form
      title="Welcome back"
      subtitle="Enter your credentials to access your account"
    >
      <form onSubmit={handleSubmit(onSubmit)} className="form">
        <div className="fieldGroup">
          <InputGroup className={errors.email && "inputError"}>
            <InputGroupAddon align="inline-start">
              <Mail className="icon" />
            </InputGroupAddon>
            <InputGroupInput
              id="email"
              type="email"
              placeholder="johndoe@example.com"
              {...register("email")}
            />
          </InputGroup>

          {errors.email && <p className="errorText">{errors.email.message}</p>}
        </div>

        <div className="fieldGroup">
          <InputGroup className={errors.newPassword && "inputError"}>
            <InputGroupAddon align="inline-start">
              <LockIcon className="icon" />
            </InputGroupAddon>
            <InputGroupInput
              id="newPassword"
              type={showPassword ? "text" : "password"}
              placeholder="••••••••"
              {...register("newPassword")}
            />
            <InputGroupAddon align="inline-end">
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className={"toggleButton"}
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? (
                  <EyeOff className="icon" />
                ) : (
                  <Eye className="icon" />
                )}
              </button>
            </InputGroupAddon>
          </InputGroup>

          {errors.newPassword && (
            <p className="errorText">{errors.newPassword.message}</p>
          )}
        </div>
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
          {isPending ? "Reseting password..." : "Reset password"}
        </Button>
      </form>
    </Form>
  );
}
