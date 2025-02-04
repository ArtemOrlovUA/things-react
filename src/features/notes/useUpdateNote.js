import { useMutation } from '@tanstack/react-query';
import { updateNote as updateNoteApi } from '../../services/apiNotes';
import toast from 'react-hot-toast';

export function useUpdateNote() {
  const { mutate: updateNote, isPending: isUpdatingNote } = useMutation({
    mutationFn: ({ updatedNote }) => updateNoteApi({ updatedNote }),
    onSuccess: () => {
      toast.success('Note updated successfully');
    },
    onError: (error, variables, context) => {
      console.error('Error updating note:', error);
      if (context?.notes && context?.setNotes) {
        context?.setNotes(context.notesStateBeforeUpdate);
      }
      toast.error('Could not update note. Please try again');
    },
  });

  return { updateNote, isUpdatingNote };
}
