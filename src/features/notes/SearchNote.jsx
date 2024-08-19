import { useState } from 'react';
import { useNotes } from './notesContext';
import Button from '../../ui/Button';

function SearchNote() {
  const { searchQuery, handleSearchInput } = useNotes();

  return (
    <div className="flex gap-x-2">
      <form className="my-2 ml-2">
        <input
          value={searchQuery}
          placeholder="Start typing to search..."
          onChange={(e) => handleSearchInput(e)}
          className="sm:focus:w-72 w-56 rounded-full border border-stone-300 bg-stone-100 p-2 text-sm transition-all placeholder:text-stone-700 focus:outline-none focus:ring focus:ring-blue-400"></input>
      </form>
      {searchQuery && (
        <Button
          type="small"
          onClick={() => {
            handleSearchInput({ target: { value: '' } });
          }}>
          Clear
        </Button>
      )}
    </div>
  );
}

export default SearchNote;
