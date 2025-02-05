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

export async function createCategory({ newCategory }) {
  console.log(newCategory);
  const { data: categories, error: categoriesError } = await supabase
    .from('categories')
    .select()
    .eq('userEmail', newCategory.userEmail);

  if (categoriesError) {
    console.error('Error getting categories:', categoriesError.message);
    throw new Error('Could not get categories');
  }

  console.log(categories);

  if (categories?.length > 0) {
    const currentCategories = categories.flatMap((catObj) => catObj.categories);
    const newCategoriesArr = [...currentCategories, ...newCategory.categories];

    const { data, error } = await supabase
      .from('categories')
      .update([{ categories: newCategoriesArr }])
      .eq('userEmail', newCategory.userEmail)
      .select();

    if (error) {
      console.error('Error adding category:', error.message);
      throw new Error('Could not add category');
    }

    return data;
  } else {
    const { data, error } = await supabase.from('categories').insert([newCategory]).select();

    if (error) {
      console.error('Error adding category:', error.message);
      throw new Error('Could not add category');
    }

    return data;
  }
}

export async function getCategoriesByEmail(userEmail) {
  const { data, error } = await supabase.from('categories').select().eq('userEmail', userEmail);

  if (error) {
    console.error('Error getting categories:', error.message);
    throw new Error('Could not get categories');
  }

  return data;
}
