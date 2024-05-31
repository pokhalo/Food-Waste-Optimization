import { useState, useEffect } from 'react'
import requestService from './services/requestservice.jsx'
import Menu from './components/Menu.jsx'
import Footer from './components/Footer.jsx'
import MainView from './components/MainView.jsx'

const App = () => {
  const [message, setMessage] = useState('tyhjä viesti')
  const [predData, setData] = useState(999)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await requestService.getRequestToFlask();
        setMessage(result.data);

        const response = await requestService.getDataFromFlask();
        setData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    console.log(message)
    console.log(predData)
    fetchData();
  }, []);

  return (
    <>
    <Menu></Menu>
    <MainView message={message} predData={predData}></MainView>
    <Footer></Footer>

    </>
  )

}

export default App
