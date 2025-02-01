import { useFilters } from './filtersContext';

function Filters() {
  const { filters, handleSelectFilter, selectedFilter } = useFilters();

  return (
    <div className="bg-white/30 backdrop-blur-lg rounded-xl p-4 mx-6 my-4 border border-white/20 shadow-sm hover:shadow-md transition-shadow duration-200">
      <div className="flex items-center gap-4 overflow-x-auto">
        <p className="text-lg font-medium bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
          Sort by:
        </p>
        <div className="flex gap-2">
          {filters.map((filter) => (
            <button
              key={filter}
              onClick={() => handleSelectFilter(filter)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                selectedFilter === filter
                  ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg'
                  : 'bg-white/50 backdrop-blur-sm border border-white/30 text-gray-600 hover:border-purple-300'
              }`}>
              {filter}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Filters;
