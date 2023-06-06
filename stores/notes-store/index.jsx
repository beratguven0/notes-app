import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  notes:
    typeof window !== "undefined"
      ? JSON.parse(localStorage.getItem("notes") ?? "[]")
      : [],
  selectedColor:
    typeof window !== "undefined"
      ? localStorage.getItem("selectedColor") ?? "#fff8a7"
      : "#fff8a7",
  responsiveShow: true,
};

export const { reducer, actions } = createSlice({
  name: "notes",
  initialState,
  reducers: {
    changeColor: (state, action) => {
      state.selectedColor = action.payload;
      localStorage.setItem("selectedColor", action.payload);
    },
    changeResShow: (state, action) => {
      state.responsiveShow = !state.responsiveShow;
    },
    addNote: (state, action) => {
      let noteIds = state.notes.map((note) => note.id);
      let maxId = noteIds.length > 0 ? Math.max(...noteIds) : 0;
      let nextId = maxId + 1;
      const note = {
        id: nextId,
        text: action.payload.trim(),
        date: new Date().toLocaleString("tr-TR"),
        color: state.selectedColor,
        comment: [],
      };
      state.notes = [note, ...state.notes];
      localStorage.setItem("notes", JSON.stringify(state.notes));
    },
    removeNote: (state, action) => {
      const noteId = action.payload;
      state.notes = state.notes.filter((note) => note.id !== noteId);
      localStorage.setItem("notes", JSON.stringify(state.notes));
    },
    removeComment: (state, action) => {
      const id = action.payload;
      state.notes = state.notes.map((note) => {
        note.comment = note.comment.filter((comment) => comment.id !== id);
        return note;
      });
      localStorage.setItem("notes", JSON.stringify(state.notes));
    },
    updateNote: (state, action) => {
      const { id, text } = action.payload;
      const note = state.notes.find((note) => note.id === id);
      note ? (note.text = text) : "";
      localStorage.setItem("notes", JSON.stringify(state.notes));
    },
    updateComment: (state, action) => {
      const { id, complete } = action.payload;
      state.notes = state.notes.map((note) => {
        note.comment = note.comment.map((comment) => {
          if (comment.id === id) {
            comment.complete = complete;
          }
          return comment;
        });
        return note;
      });

      localStorage.setItem("notes", JSON.stringify(state.notes));
    },
    setComment: (state, action) => {
      const { id, comment, complete } = action.payload;
      const note = state.notes.find((note) => note.id === id);

      if (note) {
        let noteIds = note.comment.map((note) => note.id);
        let maxId = noteIds.length > 0 ? Math.max(...noteIds) : 0;
        let nextId = maxId + 1;

        note.comment = [
          {
            id: nextId,
            text: comment,
            date: new Date().toLocaleString("tr-TR"),
            color: note.color,
            complete: complete,
          },
          ...note.comment,
        ];
        localStorage.setItem("notes", JSON.stringify(state.notes));
      }
    },
  },
});

export const selectnotes = ({ notes }) => notes.notes;
export const selectcolor = ({ notes }) => notes.selectedColor;
export const selectResponsive = ({ notes }) => notes.responsiveShow;
