/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import Button from '../../ui/Button';
import { useNotes } from './notesContext';
import EditNote from './EditNote';
import Categories from './Categories';

function NoteItem({ note }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isEditing, setisEditing] = useState(false);
  const [isCategoriesExpanded, setIsCategoriesExpanded] = useState(false);
  const [editTitle, setEditTitle] = useState(note?.title || '');
  const [editText, setEditText] = useState(note?.text || '');
  const [width, setWidth] = useState(window.innerWidth);
  const { notes, categories, deleteNote, editNote, deleteSelectedCategories, addSelectedCategory } =
    useNotes();

  const MAX_LENGHT_BEFORE_CUT_TITLE = 15;
  const MAX_LENGHT_BEFORE_CUT_TEXT = 50;

  useEffect(() => {
    const noteToUpdate = notes.find((n) => n.id === note.id);
    if (noteToUpdate) {
      const updatedSelectedCategories = noteToUpdate.selectedCategories.filter((category) =>
        categories.includes(category),
      );
      if (updatedSelectedCategories.length !== noteToUpdate.selectedCategories.length) {
        const updatedNote = { ...noteToUpdate, selectedCategories: updatedSelectedCategories };
        editNote(updatedNote);
      }
    }
  }, [categories, notes, note.id, editNote]);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  const toggleCategoriesExpand = (e) => {
    e.stopPropagation();
    setIsCategoriesExpanded(!isCategoriesExpanded);
  };

  const toggleEditing = () => {
    setisEditing(!isEditing);
  };

  window.addEventListener('resize', () => {
    setWidth(window.innerWidth);
  });

  function handleDeleteNote() {
    if (window.confirm('Are you sure you want to delete this note?')) {
      deleteNote(note.id);
    }
  }

  if (!note) {
    return null;
  }

  return (
    <li className="bg-white/20 backdrop-blur-sm p-4 rounded-xl border border-white/30 shadow-sm hover:shadow-md transition-all duration-200">
      <div className="grid sm:grid-cols-[1fr_3fr_1fr] gap-3 items-center" onClick={toggleExpand}>
        <div className="bg-white/50 p-3 rounded-lg font-bold border border-white/30">
          {note.title.slice(0, MAX_LENGHT_BEFORE_CUT_TITLE) +
            (note.title.length > MAX_LENGHT_BEFORE_CUT_TITLE ? '...' : '')}
        </div>

        <div className="bg-white/50 p-3 rounded-lg border border-white/30">
          {note.text.slice(0, MAX_LENGHT_BEFORE_CUT_TEXT) +
            (note.text.length > MAX_LENGHT_BEFORE_CUT_TEXT ? '...' : '')}
        </div>

        <div className="bg-white/50 p-3 rounded-lg border border-white/30 text-sm">{note.date}</div>

        <div className="flex gap-2 col-span-full sm:col-span-1">
          <Button
            onClick={(e) => {
              e.stopPropagation();
              toggleEditing();
            }}
            type="edit"
          />
          <Button
            onClick={(e) => {
              e.stopPropagation();
              handleDeleteNote();
            }}
            type="close"
          />
        </div>
        <Categories
          note={note}
          categories={categories}
          addSelectedCategory={addSelectedCategory}
          deleteSelectedCategories={deleteSelectedCategories}
          toggleCategoriesExpand={toggleCategoriesExpand}
          isCategoriesExpanded={isCategoriesExpanded}
        />
      </div>

      <div
        className={`mt-3 bg-white/30 rounded-lg transition-all duration-300 ${
          isExpanded ? 'max-h-[1000px] opacity-100 p-4' : 'max-h-0 opacity-0'
        }`}>
        <h3 className="text-lg font-semibold mb-2">{note.title}</h3>
        <p className="whitespace-pre-wrap">{note.text}</p>
      </div>

      {/* EDIT NOTE PART */}
      <EditNote
        note={note}
        isEditing={isEditing}
        editTitle={editTitle}
        setEditTitle={setEditTitle}
        editText={editText}
        setEditText={setEditText}
        editNote={editNote}
        toggleEditing={toggleEditing}
      />
    </li>
  );
}

export default NoteItem;
