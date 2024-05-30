import { useState, useEffect } from 'react'
import './App.css'
import requestService from './services/requestservice.jsx'
import Proportions from './assets/avg_proportion_sold_meal_types.png'
import StdofMeals from './assets/std_of_meals.png'

const App = () => {
  const [count, setCount] = useState(0)
  const [message, setMessage] = useState('tyhjä viesti')

  useEffect(() => {
    const functionToLoad = async () => {
      try {
        const result = await requestService.getRequestToFlask()
        setMessage(result.data)
      } catch (error) {
        console.log(error)
      }
    }
    functionToLoad() 
  }, [])

  console.log(message)

  return (
    <>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
        <p>{message.content}</p>
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
