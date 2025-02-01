import { useFilters } from '../filters/filtersContext';
import { useSearch } from '../search/searchContext';
import NoteItem from './NoteItem';
import { useNotes } from './notesContext';

function NotesList() {
  const { notes } = useNotes();
  const { searchedNotes, searchQuery } = useSearch();
  const { filteredNotes, selectedFilter } = useFilters();

  const isFIlterSelected = selectedFilter !== '';
  const notesToDisplay =
    searchQuery?.length > 0 ? searchedNotes : isFIlterSelected ? filteredNotes : notes;

  return (
    <div className="bg-white/30 backdrop-blur-lg rounded-xl mx-6 my-4 p-4 border border-white/20 shadow-sm hover:shadow-md transition-shadow duration-200">
      {notesToDisplay.length > 0 ? (
        <ul className="flex flex-col gap-3">
          {notesToDisplay.map((note) => (
            <NoteItem key={note.id} note={note} />
          ))}
        </ul>
      ) : (
        <p className="text-center p-6 text-xl bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
          No notes found
        </p>
      )}
    </div>
  );
}

export default NotesList;
