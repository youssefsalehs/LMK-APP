import Logo from "../Logo/Logo";
import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.topRow}>
          <Logo />
        </div>

        <div className={styles.bottomRow}>
          <p>&copy; {new Date().getFullYear()} LMK. All rights reserved.</p>
          <p>hello@lmkapp.com</p>
        </div>
      </div>
    </footer>
  );
}
