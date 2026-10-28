import LoginForm from "@/components/loginComponents/loginForm/LoginForm";
import { Link } from "react-router";

export default function Login() {
  return (
    <div className="space-y-4">
      <LoginForm />
      <p className=" text-center text-sm text-muted-foreground">
        Don't have an account?{" "}
        <Link
          to="/auth/register"
          className="font-semibold text-[#8027f5] hover:underline"
        >
          Sign up
        </Link>
      </p>
    </div>
  );
}
