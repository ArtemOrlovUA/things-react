import { useUsername } from './usernameContext';

function Username() {
  const { username } = useUsername();

  return <div className="font-semibold text-xl mx-2">{username}</div>;
}

export default Username;
