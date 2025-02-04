import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteNote as deleteNoteApi } from '../../services/apiNotes';
import toast from 'react-hot-toast';

export function useDeleteNote() {
  const queryClient = useQueryClient();

  const { mutate: deleteNote, isPending: isDeletingNote } = useMutation({
    mutationFn: ({ noteId, creator_email }) => deleteNoteApi({ noteId, creator_email }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['owned_notes'], exact: false });
      toast.success('Note deleted successfully');
    },
    onError: (error) => {
      console.error('Error creating note:', error);
      toast.error('Could not delete note. Please try again');
    },
  });

  return { deleteNote, isDeletingNote };
}
