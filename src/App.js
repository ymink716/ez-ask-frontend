import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import MainPage from './pages/MainPage';
import LoginPage from './pages/LoginPage';
import ProfilePage from './pages/ProfilePage';
import QuestionDetailPage from './pages/QuestionDetailPage';
import ErrorPage from './pages/ErrorPage';
import RootLayout from './layout/RootLayout';
import { GoogleOAuthProvider } from '@react-oauth/google';

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
    <GoogleOAuthProvider clientId={process.env.REACT_APP_OAUTH_GOOGLE_ID}>
      <RouterProvider router={router}/>
    </GoogleOAuthProvider>
  );
}

export default App;
