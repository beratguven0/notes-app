import styles from "./styles.module.css";

export default function Button({ children, variant = "small", ...props }) {
  let buttonClassName;

  if (variant === "big") {
    buttonClassName = styles.bigBtn;
  } else if (variant === "round") {
    buttonClassName = styles.roundBtn;
  } else {
    buttonClassName = styles.smallBtn;
  }

  return (
    <button className={buttonClassName} {...props}>
      {children}
    </button>
  );
}
