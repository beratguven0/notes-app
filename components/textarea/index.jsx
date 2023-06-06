import styles from "./styles.module.css";

export default function TextArea({ ...props }) {
  return <textarea className={styles.textArea} {...props} />;
}
