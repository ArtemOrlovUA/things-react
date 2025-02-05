import { useState } from 'react';
import Button from '../../ui/Button';
import { useNotes } from './notesContext';
import HideAndOpenButton from '../../ui/HideAndOpenButton';
import { useUser } from '../../context/UserContext';

function formatDate(date) {
  const pad = (num) => num.toString().padStart(2, '0');

  const hours = pad(date.getHours());
  const minutes = pad(date.getMinutes());
  const day = pad(date.getDate());
  const month = pad(date.getMonth() + 1);
  const year = date.getFullYear();

  return `${hours}:${minutes}, ${day}.${month}.${year}`;
}

function CreateNote() {
  const { currentUser } = useUser();
  const [title, setTitle] = useState('');
  const [note, setNote] = useState('');
  const [categoryInput, setCategoryInput] = useState('');
  const [selectedCategories, setSelectedCategories] = useState([]);
  const { addNote, categories, addCategory, deleteCategory, isCreatingNote } = useNotes();
  const [isHidden, setIsHidden] = useState(false);

  const handleSelectCategory = (category) => {
    if (selectedCategories.includes(category)) {
      setSelectedCategories((prev) => prev.filter((c) => c !== category));
    } else {
      setSelectedCategories((prev) => [...prev, category]);
    }
  };

  const handleDeleteCategory = (category) => {
    setSelectedCategories((prev) => prev.filter((c) => c !== category));
    deleteCategory(category);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (title.trim().length > 45) throw new Error('Title is too long');
    if (note.trim().length > 210) throw new Error('Text of note is too long');

    const newNote = {
      title: title.trim(),
      text: note.trim() === '' ? 'No text' : note.trim(),
      selectedCategories,
      date: formatDate(new Date()),
      creatorEmail: currentUser?.email,
    };

    setTitle('');
    setNote('');
    setSelectedCategories([]);

    addNote(newNote);
  };

  return (
    <div className="mx-6 mt-4 rounded-3xl bg-gradient-to-br from-purple-50 to-blue-50 backdrop-blur-lg border border-white/10 shadow-xl hover:shadow-2xl transition-all duration-300 ease-in-out hover:-translate-y-2">
      <HideAndOpenButton isHidden={isHidden} setIsHidden={setIsHidden} />
      <form
        className={`w-[90%] h-full flex ml-4 flex-col justify-between transition-all duration-300 ease-in-out
          ${
            isHidden ? 'max-h-0 opacity-0 overflow-hidden' : 'max-h-[1000px] opacity-100'
          } sm:max-h-[1000px] opacity-100`}
        onSubmit={handleSubmit}>
        <div
          className={`transition-all duration-300 ease-in-out ${
            isHidden ? 'scale-y-0' : 'scale-y-100'
          } sm:scale-y-100`}>
          <div className="flex flex-col justify-center ">
            <textarea
              value={title}
              maxLength={45}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full max-w-xl p-4 bg-white/80 backdrop-blur-lg rounded-xl input_create h-24 text-lg sm:mt-4 resize-none border border-white/20 shadow-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              placeholder="Enter a header..."
              required
            />
            <textarea
              value={note}
              maxLength={210}
              onChange={(e) => setNote(e.target.value)}
              className="w-full max-w-xl p-4 bg-white/80 backdrop-blur-lg rounded-xl mt-4 input_create h-44 text-lg resize-none border border-white/20 shadow-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              placeholder="Take a note..."
            />
          </div>
          <div className="grid grid-cols-[3fr_1fr] p-2 gap-x-2 mt-4">
            <input
              className="rounded-full bg-white/80 backdrop-blur-lg border border-white/20 p-3 text-sm shadow-sm placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              placeholder="Add categories..."
              value={categoryInput}
              onChange={(e) => setCategoryInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                }
              }}
            />
            <Button
              type="small"
              className="bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:from-pink-600 hover:to-purple-600 h-full"
              onClick={() => {
                if (categoryInput.trim() === '') return;
                addCategory(categoryInput);
                setCategoryInput('');
              }}>
              Add
            </Button>
          </div>
          {categories.length > 0 && (
            <div className="w-full bg-white/50 backdrop-blur-lg rounded-xl mt-4 p-2 border border-white/20 shadow-sm">
              <div className="flex overflow-x-auto gap-2">
                {selectedCategories.map((category) => (
                  <div
                    className="flex items-center justify-center gap-x-2 bg-gradient-to-r from-purple-100 to-pink-100 rounded-full px-4 py-2 text-purple-800 border border-purple-200 shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer"
                    key={category}
                    onClick={() => handleSelectCategory(category)}>
                    {category}
                    <Button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteCategory(category);
                      }}
                      type="close_selected"
                      className="text-pink-600 hover:text-pink-800"
                    />
                  </div>
                ))}
                {categories.map((category) =>
                  selectedCategories.includes(category) ? null : (
                    <div
                      className="flex items-center justify-center gap-x-2 bg-white rounded-full px-4 py-2 text-gray-700 border border-gray-200 shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer"
                      key={category}
                      onClick={() => handleSelectCategory(category)}>
                      <div className="py-1">{category}</div>
                      <Button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDeleteCategory(category);
                        }}
                        type="close"
                        className="text-gray-500 hover:text-gray-700"
                      />
                    </div>
                  ),
                )}
              </div>
            </div>
          )}
        </div>
        <div
          className={`w-full my-6 flex justify-center items-center transition-all duration-300 ease-in-out ${
            isHidden ? 'scale-y-0' : 'scale-y-100'
          } sm:scale-y-100`}>
          {/* <Button usageAs="submit" isDisabled={isCreatingNote}>
            Add note
          </Button> */}
          <button
            className="px-8 py-4 font-bold rounded-full text-white bg-gradient-to-r from-purple-600 to-pink-600 
      hover:from-purple-700 hover:to-pink-700 hover:shadow-lg hover:scale-[1.02] 
      focus:ring-purple-200 focus:ring-offset-2"
            disabled={isCreatingNote}>
            {!isCreatingNote ? 'ADD NOTE' : 'ADDING NOTE...'}
          </button>
        </div>
      </form>
    </div>
  );
}

export default CreateNote;
