import useGetProfile from "@/features/user/hooks/useGetUsersProfile";
import NotFound from "@/shared/pages/notfound/NotFound";
import type { User } from "@/types/userModel";
import { Link } from "react-router";
import InputCard from "../../components/inputCard/InputCard";

export default function MsgPage() {
  const { data } = useGetProfile();
  const user: User | undefined = data?.data;
  if (!user) {
    return <NotFound />;
  }

  return (
    <div className="gradientBg bg-linear-to-br min-h-screen flex flex-col gap-16 items-center justify-center p-4">
      <InputCard userData={user} />
      {!user && (
        <Link
          to={"/auth/register"}
          className="bg-primary text-primary-foreground py-2 px-6 text-center rounded-full text-2xl "
        >
          Get your own messages
        </Link>
      )}
    </div>
  );
}
