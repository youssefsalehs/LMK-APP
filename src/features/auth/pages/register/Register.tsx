import RegisterForm from "@/features/auth/components/registerForm/RegisterForm";
import { Link } from "react-router";

export default function Register() {
  return (
    <div className="space-y-4">
      <RegisterForm />

      <p className=" text-center text-sm text-muted-foreground">
        Already have an account?{" "}
        <Link
          to="/auth/login"
          className="font-semibold text-[#8027f5] hover:underline"
        >
          Sign in
        </Link>
      </p>
    </div>
  );
}
