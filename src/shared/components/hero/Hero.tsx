import Navbar from "@/shared/components/navbar/Navbar";
import { motion } from "motion/react";
import { Link } from "react-router";
import styles from "./Hero.module.css";

const float = {
  animate: { y: [0, -20, 0] },
  transition: { repeat: Infinity, duration: 5, ease: "easeInOut" },
};

export default function Hero() {
  return (
    <div className={styles.container}>
      <div className={styles.navWrapper}>
        <Navbar />
      </div>

      <div className={styles.details}>
        <div className={styles.imageWrapper}>
          <motion.img
            {...float}
            src="/selfie1.jpg"
            className={styles.leftImg}
          />
        </div>

        <div className={styles.content}>
          <p className={styles.title}>Keep it real, keep it fun</p>
          <Link to="/auth/register" className={styles.cta}>
            Get Started
          </Link>
        </div>

        <div className={styles.imageWrapper}>
          <motion.img
            {...float}
            transition={{ ...float.transition, delay: 1 }}
            src="/selfie2.avif"
            className={styles.rightImg}
          />
        </div>
      </div>
    </div>
  );
}
