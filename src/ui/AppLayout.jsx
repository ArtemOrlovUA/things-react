import { Outlet } from 'react-router-dom';

import Header from './Header';

function AppLayout() {
  return (
    <div className="md:grid h-screen md:grid-rows-[1fr_10fr] font-sans">
      <Header />

      <Outlet />
    </div>
  );
}

export default AppLayout;
