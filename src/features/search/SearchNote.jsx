import Button from '../../ui/Button';
import { useSearch } from './searchContext';

function SearchNote() {
  const { searchQuery, handleSearchInput } = useSearch();

  return (
    <div className="flex gap-x-2 max-h-12">
      <form className="my-2 ml-2">
        <input
          value={searchQuery}
          placeholder="Start typing to search..."
          onChange={(e) => handleSearchInput(e)}
          className="sm:focus:w-72 w-56 rounded-full border border-stone-300 bg-stone-100 p-2 text-sm transition-all placeholder:text-stone-700 focus:outline-none focus:ring focus:ring-blue-400"></input>
      </form>
      <span className="flex items-center py-2">
        {searchQuery && (
          <Button
            type="small"
            onClick={() => {
              handleSearchInput({ target: { value: '' } });
            }}>
            Clear
          </Button>
        )}
      </span>
    </div>
  );
}

export default SearchNote;
