import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createCategory as createCategoryApi } from '../../services/apiNotes';
import toast from 'react-hot-toast';

export function useCreateCategory() {
  const queryClient = useQueryClient();

  const { mutate: createCategory, isPending: isCreatingCategory } = useMutation({
    mutationFn: ({ newCategory }) => createCategoryApi({ newCategory }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user_categories'], exact: false });
      toast.success('Category created successfully');
    },
    onError: (error, variables, context) => {
      console.error('Error creating category:', error);
      if (context?.categories && context?.setCategories) {
        context?.setCategories(context.categories);
      }
      toast.error('Could not create category. Please try again');
    },
  });

  return { createCategory, isCreatingCategory };
}
