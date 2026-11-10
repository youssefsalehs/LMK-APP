import styles from "./MsgCard.module.css";

interface MsgCardProps {
  content?: string;
}

export default function MsgCard({ content = "Msg content" }: MsgCardProps) {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <p className={styles.headerText}>LMK</p>
      </div>
      <p className={styles.content}>{content}</p>
    </div>
  );
}
