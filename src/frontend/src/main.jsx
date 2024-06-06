import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import App from './App.jsx'
import MenuView from './components/MenuView.jsx'
import AdminView from './components/AdminView.jsx'
import UploadView from './components/UploadView.jsx'
import GuestView from './components/GuestView.jsx'

const router = createBrowserRouter([
  { path: "/", element: <GuestView /> }, 
  { path: "/fwowebserver/", element: <GuestView /> }, 
  { path: "/sales/*", element: <App /> },
  { path: "/menus/*", element: <MenuView />},
  { path: "/admin/*", element: <AdminView />},
  { path: "/upload/*", element: <UploadView />}
])  

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
