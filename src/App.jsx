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
import { Toaster } from 'react-hot-toast';

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

        <Toaster
          position="top-center"
          gutter={12}
          containerStyle={{
            margin: '8px',
          }}
          toastOptions={{
            success: { duration: 3000 },
            error: { duration: 5000 },
          }}
          toastClassName={() =>
            'bg-gradient-to-br from-purple-200 to-blue-200 text-gray-700 font-medium rounded-xl p-4 shadow-md max-w-[500px]'
          }
        />
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
