import CreateNote from './CreateNote';
import NotesList from './NotesList';

function NotesPage() {
  return (
    <div className="">
      <div className="bg-blue-200 py-2 sm:grid sm:grid-cols-[1fr_3fr] h-full">
        <CreateNote />
        <NotesList />
      </div>
    </div>
  );
}

export default NotesPage;
