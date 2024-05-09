import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import MainPage from './pages/MainPage';
import LoginPage from './pages/LoginPage';
import ProfilePage from './pages/ProfilePage';
import QuestionDetailPage from './pages/QuestionDetailPage';
import ErrorPage from './pages/ErrorPage';
import RootLayout from './layout/RootLayout';

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      { path: '/', element: <MainPage /> },
      { path: '/questions', element: <MainPage /> },
      { path: '/login', element: <LoginPage /> },
      { path: '/profile', element: <ProfilePage /> },
      { path: '/questions/:questionId', element: <QuestionDetailPage />}
    ]
  }
])

function App() {
  return (
    <RouterProvider router={router}/>
  );
}

export default App;
