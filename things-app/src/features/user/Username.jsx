import { useUsername } from './usernameContext';

function Username() {
  const { username } = useUsername();

  return <div className="font-semibold text-xl mr-2">{username}</div>;
}

export default Username;
