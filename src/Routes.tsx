import { createBrowserRouter } from 'react-router';
import LoginPage from './pages/LoginPage';
import { paths } from './paths';
import RegisterPage from './pages/RegisterPage';
import HomePage from './pages/HomePage';
import MyProfilePage from './pages/MyProfilePage';
import EditProfilePage from './pages/EditProfilePage';
import ProfilePage from './pages/ProfilePage';

export const router = createBrowserRouter([
  {
    path: paths.home,
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
  {
    path: paths.myProfile,
    element: <MyProfilePage />,
  },
  {
    path: paths.editProfile,
    element: <EditProfilePage />,
  },
  {
    path: paths.profileByXAccountId,
    element: <ProfilePage />,
  }
]);
