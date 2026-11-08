import { Button } from "@/components/ui/button";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { registerSchema } from "@/schemas/registerSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Calendar, Lock, Mail, User } from "lucide-react";
import { Controller, useForm, type SubmitHandler } from "react-hook-form";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { z } from "zod";
import useRegister from "../../hooks/useRegister";
import Form from "../form/Form";
import { Link } from "react-router";
export default function RegisterForm() {
  type RegisterInput = z.input<typeof registerSchema>;
  type RegisterOutput = z.output<typeof registerSchema>;

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<RegisterInput, unknown, RegisterOutput>({
    defaultValues: {
      name: "",
      username: "",
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
  const { mutate, isPending } = useRegister();
  const onSubmit: SubmitHandler<RegisterOutput> = (data) => {
    mutate(data);
  };

  return (
    <Form
      title="create an account"
      subtitle=" Please fill in your details below to register."
    >
      <form onSubmit={handleSubmit(onSubmit)} className="form">
        <div className="fieldGroup">
          <InputGroup className={errors.name ? "inputError" : undefined}>
            <InputGroupAddon align="inline-start">
              <User className="icon" />
            </InputGroupAddon>
            <InputGroupInput
              id="name"
              type="text"
              placeholder="John Doe"
              {...register("name")}
            />
          </InputGroup>
          {errors.name && <p className="errorText">{errors.name.message}</p>}
        </div>
        <div className="fieldGroup">
          <InputGroup className={errors.username ? "inputError" : undefined}>
            <InputGroupAddon align="inline-start">
              <p className="icon flex items-center justify-center">@</p>
            </InputGroupAddon>
            <InputGroupInput
              id="username"
              type="text"
              placeholder="johndoe_123"
              {...register("username")}
            />
          </InputGroup>
          {errors.username && (
            <p className="errorText">{errors.username.message}</p>
          )}
        </div>

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

        <div className="fieldGroup">
          <InputGroup className={errors.password ? "inputError" : undefined}>
            <InputGroupAddon align="inline-start">
              <Lock className="icon" />
            </InputGroupAddon>
            <InputGroupInput
              id="password"
              type="password"
              placeholder="••••••••"
              {...register("password")}
            />
          </InputGroup>
          {errors.password && (
            <p className="errorText">{errors.password.message}</p>
          )}
        </div>
        <div className="flex justify-between gap-2">
          <div className="fieldGroup">
            <InputGroup className={errors.dob ? "inputError" : undefined}>
              <InputGroupAddon align="inline-start">
                <Calendar className="icon" />
              </InputGroupAddon>
              <InputGroupInput id="dob" type="date" {...register("dob")} />
            </InputGroup>
            {errors.dob && <p className="errorText">{errors.dob.message}</p>}
          </div>

          <div className="fieldGroup">
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
              <p className="errorText">{errors.gender.message}</p>
            )}
          </div>
        </div>

        <Button type="submit" disabled={isPending} className="submitButton">
          {isPending ? "Creating account..." : "Sign Up"}
        </Button>

        <p className=" text-center text-sm text-muted-foreground">
          Already have an account?{" "}
          <Link
            to="/auth/login"
            className="font-semibold text-[#8027f5] hover:underline"
          >
            Sign in
          </Link>
        </p>
      </form>
    </Form>
  );
}
