/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import Button from '../../ui/Button';
import { useNotes } from './notesContext';

function NoteItem({ note }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isEditing, setisEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(note.title);
  const [editText, setEditText] = useState(note.text);
  const [width, setWidth] = useState(window.innerWidth);
  const { deleteNote, editNote } = useNotes();

  const MAX_LENGHT_BEFORE_CUT_TITLE = 15;
  const MAX_LENGHT_BEFORE_CUT_TEXT = 50;

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  const toggleEditing = () => {
    setisEditing(!isEditing);
  };

  window.addEventListener('resize', () => {
    setWidth(window.innerWidth);
  });

  return (
    <li className="bg-blue-100 p-2 m-2 rounded-lg cursor-pointer overflow-hidden transition-all duration-300 ease-in-out overflow-x-visible">
      <div className="grid sm:grid-cols-[1fr_3fr_1fr] gap-y-2 items-center" onClick={toggleExpand}>
        <span className="bg-stone-50 p-2 mx-1 mt-1 rounded-lg font-bold">
          {note.title.length < MAX_LENGHT_BEFORE_CUT_TITLE
            ? note.title
            : width > 640
            ? note.title.slice(0, MAX_LENGHT_BEFORE_CUT_TITLE) + '...'
            : note.title.slice(0, MAX_LENGHT_BEFORE_CUT_TITLE - 0) + '...'}
        </span>
        <span className="bg-stone-50 p-2 mx-1 rounded-lg">
          {note.text.length < 35
            ? note.text
            : width > 640
            ? note.text.slice(0, MAX_LENGHT_BEFORE_CUT_TEXT) + '...'
            : note.text.slice(0, MAX_LENGHT_BEFORE_CUT_TEXT - 30) + '...'}
        </span>
        <span className="bg-stone-50 p-2 mx-1 rounded-lg">{note.date}</span>
        <span className="ml-1 flex gap-2">
          <Button
            onClick={(e) => {
              e.stopPropagation();
              toggleEditing();
            }}
            type="edit">
            Delete
          </Button>
          <Button
            onClick={(e) => {
              e.stopPropagation();
              deleteNote(note.id);
            }}
            type="close">
            Delete
          </Button>
        </span>
      </div>
      <div
        className={`mt-2 bg-stone-50 rounded-lg transition-all duration-300 ease-in-out
                    ${
                      isExpanded
                        ? 'max-h-[1000px] opacity-100 p-2'
                        : 'max-h-0 opacity-0 p-0 overflow-hidden'
                    }`}>
        <div
          className={`transition-all duration-300 ease-in-out ${
            isExpanded ? 'scale-y-100 opacity-100' : 'scale-y-0 opacity-0'
          }`}>
          <h3 className="font-bold mb-2 break-words">{note.title}</h3>
          <p className="whitespace-normal break-words">{note.text}</p>
        </div>
      </div>

      {/* EDIT NOTE PART */}
      <div
        className={`mt-2 bg-stone-50 rounded-lg transition-all duration-300 ease-in-out
                    ${
                      isEditing
                        ? 'max-h-[1000px] opacity-100 p-2'
                        : 'max-h-0 opacity-0 p-0 overflow-hidden'
                    }`}>
        <div
          className={`transition-all flex flex-col gap-2 duration-300 ease-in-out ${
            isEditing ? 'scale-y-100 opacity-100' : 'scale-y-0 opacity-0'
          }`}>
          <textarea
            value={editTitle}
            maxLength={45}
            onChange={(e) => setEditTitle(e.target.value)}
            className="font-bold mb-2 p-2 break-words bg-slate-200 rounded-lg"></textarea>
          <textarea
            value={editText}
            maxLength={210}
            onChange={(e) => setEditText(e.target.value)}
            className="whitespace-normal break-words p-2 bg-slate-200 rounded-lg"></textarea>
          <div className="w-full flex items-center justify-center">
            <Button
              onClick={() => {
                const editedNote = {
                  id: note.id,
                  title: editTitle,
                  text: editText,
                  date: note.date,
                };
                editNote(editedNote);
                toggleEditing();
              }}
              type="primary">
              Save
            </Button>
          </div>
        </div>
      </div>
    </li>
  );
}

export default NoteItem;
