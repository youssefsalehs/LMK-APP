import { useState } from "react";
import { useForm } from "react-hook-form";
import type { SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import type { TloginFormData } from "@/types/loginFormData";
import { loginSchema } from "@/schemas/loginSchema";
import { Eye, EyeOff, LockIcon, Mail } from "lucide-react";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import styles from "./LoginForm.module.css";
import { Link } from "react-router";
export default function LoginForm() {
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<TloginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<TloginFormData> = (data) => {
    console.log("Submitted data:", data);
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2 className={styles.title}>Welcome back</h2>
        <p className={styles.subtitle}>
          Enter your credentials to access your account
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

        <div className={styles.fieldGroup}>
          <InputGroup className={errors.password && styles.inputError}>
            <InputGroupAddon align="inline-start">
              <LockIcon className={styles.icon} />
            </InputGroupAddon>
            <InputGroupInput
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="••••••••"
              {...register("password")}
            />
            <InputGroupAddon align="inline-end">
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className={styles.toggleButton}
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? (
                  <EyeOff className={styles.icon} />
                ) : (
                  <Eye className={styles.icon} />
                )}
              </button>
            </InputGroupAddon>
          </InputGroup>

          {errors.password && (
            <p className={styles.errorText}>{errors.password.message}</p>
          )}
        </div>

        <div className={styles.forgotPasswordWrapper}>
          <Link
            to="/auth/forgot-password"
            className={styles.forgotPasswordLink}
          >
            Forgot password?
          </Link>
        </div>

        <Button type="submit" disabled={isSubmitting} className="submitButton">
          {isSubmitting ? "Signing in..." : "Sign in"}
        </Button>
      </form>
    </div>
  );
}
