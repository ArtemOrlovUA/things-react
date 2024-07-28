import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function SearchNote() {
  const [searchQuery, setSearchQuery] = useState('');
  const navigator = useNavigate();

  // Change it later
  function handleSubmit(e) {
    e.preventDefault();
  }

  return (
    <form className="my-2" onSubmit={handleSubmit}>
      <input
        value={searchQuery}
        placeholder="Start typing to search..."
        onChange={(e) => setSearchQuery(e.target.value)}
        className="sm:focus:w-72 w-56 rounded-full border border-stone-300 bg-stone-100 p-2 text-sm transition-all placeholder:text-stone-700 focus:outline-none focus:ring focus:ring-blue-400"></input>
    </form>
  );
}

export default SearchNote;
