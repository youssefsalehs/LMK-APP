import { useAuth } from "@/features/auth/context/authContext";
import { EyeIcon, Inbox, Menu } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router";
import Logo from "../Logo/Logo";
import styles from "./Navbar.module.css";

const DEFAULT_PP: string = import.meta.env.VITE_DEFAULT_PP;
export default function Navbar() {
  const { user } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const profilePicturePath = user?.profilePicture?.secure_url;

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsOpen(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <nav className={styles.nav}>
      <Logo />

      <div className="flex items-center gap-1">
        {user && (
          <div className="hidden md:flex items-center gap-6 px-4">
            <Link to="/messages" className={styles.navLink}>
              <Inbox />
            </Link>
            <Link to="/sent-requests" className={styles.navLink}>
              <EyeIcon />
            </Link>
          </div>
        )}
        {user && (
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden  "
            aria-label="Toggle Menu"
          >
            <Menu />
          </button>
        )}
        {user && (
          <Link to="/profile" className={styles.avatarButton}>
            <img
              src={user?.profilePicture ? profilePicturePath : DEFAULT_PP}
              alt="Profile"
              className={styles.avatar}
            />
          </Link>
        )}
      </div>

      {isOpen && user && (
        <div className="absolute z-50 rounded-2xl top-full left-0 w-full bg-primary text-primary flex flex-col p-4 gap-3 md:hidden shadow-lg">
          <Link
            to="/messages"
            onClick={() => setIsOpen(false)}
            className={styles.navLink}
          >
            <Inbox /> inbox
          </Link>
          <Link
            to="/sent-requests"
            onClick={() => setIsOpen(false)}
            className={styles.navLink}
          >
            <EyeIcon />
            Requests
          </Link>
        </div>
      )}
    </nav>
  );
}
