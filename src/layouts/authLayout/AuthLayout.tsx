import Logo from "@/components/Logo/Logo";
import { Outlet } from "react-router";
import styles from "./AuthLayout.module.css";

export default function AuthLayout() {
  return (
    <div className={styles.layoutContainer}>
      <div className={styles.brandSide}>
        <div className={styles.logoWrapper}>
          <Logo />
        </div>

        <div className={styles.brandContent}>
          <span className={styles.badge}>Anonymous & Instant</span>
          <h1 className={styles.heading}>See what people really think.</h1>
          <p className={styles.description}>
            Create your link, share it on your socials, and receive real, honest
            feedback directly into your inbox.
          </p>
        </div>

        <div className={styles.brandFooter}>
          <p>&copy; {new Date().getFullYear()} LMK Inc.</p>
        </div>
      </div>

      <div className={styles.contentSide}>
        <div className={styles.mobileHeader}>
          <Logo />
        </div>

        <main className={styles.mainWrapper}>
          <Outlet />
        </main>
      </div>
    </div>
  );
}
