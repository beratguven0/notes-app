import { useDispatch } from "react-redux";
import { actions as notesActions } from "@/stores/notes-store";
import { useState } from "react";

import styles from "./styles.module.css";
import TextArea from "../textarea";
import Notes from "../note";
import Button from "../button";

export default function Comment({ note }) {
  const dispatch = useDispatch();

  const [notesValue, setNotesValue] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleCommentChange = (id, comment) => {
    if (notesValue.length > 2) {
      dispatch(notesActions.setComment({ id, comment, complete: false }));
      setNotesValue("");
      setErrorMessage("");
    } else {
      setErrorMessage("Minimum of 3 letters for Note");
    }
  };

  const handleUpdateValue = (e) => {
    setNotesValue(e.target.value);
    setErrorMessage("");
  };

  return (
    <>
      <h1 className={styles.title}>{note.comment.length} Note comments</h1>
      <div className={styles.yorumyaz} style={{ background: note.color }}>
        <TextArea
          rows={4}
          placeholder="yeni not girisi"
          value={notesValue}
          onChange={(e) => handleUpdateValue(e)}
        />
        <div className={styles.footer}>
          {errorMessage && <p className={styles.error}>{errorMessage}</p>}
          <Button onClick={() => handleCommentChange(note.id, notesValue)}>
            Add Comment
          </Button>
        </div>
      </div>

      <div className={styles.commentContainer}>
        {note.comment.map((comment) => (
          <Notes note={comment} variant="comment" key={comment.id} />
        ))}
      </div>
    </>
  );
}
