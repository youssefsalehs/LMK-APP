import styles from "./MovingSection.module.css";
import { motion } from "motion/react";

const items = [
  "drop your most unpopular opinion",
  "let me know",
  "what's a song you have on repeat?",
  "assume something about me",
  "spill a secret no one knows",
  "give me a dare to post on my story",
  "rate my vibe from 1 to 10",
  "what's the best advice you've ever got?",
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
