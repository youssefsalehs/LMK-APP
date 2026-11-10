import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import Form from "@/features/auth/components/form/Form";
import { useAuth } from "@/features/auth/context/authContext";
import useSend2FACode from "@/features/auth/hooks/useSend2FACode";
import generateOrGetIdempotencyKey from "@/shared/utils/idempotency";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRight, Mail, RefreshCw } from "lucide-react";
import { type Dispatch, type SetStateAction } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
const sendCodeSchema = z.object({
  email: z.string().email("Please enter a valid email address."),
});
type SendCodeFormValues = z.infer<typeof sendCodeSchema>;
export default function TwoFacAuthEmail({
  setStep,
}: {
  setStep: Dispatch<SetStateAction<1 | 2>>;
}) {
  const idempotencyKey = generateOrGetIdempotencyKey();
  const { user } = useAuth();
  const { mutate: sendCode, isPending: isSendingCode } = useSend2FACode();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SendCodeFormValues>({
    resolver: zodResolver(sendCodeSchema),
    defaultValues: { email: user?.email || "" },
    values: {
      email: user?.email || "",
    },
  });

  const onSendCode = (data: SendCodeFormValues) => {
    sendCode(
      { data, idempotency: idempotencyKey },
      { onSuccess: () => setStep(2) },
    );
  };
  return (
    <Form
      title="Enable 2-factor authentication"
      subtitle="We'll send a 6-digit security passkey to your email address to
            verify your identity."
    >
      <form onSubmit={handleSubmit(onSendCode)} className="form">
        <div className="space-y-1.5">
          <label
            htmlFor="email"
            className="text-xs font-medium text-foreground"
          >
            Email Address
          </label>
          <InputGroup className={errors.email ? "border-destructive" : ""}>
            <InputGroupAddon align="inline-start">
              <Mail className="w-4 h-4 text-muted-foreground" />
            </InputGroupAddon>
            <InputGroupInput
              id="email"
              type="email"
              placeholder="johndoe@example.com"
              {...register("email")}
            />
          </InputGroup>

          {errors.email && (
            <p className="text-xs text-destructive mt-1">
              {errors.email.message}
            </p>
          )}
        </div>

        <button
          type="submit"
          disabled={isSendingCode}
          className="w-full submitButton bg-primary hover:bg-primary/95 text-primary-foreground font-medium py-3 rounded-xl transition-all flex items-center justify-center gap-2 shadow-sm disabled:opacity-50 cursor-pointer text-xs"
        >
          {isSendingCode ? (
            <RefreshCw className="w-4 h-4 animate-spin" />
          ) : (
            <>
              <span>Send Security Code</span>
              <ArrowRight className="w-4 h-4" />
            </>
          )}
        </button>
      </form>
    </Form>
  );
}
