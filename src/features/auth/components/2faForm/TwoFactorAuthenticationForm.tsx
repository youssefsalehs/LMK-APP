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
import Form from "../form/Form";
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
    <Form
      title="Two-Factor Authentication"
      subtitle="Enter your email to receive a verification code."
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

        <Button type="submit" disabled={isSubmitting} className="submitButton">
          {isSubmitting ? "Sending code..." : "Send verification code"}
        </Button>
      </form>
    </Form>
  );
}
