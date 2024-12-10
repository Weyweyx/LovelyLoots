import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './index.css';

import App from './App.jsx';
import LandingPage from './pages/LandingPage.jsx';
import NoMatch from './pages/NoMatch.jsx';
import Login from './pages/Login.jsx';
import Signup from './pages/SignUp.jsx';
import ProductDetail from './pages/ProductDetail.jsx';
//import Success from './pages/Success';

console.log('Hello?');

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <NoMatch />,
    children: [
      {
        index: true,
        element: <LandingPage />,
      },
      {
        path: '/login',
        element: <Login />,
      },
      {
        path: '/signup',
        element: <Signup />,
      },
      {
        path: '/products/:id',
        element: <ProductDetail />,
      } /* {
        path: '/success',
        element: <Success />
      }, */,
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
);
