import { useState, useEffect } from 'react'
import { AuthenticatedTemplate, UnauthenticatedTemplate } from '@azure/msal-react'
import { Doughnut } from 'react-chartjs-2'
import { Chart as ChartJS, LinearScale, ArcElement, Title, Tooltip, Legend } from 'chart.js'
import Unauthorized from './Unauthorized.jsx'
import 'bulma/css/bulma.min.css'

const ManagerView = ({ predData, fetchedBiowasteData, isLoadingBiowaste }) => {

    ChartJS.register(ArcElement, LinearScale, Title, Tooltip, Legend);

    const [ titleForForecast, setTitleForForecast ] = useState('Estimated Biowaste, Chemicum, Monday')
    const restaurants = ['Chemicum', 'Exactum', 'Physicum']
    const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
    const [ selectedRestaurant, setSelectedRestaurant ] = useState('Chemicum')
    const [ selectedDayIndex, setSelectedDayIndex ] = useState(0)
    const [ selectedDay, setSelectedDay ] = useState('Monday')
    const [ selectedRestaurantIndex, setSelectedRestaurantIndex ] = useState(0)
    const [ dataToDisplay, setDataToDisplay ] = useState({
      labels: ['Coffee', 'Customer', 'Kitchen', 'Hall'],
      datasets: [{
          label: 'Estimated biowaste',
            data: [10, 10, 10, 10],
            borderWidth: 1,
            backgroundColor: ['black', 'red', 'blue', 'yellow'],
            borderColor: ['white'],
          }]
      })

    useEffect(() => {
      const createDataForChart = () => {
        if (isLoadingBiowaste) {
          setDataToDisplay(      {
            labels: ['Coffee', 'Customer', 'Kitchen', 'Hall'],
            datasets: [{
                label: 'Estimated biowaste',
                  data: [10, 10, 10, 10],
                  borderWidth: 1,
                  backgroundColor: ['black', 'red', 'blue', 'yellow'],
                  borderColor: ['white'],
                }]
            })
        } else {
          const coffee = fetchedBiowasteData.coffeeBiowaste[selectedRestaurantIndex][selectedRestaurant][selectedDayIndex]
          const customer = fetchedBiowasteData.customerBiowaste[selectedRestaurantIndex][selectedRestaurant][selectedDayIndex]
          const kitchen = fetchedBiowasteData.kitchenBiowaste[selectedRestaurantIndex][selectedRestaurant][selectedDayIndex]
          const hall = fetchedBiowasteData.hallBiowaste[selectedRestaurantIndex][selectedRestaurant][selectedDayIndex]
          console.log(coffee) 
          console.log(customer)
          console.log(kitchen)
          console.log(hall)
          const all = [coffee, customer, kitchen, hall]
          setDataToDisplay(
          {
            labels: ['Coffee', 'Customer', 'Kitchen', 'Hall'],
            datasets: [{
                label: 'Estimated biowaste',
                  data: all,
                  borderWidth: 1,
                  backgroundColor: ['black', 'red', 'blue', 'yellow'],
                  borderColor: ['white'],
                }]
            }
        )
      }
    }
      createDataForChart()
      setTitleForForecast(`Estimated Biowaste, ${selectedRestaurant}, ${selectedDay}`)
    }, [selectedRestaurant, selectedDay, selectedDayIndex, selectedRestaurantIndex, fetchedBiowasteData, isLoadingBiowaste])

    if (isLoadingBiowaste) {
      return <div>Is loading...</div>
    }

    const options = {
        aspectRatio: 1,
        responsive: true,
        cutout: '40%',
        radius: '50%',
    }

    const handleRestaurantChange = (event, i) => {   
      setSelectedRestaurant(event.currentTarget.value)
      setSelectedRestaurantIndex(i)
    }

    const handleDayChange = (event, day) => {
      setSelectedDayIndex(event.currentTarget.value)
      setSelectedDay(day)
    }


    return (
        <>
        <AuthenticatedTemplate>

        {/* <h5 className="title is-5" id="title-of-forecast-2">Model Based Estimation of Number of Meals Sold for the Next Wednesday</h5>
                    <h5 className="title is-5" id="space-for-forecast">
                                            {predData && ( 
                            <div className="is-success is-light">{JSON.stringify(predData.content, null, 2)}</div>
                            )}
        </h5> */}
        <div className="fixed-grid has-8-cols">
            <div className="grid">
                <div className="cell"></div>
                <div className="cell"></div>



                <div className="cell  is-col-span-4">
                    <h5 className="title is-5" id="title-of-forecast-1">{titleForForecast}</h5>
                    <Doughnut options={options} data={dataToDisplay}></Doughnut>
                    <div className="pt-3">

                    </div>   
                          <div className="buttons">
                            { restaurants.map((restaurant, i) => {
                              return (
                                <button className='button is-link' key={i} value={restaurant} onClick={(event) => handleRestaurantChange(event, i)}>{restaurant}</button>                                
                              )

                            })}                            
                          </div>
                          <div className="buttons">
                            { days.map((day, i) => {
                              return (
                                <button className='button is-link' key={day} value={i} onClick={(event) => handleDayChange(event, day)}>{day}</button>
                              )
                            })}
                          </div>
                    </div>

                    </div>
                
                <div className="cell"></div>
                <div className="cell"></div>
                <div className="cell"></div>
                <div className="cell"></div>
                <div className="cell"></div>
                </div>
                
                            
                
        </AuthenticatedTemplate>
        <UnauthenticatedTemplate>
            <Unauthorized></Unauthorized>
        </UnauthenticatedTemplate>
    </>
    )
}

export default ManagerView