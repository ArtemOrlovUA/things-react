/* eslint-disable react/prop-types */
import React, { createContext, useContext, useEffect, useState, useMemo } from 'react';

const NotesContext = createContext();

function NotesProvider({ children }) {
  const [notes, setNotes] = useState(() => {
    const savedNotes = localStorage.getItem('notes');
    return savedNotes ? JSON.parse(savedNotes) : [];
  });

  const [searchQuery, setSearchQuery] = useState('');

  const filteredNotes = useMemo(() => {
    const lowercasedQuery = searchQuery.toLowerCase().trim();
    return notes.filter((note) => note.title.toLowerCase().includes(lowercasedQuery));
  }, [notes, searchQuery]);

  function handleSearchInput(e) {
    setSearchQuery(e.target.value);
  }

  useEffect(() => {
    localStorage.setItem('notes', JSON.stringify(notes));
  }, [notes]);

  function addNote(newNote) {
    setNotes((prevNotes) => [...prevNotes, newNote]);
  }

  function editNote(updatedNote) {
    setNotes((prevNotes) =>
      prevNotes.map((note) => (note.id === updatedNote.id ? updatedNote : note)),
    );
  }

  function deleteNote(id) {
    setNotes((prevNotes) => prevNotes.filter((note) => note.id !== id));
  }

  const value = {
    notes,
    filteredNotes,
    searchQuery,
    setNotes,
    addNote,
    editNote,
    deleteNote,
    handleSearchInput,
    setSearchQuery,
  };

  return <NotesContext.Provider value={value}>{children}</NotesContext.Provider>;
}

function useNotes() {
  const context = useContext(NotesContext);
  if (!context) {
    throw new Error('useNotes must be used within a NotesProvider');
  }
  return context;
}

export { NotesProvider, useNotes };
