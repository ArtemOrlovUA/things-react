import supabase from './supabase';

export async function createNote({ newNote }) {
  const { data, error } = await supabase.from('notes').insert([newNote]).select();

  if (error) {
    console.error('Error creating note:', error.message);
    throw new Error('Could not create note');
  }

  return data;
}

export async function updateNote({ updatedNote }) {
  const { data, error } = await supabase
    .from('notes')
    .update(updatedNote)
    .eq('id', updatedNote.id)
    .select();

  if (error) {
    console.error('Error updating note:', error.message);
    throw new Error('Could not update note');
  }

  return data;
}

export async function deleteNote({ noteId, creator_email }) {
  const { error } = await supabase
    .from('notes')
    .delete()
    .eq('id', noteId)
    .eq('creatorEmail', creator_email);

  if (error) {
    console.error('Error deleting note:', error.message);
    throw new Error('Could not delete note');
  }
}

export async function getNotesByEmail(creatorEmail) {
  const { data, error } = await supabase
    .from('notes')
    .select()
    .eq('creatorEmail', creatorEmail)
    .order('id', { ascending: false });

  if (error) {
    console.error('Error getting notes:', error.message);
    throw new Error('Could not get notes');
  }

  return data;
}
