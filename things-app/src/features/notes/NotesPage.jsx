import CreateNote from './CreateNote';
import NotesList from './NotesList';

function NotesPage() {
  return (
    <div className="bg-blue-200 m-4 rounded-2xl sm:grid sm:grid-cols-[1fr_3fr]">
      <CreateNote />
      <NotesList />
    </div>
  );
}

export default NotesPage;
