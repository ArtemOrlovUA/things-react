import { useMutation } from '@tanstack/react-query';
import { deleteSelectedCategory as deleteSelectedCategoryApi } from '../../services/apiNotes';
import toast from 'react-hot-toast';

export function useDeleteSelectedCategory() {
  const { mutate: deleteSelectedCategory, isPending: isDeletingSelectedCategory } = useMutation({
    mutationFn: ({ noteId, category }) => deleteSelectedCategoryApi({ noteId, category }),
    onSuccess: () => {},
    onError: (error) => {
      console.error('Error updating note by deleting category:', error);
      toast.error('Could not delete category. Please try again');
    },
  });

  return { deleteSelectedCategory, isDeletingSelectedCategory };
}
