import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import MainPage from './pages/MainPage';
import GoogleLoginPage from './pages/GoogleLoginPage';
import ProfilePage from './pages/ProfilePage';
import QuestionDetailPage from './pages/QuestionDetailPage';
import ErrorPage from './pages/ErrorPage';

const router = createBrowserRouter([
  {
    path: '/',
    // element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      { path: '/', element: <MainPage /> },
      { path: '/login', element: <GoogleLoginPage /> },
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
