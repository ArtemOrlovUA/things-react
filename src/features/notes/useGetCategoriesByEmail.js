import { useQuery } from '@tanstack/react-query';
import { getCategoriesByEmail } from '../../services/apiNotes';

export function useGetCategoriesByEmail(userEmail) {
  const {
    isPending,
    data: categories,
    error,
  } = useQuery({
    queryKey: ['user_categories', userEmail],
    queryFn: () => getCategoriesByEmail(userEmail),
    initialData: [],
    enabled: !!userEmail,
  });

  return { isPending, error, categories };
}
