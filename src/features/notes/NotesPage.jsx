import React from 'react';
import CreateNote from './CreateNote';
import NotesList from './NotesList';
import Filters from '../filters/Filters';

function NotesPage() {
  return (
    <div className="h-screen flex flex-col">
      <div className="bg-blue-200 py-2 flex-grow flex flex-col sm:grid sm:grid-cols-[1fr_1.5fr] xl:grid-cols-[1fr_3fr]">
        <div className="sm:overflow-auto">
          <CreateNote />
        </div>
        <div className=" overflow-auto sm:overflow-visible">
          <Filters />
          <NotesList />
        </div>
      </div>
    </div>
  );
}

export default NotesPage;
