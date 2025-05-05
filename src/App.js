import React, { useState, useEffect } from "react";
import NotesList from "./components/NotesList";
import { nanoid } from "nanoid";
import Search from "./components/Search";
import Header from "./components/Header";

const COLOR_PALETTE = [
  "#ffffff", "#ffcdd2", "#f8bbd0", "#e1bee7", "#d1c4e9", "#c5cae9", "#bbdefb", "#b3e5fc", "#b2ebf2", "#b2dfdb", "#c8e6c9", "#dcedc8", "#f0f4c3", "#fff9c4", "#ffe0b2", "#d7ccc8"
];
const DARK_PALETTE = [
  "#23272f", "#4a2f2f", "#4a2f3f", "#3f2f4a", "#2f2f4a", "#2f3f4a", "#2f3f4a", "#2f3f4a", "#2f4a4a", "#2f4a4a", "#2f4a2f", "#3f4a2f", "#4a4a2f", "#4a4a2f", "#4a3f2f", "#3f3f3f"
];

// Mapping from light to dark and vice versa
const toDarkColor = color => {
  const idx = COLOR_PALETTE.indexOf(color);
  return idx !== -1 ? DARK_PALETTE[idx] : color;
};
const toLightColor = color => {
  const idx = DARK_PALETTE.indexOf(color);
  return idx !== -1 ? COLOR_PALETTE[idx] : color;
};

function App() {
  const [myNotes, setMyNotes] = useState([]);
  const [noteText, setNoteText] = useState("");
  const [searchText, setSearchText] = useState("");
  const [darkMode, setDarkMode] = useState(false);
  const [noteColor, setNoteColor] = useState(COLOR_PALETTE[0]);
  const [editingNote, setEditingNote] = useState(null);

  // Convert all notes' colors on dark mode toggle
  useEffect(() => {
    setMyNotes(notes => notes.map(note => ({
      ...note,
      color: darkMode ? toDarkColor(note.color) : toLightColor(note.color)
    })));
    setNoteColor(prev => darkMode ? toDarkColor(prev) : toLightColor(prev));
  }, [darkMode]);

  function updateNote(text) {
    setNoteText(text);
  }

  function updateNoteColor(color) {
    setNoteColor(color);
  }

  function addNote() {
    if (noteText.trim().length === 0) {
      alert("Add Some Text First");
      setNoteText('');
    } else {
      const date = new Date().toLocaleDateString();

      if (editingNote) {
        // Update existing note
        const updatedNotes = myNotes.map(note => 
          note.id === editingNote.id 
            ? { ...note, text: noteText, color: noteColor }
            : note
        );
        setMyNotes(updatedNotes);
        setEditingNote(null);
      } else {
        // Add new note
        const myNewNote = {
          id: nanoid(),
          text: noteText,
          date: date,
          color: noteColor
        };
        const updatedNotes = [...myNotes, myNewNote];
        setMyNotes(updatedNotes);
      }
      setNoteText("");
      setNoteColor(COLOR_PALETTE[0]);
    }
  }

  function deleteNote(id) {
    const updatedNotes = myNotes.filter((note) => note.id !== id);
    setMyNotes(updatedNotes);
  }

  function editNote(note) {
    setNoteText(note.text);
    setNoteColor(note.color);
    setEditingNote(note);
  }

  function searchBar(text) {
    setSearchText(text.toLowerCase());
  }

  return (
    <div className={darkMode && "dark-mode"}>
      <div className="container">
        <Header handleDarkMode={setDarkMode} />
        <Search handleSearchBar={searchBar} />
        <NotesList
          noteText={noteText}
          handleNoteText={updateNote}
          handleAddNote={addNote}
          handleDeleteNotes={deleteNote}
          handleEditNote={editNote}
          myNotes={myNotes.filter((note) =>
            note.text.toLowerCase().includes(searchText)
          )}
          noteColor={noteColor}
          handleNoteColor={updateNoteColor}
          editingNote={editingNote}
          darkMode={darkMode}
        />
      </div>
    </div>
  );
}

export default App;
