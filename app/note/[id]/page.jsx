"use client";

import { useSelector } from "react-redux";
import {
  selectResponsive,
  selectcolor,
  selectnotes,
} from "@/stores/notes-store";
import styles from "./styles.module.css";

import Notes from "@/components/note";
import Comment from "@/components/comment";
import { notFound } from "next/navigation";
import NotesInput from "@/components/notes-input";

export default function Note({ params }) {
  const notes = useSelector(selectnotes);
  const selectResponsiShow = useSelector(selectResponsive);
  const selectedColor = useSelector(selectcolor);

  let note = notes.filter((not) => not.id == params.id);

  if (note.length <= 0) {
    notFound();
  }

  return (
    <div className={styles.mainContainer}>
      <div className={styles.inputContainer}>
        {selectResponsiShow === true ? (
          <NotesInput selectedColor={selectedColor} />
        ) : (
          <div className={styles.bigNoteContainer}>
            <Notes note={note[0]} variant="big" />
            <Comment note={note[0]} />
          </div>
        )}
      </div>
      <div className={styles.bigNoteContainer}>
        <Notes note={note[0]} variant="big" />
        <Comment note={note[0]} />
      </div>
    </div>
  );
}
