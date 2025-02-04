import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createNote as createNoteApi } from '../../services/apiNotes';
import toast from 'react-hot-toast';

export function useCreateNote() {
  const queryClient = useQueryClient();

  const { mutate: createNote, isPending: isCreatingNote } = useMutation({
    mutationFn: ({ newNote }) => createNoteApi({ newNote }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['owned_notes'], exact: false });
      toast.success('Note created successfully');
    },
    onError: (error) => {
      console.error('Error creating note:', error);
      toast.error('Could not create note. Please try again');
    },
  });

  return { createNote, isCreatingNote };
}
