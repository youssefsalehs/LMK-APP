import styles from "./Logo.module.css";
export default function Logo() {
  return (
    <div>
      <img src="/lmk.png" className={styles.logo} />
    </div>
  );
}
