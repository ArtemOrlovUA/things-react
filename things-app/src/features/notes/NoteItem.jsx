/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import Button from '../../ui/Button';
import { useNotes } from './notesContext';

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

  if (!note) {
    return null;
  }

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
            type="edit"
          />
          <Button
            onClick={(e) => {
              e.stopPropagation();
              deleteNote(note.id);
            }}
            type="close"
          />
        </span>
        <div className="bg-slate-50 rounded-lg overflow-x-auto mx-1 flex min-h-16 overflow-y-hidden">
          {Array.isArray(note.selectedCategories) && note.selectedCategories.length > 0 ? (
            <div className="flex">
              {note.selectedCategories.map((category) => (
                <React.Fragment key={category}>
                  <div className="flex items-center gap-x-2 bg-blue-300 rounded-full px-2 py-1 m-2">
                    <span>{category}</span>
                    <Button
                      onClick={(e) => {
                        e.stopPropagation();
                        deleteSelectedCategories(note.id, category);
                      }}
                      type="close"
                    />
                  </div>
                </React.Fragment>
              ))}
              <div className="flex items-center gap-x-2">
                <div className="flex items-center mx-2">
                  <Button onClick={(e) => toggleCategoriesExpand(e)} type="plus" />
                </div>
                <div
                  className={`transition-all duration-300 ${
                    isCategoriesExpanded ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'
                  }`}>
                  <div className="w-fit bg-slate-50 rounded-lg flex overflow-y-hidden items-center gap-x-2 pr-2">
                    {' '}
                    {/* Added padding-right */}
                    {categories.map((category) =>
                      Array.isArray(note.selectedCategories) &&
                      !note.selectedCategories.includes(category) ? (
                        <div
                          key={category}
                          onClick={(e) => e.stopPropagation()}
                          className="flex gap-x-2 bg-blue-200 rounded-full px-3 py-1 w-fit cursor-pointer">
                          <span className="py-2">{category}</span>
                          <Button
                            onClick={(e) => {
                              e.stopPropagation();
                              addSelectedCategory(note.id, category);
                            }}
                            type="plus"
                          />
                        </div>
                      ) : null,
                    )}
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="p-2 text-gray-500 flex items-center gap-x-2 w-fit">
              <span className="min-w-fit mr-2">No categories selected</span>
              <div className="flex items-center mr-2">
                <Button onClick={(e) => toggleCategoriesExpand(e)} type="plus" />
              </div>
              <div
                className={`transition-all duration-300 overflow-hidden ${
                  isCategoriesExpanded ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'
                }`}>
                <div className="bg-slate-50 rounded-lg flex items-center overflow-y-hidden gap-x-2 w-fit pr-[6.2rem]">
                  {' '}
                  {/* Added padding-right */}
                  {categories.map((category) =>
                    Array.isArray(note.selectedCategories) &&
                    !note.selectedCategories.includes(category) ? (
                      <div
                        key={category}
                        onClick={(e) => e.stopPropagation()}
                        className="flex gap-x-2 bg-blue-200 rounded-full px-3 py-1 w-fit cursor-pointer">
                        <span className="py-2">{category}</span>
                        <Button
                          onClick={(e) => {
                            e.stopPropagation();
                            addSelectedCategory(note.id, category);
                          }}
                          type="plus"
                        />
                      </div>
                    ) : null,
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      {/* Expandable content */}
      <div
        className={`mt-2 bg-stone-50 rounded-lg transition-all duration-300 ease-in-out ${
          isExpanded ? 'max-h-[1000px] opacity-100 p-2' : 'max-h-0 opacity-0 p-0 overflow-hidden'
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
        className={`mt-2 bg-stone-50 rounded-lg transition-all duration-300 ease-in-out ${
          isEditing ? 'max-h-[1000px] opacity-100 p-2' : 'max-h-0 opacity-0 p-0 overflow-hidden'
        }`}>
        <div
          className={`transition-all flex flex-col gap-2 duration-300 ease-in-out ${
            isEditing ? 'scale-y-100 opacity-100' : 'scale-y-0 opacity-0'
          }`}>
          <textarea
            value={editTitle}
            maxLength={45}
            onChange={(e) => setEditTitle(e.target.value)}
            className="font-bold mb-2 p-2 break-words bg-slate-200 rounded-lg resize-none"></textarea>
          <textarea
            value={editText}
            maxLength={210}
            onChange={(e) => setEditText(e.target.value)}
            className="whitespace-normal break-words p-2 bg-slate-200 rounded-lg resize-none"></textarea>
          <div className="w-full flex items-center justify-center">
            <Button
              onClick={() => {
                const editedNote = {
                  id: note.id,
                  title: editTitle,
                  text: editText,
                  date: note.date,
                  selectedCategories: note.selectedCategories,
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
