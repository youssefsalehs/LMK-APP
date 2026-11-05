import { Button } from "@/components/ui/button";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { loginSchema } from "@/schemas/loginSchema";
import type { TloginFormData } from "@/types/loginFormData";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff, LockIcon, Mail } from "lucide-react";
import { useState } from "react";
import type { SubmitHandler } from "react-hook-form";
import { useForm } from "react-hook-form";
import { Link } from "react-router";
import useLogin from "../../hooks/useLogin";
import Form from "../form/Form";
import styles from "./LoginForm.module.css";
export default function LoginForm() {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const { mutate, isPending } = useLogin();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TloginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<TloginFormData> = (data) => {
    mutate(data);
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
          <InputGroup className={errors.password && styles.inputError}>
            <InputGroupAddon align="inline-start">
              <LockIcon className="icon" />
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
                  <EyeOff className="icon" />
                ) : (
                  <Eye className="icon" />
                )}
              </button>
            </InputGroupAddon>
          </InputGroup>

          {errors.password && (
            <p className="errorText">{errors.password.message}</p>
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

        <Button type="submit" disabled={isPending} className="submitButton">
          {isPending ? "Signing in..." : "Sign in"}
        </Button>
      </form>
    </Form>
  );
}
