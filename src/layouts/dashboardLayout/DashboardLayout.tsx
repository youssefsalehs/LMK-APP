import useLogout from "@/features/auth/hooks/useLogout";
import useDeactivateUser from "@/features/user/hooks/useDeactivateUser";
import Logo from "@/shared/components/Logo/Logo";
import { Lock, LogOut, Power, ShieldCheck, User } from "lucide-react";
import { NavLink, Outlet } from "react-router";

const navItems = [
  { label: "Profile", to: "/profile", icon: User, end: true },
  { label: "Update Password", to: "/profile/update-password", icon: Lock },
  { label: "Enable 2FA", to: "/profile/enable-2fa", icon: ShieldCheck },
];

export default function DashboardLayout() {
  const { mutate: logout, isPending } = useLogout();
  const { mutate: deactivate, isPending: isDeactivating } = useDeactivateUser();

  function handleDeactivate() {
    logout();
    deactivate();
  }

  return (
    <div className="h-dvh w-full overflow-hidden bg-primary flex flex-col md:grid md:grid-cols-12">
      <div className="md:hidden flex items-center justify-between bg-sidebar-accent-foreground border-b border-sidebar/20 px-4 py-3 shrink-0 z-30">
        <div className="scale-70">
          <Logo />
        </div>

        <div className="flex items-center gap-1 overflow-x-auto no-scrollbar py-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.end}
                className={({ isActive }) =>
                  `p-2.5 rounded-xl transition-all flex items-center justify-center shrink-0 ${
                    isActive
                      ? "bg-primary-foreground text-primary shadow-sm"
                      : "text-primary-foreground hover:bg-muted hover:text-foreground"
                  }`
                }
                title={item.label}
              >
                <Icon className="w-4 h-4" />
              </NavLink>
            );
          })}
          <button
            type="button"
            disabled={isDeactivating}
            onClick={() => handleDeactivate()}
            className="p-2.5 rounded-xl transition-all flex items-center justify-center shrink-0 text-primary-foreground hover:bg-muted hover:text-foreground"
            title="Deactivate"
          >
            <Power className="w-4 h-4" />
          </button>

          <button
            type="button"
            disabled={isPending}
            onClick={() => logout()}
            className="p-2.5 rounded-xl text-rose-500 hover:bg-rose-500/10 transition-colors shrink-0 cursor-pointer"
            title="Logout"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="hidden md:flex md:col-span-3 border-r border-sidebar/20 bg-sidebar-accent-foreground p-6 h-full overflow-y-auto flex-col justify-between">
        <div className="space-y-8">
          <div className="px-2">
            <Logo />
          </div>

          <nav className="space-y-1.5">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.to}
                  to={item.to}
                  end={item.end}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-3.5 py-2.5 rounded-3xl text-sm font-semibold transition-all ${
                      isActive
                        ? "bg-primary-foreground text-primary shadow-sm"
                        : "text-primary-foreground hover:bg-muted/60 hover:text-foreground"
                    }`
                  }
                >
                  <Icon className="w-4 h-4 shrink-0" />
                  <span className="truncate">{item.label}</span>
                </NavLink>
              );
            })}

            <button
              type="button"
              disabled={isDeactivating}
              className="flex items-center gap-3 px-3.5 py-2.5 rounded-2xl text-sm font-semibold  hover:bg-muted/60 hover:text-foreground w-full text-left text-primary-foreground"
              onClick={handleDeactivate}
            >
              <Power className="w-4 h-4 shrink-0" />
              <span className="truncate">Deactivate</span>
            </button>
          </nav>
        </div>

        <div className="pt-auto border-t border-sidebar/20">
          <button
            type="button"
            onClick={() => logout()}
            disabled={isPending}
            className="w-full flex items-center gap-3 mt-2 px-3.5 py-2.5 rounded-2xl text-sm font-semibold text-rose-500 hover:bg-rose-500/10 cursor-pointer"
          >
            <LogOut className="w-4 h-4 shrink-0" />
            <span>Logout</span>
          </button>
        </div>
      </div>

      <div className="col-span-1 md:col-span-9 h-full bg-accent-foreground/5 overflow-y-auto">
        <div className="w-full max-w-7xl mx-auto p-4 sm:p-8">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
