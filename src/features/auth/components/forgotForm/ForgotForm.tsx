import { Button } from "@/components/ui/button";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { forgotPasswordSchema } from "@/schemas/forgotPasswordSchema";
import type { SendOtpPayload } from "@/types/authModel";
import { zodResolver } from "@hookform/resolvers/zod";
import { Mail } from "lucide-react";
import type { SubmitHandler } from "react-hook-form";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import useSendOtp from "../../hooks/useSendOtp";
import Form from "../form/Form";
import generateOrGetIdempotencyKey from "@/shared/utils/idempotency";

export default function ForgotForm() {
  const idempotencyKey = generateOrGetIdempotencyKey();
  const navigate = useNavigate();
  const { mutate, isPending } = useSendOtp();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SendOtpPayload>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });
  const onSubmit: SubmitHandler<SendOtpPayload> = (data) => {
    mutate(
      { data, idempotency: idempotencyKey },
      {
        onSuccess: () =>
          navigate("/auth/reset-password", {
            state: { email: data.email },
            replace: true,
          }),
      },
    );
  };

  return (
    <Form
      title="Forgot password?"
      subtitle=" Enter your email address and we'll send you a link to reset your
          password."
    >
      <form onSubmit={handleSubmit(onSubmit)} className="form">
        <div className="fieldGroup">
          <InputGroup className={errors.email ? "inputError" : undefined}>
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

        <Button type="submit" disabled={isPending} className="submitButton">
          {isPending ? "Sending link..." : "Send reset link"}
        </Button>
      </form>
    </Form>
  );
}
