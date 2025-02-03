import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import AppLayout from './ui/AppLayout';
import Error from './ui/Error';
import Home from './ui/Home';
import NotesPage from './features/notes/NotesPage';
import { UsernameProvider } from './features/user/usernameContext';
import { NotesProvider } from './features/notes/notesContext';
import { FiltersProvider } from './features/filters/filtersContext';
import { SearchProvider } from './features/search/searchContext';
import LoginButton from './ui/LoginButton';
import { UserProvider } from './context/UserContext';
import ProtectedRoute from './ui/ProtectedRoute';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 0,
    },
  },
});

const router = createBrowserRouter([
  {
    element: (
      <QueryClientProvider client={queryClient}>
        <UserProvider>
          <UsernameProvider>
            <NotesProvider>
              <FiltersProvider>
                <SearchProvider>
                  <ProtectedRoute>
                    <AppLayout />
                  </ProtectedRoute>
                </SearchProvider>
              </FiltersProvider>
            </NotesProvider>
          </UsernameProvider>
        </UserProvider>
      </QueryClientProvider>
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
      {
        path: '/login',
        element: <LoginButton />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
