import { Outlet } from 'react-router-dom';
import Spinner from './Spinner.jsx';
import SideBar from './SideBar.jsx';
import { Suspense } from 'react';

export default function Layout() {
  return (
    <>
      <div className="flex h-screen">
        <SideBar />

        <main className="flex-1 bg-gray-100 p-4">
          <Suspense fallback={<Spinner />}>
            <Outlet />
          </Suspense>
        </main>
      </div>
    </>
  );
}
