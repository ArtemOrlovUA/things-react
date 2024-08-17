import { useState } from 'react';
import Button from '../../ui/Button';
import { useNotes } from './notesContext';

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
  const [title, setTitle] = useState('');
  const [note, setNote] = useState('');
  const [CategoryInput, setCategoryInput] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const { addNote, categories, addCategory, deleteCategory } = useNotes();
  const [isHidden, setIsHidden] = useState(false);

  const handleSelectCategory = (category) => {
    if (selectedCategories.includes(category)) {
      setSelectedCategories((prev) => prev.filter((c) => c !== category));
    } else {
      setSelectedCategories((prev) => [...prev, category]);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newNote = {
      id: Date.now(),
      title: title.trim(),
      text: note.trim(),
      selectedCategories,
      date: formatDate(new Date()),
    };

    console.log(newNote);

    setTitle('');
    setNote('');
    setSelectedCategories([]);

    addNote(newNote);
  };

  const handleDeleteCategory = (category) => {
    setSelectedCategories((prev) => prev.filter((c) => c !== category));
    deleteCategory(category);
  };

  return (
    <div className="bg-blue-300 m-6 rounded-lg flex flex-col items-center sm:min-w-[10rem] max-h-[37rem] transition-all duration-300 ease-in-out">
      <div className="sm:hidden w-[90%] flex float-right my-4">
        <Button onClick={() => setIsHidden(!isHidden)} type="small">
          {isHidden ? 'Open' : 'Hide'}
        </Button>
      </div>
      <form
        className={`w-[90%] h-full flex flex-col justify-between transition-all duration-300 ease-in-out
          ${
            isHidden ? 'max-h-0 opacity-0 overflow-hidden' : 'max-h-[1000px] opacity-100'
          } sm:max-h-[1000px] opacity-100`}
        onSubmit={handleSubmit}>
        <div
          className={`transition-all duration-300 ease-in-out ${
            isHidden ? 'scale-y-0' : 'scale-y-100'
          } sm:scale-y-100`}>
          <textarea
            value={title}
            maxLength={45}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-2 bg-blue-100 rounded-lg input h-24 text-lg sm:mt-4 resize-none"
            placeholder="Enter a header..."
            required></textarea>
          <textarea
            value={note}
            maxLength={210}
            onChange={(e) => setNote(e.target.value)}
            className="w-full p-2 bg-blue-100 rounded-lg mt-4 input h-44 text-lg resize-none"
            placeholder="Take a note..."
            required></textarea>
          <div className="grid grid-cols-[3fr_1fr] p-2 gap-x-2">
            <input
              className="rounded-full border min-w-4 border-stone-300 bg-stone-100 p-2 text-sm transition-all placeholder:text-stone-700 focus:outline-none focus:ring focus:ring-blue-400"
              placeholder="Add categories..."
              value={CategoryInput}
              onChange={(e) => setCategoryInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                }
              }}
            />
            <Button
              type="small"
              onClick={() => {
                if (CategoryInput === '') return;
                addCategory(CategoryInput);
                setCategoryInput('');
              }}>
              Add
            </Button>
          </div>
          <div className="w-full bg-slate-50 rounded-lg mt-2">
            <div className="flex overflow-x-auto">
              {selectedCategories.map((category) => (
                // eslint-disable-next-line react/jsx-key
                <div
                  className="flex items-center justify-center gap-x-2 bg-blue-400 rounded-full px-3 py-1 m-2 w-fit"
                  onClick={() => handleSelectCategory(category)}>
                  {category}
                  <Button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeleteCategory(category);
                    }}
                    type="close_selected"
                  />
                </div>
              ))}
              {categories.map((category) =>
                selectedCategories.includes(category) ? null : (
                  // eslint-disable-next-line react/jsx-key
                  <div
                    className="flex items-center justify-center gap-x-2 bg-blue-200 rounded-full px-3 py-1 m-2 w-fit cursor-pointer"
                    onClick={() => handleSelectCategory(category)}>
                    <div className="py-2">{category}</div>
                    <Button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteCategory(category);
                      }}
                      type="close"
                    />
                  </div>
                ),
              )}
            </div>
          </div>
        </div>
        <div
          className={`w-full pb-4 mb-6 mt-3 sm:mt-6 flex justify-center items-center transition-all duration-300 ease-in-out 
            ${isHidden ? 'scale-y-0' : 'scale-y-100'} sm:scale-y-100`}>
          <Button usageAs="submit">Add note</Button>
        </div>
      </form>
    </div>
  );
}

export default CreateNote;
