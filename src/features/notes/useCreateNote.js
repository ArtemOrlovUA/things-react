import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createNote as createNoteApi } from '../../services/apiNotes';

export function useCreateNote() {
  const queryClient = useQueryClient();

  const { mutate: createNote, isPending: isCreatingNote } = useMutation({
    mutationFn: ({ newNote }) => createNoteApi({ newNote }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['owned_notes'], exact: false });
    },
    onError: (error) => {
      console.error('Error creating note:', error);
    },
  });

  return { createNote, isCreatingNote };
}
