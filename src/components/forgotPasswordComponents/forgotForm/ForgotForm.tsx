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
import styles from "./ForgotForm.module.css";

export default function ForgotForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<TforgotPasswordData>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit: SubmitHandler<TforgotPasswordData> = (data) => {
    console.log("Submitted data:", data);
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2 className={styles.title}>Forgot password?</h2>
        <p className={styles.subtitle}>
          Enter your email address and we&apos;ll send you a link to reset your
          password.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        <div className={styles.fieldGroup}>
          <InputGroup className={errors.email ? styles.inputError : undefined}>
            <InputGroupAddon align="inline-start">
              <Mail className={styles.icon} />
            </InputGroupAddon>
            <InputGroupInput
              id="email"
              type="email"
              placeholder="johndoe@example.com"
              {...register("email")}
            />
          </InputGroup>

          {errors.email && (
            <p className={styles.errorText}>{errors.email.message}</p>
          )}
        </div>

        <Button type="submit" disabled={isSubmitting} className="submitButton">
          {isSubmitting ? "Sending link..." : "Send reset link"}
        </Button>
      </form>
    </div>
  );
}
