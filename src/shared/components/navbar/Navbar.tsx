import { useEffect, useRef, useState } from "react";
import { Link } from "react-router";
import { MenuIcon, XIcon } from "lucide-react";
import { useAuth } from "@/features/auth/context/authContext";
import useLogout from "@/features/auth/hooks/useLogout";
import Logo from "../Logo/Logo";
import styles from "./Navbar.module.css";
import useCloseMenu from "@/hooks/useCloseMenu";

export default function Navbar() {
  const { user } = useAuth();
  const { mutate: logout, isPending } = useLogout();
  const [userOpen, setUserOpen] = useState<boolean>(false);

  const userMenuRef = useRef<HTMLDivElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  useCloseMenu(userOpen, () => setUserOpen(false), [userMenuRef]);

  return (
    <nav className={styles.nav}>
      <Logo />

      <div className={styles.actions}>
        {user && (
          <div className="relative" ref={userMenuRef}>
            <button
              onClick={() => setUserOpen((o) => !o)}
              aria-expanded={userOpen}
              aria-haspopup="menu"
              className={styles.avatarButton}
            >
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTLPRYeRrN347o4ciAyvgNs9hWWYHDxmiTqDJIisIzvQtR0uG78Chy7bumR&s=10"
                alt="Profile"
                className={styles.avatar}
              />
            </button>

            {userOpen && (
              <ul className={styles.userMenu}>
                <p className="px-2  border-b pb-2 border-muted-foreground!">
                  @{user?.username}
                </p>
                <li>
                  <Link
                    to="/profile"
                    onClick={() => setUserOpen(false)}
                    className={styles.menuItem}
                  >
                    Profile
                  </Link>
                </li>
                <li>
                  <button
                    disabled={isPending}
                    onClick={() => {
                      setUserOpen(false);
                      logout();
                    }}
                    className={styles.menuItem}
                  >
                    {isPending ? "Logging out..." : "Logout"}
                  </button>
                </li>
              </ul>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}
