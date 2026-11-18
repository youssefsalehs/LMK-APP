import Navbar from "@/shared/components/navbar/Navbar";
import { motion } from "motion/react";
import { Link } from "react-router";
import styles from "./Hero.module.css";
import { useAuth } from "@/features/auth/context/authContext";

const float = {
  animate: { y: [0, -20, 0] },
  transition: {
    repeat: Infinity,
    duration: 5,
    ease: "easeInOut" as const,
  },
};

export default function Hero() {
  const { user } = useAuth();
  return (
    <div className={styles.container}>
      <div className={styles.navWrapper}>
        <Navbar />
      </div>

      <div className={styles.details}>
        <div className={styles.imageWrapperLeft}>
          <motion.img
            {...float}
            src="/selfie1.jpg"
            className={styles.leftImg}
          />
        </div>

        <div className={styles.imageWrapperRight}>
          <motion.img
            {...float}
            transition={{
              repeat: Infinity,
              duration: 3,
              ease: "easeInOut" as const,
            }}
            src="/selfie2.avif"
            className={styles.rightImg}
          />
        </div>

        <div className={styles.content}>
          <p className={styles.title}>Keep it real, keep it fun</p>
          {!user && (
            <Link to="/auth/register" className={styles.cta}>
              Get Started
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
