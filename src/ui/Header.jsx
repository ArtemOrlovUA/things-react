import { Link } from 'react-router-dom';
import Username from '../features/user/Username';
import SearchNote from '../features/notes/SearchNote';
import { useNotes } from '../features/notes/notesContext';

function Header() {
  const { notes } = useNotes();

  const isNotes = notes.length > 0;

  return (
    <header className="bg-blue-300 md:flex md:items-center md:justify-between p-2 min-h-[153px] sm:min-h-[70px]">
      <Link to={'/'} className="text-xl">
        <div className="text-2xl ml-2">
          <span className="font-semibold">Things</span>: Your notes
        </div>
      </Link>

      {isNotes && <SearchNote />}

      <Username />
    </header>
  );
}

export default Header;
