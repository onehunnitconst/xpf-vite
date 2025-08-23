import { createBrowserRouter } from 'react-router';
import LoginPage from './pages/LoginPage';
import { paths } from './paths';
import RegisterPage from './pages/RegisterPage';
import HomePage from './pages/HomePage';

export const router = createBrowserRouter([
  {
    path: paths.main,
    element: <HomePage />,
  },
  {
    path: paths.login,
    element: <LoginPage />,
  },
  {
    path: paths.register,
    element: <RegisterPage />,
  },
]);
