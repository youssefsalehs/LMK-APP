import { KeyRound, CheckCircle2, Circle } from "lucide-react";

interface SecurityCardProps {
  newPasswordValue: string;
}

export default function SecurityCard({ newPasswordValue }: SecurityCardProps) {
  const hasMinLength = newPasswordValue.length >= 8;
  const hasUppercase = /[A-Z]/.test(newPasswordValue);
  const hasLowercase = /[a-z]/.test(newPasswordValue);
  const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(newPasswordValue);
  const hasNumber = /[0-9]/.test(newPasswordValue);

  const requirements = [
    { label: "Minimum 8 characters", met: hasMinLength },
    { label: "At least 1 uppercase letter", met: hasUppercase },
    { label: "At least 1 lowercase letter", met: hasLowercase },
    { label: "At least 1 special character", met: hasSpecial },
    { label: "At least 1 number", met: hasNumber },
  ];

  return (
    <div className="bg-card/60 border border-border/80 rounded-2xl p-5 space-y-4 shadow-sm">
      <div className="flex items-center gap-2 text-primary">
        <KeyRound className="w-4 h-4" />
        <h3 className="text-xs font-semibold uppercase tracking-wider text-primary-foreground">
          Password Rules
        </h3>
      </div>

      <ul className="space-y-2.5 text-xs">
        {requirements.map((req, index) => (
          <li
            key={index}
            className={`flex items-center gap-2.5 transition-colors ${
              req.met ? "text-emerald-500 font-medium" : "text-muted-foreground"
            }`}
          >
            {req.met ? (
              <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
            ) : (
              <Circle className="w-4 h-4 text-muted-foreground/40 shrink-0" />
            )}
            <span>{req.label}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
