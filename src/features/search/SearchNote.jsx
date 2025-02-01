import { useLocation, useNavigate } from 'react-router-dom';
import Button from '../../ui/Button';
import { useSearch } from './searchContext';

function SearchNote() {
  const { searchQuery, handleSearchInput } = useSearch();
  const location = useLocation();
  const navigate = useNavigate();

  const handleSearch = (e) => {
    const query = e.target.value;
    handleSearchInput({ target: { value: query } });

    // Якщо користувач на головній сторінці і вводить текст
    if (location.pathname === '/' && query.trim() !== '') {
      navigate('/notes');
    }
  };

  return (
    <div className="relative flex items-center group">
      <div className="absolute left-3 text-gray-600 z-10">
        <svg className="w-5 h-5 stroke-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      </div>

      <input
        value={searchQuery}
        onChange={handleSearch}
        placeholder="Search notes..."
        className="w-full pl-10 pr-4 py-2.5 rounded-full bg-white/50 backdrop-blur-sm border border-white/30 focus:border-purple-300 focus:ring-2 focus:ring-purple-200 focus:ring-opacity-50 transition-all duration-200 shadow-sm hover:shadow-md"
      />

      {searchQuery && (
        <button
          onClick={() => handleSearchInput({ target: { value: '' } })}
          className="absolute right-3 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full p-1 shadow-sm hover:shadow-md transition-all duration-200">
          <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      )}
    </div>
  );
}

export default SearchNote;
