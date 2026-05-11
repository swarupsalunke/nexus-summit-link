import { StrictMode } from 'react'

import { createRoot } from 'react-dom/client'

import './index.css'

import './App.css'

import App from './App.jsx'

import { Toaster } from 'react-hot-toast';

createRoot(
  document.getElementById('root')
).render(

  <StrictMode>

    <>
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            borderRadius: "10px",
            fontFamily:
              "'DM Sans', sans-serif",
            fontSize: "14px",
          },

          success: {
            iconTheme: {
              primary: "#7c3aed",
              secondary: "#fff"
            }
          }
        }}
      />

      <App />
    </>

  </StrictMode>
)