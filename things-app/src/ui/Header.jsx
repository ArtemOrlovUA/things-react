import { Link } from 'react-router-dom';
import Username from '../features/user/Username';
import SearchNote from '../features/notes/SearchNote';

function Header() {
  return (
    <header className="bg-blue-200 md:flex md:items-center md:justify-between p-2">
      <Link to={'/'} className="text-xl">
        <div className="text-2xl ml-2">
          <span className="font-semibold">Things</span>: Your notes
        </div>
      </Link>

      <SearchNote />

      <Username />
    </header>
  );
}

export default Header;
