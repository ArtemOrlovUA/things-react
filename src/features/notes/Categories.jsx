import React from 'react';
import Button from '../../ui/Button';

/* eslint-disable react/prop-types */
function Categories({
  note,
  categories,
  addSelectedCategory,
  deleteSelectedCategories,
  toggleCategoriesExpand,
  isCategoriesExpanded,
}) {
  return (
    <div className="bg-slate-50 rounded-lg overflow-x-auto mx-1 flex min-h-16 overflow-y-hidden">
      {Array.isArray(note.selectedCategories) && note.selectedCategories.length > 0 ? (
        <div className="flex">
          {note.selectedCategories.map((category) => (
            <React.Fragment key={category}>
              <div className="flex items-center gap-x-2 bg-gradient-to-br from-purple-100 to-pink-100 rounded-full px-2 py-1 m-2 shadow-sm">
                <span className="text-purple-700">{category}</span>
                <Button
                  onClick={(e) => {
                    e.stopPropagation();
                    deleteSelectedCategories(note.id, category);
                  }}
                  type="close"
                  className="text-purple-500 hover:text-purple-700"
                />
              </div>
            </React.Fragment>
          ))}
          <div className="flex items-center gap-x-2">
            <div className="flex items-center mx-2">
              <Button
                onClick={(e) => toggleCategoriesExpand(e)}
                type="plus"
                className="bg-gradient-to-br from-purple-600 to-pink-600 text-white rounded-full p-1 hover:shadow-md"
              />
            </div>
            <div
              className={`transition-all duration-300 ${
                isCategoriesExpanded ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'
              }`}>
              <div className="w-fit bg-white/80 backdrop-blur-lg rounded-lg flex overflow-y-hidden items-center gap-x-2 pr-2 border border-white/10">
                {categories.map((category) =>
                  Array.isArray(note.selectedCategories) &&
                  !note.selectedCategories.includes(category) ? (
                    <div
                      key={category}
                      onClick={(e) => e.stopPropagation()}
                      className="flex gap-x-2 bg-purple-50 rounded-full px-3 py-1 w-fit cursor-pointer hover:bg-purple-100 transition-colors">
                      <span className="py-2 text-gray-600">{category}</span>
                      <Button
                        onClick={(e) => {
                          e.stopPropagation();
                          addSelectedCategory(note.id, category);
                        }}
                        type="plus"
                        className="text-purple-500 hover:text-purple-700"
                      />
                    </div>
                  ) : null,
                )}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="p-2 text-gray-500 flex items-center gap-x-2 w-fit">
          <span className="min-w-fit mr-2">No categories selected</span>
          <div className="flex items-center mr-2">
            <Button
              onClick={(e) => toggleCategoriesExpand(e)}
              type="plus"
              className="bg-gradient-to-br from-purple-600 to-pink-600 text-white rounded-full p-1 hover:shadow-md"
            />
          </div>
          <div
            className={`transition-all duration-300 overflow-hidden ${
              isCategoriesExpanded ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'
            }`}>
            <div className="bg-white/80 backdrop-blur-lg rounded-lg flex items-center overflow-y-hidden gap-x-2 w-fit pr-[6.2rem] border border-white/10">
              {categories.map((category) =>
                Array.isArray(note.selectedCategories) &&
                !note.selectedCategories.includes(category) ? (
                  <div
                    key={category}
                    onClick={(e) => e.stopPropagation()}
                    className="flex gap-x-2 bg-purple-50 rounded-full px-3 py-1 w-fit cursor-pointer hover:bg-purple-100 transition-colors">
                    <span className="py-2 text-gray-600">{category}</span>
                    <Button
                      onClick={(e) => {
                        e.stopPropagation();
                        addSelectedCategory(note.id, category);
                      }}
                      type="plus"
                      className="text-purple-500 hover:text-purple-700"
                    />
                  </div>
                ) : null,
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Categories;
