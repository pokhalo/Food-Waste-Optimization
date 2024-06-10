import { useState, useEffect } from 'react'
import { MsalProvider, useMsal } from '@azure/msal-react'
import { Routes, Route, useNavigate } from "react-router-dom"
import { CustomNavigationClient } from "./utils/NavigationClient.js"
import requestService from './services/requestservice.jsx'
import Menu from './components/Menu.jsx'
import MenuView from './components/MenuView.jsx'
import AdminView from './components/AdminView.jsx'
import UploadView from './components/UploadView.jsx'
import Footer from './components/Footer.jsx'
import MainView from './components/MainView.jsx'
import GuestView from './components/GuestView.jsx'
import 'bulma/css/bulma.min.css'

const App = ({ instance }) => {
   // The next 3 lines are optional. This is how you configure MSAL to take advantage of the router's navigate functions when MSAL redirects between pages in your app
  const navigate = useNavigate()
  const navigationClient = new CustomNavigationClient(navigate)
  instance.setNavigationClient(navigationClient)

  const [predData, setData] = useState(999)

 
  var activeAccount = false
  if (instance.getActiveAccount()) {
    activeAccount = instance.getActiveAccount()
  }

  // for debugging ->
  const { msInstance, accounts, inProgress } = useMsal()
  console.log(msInstance)
  if (accounts.length > 0) {
      console.log('accounts signed in:', accounts.length)
  } else if (inProgress === "login") {
      console.log('log in in progress')
  } else {
    console.log('no users signed in')
  }
  // debugging end

  console.log('client id: ', import.meta.env.VITE_CLIENT_ID)
  console.log(import.meta.env.MODE)

  useEffect(() => {
    let ignore = false
    const fetchData = async () => {
      try {
        const response = await requestService.getDataFromFlask()
        if (!ignore) {
          setData(response.data)          
        }
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }
    fetchData()
    return () => {
      ignore = true
    }
  }, [])



  return (
    <>
    <MsalProvider instance={instance}>
      <Menu instance={instance}></Menu>
      <Routes>
            <Route path="/" element={<GuestView instance={instance}/>} />
            <Route path="/sales" element={<MainView predData={predData}/>} />
            <Route path="/menus" element={<MenuView />} />
            <Route path="/admin" element={<AdminView />} />
            <Route path="/upload" element={<UploadView />} />
        </Routes>
      <Footer></Footer>      
    </MsalProvider>
    </>
  )

}

export default App
