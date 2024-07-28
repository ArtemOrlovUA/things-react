/* eslint-disable react/prop-types */
import { createContext, useContext, useEffect, useState } from 'react';

const NotesContext = createContext();

function NotesProvider({ children }) {
  const [notes, setNotes] = useState(() => {
    const savedNotes = localStorage.getItem('notes');
    return savedNotes ? JSON.parse(savedNotes) : [];
  });

  useEffect(
    function () {
      localStorage.setItem('notes', JSON.stringify(notes));
    },
    [notes],
  );

  function addNote(newNote) {
    setNotes((prevNotes) => [...prevNotes, newNote]);

    const notesLocal = localStorage?.getItem('notes');
    console.log(notesLocal);
  }

  function deleteNote(id) {
    setNotes((prevNotes) => prevNotes.filter((note) => note.id !== id));
  }

  return (
    <NotesContext.Provider value={{ notes, setNotes, addNote, deleteNote }}>
      {children}
    </NotesContext.Provider>
  );
}

function useNotes() {
  const context = useContext(NotesContext);
  if (!context) {
    throw new Error('useNotes must be used within a NotesProvider');
  }
  return context;
}

export { NotesProvider, useNotes };
