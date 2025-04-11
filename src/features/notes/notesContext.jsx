/* eslint-disable react/prop-types */
import React, { createContext, useContext, useEffect, useState } from 'react';
import { useCreateNote } from './useCreateNote';
import { useGetNotesByEmail } from './useGetNotesByEmail';
import { useUser } from '../../context/UserContext';
import { useDeleteNote } from './useDeleteNote';
import { useUpdateNote } from './useUpdateNote';
import { useGetCategoriesByEmail } from './useGetCategoriesByEmail';
import { useCreateCategory } from './useCreateCategory';
import { useDeleteCategory } from './useDeleteCategory';
import { useAddSelectedCategory } from './useAddSelectedCategory';
import { useDeleteSelectedCategory } from './useDeleteSelectedCategory';

const NotesContext = createContext();

function NotesProvider({ children }) {
  const { createNote: addNoteApi, isCreatingNote } = useCreateNote();
  const { updateNote: updateNoteApi, isUpdatingNote } = useUpdateNote();
  const { deleteNote: deleteNoteApi, isDeletingNote } = useDeleteNote();

  const { createCategory, isCreatingCategory } = useCreateCategory();
  const { addSelectedCategory: addSelectedCategoryApi, isAddingSelectedCategory } =
    useAddSelectedCategory();

  const { deleteCategory: deleteCategoryApi, isDeletingCategory } = useDeleteCategory();
  const { deleteSelectedCategory, isDeletingSelectedCategory } = useDeleteSelectedCategory();

  const { currentUser } = useUser();
  const curUserEmail = currentUser?.email;

  // Getting notes

  const { notes: userNotesByApi } = useGetNotesByEmail(curUserEmail);

  const [notes, setNotes] = useState(userNotesByApi);

  useEffect(() => {
    setNotes(userNotesByApi);
  }, [userNotesByApi]);

  // Getting categories

  const { categories: userCategoriesByApi } = useGetCategoriesByEmail(curUserEmail);

  const categoryNames = userCategoriesByApi.map((categoryObj) => categoryObj.categories).flat();

  const [categories, setCategories] = useState(categoryNames);

  useEffect(() => {
    if (userCategoriesByApi.length > 0) {
      setCategories(categoryNames);
    }
  }, [userCategoriesByApi]);

  function addCategory(newCategory) {
    if (categories.includes(newCategory)) {
      alert('Category already added');
      return;
    }

    if (newCategory.length > 25) {
      alert('Category name is too long. Max length is 25 characters');
      return;
    }

    const categoryToCreate = {
      userEmail: curUserEmail,
      categories: [newCategory],
    };

    createCategory(
      { newCategory: categoryToCreate },
      {
        context: { categories, setCategories }, // to make optimistic update
      },
    );
    // setCategories((prevCategories) => [...prevCategories, newCategory]);
  }

  function addSelectedCategory(noteId, category) {
    setNotes((prevNotes) =>
      prevNotes.map((note) =>
        note.id === noteId
          ? { ...note, selectedCategories: [...note.selectedCategories, category] }
          : note,
      ),
    );

    addSelectedCategoryApi({ noteId, category });
  }

  function deleteCategory(category) {
    setCategories((prevCategories) => prevCategories.filter((cat) => cat !== category));
    console.log(category, curUserEmail);
    deleteCategoryApi({ category, userEmail: curUserEmail });
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
    deleteSelectedCategory({ noteId, category });
  }

  function addNote(newNote) {
    addNoteApi({ newNote });
  }

  function editNote(updatedNote) {
    setNotes((prevNotes) =>
      prevNotes.map((note) => (note.id === updatedNote.id ? updatedNote : note)),
    );
    updateNoteApi(
      { updatedNote },
      {
        context: { notes, setNotes }, // to make optimistic update
      },
    );
  }

  function deleteNote(id) {
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
    isCreatingCategory,
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
