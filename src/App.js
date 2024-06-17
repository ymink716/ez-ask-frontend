import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import MainPage from './pages/MainPage';
import LoginPage from './pages/LoginPage';
import ProfilePage from './pages/ProfilePage';
import QuestionDetailPage from './pages/QuestionDetailPage';
import ErrorPage from './pages/ErrorPage';
import Layout from './layout/Layout';
import { GoogleOAuthProvider } from '@react-oauth/google';
import TokenRefresher from './interceptors/TokenRefresher';
import AuthenticatedRoute from './routes/AuthenticatedRoute';
import ProtectedRoute from './routes/ProtectedRoute';
import PostQuestionPage from './pages/PostQuestionPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      { path: '/', element: <MainPage /> },
      { path: '/questions', element: <MainPage /> },
      { path: '/questions/:questionId', element: <QuestionDetailPage />},
      {
        path: '',
        element: <AuthenticatedRoute />,
        children: [
          { path: '/login', element: <LoginPage /> },
        ]
      },
      {
        path: '',
        element: <ProtectedRoute />,
        children: [
          { path: '/profile', element: <ProfilePage /> },
          { path: '/questions/write', element: <PostQuestionPage />}
        ]
      },

    ]
  }
])

function App() {
  return (
    <GoogleOAuthProvider clientId={process.env.REACT_APP_OAUTH_GOOGLE_ID}>
      <TokenRefresher />
      <RouterProvider router={router} />
    </GoogleOAuthProvider>
  );
}

export default App;
