import styles from "./Questtions.module.css";
export default function QuestionPromptsSection() {
  return (
    <div className={styles.container}>
      <div>
        <h2>ask anything, answer everything</h2>
        <ul>
          <li>"what's a secret you've never told anyone?"</li>
          <li>"what was your first impression of me?"</li>
          <li>"ask me something you'd never say out loud"</li>
          <li>"drop an anonymous hot take"</li>
        </ul>
      </div>
    </div>
  );
}
