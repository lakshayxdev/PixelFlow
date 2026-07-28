import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Toaster } from "react-hot-toast";


createRoot(document.getElementById('root')).render(
  <>

  <Toaster
        position="top-center"
        reverseOrder={false}
        gutter={12}
        toastOptions={{
            duration: 3000,

            style: {
                background: "#18181B",
                color: "#F4F4F5",
                border: "1px solid #3F3F46",
                borderRadius: "12px",
                fontSize: "14px",
                padding: "14px 18px",
            },

            success: {
                iconTheme: {
                    primary: "#8B5CF6",
                    secondary: "#ffffff",
                },
            },

            error: {
                iconTheme: {
                    primary: "#EF4444",
                    secondary: "#ffffff",
                },
            },

            loading: {
                iconTheme: {
                    primary: "#8B5CF6",
                    secondary: "#ffffff",
                },
            },
        }}
    />



  <StrictMode>
    <App />
  </StrictMode>,
  </>
)
