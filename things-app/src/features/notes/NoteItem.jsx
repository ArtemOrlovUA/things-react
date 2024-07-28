/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import Button from '../../ui/Button';
import { useNotes } from './notesContext';

function NoteItem({ note }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const { deleteNote } = useNotes();

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <li
      className="bg-blue-100 p-2 m-2 rounded-lg cursor-pointer overflow-hidden transition-all duration-300 ease-in-out"
      onClick={toggleExpand}>
      <div className="grid grid-cols-[2fr_6fr_1.7fr_1fr] items-center">
        <span className="bg-stone-50 p-2 mx-1 mt-1 rounded-lg">
          {note.title.length < 30 ? note.title : note.title.slice(0, 30) + '...'}
        </span>
        <span className="bg-stone-50 p-2 mx-1 rounded-lg">
          {note.text.length < 45 ? note.text : note.text.slice(0, 45) + '...'}
        </span>
        <span className="bg-stone-50 p-2 mx-1 rounded-lg">{note.date}</span>
        <span className="ml-1 flex gap-2">
          <Button
            onClick={(e) => {
              e.stopPropagation();
              deleteNote(note.id);
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
        className={`mt-2 bg-stone-50 rounded-lg transition-all duration-300 ease-in-out max-w-[1047px]
                    ${
                      isExpanded
                        ? 'max-h-[1000px] opacity-100 p-2'
                        : 'max-h-0 opacity-0 p-0 overflow-hidden'
                    }`}>
        <div
          className={`transition-all duration-300 ease-in-out ${
            isExpanded ? 'scale-y-100 opacity-100' : 'scale-y-0 opacity-0'
          }`}>
          <h3 className="font-bold mb-2">{note.title}</h3>
          <p className="whitespace-normal break-words">{note.text}</p>
        </div>
      </div>
    </li>
  );
}

export default NoteItem;
