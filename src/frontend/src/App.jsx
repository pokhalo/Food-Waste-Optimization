import { useState, useEffect } from 'react'
import requestService from './services/requestservice.jsx'
import Menu from './components/Menu.jsx'
import Footer from './components/Footer.jsx'
import MainView from './components/MainView.jsx'

const App = () => {
  const [predData, setData] = useState(999)

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
    <Menu></Menu>
    <MainView predData={predData}></MainView>
    <Footer></Footer>
    </>
  )

}

export default App
