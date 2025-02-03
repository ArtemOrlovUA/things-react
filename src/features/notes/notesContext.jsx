/* eslint-disable react/prop-types */
import React, { createContext, useContext, useEffect, useState } from 'react';
import { useCreateNote } from './useCreateNote';
import { useGetNotesByEmail } from './useGetNotesByEmail';
import { useUser } from '../../context/UserContext';
import { useDeleteNote } from './useDeleteNote';

const NotesContext = createContext();

function NotesProvider({ children }) {
  const { createNote: addNoteApi, isCreatingNote } = useCreateNote();
  const { deleteNote: deleteNoteApi, isDeletingNote } = useDeleteNote();
  const { currentUser } = useUser();
  const curUserEmail = currentUser?.email;

  const { notes: userNotesByApi } = useGetNotesByEmail(curUserEmail);

  const [notes, setNotes] = useState(userNotesByApi);

  useEffect(() => {
    if (userNotesByApi.length > 0) {
      setNotes(userNotesByApi);
    }
  }, [userNotesByApi]);

  const [categories, setCategories] = useState(() => {
    const savedCategories = localStorage.getItem('categories');
    return savedCategories ? JSON.parse(savedCategories) : [];
  });

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
    addNoteApi({ newNote });
  }

  function editNote(updatedNote) {
    setNotes((prevNotes) =>
      prevNotes.map((note) => (note.id === updatedNote.id ? updatedNote : note)),
    );
  }

  function deleteNote(id) {
    console.log(curUserEmail);
    deleteNoteApi({ noteId: id, creator_email: curUserEmail });
  }

  const value = {
    notes,
    setNotes,
    addNote,
    isCreatingNote,
    editNote,
    deleteNote,
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
