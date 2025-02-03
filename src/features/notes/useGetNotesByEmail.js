import { useQuery } from '@tanstack/react-query';
import { getNotesByEmail } from '../../services/apiNotes';

export function useGetNotesByEmail(creatorEmail) {
  const {
    isPending,
    data: notes,
    error,
  } = useQuery({
    queryKey: ['owned_notes', creatorEmail],
    queryFn: () => getNotesByEmail(creatorEmail),
    initialData: [],
    enabled: !!creatorEmail,
  });

  return { isPending, error, notes };
}
