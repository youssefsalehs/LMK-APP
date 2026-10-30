import { Link } from "react-router";
import styles from "./Logo.module.css";
export default function Logo() {
  return (
    <Link to="/">
      <img src="/lmk.png" className={styles.logo} />
    </Link>
  );
}
