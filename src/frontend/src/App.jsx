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
import ManagerView from './components/ManagerView.jsx'
import GuestView from './components/GuestView.jsx'
import 'bulma/css/bulma.min.css'

const App = ({ instance }) => {
   // The next 3 lines are optional. This is how you configure MSAL to take advantage of the router's navigate functions when MSAL redirects between pages in your app
  const navigate = useNavigate()
  const navigationClient = new CustomNavigationClient(navigate)
  instance.setNavigationClient(navigationClient)

  const [predData, setData] = useState(999)
  const [ fetchedBiowasteData, setFetchedBiowasteData ] = useState([]) // variables containing all fetched biowaste data
  const [ isLoadingBiowaste, setIsLoadingBiowaste ] = useState(true)

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

  useEffect(() => {
    let ignore = false
    let ignoreBiowaste = false
    const fetchData = async () => {
      try {
        const response = await requestService.getDataFromFlask()
        if (!ignore) {
          setData(response.data)          
        }
      } catch (error) {
        console.error('Error fetching data:', error)
      }
      try {
        const responseBiowaste = await requestService.getBiowastePrediction()
        if (!ignoreBiowaste) {
          console.log(responseBiowaste.data)
          setFetchedBiowasteData(responseBiowaste.data)
          setIsLoadingBiowaste(false)
        }
      } catch (error) {
        console.log('Error fetching biowaste data: ', error)
      }
    }
    fetchData()
    return () => {
      ignore = true
      ignoreBiowaste = true
    }
  }, [])

  return (
    <>
    <MsalProvider instance={instance}>
      <Menu instance={instance}></Menu>
      <Routes>
            <Route path="/" element={<GuestView instance={instance} fetchedBiowasteData={fetchedBiowasteData.customerBiowaste} isLoadingBiowaste={isLoadingBiowaste}/>} />
            <Route path="/fwowebserver" element={<GuestView instance={instance} fetchedBiowasteData={fetchedBiowasteData.customerBiowaste} isLoadingBiowaste={isLoadingBiowaste}/>} />
            <Route path="/sales" element={<ManagerView predData={predData} fetchedBiowasteData={fetchedBiowasteData}/>} />
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
