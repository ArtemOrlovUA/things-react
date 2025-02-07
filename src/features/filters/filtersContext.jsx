/* eslint-disable react/prop-types */
import { createContext, useContext, useEffect, useState } from 'react';
import { useNotes } from '../notes/notesContext';

const filtersContext = createContext();

function FiltersProvider({ children }) {
  const { notes, categories } = useNotes();
  const [filters] = useState(['Alphabet', 'Newest', 'Oldest']);
  const [selectedFilter, setSelectedFilter] = useState('Alphabet');
  const [filteredNotes, setFilteredNotes] = useState([]);
  const [filteredCategory, setFilteredCategory] = useState('');

  function handleSelectFilter(filter) {
    setSelectedFilter(filter);
  }

  function handleSelectCategory(category) {
    if (filteredCategory === category) {
      setFilteredCategory('');
    } else {
      setFilteredCategory(category);
    }
  }

  useEffect(() => {
    let updatedNotes = [...notes];

    if (filteredCategory) {
      updatedNotes = updatedNotes.filter((note) =>
        note.selectedCategories.includes(filteredCategory),
      );
    }

    const parseDate = (dateString) => {
      const [timePart, datePart] = dateString.split(', ');
      const [hours, minutes] = timePart.split(':');
      const [day, month, year] = datePart.split('.');
      return new Date(year, month - 1, day, hours, minutes);
    };

    if (selectedFilter === 'Alphabet') {
      updatedNotes.sort((a, b) => a.title.localeCompare(b.title));
    } else if (selectedFilter === 'Newest') {
      updatedNotes.sort((a, b) => parseDate(b.date) - parseDate(a.date));
    } else if (selectedFilter === 'Oldest') {
      updatedNotes.sort((a, b) => parseDate(a.date) - parseDate(b.date));
    }

    setFilteredNotes(updatedNotes);
  }, [selectedFilter, filteredCategory, notes]);

  return (
    <filtersContext.Provider
      value={{
        filters,
        selectedFilter,
        filteredNotes,
        handleSelectFilter,
        filteredCategory,
        handleSelectCategory,
      }}>
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
