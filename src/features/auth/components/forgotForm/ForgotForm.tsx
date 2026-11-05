import { Button } from "@/components/ui/button";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { forgotPasswordSchema } from "@/schemas/forgotPasswordSchema";
import type { TforgotPasswordData } from "@/types/forgotPasswordData";
import { zodResolver } from "@hookform/resolvers/zod";
import { Mail } from "lucide-react";
import type { SubmitHandler } from "react-hook-form";
import { useForm } from "react-hook-form";
import useSendOtp from "../../hooks/useSendOtp";
import Form from "../form/Form";

export default function ForgotForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TforgotPasswordData>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });
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

  const { mutate, isPending } = useSendOtp();
  const onSubmit: SubmitHandler<TforgotPasswordData> = (data) => {
    mutate({ data, idempotency: idempotencyKey });
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
