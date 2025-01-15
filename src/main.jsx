import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { RouterProvider } from 'react-router-dom';
import { router } from './Routes/Routes';
import { HelmetProvider } from 'react-helmet-async';
import AuthProvider from './Providers/AuthProvider';


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      {/* React Helmet */}
    <HelmetProvider>
      <div className='w-full mx-auto'>
        <RouterProvider router={router} />
      </div>
    </HelmetProvider>
    </AuthProvider>
  </StrictMode>,
)
