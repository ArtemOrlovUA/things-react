import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import AppLayout from './ui/AppLayout';
import Error from './ui/Error';
import Home from './ui/Home';
import NotesPage from './features/notes/NotesPage';
import { UsernameProvider } from './features/user/usernameContext';
import { NotesProvider } from './features/notes/notesContext';
import { FiltersProvider } from './features/filters/filtersContext';
import { SearchProvider } from './features/search/searchContext';

const router = createBrowserRouter([
  {
    element: (
      <UsernameProvider>
        <NotesProvider>
          <FiltersProvider>
            <SearchProvider>
              <AppLayout />
            </SearchProvider>
          </FiltersProvider>
        </NotesProvider>
      </UsernameProvider>
    ),
    errorElement: <Error />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/notes',
        element: <NotesPage />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
