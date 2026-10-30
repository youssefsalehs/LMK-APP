import Logo from "../Logo/Logo";
import styles from "./Navbar.module.css";
export default function Navbar() {
  return (
    <div className={styles.nav}>
      <Logo />
      <ul>
        <li>About</li>

        <li>Contact us</li>
      </ul>
    </div>
  );
}
