"use client";

import { useDispatch, useSelector } from "react-redux";
import {
  actions as notesActions,
  selectResponsive,
} from "@/stores/notes-store";

import Link from "next/link";
import Button from "../button";

import styles from "./styles.module.css";
import { GrAdd } from "react-icons/gr";
import { GrClose } from "react-icons/gr";

export default function Header() {
  const dispatch = useDispatch();

  const selectResponsiShow = useSelector(selectResponsive);
  return (
    <div className={styles.header}>
      <Link href="/">
        <div className={styles.title}>Note App</div>
      </Link>
      <div className={styles.roundContainer}>
        <Button
          variant="round"
          onClick={() => dispatch(notesActions.changeResShow())}
        >
          {selectResponsiShow ? <GrClose size={18} /> : <GrAdd size={18} />}
        </Button>
      </div>
    </div>
  );
}
