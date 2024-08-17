/* eslint-disable react/prop-types */
import React, { createContext, useContext, useEffect, useState, useMemo } from 'react';

const NotesContext = createContext();

function NotesProvider({ children }) {
  const validateNote = (note) => {
    // Validate that the note has the required properties
    return (
      note &&
      typeof note.id === 'number' &&
      typeof note.title === 'string' &&
      typeof note.text === 'string' &&
      Array.isArray(note.selectedCategories) &&
      typeof note.date === 'string'
    );
  };

  const [notes, setNotes] = useState(() => {
    const savedNotes = localStorage.getItem('notes');
    if (savedNotes) {
      const parsedNotes = JSON.parse(savedNotes);
      // Filter out any notes that don't match the required format
      const validNotes = parsedNotes.filter(validateNote);
      if (validNotes.length !== parsedNotes.length) {
        // If there are invalid notes, clear the invalid ones from localStorage
        localStorage.setItem('notes', JSON.stringify(validNotes));
      }
      return validNotes;
    }
    return [];
  });

  const [categories, setCategories] = useState(() => {
    const savedCategories = localStorage.getItem('categories');
    return savedCategories ? JSON.parse(savedCategories) : [];
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
    localStorage.setItem('categories', JSON.stringify(categories));
  }, [categories]);

  function addCategory(newCategory) {
    if (categories.includes(newCategory)) {
      alert('Category already added');
      return;
    }
    setCategories((prevCategories) => [...prevCategories, newCategory]);
  }

  function addSelectedCategory(noteId, category) {
    setNotes((prevNotes) =>
      prevNotes.map((note) =>
        note.id === noteId
          ? { ...note, selectedCategories: [...note.selectedCategories, category] }
          : note,
      ),
    );
  }

  function deleteCategory(category) {
    setCategories((prevCategories) => prevCategories.filter((cat) => cat !== category));
  }

  function deleteSelectedCategories(noteId, category) {
    setNotes((prevNotes) =>
      prevNotes.map((note) =>
        note.id === noteId
          ? {
              ...note,
              selectedCategories: note.selectedCategories.filter((cat) => cat !== category),
            }
          : note,
      ),
    );
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
    addCategory,
    addSelectedCategory,
    deleteCategory,
    deleteSelectedCategories,
    categories,
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
