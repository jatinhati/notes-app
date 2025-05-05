import React from "react";

const COLOR_PALETTE = [
  "#ffffff", "#ffcdd2", "#f8bbd0", "#e1bee7", "#d1c4e9", "#c5cae9", "#bbdefb", "#b3e5fc", "#b2ebf2", "#b2dfdb", "#c8e6c9", "#dcedc8", "#f0f4c3", "#fff9c4", "#ffe0b2", "#d7ccc8"
];

const MAX_LENGTH = 2000;

export default function AddNote({ 
  handleNoteText, 
  handleAddNote, 
  noteText, 
  noteColor, 
  handleNoteColor,
  editingNote
}) {
  return (
    <div className={`note new ${editingNote ? 'editing' : ''}`} style={{ backgroundColor: noteColor }}>
      <textarea
        onChange={(e) => {
          handleNoteText(e.target.value);
        }}
        value={noteText}
        cols="8"
        rows="7"
        placeholder={editingNote ? "Edit your note..." : "Type something here..."}
        maxLength={MAX_LENGTH}
      ></textarea>
      <div className="note-footer">
        <div className="note-controls">
          <small>{MAX_LENGTH - noteText.length} characters left</small>
        </div>
        <button onClick={handleAddNote} className="save">
          {editingNote ? 'Update' : 'Save'}
        </button>
      </div>
      <div className="color-options">
        <div className="color-presets">
          {COLOR_PALETTE.map((color) => (
            <div
              key={color}
              className={`color-preset ${noteColor === color ? 'active' : ''}`}
              style={{ backgroundColor: color }}
              onClick={() => handleNoteColor(color)}
            />
          ))}
        </div>
        <div className="custom-color">
          <label>Custom Color:</label>
          <input
            type="color"
            value={noteColor}
            onChange={(e) => handleNoteColor(e.target.value)}
            className="color-picker"
          />
        </div>
      </div>
    </div>
  );
}
