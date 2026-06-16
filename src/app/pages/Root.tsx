import { Outlet } from 'react-router';
import { SimpleHeader } from '../components/SimpleHeader';

export function Root() {
  return (
    <div className="min-h-screen">
      <SimpleHeader />
      <Outlet />
    </div>
  );
}
