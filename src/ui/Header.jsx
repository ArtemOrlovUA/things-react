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
    <header className="bg-white/70 backdrop-blur-xl shadow-sm border-b border-white/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center space-x-2">
            <span className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Things
            </span>
          </Link>

          <div className="flex-1 max-w-2xl mx-4">
            {username !== 'Guest' && isNotes ? <SearchNote /> : null}
          </div>

          <div className="flex items-center space-x-4">
            <Username />
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
