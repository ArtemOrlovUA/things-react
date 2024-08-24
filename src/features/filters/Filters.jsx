import { useFilters } from './filtersContext';

function Filters() {
  const { filters, handleSelectFilter, selectedFilter } = useFilters();

  return (
    <div className="bg-blue-300 m-6 rounded-lg flex min-w-[15rem] items-center">
      <p className="flex ml-2 lg:ml-4 py-6 text-xl">Sort by:</p>
      <div className="flex ml-2 lg:ml-4 gap-x-2 lg:gap-x-3 max-h-12 items-center">
        {filters.map((filter) => {
          return (
            <div
              className={`flex items-center justify-center ${
                selectedFilter === filter ? 'bg-blue-400' : 'bg-blue-200'
              }  rounded-full px-2 py-1 w-fit cursor-pointer`}
              onClick={() => {
                handleSelectFilter(filter);
              }}
              key={filter}>
              <div className="py-2">{filter}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Filters;
