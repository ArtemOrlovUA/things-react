import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteNote as deleteNoteApi } from '../../services/apiNotes';

export function useDeleteNote() {
  const queryClient = useQueryClient();

  const { mutate: deleteNote, isPending: isDeletingNote } = useMutation({
    mutationFn: ({ noteId, creator_email }) => deleteNoteApi({ noteId, creator_email }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['owned_notes'], exact: false });
    },
    onError: (error) => {
      console.error('Error creating note:', error);
    },
  });

  return { deleteNote, isDeletingNote };
}
