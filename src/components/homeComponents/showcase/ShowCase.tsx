import MsgCard from "@/components/msgCard/MsgCard";
import styles from "./ShowCase.module.css";
import { motion } from "motion/react";

export default function ShowCase() {
  return (
    <div className={styles.container}>
      <div className={styles.scatterContainer}>
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.9 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ amount: 0.2 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className={styles.cardOne}
        >
          <MsgCard />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.9 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ amount: 0.2 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className={styles.cardTwo}
        >
          <MsgCard />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.9 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ amount: 0.2 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className={styles.cardThree}
        >
          <MsgCard />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ amount: 0.2 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className={styles.profileContainer}
        >
          <img src="/selfie1.jpg" alt="Selfie 1" className={styles.selfieOne} />
          <img
            src="/selfie2.avif"
            alt="Selfie 2"
            className={styles.selfieTwo}
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.9 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ amount: 0.2 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className={styles.cardFour}
        >
          <MsgCard />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.9 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ amount: 0.2 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className={styles.cardFive}
        >
          <MsgCard />
        </motion.div>
      </div>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ amount: 0.2 }}
        transition={{ duration: 0.5, delay: 0.7 }}
        className={styles.titleText}
      >
        flood your inbox
      </motion.p>
    </div>
  );
}
