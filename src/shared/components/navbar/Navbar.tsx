import { useAuth } from "@/features/auth/context/authContext";
import Logo from "../Logo/Logo";
import ThemeBtn from "../theme/ThemeBtn";
import styles from "./Navbar.module.css";
import { Link } from "react-router";
const DEFAULT_PP: string = import.meta.env.VITE_DEFAULT_PP;
const BACKENDURL: string = import.meta.env.VITE_API_URL;
export default function Navbar() {
  const { user } = useAuth();
  const profilePicturePath = BACKENDURL + "/" + user?.profilePicture;
  return (
    <nav className={styles.nav}>
      <Logo />
      <div className="flex items-center gap-2">
        <ThemeBtn />
        {user && (
          <Link to={"/profile"} className={styles.avatarButton}>
            <div className="relative">
              <img
                src={user?.profilePicture ? profilePicturePath : DEFAULT_PP}
                alt="Profile"
                className={styles.avatar}
              />
            </div>
          </Link>
        )}
      </div>
    </nav>
  );
}
