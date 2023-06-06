"use client";

import { useDispatch } from "react-redux";
import { actions as notesActions } from "@/stores/notes-store";
import { useState } from "react";
import { useRouter } from "next/navigation";

import TextArea from "../textarea";
import Link from "next/link";

import styles from "./styles.module.css";

import { AiFillEdit } from "react-icons/ai";
import { AiFillDelete } from "react-icons/ai";
import { BsCheckLg } from "react-icons/bs";
import Button from "../button";

export default function Notes({ note, variant = "medium" }) {
  const dispatch = useDispatch();
  const router = useRouter();

  const [isEditing, setEditing] = useState(false);
  const [notesValue, setNotesValue] = useState(note.text);
  const [complete, setComplete] = useState(note.complete);
  const [errorMessage, setErrorMessage] = useState("");

  const handleDeleteNote = () => {
    dispatch(notesActions.removeNote(note.id));
    router.push("/");
  };

  const handleDeleteComment = () => {
    dispatch(notesActions.removeComment(note.id));
  };

  const handleUpdateNote = (id, notesValue) => {
    if (notesValue.length > 2) {
      dispatch(notesActions.updateNote({ id: id, text: notesValue }));
      setNotesValue(notesValue);
      setEditing(!isEditing);
      setErrorMessage("");
    } else {
      setErrorMessage("Minimum of 3 letters for Note.");
    }
  };

  const handleUpdateValue = (e) => {
    setNotesValue(e.target.value);
    setErrorMessage("");
  };

  const handlecomplete = () => {
    setComplete(!complete);
    dispatch(notesActions.updateComment({ id: note.id, complete: !complete }));
  };

  let classNameText, classNameNote;

  if (variant == "big") {
    classNameText = styles.bigTextContainer;
    classNameNote = styles.bigNote;
  } else if (variant == "comment") {
    classNameText = styles.commentTextContainer;
    classNameNote = styles.bigNote;
  } else {
    classNameText = styles.textContainer;
    classNameNote = styles.noteCard;
  }

  let lineColor;

  if (note.color === "#fff8a7") {
    lineColor = "#b6ae5d";
  } else if (note.color === "#f9ced7") {
    lineColor = "#b8707d";
  } else if (note.color === "#bcf7e1") {
    lineColor = "#71b9a1";
  }

  let completeLine = note.complete ? styles.completed : "";

  return (
    <div style={{ backgroundColor: note.color }} className={classNameNote}>
      {isEditing ? (
        <TextArea
          style={{ backgroundColor: note.color, minHeight: "246px" }}
          value={notesValue}
          onChange={(e) => handleUpdateValue(e)}
        />
      ) : variant == "big" || variant == "comment" ? (
        <div className={classNameText}>
          <p className={completeLine}>{note.text}</p>
        </div>
      ) : (
        <Link href={`/note/${note.id}`}>
          <div className={classNameText}>
            <p>{note.text}</p>
          </div>
        </Link>
      )}
      <div className={styles.noteCardFooterContainer}>
        <div
          style={{ backgroundColor: lineColor }}
          className={styles.line}
        ></div>
        <div className={styles.noteCardFooter}>
          {isEditing ? (
            <div className={styles.editContainer}>
              {errorMessage && <p className={styles.error}>{errorMessage}</p>}
              <Button
                variant="small"
                onClick={() => handleUpdateNote(note.id, notesValue)}
              >
                Save
              </Button>
            </div>
          ) : (
            <>
              <p>{note.date}</p>
              <div className={styles.btnGrup}>
                {variant == "big" && (
                  <button
                    className={styles.iconBtn}
                    onClick={() => setEditing(!isEditing)}
                  >
                    <AiFillEdit size={22} className={styles.EditIcon} />
                  </button>
                )}
                {variant == "comment" ? (
                  <>
                    <button
                      className={styles.iconBtn}
                      onClick={() => handlecomplete()}
                    >
                      <BsCheckLg size={24} className={styles.checkIcon} />
                    </button>
                    <button
                      className={styles.iconBtn}
                      onClick={() => handleDeleteComment()}
                    >
                      <AiFillDelete size={22} className={styles.deleteIcon} />
                    </button>
                  </>
                ) : (
                  <button
                    className={styles.iconBtn}
                    onClick={() => handleDeleteNote()}
                  >
                    <AiFillDelete size={22} className={styles.deleteIcon} />
                  </button>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
