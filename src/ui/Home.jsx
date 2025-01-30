import { useState } from 'react';
import Button from './Button';
import { useUser } from '../context/UserContext';
import LoginButton from './LoginButton';

function Home() {
  const { currentUser } = useUser();

  const username = currentUser?.name || 'Guest';
  // const { username, updateName } = useUsername();

  // const handleSubmit = () => {
  //   console.log(usernameLocal);
  //   updateName(usernameLocal);
  // };

  return (
    <div className="flex flex-col items-center text-2xl p-6">
      {username === 'Guest' ? (
        <p className="sm:mt-8">Hello and welcome to Things!</p>
      ) : (
        <p className="sm:mt-8 text-3xl">Welcome back, {username}!</p>
      )}
      {username === 'Guest' ? (
        <>
          <p className="mt-4">To start, log in to your account with Google</p>

          <div className="mt-4">
            <LoginButton />
          </div>
        </>
      ) : (
        <Button to="/notes">To notes</Button>
      )}
      <div className="mt-8">
        <div className="w-full flex justify-center">
          <p className="text-xl">Here is our features:</p>
        </div>

        <div className="flex sm:gap-8 gap-4 flex-col sm:justify-center sm:flex-row">
          <div className="w-64 h-32 bg-blue-200 hover:bg-blue-300 duration-300 rounded-3xl mt-4 select-none">
            <p className="text-lg text-center pt-6 font-semibold">Notes on run</p>
            <p className="text-sm text-center mt-2">Create, edit, and delete notes</p>
          </div>
          <div className="w-64 h-32 bg-blue-200 hover:bg-blue-300 duration-300 rounded-3xl mt-4 select-none">
            <p className="text-lg text-center pt-6 font-semibold">Security</p>
            <p className="text-sm text-center mt-2">
              All notes are saved locally, without sending them anywhere else
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
