import { Link } from 'react-router-dom';
import Username from '../features/user/Username';
import SearchNote from '../features/search/SearchNote';
import { useNotes } from '../features/notes/notesContext';
import { useUser } from '../context/UserContext';

function Header() {
  const { notes } = useNotes();
  const { currentUser } = useUser();

  const username = currentUser?.name || 'Guest';

  const isNotes = notes.length > 0;

  return (
    <header className="bg-blue-300 md:flex md:items-center md:justify-between py-2 sm:p=2 sm:min-h-[70px] justify-center">
      <Link to={'/'} className="text-xl">
        <div className="sm:text-2xl text-3xl ml-2">
          <span className="font-semibold">Things</span>: Your notes
        </div>
      </Link>

      {username !== 'Guest' && isNotes && <SearchNote />}

      <Username />
    </header>
  );
}

export default Header;
