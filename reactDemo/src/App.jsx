import { Link, Outlet } from 'react-router-dom';
import Spinner from './components/Spinner.jsx';
import SideBar from './components/SideBar.jsx';
import { Suspense } from 'react';

export default function Root() {
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
