import { Link } from "react-router";
import { useAuth } from "../../context/authContext";

export default function Profile() {
  const { user } = useAuth();

  return (
    <div className="pt-16">
      <Link
        to={"/"}
        className="flex rounded-full w-fit items-center gap-2 bg-muted-foreground mx-6 px-4 py-2 text-primary-foreground/80 hover:text-primary-foreground "
      >
        &larr; back
      </Link>
      <div className="max-w-md w-full my-auto mx-auto bg-primary-foreground/10 border text-primary-foreground rounded-3xl p-6 shadow-2xl relative overflow-hidden">
        <div className="absolute -top-24 -right-24 w-48 h-48 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-rose-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="flex justify-end  mb-6 relative z-10">
          <span
            className={` text-xs font-mono px-3  py-1 rounded-full border ${
              user?.isVerified
                ? "bg-emerald-600/10 border-emerald-600/30 text-emerald-600"
                : "bg-amber-500/10 border-amber-500/30 text-amber-400"
            }`}
          >
            {user?.isVerified ? "VERIFIED" : "UNVERIFIED"}
          </span>
        </div>

        <div className="flex items-center gap-4 mb-6 relative z-10">
          <div className="h-20 w-20 rounded-2xl overflow-hidden bg-primary border-2 border-primary-foreground/70 shadow-inner shrink-0">
            {user?.profilePicture ? (
              <img
                src={user.profilePicture}
                alt={user?.name}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-primary text-primary-foreground font-mono text-xl font-bold">
                {user?.name?.charAt(0).toUpperCase()}
              </div>
            )}
          </div>
          <div>
            <h1 className="text-2xl font-black tracking-tight text-primary-foreground">
              {user?.name}
            </h1>
            <p className="text-primary-foreground/80 font-mono text-sm">
              @{user?.username}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2 relative z-10">
          <div className="col-span-2 bg-primary-foreground/50 text-primary backdrop-blur-md p-3.5 rounded-2xl border border-stone-800">
            <span className=" font-mono text-[10px] uppercase block tracking-wider">
              Email Address
            </span>
            <span className=" font-medium text-sm truncate block mt-0.5">
              {user?.email}
            </span>
          </div>

          <div className="bg-primary-foreground/50 text-primary backdrop-blur-md p-3.5 rounded-2xl border border-stone-800">
            <span className=" font-mono text-[10px] uppercase block tracking-wider">
              Security (2FA)
            </span>
            <span
              className={`font-semibold text-xs mt-0.5 block ${
                user?.twoStepVerification ? "text-emerald-600" : ""
              }`}
            >
              {user?.twoStepVerification ? "Active" : "Inactive"}
            </span>
          </div>

          <div className="bg-primary-foreground/50 text-primary backdrop-blur-md p-3.5 rounded-2xl border border-stone-800">
            <span className="font-mono text-[10px] uppercase block tracking-wider">
              Gender
            </span>
            <span className=" font-semibold text-xs capitalize block mt-0.5">
              {user?.gender ?? "Not specified"}
            </span>
          </div>

          {user?.dob && (
            <div className="col-span-2 bg-primary-foreground/50 text-primary backdrop-blur-md p-3.5 rounded-2xl border border-stone-800">
              <span className="font-mono text-[10px] uppercase block tracking-wider">
                Date of Birth
              </span>
              <span className="font-medium text-xs block mt-0.5">
                {user.dob}
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
