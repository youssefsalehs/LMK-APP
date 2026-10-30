import { Button } from "@/components/ui/button";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { zodResolver } from "@hookform/resolvers/zod";
import { Mail } from "lucide-react";
import type { SubmitHandler } from "react-hook-form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import styles from "./TwoFactorAuthenticationForm.module.css";
const schema = z.object({
  email: z.email("Please enter a valid email address").toLowerCase().trim(),
});

export default function TwoFactorAuthenticationForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<{ email: string }>({
    resolver: zodResolver(schema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit: SubmitHandler<{ email: string }> = (data) => {
    console.log("Submitted data:", data);
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2 className={styles.title}>Enable two-factor authentication</h2>
        <p className={styles.subtitle}>
          Add an extra layer of security to your account. Enter your email and
          we'll send you a verification code.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        <div className={styles.fieldGroup}>
          <InputGroup className={errors.email && styles.inputError}>
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
          {isSubmitting ? "Sending code..." : "Send verification code"}
        </Button>
      </form>
    </div>
  );
}
