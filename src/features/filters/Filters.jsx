import { useNotes } from '../notes/notesContext';
import { useFilters } from './filtersContext';

function Filters() {
  const { filters, handleSelectFilter, selectedFilter, filteredCategory, handleSelectCategory } =
    useFilters();
  const { categories } = useNotes();

  return (
    <div className="bg-white/30 backdrop-blur-lg rounded-xl p-4 mx-6 my-4 border border-white/20 shadow-sm hover:shadow-md transition-shadow duration-200">
      <div className="w-full overflow-x-auto sm:flex flex-nowrap items-center gap-4 py-2">
        <div className="flex items-center gap-4 mb-4 sm:mb-0">
          <p className="text-lg font-medium bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent whitespace-nowrap">
            Sort by:
          </p>
          <div className="flex gap-2">
            {filters.map((filter) => (
              <button
                key={filter}
                onClick={() => handleSelectFilter(filter)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 border ${
                  selectedFilter === filter
                    ? 'bg-gradient-to-r from-purple-600 to-pink-600 whitespace-nowrap text-white shadow-lg border-transparent'
                    : 'bg-white/50 backdrop-blur-sm border-white/30 whitespace-nowrap text-gray-600 hover:border-purple-300'
                }`}>
                {filter}
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-4">
          <p className="text-lg font-medium bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent whitespace-nowrap">
            Filter by:
          </p>
          <div className="flex gap-2 flex-nowrap">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => handleSelectCategory(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 border ${
                  filteredCategory === category
                    ? 'bg-gradient-to-r from-purple-600 to-pink-600 whitespace-nowrap text-white shadow-lg border-transparent'
                    : 'bg-white/50 backdrop-blur-sm border-white/30 whitespace-nowrap text-gray-600 hover:border-purple-300'
                }`}>
                {category}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Filters;
