/* eslint-disable react/no-unescaped-entities */
import Button from './Button';
import { useUser } from '../context/UserContext';
import LoginButton from './LoginButton';

function Home() {
  const { currentUser } = useUser();
  const username = currentUser?.name || 'Guest';

  return (
    <div className="bg-gradient-to-br from-purple-200 to-blue-200 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-8xl mx-auto">
        <div className="text-center space-y-6 md:space-y-2">
          <h1 className="text-3xl md:text-6xl font-extrabold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent leading-tight">
            {username === 'Guest' ? (
              <span className="whitespace-nowrap">Welcome to Things!</span>
            ) : (
              `Welcome back, ${username}!`
            )}
          </h1>
          {username === 'Guest' && (
            <p className="text-xl text-gray-600">Your thoughts, organized beautifully</p>
          )}
          {username === 'Guest' ? (
            <div className="flex justify-center pt-2">
              <LoginButton />
            </div>
          ) : (
            <div className="flex justify-center mx-auto md:pt-4">
              <Button to="/notes">To Notes</Button>
            </div>
          )}
        </div>

        <div className="grid md:grid-cols-2 max-w-4xl mx-auto gap-8 mt-8 sm:mt-12">
          <div className="feature-card p-8 rounded-3xl bg-white/80 backdrop-blur-lg border border-white/10 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
            <div className="flex flex-col items-center text-center">
              <div className="mb-6 w-16 h-16 rounded-2xl bg-purple-100 flex items-center justify-center">
                <svg
                  className="w-8 h-8 text-purple-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                  />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-3">Notes on the Go</h3>
              <p className="text-gray-600 leading-relaxed">
                Capture ideas instantly from any device with our seamless cross-platform experience.
              </p>
            </div>
          </div>

          <div className="feature-card p-8 rounded-3xl bg-white/80 backdrop-blur-lg border border-white/10 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
            <div className="flex flex-col items-center text-center">
              <div className="mb-6 w-16 h-16 rounded-2xl bg-pink-100 flex items-center justify-center">
                <svg
                  className="w-8 h-8 text-pink-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-3">Coming Soon</h3>
              <p className="text-gray-600 leading-relaxed">
                Stay tuned for exciting new features we're brewing to boost your productivity.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
