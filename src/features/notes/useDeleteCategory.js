import { useMutation } from '@tanstack/react-query';
import { deleteCategory as deleteCategoryApi } from '../../services/apiNotes';
import toast from 'react-hot-toast';

export function useDeleteCategory() {
  const { mutate: deleteCategory, isPending: isDeletingCategory } = useMutation({
    mutationFn: ({ category, userEmail }) => deleteCategoryApi({ category, userEmail }),
    onSuccess: () => {
      toast.success('Category deleted successfully');
    },
    onError: (error) => {
      console.error('Error updating note:', error);
      toast.error('Could not delete category. Please try again');
    },
  });

  return { deleteCategory, isDeletingCategory };
}
