import { useDispatch, useSelector } from "react-redux";
import {
  actions as notesActions,
  selectResponsive,
} from "@/stores/notes-store";
import { useState } from "react";

import styles from "./styles.module.css";
import NoteColor from "../note-color";
import TextArea from "../textarea";
import Button from "../button";

export default function NotesInput({ selectedColor }) {
  const dispatch = useDispatch();
  const selectResponsiShow = useSelector(selectResponsive);

  const [inputValue, setInputValue] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleAddNotes = () => {
    if (inputValue.length > 2) {
      dispatch(notesActions.addNote(inputValue));
      setInputValue("");
      setErrorMessage("");
    } else {
      setErrorMessage("Minimum of 3 letters for Note");
    }
  };

  const handleAddText = (e) => {
    setInputValue(e.target.value);
    setErrorMessage("");
  };

  return (
    <div
      className={selectResponsiShow ? styles.LeftContainer : styles.mobilLeft}
    >
      <div className={styles.left}>
        <div className={styles.leftTitle}>ADD NOTE</div>
        <TextArea
          value={inputValue}
          rows={12}
          placeholder="New note entry"
          style={{ background: selectedColor || "#fff8a7" }}
          onChange={(e) => handleAddText(e)}
        />
        <div className={styles.noteColorContainer}>
          <NoteColor color="#fff8a7" />
          <NoteColor color="#f9ced7" />
          <NoteColor color="#bcf7e1" />
        </div>
        <div>
          <Button variant="big" onClick={() => handleAddNotes()}>
            ADD
          </Button>
          {errorMessage && <p className={styles.error}>{errorMessage}</p>}
        </div>
      </div>
    </div>
  );
}
