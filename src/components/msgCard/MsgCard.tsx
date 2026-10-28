import styles from "./MsgCard.module.css";

export default function MsgCard() {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <p className={styles.headerText}>LMK</p>
      </div>
      <p className={styles.content}>Msg content</p>
    </div>
  );
}
