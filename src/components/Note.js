import React, { useState } from "react";
import { FaTrashAlt, FaEdit, FaTimes } from "react-icons/fa";

export default function Note({ note, handleDeleteNotes, handleEditNote, isEditing }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const maxLength = 200;

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  const displayText = isExpanded 
    ? note.text 
    : note.text.length > maxLength 
      ? note.text.substring(0, maxLength) + '...' 
      : note.text;

  return (
    <div className={`note ${isEditing ? 'editing' : ''}`} style={{ backgroundColor: note.color }}>
      <span className="note-text">{displayText}</span>
      {note.text.length > maxLength && (
        <span className="read-more" onClick={toggleExpand}>
          {isExpanded ? 'Show Less' : 'Read More'}
        </span>
      )}
      <div className="note-footer">
        <small>{note.date}</small>
        <div className="note-actions">
          <div 
            className={`edit-icon ${isEditing ? 'active' : ''}`} 
            onClick={() => handleEditNote(note)}
            title={isEditing ? "Cancel Edit" : "Edit Note"}
          >
            {isEditing ? <FaTimes /> : <FaEdit />}
          </div>
          <div 
            className="delete-icon" 
            onClick={() => handleDeleteNotes(note.id)}
            title="Delete Note"
          >
            <FaTrashAlt />
          </div>
        </div>
      </div>
    </div>
  );
}
