import styles from "./styles.module.css";
import Notes from "../note";
import { useState } from "react";

export default function NotePaper({ notes, selectedColor }) {
  const [searchText, setSearchText] = useState("");

  const filteredNotes = notes.filter((note) =>
    note.text.toLowerCase().includes(searchText.toLowerCase())
  );

  const handleSearchChange = (event) => {
    setSearchText(event.target.value);
  };

  return (
    <div className={styles.maimContainer}>
      <div className={styles.search} style={{ backgroundColor: selectedColor }}>
        <input
          type="text"
          className={styles.SearchInput}
          placeholder="notlarınız arama"
          value={searchText}
          onChange={handleSearchChange}
        />
      </div>
      <div className={styles.notContainer}>
        {filteredNotes.map((note) => (
          <Notes note={note} key={note.id} />
        ))}
      </div>
    </div>
  );
}
