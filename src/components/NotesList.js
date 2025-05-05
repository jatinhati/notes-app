import React from "react";
import AddNote from "./AddNote";
import Note from "./Note";

export default function NotesList({
  myNotes,
  handleNoteText,
  handleAddNote,
  noteText,
  handleDeleteNotes,
  noteColor,
  handleNoteColor,
  handleEditNote,
  editingNote,
  darkMode
}) {
  return (
    <div className="notes-list">
      <AddNote
        noteText={noteText}
        handleAddNote={handleAddNote}
        handleNoteText={handleNoteText}
        noteColor={noteColor}
        handleNoteColor={handleNoteColor}
        editingNote={editingNote}
        darkMode={darkMode}
      />
      {myNotes.map((note) => {
        return (
          <Note
            handleDeleteNotes={handleDeleteNotes}
            handleEditNote={handleEditNote}
            key={note.id}
            note={note}
            isEditing={editingNote?.id === note.id}
            darkMode={darkMode}
          />
        );
      })}
    </div>
  );
}
