import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useForm, type SubmitHandler } from "react-hook-form";
import { Eye, EyeOff, Lock } from "lucide-react";
import SecurityCard from "../../components/securityCard/SecurityCard";
import useUpdatePassword from "../../hooks/useUpdatePassword";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";

interface UpdatePasswordFormInputs {
  password: string;
  newPassword: string;
  confirmPassword: string;
}

export default function UpdatePasswordPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
  } = useForm<UpdatePasswordFormInputs>({
    defaultValues: {
      password: "",
      newPassword: "",
      confirmPassword: "",
    },
    mode: "onChange",
  });

  const { mutate, isPending } = useUpdatePassword();

  const newPasswordValue = watch("newPassword", "");

  function checkRequirements(value: string): boolean {
    const hasMinLength = value.length >= 8;
    const hasUppercase = /[A-Z]/.test(value);
    const hasLowercase = /[a-z]/.test(value);
    const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(value);
    const hasNumber = /[0-9]/.test(value);
    return (
      hasMinLength && hasUppercase && hasLowercase && hasSpecial && hasNumber
    );
  }

  const isPasswordValid = checkRequirements(newPasswordValue);

  const onSubmit: SubmitHandler<UpdatePasswordFormInputs> = async (data) => {
    mutate(data);
    reset();
  };

  return (
    <div className="min-h-[90vh] flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-4xl bg-card border border-border rounded-3xl py-8 px-6 sm:px-8 text-card-foreground shadow-2xl space-y-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">
            Security & Password
          </h1>
          <p className="text-xs text-muted-foreground mt-1">
            Ensure your account is using a long, random password to stay secure.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="lg:col-span-2 space-y-5"
          >
            <div className="space-y-1.5">
              <label
                htmlFor="password"
                className="text-xs font-medium text-foreground"
              >
                Current Password
              </label>
              <InputGroup
                className={errors.password ? "border-destructive" : ""}
              >
                <InputGroupAddon align="inline-start">
                  <Lock className="w-4 h-4 text-muted-foreground" />
                </InputGroupAddon>
                <InputGroupInput
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  {...register("password", {
                    required: "Current password is required",
                  })}
                />
                <InputGroupAddon align="inline-end">
                  <button
                    type="button"
                    onClick={() => setShowPassword((prev) => !prev)}
                    className="p-1 text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
                    aria-label={
                      showPassword ? "Hide password" : "Show password"
                    }
                  >
                    {showPassword ? (
                      <EyeOff className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                  </button>
                </InputGroupAddon>
              </InputGroup>
              {errors.password && (
                <p className="text-xs text-destructive mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>

            <div className="space-y-1.5">
              <label
                htmlFor="newPassword"
                className="text-xs font-medium text-foreground"
              >
                New Password
              </label>
              <InputGroup
                className={errors.newPassword ? "border-destructive" : ""}
              >
                <InputGroupAddon align="inline-start">
                  <Lock className="w-4 h-4 text-muted-foreground" />
                </InputGroupAddon>
                <InputGroupInput
                  id="newPassword"
                  type={showNewPassword ? "text" : "password"}
                  placeholder="••••••••"
                  {...register("newPassword", {
                    required: "New password is required",
                    validate: () =>
                      isPasswordValid ||
                      "Please meet all password requirements.",
                  })}
                />
                <InputGroupAddon align="inline-end">
                  <button
                    type="button"
                    onClick={() => setShowNewPassword((prev) => !prev)}
                    className="p-1 text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
                    aria-label={
                      showNewPassword ? "Hide password" : "Show password"
                    }
                  >
                    {showNewPassword ? (
                      <EyeOff className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                  </button>
                </InputGroupAddon>
              </InputGroup>
              {errors.newPassword && (
                <p className="text-xs text-destructive mt-1">
                  {errors.newPassword.message}
                </p>
              )}
            </div>

            <div className="space-y-1.5">
              <label
                htmlFor="confirmPassword"
                className="text-xs font-medium text-foreground"
              >
                Confirm New Password
              </label>
              <InputGroup
                className={errors.confirmPassword ? "border-destructive" : ""}
              >
                <InputGroupAddon align="inline-start">
                  <Lock className="w-4 h-4 text-muted-foreground" />
                </InputGroupAddon>
                <InputGroupInput
                  id="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="••••••••"
                  {...register("confirmPassword", {
                    required: "Please confirm your new password",
                    validate: (val) =>
                      val === newPasswordValue || "Passwords do not match",
                  })}
                />
                <InputGroupAddon align="inline-end">
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword((prev) => !prev)}
                    className="p-1 text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
                    aria-label={
                      showConfirmPassword ? "Hide password" : "Show password"
                    }
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                  </button>
                </InputGroupAddon>
              </InputGroup>
              {errors.confirmPassword && (
                <p className="text-xs text-destructive mt-1">
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>

            <div className="pt-4 flex items-center justify-start gap-3">
              <Button
                type="submit"
                disabled={isPending}
                className="h-11 px-8 rounded-xl font-medium text-xs cursor-pointer"
              >
                {isPending ? "Updating..." : "Update Password"}
              </Button>
              <Button
                type="button"
                variant="secondary"
                onClick={() => reset()}
                disabled={isPending}
                className="h-11 px-5 rounded-xl text-xs font-medium cursor-pointer"
              >
                Reset
              </Button>
            </div>
          </form>

          <SecurityCard newPasswordValue={newPasswordValue} />
        </div>
      </div>
    </div>
  );
}
