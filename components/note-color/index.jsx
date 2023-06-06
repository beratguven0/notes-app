import { useDispatch } from "react-redux";
import { actions as notesActions } from "@/stores/notes-store";

import styles from "./styles.module.css";

export default function NoteColor({ color }) {
  const dispatch = useDispatch();
  const handleAddColor = () => {
    dispatch(notesActions.changeColor(color));
  };
  return (
    <div
      onClick={handleAddColor}
      className={styles.noteColor}
      style={{ background: color }}
    ></div>
  );
}
