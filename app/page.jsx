"use client";

import { useSelector } from "react-redux";
import { selectcolor, selectnotes } from "@/stores/notes-store";
import { useEffect, useState } from "react";

import NotesInput from "@/components/notes-input";
import NotePaper from "@/components/note-paper";

import styles from "./styles.module.css";
import { CustomLoading } from "@/components/loading";

export default function Home() {
  const [load, setLoad] = useState(false);
  let notes = useSelector(selectnotes);
  const selectedColor = useSelector(selectcolor);

  useEffect(() => {
    if (notes != null) {
      setLoad(true);
    } else {
      setLoad(false);
    }
  }, [notes]);

  return (
    <>
      {load ? (
        <div className={styles.mainContainer}>
          <NotesInput selectedColor={selectedColor} />
          <NotePaper notes={notes} selectedColor={selectedColor} />
        </div>
      ) : (
        <CustomLoading />
      )}
    </>
  );
}
