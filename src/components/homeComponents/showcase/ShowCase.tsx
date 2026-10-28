import MsgCard from "@/components/msgCard/MsgCard";
import styles from "./ShowCase.module.css";

export default function ShowCase() {
  return (
    <div className={styles.container}>
      <div className={styles.scatterContainer}>
        <div className={styles.cardOne}>
          <MsgCard />
        </div>

        <div className={styles.cardTwo}>
          <MsgCard />
        </div>

        <div className={styles.cardThree}>
          <MsgCard />
        </div>

        <div className={styles.profileContainer}>
          <img src="/selfie1.jpg" alt="Selfie 1" className={styles.selfieOne} />
          <img
            src="/selfie2.avif"
            alt="Selfie 2"
            className={styles.selfieTwo}
          />
        </div>

        <div className={styles.cardFour}>
          <MsgCard />
        </div>

        <div className={styles.cardFive}>
          <MsgCard />
        </div>
      </div>

      <p className={styles.titleText}>flood your inbox</p>
    </div>
  );
}
