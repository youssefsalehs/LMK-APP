import { useAuth } from "@/features/auth/context/authContext";
import { Link } from "react-router";
export default function NotFound() {
  const { user } = useAuth();
  return (
    <div className="gradientBg bg-linear-to-br min-h-screen flex flex-col gap-6 items-center justify-center p-4 text-center">
      <div className="space-y-2 max-w-md">
        <h1 className="text-4xl font-bold tracking-tight text-foreground">
          User Not Found
        </h1>
        <p className="text-primary text-lg">
          Looks like you searched for the wrong username! Double-check the
          spelling, or head back home to get started.
        </p>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 items-center mt-4">
        {user ? (
          <Link
            to="/"
            className="bg-secondary text-secondary-foreground hover:bg-secondary/80 py-2.5 px-6 rounded-full font-medium transition-colors"
          >
            Go to Home
          </Link>
        ) : (
          <Link
            to="/auth/register"
            className="bg-primary text-primary-foreground hover:bg-primary/90 py-2.5 px-6 rounded-full font-medium transition-colors"
          >
            Get your own messages
          </Link>
        )}
      </div>
    </div>
  );
}
