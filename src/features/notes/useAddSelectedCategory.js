import { useMutation } from '@tanstack/react-query';
import { addSelectedCategory as addSelectedCategoryApi } from '../../services/apiNotes';
import toast from 'react-hot-toast';

export function useAddSelectedCategory() {
  const { mutate: addSelectedCategory, isPending: isAddingSelectedCategory } = useMutation({
    mutationFn: ({ noteId, category }) => addSelectedCategoryApi({ noteId, category }),
    onSuccess: () => {},
    onError: (error) => {
      console.error('Error updating note:', error);
      toast.error('Could not add category. Please try again');
    },
  });

  return { addSelectedCategory, isAddingSelectedCategory };
}
