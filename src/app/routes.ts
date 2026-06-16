import { createBrowserRouter } from 'react-router';
import { Root } from './pages/Root';
import { ShopPage } from './pages/ShopPage';
import { NotFound } from './pages/NotFound';

export const router = createBrowserRouter([
  {
    path: '/',
    Component: Root,
    children: [
      { index: true, Component: ShopPage },
      { path: '*', Component: NotFound },
    ],
  },
]);
