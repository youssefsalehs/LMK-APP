import { useState } from "react";
import TwoFacAuthEmail from "../../components/2fa/TwoFacAuthEmail";
import Verify2FA from "../../components/2fa/Verify2FA";
import { useAuth } from "@/features/auth/context/authContext";
import { CheckCircle2, ShieldCheck } from "lucide-react";

export default function TwoFactorAuth() {
  const [step, setStep] = useState<1 | 2>(1);
  const { user } = useAuth();

  if (user?.twoStepVerification) {
    return (
      <div className="min-h-[90vh] flex items-center justify-center p-4">
        <div className="w-full max-w-md bg-card border border-border rounded-3xl p-8 shadow-2xl text-card-foreground flex flex-col items-center text-center space-y-4">
          <div className="w-16 h-16 bg-primary/10 border border-primary/20 rounded-full flex items-center justify-center text-primary mb-2">
            <ShieldCheck className="w-8 h-8" />
          </div>

          <div className="space-y-1.5">
            <h2 className="text-2xl font-bold tracking-tight text-foreground flex items-center justify-center gap-2">
              2FA is Enabled
              <CheckCircle2 className="w-5 h-5 text-primary inline-block" />
            </h2>
            <p className="text-xs text-muted-foreground max-w-xs mx-auto">
              Your account is protected with two-factor authentication via{" "}
              <span className="text-foreground font-medium">{user?.email}</span>
              .
            </p>
          </div>

          <div className="w-full pt-4 border-t border-border mt-2">
            <span className="inline-flex items-center justify-center px-3 py-1 rounded-full text-[11px] font-medium bg-primary/10 text-primary border border-primary/20">
              Active Protection
            </span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[90vh] flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-card border border-border rounded-3xl p-8 shadow-2xl text-card-foreground space-y-6">
        {step === 1 && <TwoFacAuthEmail setStep={setStep} />}
        {step === 2 && <Verify2FA />}
      </div>
    </div>
  );
}
