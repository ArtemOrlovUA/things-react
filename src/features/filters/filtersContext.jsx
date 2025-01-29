/* eslint-disable react/prop-types */
import { createContext, useContext, useEffect, useState } from 'react';
import { useNotes } from '../notes/notesContext';

const filtersContext = createContext();

function FiltersProvider({ children }) {
  const { notes } = useNotes();
  const [filters, setFilters] = useState(['Alphabet', 'Date']);
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
    if (selectedFilter === 'Date') {
      setFilteredNotes(() => {
        const parseDate = (dateString) => {
          const [timePart, datePart] = dateString.split(', ');
          const [hours, minutes] = timePart.split(':');
          const [day, month, year] = datePart.split('.');
          return new Date(year, month - 1, day, hours, minutes);
        };
        return [...notes].sort((a, b) => parseDate(b.date) - parseDate(a.date));
      });
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
