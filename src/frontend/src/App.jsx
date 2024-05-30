import { useState, useEffect } from 'react'
import './App.css'
import requestService from './services/requestservice.jsx'
import Proportions from './assets/avg_proportion_sold_meal_types.png'
import StdofMeals from './assets/std_of_meals.png'

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
      <div>
        <p>Model Based Estimation of Food Waste for the Next Wednesday</p>
        {predData && ( 
        <pre>{JSON.stringify(predData.content, null, 2)}</pre>
      )}
      </div>

      <div className="data_image">
        <img src={Proportions} alt="Chart of average proportions of meals sold per weekday, sorted by type of meal." className="Proportions-image" />
      </div>
      <div className="std_image">
        <img src={StdofMeals} alt="Chart of standard deviation of the proportion of meal types sold by weekday, sorted by type of meal." className="Std-image" />
      </div>
    </>
  )

}

export default App
