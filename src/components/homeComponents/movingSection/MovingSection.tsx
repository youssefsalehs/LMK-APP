import styles from "./MovingSection.module.css";
import { motion } from "motion/react";

const items = [
  "send me your confessions",
  "ask me anything",
  "not gonna lie",
  "send me a never have I ever",
  "describe me in 3 words",
  "share an opinion that’ll get you cancelled",
  "tell me who your crush is",
];

export default function MovingSection() {
  return (
    <div className={styles.container}>
      <motion.ul
        className={styles.section}
        animate={{ x: ["0%", "-100%"] }}
        transition={{
          repeat: Infinity,
          ease: "linear",
          duration: 20,
        }}
      >
        {[...items, ...items].map((text, i) => (
          <li key={i}>
            <span className="mr-2 text-xl">&#8226;</span>
            <span>{text}</span>
          </li>
        ))}
      </motion.ul>
    </div>
  );
}
