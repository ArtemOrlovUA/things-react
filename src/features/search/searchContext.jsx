/* eslint-disable react/prop-types */
import { createContext, useContext, useMemo, useState } from 'react';
import { useFilters } from '../filters/filtersContext';
import { useNotes } from '../notes/notesContext';

const searchContext = createContext();

const SearchProvider = ({ children }) => {
  const { filteredNotes, selectedFilter } = useFilters();
  const { notes } = useNotes();
  const [searchQuery, setSearchQuery] = useState('');

  const searchedNotes = useMemo(() => {
    const lowercasedQuery = searchQuery.toLowerCase().trim();

    if (selectedFilter !== '') {
      return filteredNotes.filter((note) => note.title.toLowerCase().includes(lowercasedQuery));
    }

    return notes.filter((note) => note.title.toLowerCase().includes(lowercasedQuery));
  }, [notes, searchQuery, selectedFilter, filteredNotes]);

  function handleSearchInput(e) {
    setSearchQuery(e.target.value);
  }

  const value = { searchedNotes, searchQuery, handleSearchInput, setSearchQuery };

  return <searchContext.Provider value={value}>{children}</searchContext.Provider>;
};

const useSearch = () => {
  const context = useContext(searchContext);
  if (!context) {
    throw new Error('useSearch must be used within a SearchProvider');
  }
  return context;
};

export { SearchProvider, useSearch };
