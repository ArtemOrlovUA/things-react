import Button from '../../ui/Button';

/* eslint-disable react/prop-types */
function EditNote({
  note,
  isEditing,
  editTitle,
  setEditTitle,
  editText,
  setEditText,
  editNote,
  toggleEditing,
}) {
  return (
    <div
      className={`mt-2 bg-stone-50 rounded-lg transition-all duration-300 ease-in-out ${
        isEditing ? 'max-h-[1000px] opacity-100 p-2' : 'max-h-0 opacity-0 p-0 overflow-hidden'
      }`}>
      <div
        className={`transition-all flex flex-col gap-2 duration-300 ease-in-out ${
          isEditing ? 'scale-y-100 opacity-100' : 'scale-y-0 opacity-0'
        }`}>
        <textarea
          value={editTitle}
          maxLength={45}
          required
          onChange={(e) => setEditTitle(e.target.value)}
          className="font-bold mb-2 p-2 break-words bg-slate-200 rounded-lg resize-none"></textarea>
        <textarea
          value={editText}
          maxLength={210}
          required
          onChange={(e) => setEditText(e.target.value)}
          className="whitespace-normal break-words p-2 bg-slate-200 rounded-lg resize-none"></textarea>
        <div className="w-full flex items-center justify-center">
          <Button
            onClick={() => {
              if (editTitle.trim() === '' || editText.trim() === '') {
                alert('Please fill in the fields');
                return;
              }

              const editedNote = {
                id: note.id,
                title: editTitle,
                text: editText,
                date: note.date,
                selectedCategories: note.selectedCategories,
              };
              editNote(editedNote);
              toggleEditing();
            }}
            type="primary">
            Save
          </Button>
        </div>
      </div>
    </div>
  );
}

export default EditNote;
