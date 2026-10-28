import { Controller, useForm, type SubmitHandler } from "react-hook-form";

import type { TregisterData } from "@/types/registerData";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema } from "@/schemas/registerSchema";
import { User, Mail, Lock, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import styles from "./RegisterForm.module.css";

import {
  SelectTrigger,
  Select,
  SelectValue,
  SelectContent,
  SelectGroup,
  SelectItem,
} from "@/components/ui/select";
export default function RegisterForm() {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<TregisterData>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      dob: undefined,
      gender: undefined,
    },
    resolver: zodResolver(registerSchema),
  });
  const items = [
    { label: "Male", value: "male" },
    { label: "Female", value: "female" },
  ];
  const onSubmit: SubmitHandler<TregisterData> = (data) => {
    console.log(data);
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2 className={styles.title}>Create an account</h2>
        <p className={styles.subtitle}>
          Please fill in your details below to register.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        <div className={styles.fieldGroup}>
          <InputGroup className={errors.name ? styles.inputError : undefined}>
            <InputGroupAddon align="inline-start">
              <User className={styles.icon} />
            </InputGroupAddon>
            <InputGroupInput
              id="name"
              type="text"
              placeholder="John Doe"
              {...register("name")}
            />
          </InputGroup>
          {errors.name && (
            <p className={styles.errorText}>{errors.name.message}</p>
          )}
        </div>

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

        <div className={styles.fieldGroup}>
          <InputGroup
            className={errors.password ? styles.inputError : undefined}
          >
            <InputGroupAddon align="inline-start">
              <Lock className={styles.icon} />
            </InputGroupAddon>
            <InputGroupInput
              id="password"
              type="password"
              placeholder="••••••••"
              {...register("password")}
            />
          </InputGroup>
          {errors.password && (
            <p className={styles.errorText}>{errors.password.message}</p>
          )}
        </div>
        <div className="flex justify-between gap-2">
          <div className={styles.fieldGroup}>
            <InputGroup className={errors.dob ? styles.inputError : undefined}>
              <InputGroupAddon align="inline-start">
                <Calendar className={styles.icon} />
              </InputGroupAddon>
              <InputGroupInput id="dob" type="date" {...register("dob")} />
            </InputGroup>
            {errors.dob && (
              <p className={styles.errorText}>{errors.dob.message}</p>
            )}
          </div>

          <div className={styles.fieldGroup}>
            <Controller
              name="gender"
              control={control}
              render={({ field }) => (
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger className="w-full my-0">
                    <SelectValue placeholder="Select gender" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {items.map((item) => (
                        <SelectItem key={item.value} value={item.value}>
                          {item.label}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              )}
            />
            {errors.gender && (
              <p className={styles.errorText}>{errors.gender.message}</p>
            )}
          </div>
        </div>

        <Button type="submit" disabled={isSubmitting} className="submitButton">
          {isSubmitting ? "Creating account..." : "Sign Up"}
        </Button>
      </form>
    </div>
  );
}
