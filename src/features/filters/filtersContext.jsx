/* eslint-disable react/prop-types */
import { createContext, useContext, useEffect, useState } from 'react';
import { useNotes } from '../notes/notesContext';

const filtersContext = createContext();

function FiltersProvider({ children }) {
  const { notes } = useNotes();
  const [filters, setFilters] = useState(['Alphabet']);
  const [selectedFilter, setSelectedFilter] = useState('');
  const [filteredNotes, setFilteredNotes] = useState([]);

  function handleSelectFilter(filter) {
    if (selectedFilter === filter) {
      setSelectedFilter('');
    } else {
      setSelectedFilter(filter);
    }
  }

  useEffect(() => {
    if (selectedFilter === 'Alphabet') {
      setFilteredNotes(() => [...notes].sort((a, b) => a.title.localeCompare(b.title)));
    }
  }, [selectedFilter, notes]);

  return (
    <filtersContext.Provider value={{ filters, selectedFilter, filteredNotes, handleSelectFilter }}>
      {children}
    </filtersContext.Provider>
  );
}

const useFilters = () => {
  const context = useContext(filtersContext);
  if (!context) {
    throw new Error('useFilters must be used within a FiltersProvider');
  }
  return context;
};

export { FiltersProvider, useFilters };
