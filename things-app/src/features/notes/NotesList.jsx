import NoteItem from './NoteItem';
import { useNotes } from './notesContext';

function NotesList() {
  const { notes } = useNotes();

  return (
    <div className="bg-blue-300 m-6 rounded-lg flex flex-col ">
      <ul>
        {notes.map((note) => (
          <NoteItem key={note.id} note={note} />
        ))}
      </ul>
    </div>
  );
}

export default NotesList;
