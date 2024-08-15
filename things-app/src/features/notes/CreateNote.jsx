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
  const { addNote } = useNotes();
  const [isHidden, setIsHidden] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    const newNote = {
      id: Date.now(),
      title: title.trim(),
      text: note.trim(),
      date: formatDate(new Date()),
    };

    addNote(newNote);
    console.log(newNote);
  };

  return (
    <div className="bg-blue-300 m-6 rounded-lg flex flex-col items-center sm:min-w-[20rem] max-h-[36rem] transition-all duration-300 ease-in-out">
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
            className="w-full p-2 bg-blue-100 rounded-lg input h-24 text-lg sm:mt-4"
            placeholder="Enter a header..."
            required></textarea>
          <textarea
            value={note}
            onChange={(e) => setNote(e.target.value)}
            className="w-full p-2 bg-blue-100 rounded-lg mt-4 input h-72 text-lg"
            placeholder="Take a note..."
            maxLength={210}
            required></textarea>
        </div>
        <div
          className={`w-full pb-4 mb-6 mt-3 sm:mt-0 flex justify-center items-center transition-all duration-300 ease-in-out 
          ${isHidden ? 'scale-y-0' : 'scale-y-100'} sm:scale-y-100`}>
          <Button>Add note</Button>
        </div>
      </form>
    </div>
  );
}

export default CreateNote;
