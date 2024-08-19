import NoteItem from './NoteItem';
import { useNotes } from './notesContext';

function NotesList() {
  const { notes, filteredNotes, searchQuery } = useNotes();

  const notesToDisplay = searchQuery?.length > 0 ? filteredNotes : notes;

  return (
    <div className="bg-blue-300 m-6 rounded-lg flex flex-col min-w-[15rem] overflow-y-auto">
      {notesToDisplay.length > 0 ? (
        <ul className="flex flex-col gap-2">
          {notesToDisplay.map((note) => (
            <NoteItem key={note.id} note={note} />
          ))}
        </ul>
      ) : (
        <p className="flex justify-center m-6 text-3xl">Sorry, no notes to show there.</p>
      )}
    </div>
  );
}

export default NotesList;
