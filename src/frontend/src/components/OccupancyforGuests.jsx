import { useState, useEffect } from 'react'
import { Bar as BarChartforOccupancy } from 'react-chartjs-2'
import { Chart as ChartOccupancy, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js'
import 'bulma/css/bulma.min.css'

const OccupancyforGuests = ({ fetchedOccupancyData, isLoadingOccupancy }) => {

  // Component to present occupancy data of restaurants and estimated amount of biowaste / day / restaurant based on visitor amounts.
  // Indexes in occupancy data matrix used to present restaurants: Chemicum - 0, Exactum - 1, Physicum - 2
  // Indexes in occupancy data matrix used to present weekdays: 0 - Monday, 1 - Tuesday, 2 - Wednesday, 3 - Thursday, 4 - Friday, 5 - Saturday


  const [ titleForForecast, setTitleForForecast ] = useState('Estimated Occupancy, Chemicum')
  const restaurants = ['Chemicum', 'Exactum', 'Physicum']
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
  const [ selectedRestaurant, setSelectedRestaurant ] = useState('Chemicum')
  const [ selectedDayIndex, setSelectedDayIndex ] = useState(0)
  const [ selectedDay, setSelectedDay ] = useState('Monday')
  const [ selectedRestaurantIndex, setSelectedRestaurantIndex ] = useState(0)
  const [ dataOccupancy, setDataOccupancy ] = useState({
    labels: ['9-10', '10-11', '11-12', '12-13', '13-14', '14-15', '15-16'],
    datasets: [{
        label: 'Estimated occupancy by hour',
          data: [10, 10, 10, 10, 10, 10],
          borderWidth: 1
        }]
    })

  ChartOccupancy.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

  useEffect(() => {
    const createDataForChart = () => {
      if (isLoadingOccupancy) {
        setDataOccupancy(      {
          labels: ['9-10', '10-11', '11-12', '12-13', '13-14', '14-15', '15-16'],
          datasets: [{
              label: 'Estimated Occupancy',
                data: [10, 10, 10, 10],
                borderWidth: 1,
              }]
          })
      } else {
        const occupancy = fetchedOccupancyData[selectedRestaurantIndex][selectedDayIndex]
        setDataOccupancy(
        {
          labels: ['9-10', '10-11', '11-12', '12-13', '13-14', '14-15', '15-16'],
          datasets: [{
              label: 'Estimated Occupancy',
                data: occupancy,
                borderWidth: 1,
              }]
          }
      )
    }
  }
  createDataForChart()
  setTitleForForecast(`Estimated Occupancy, ${selectedRestaurant}, ${selectedDay}`)
}, [selectedRestaurant, selectedDay, selectedDayIndex, selectedRestaurantIndex, fetchedOccupancyData, isLoadingOccupancy])

if (isLoadingOccupancy) {
  return <div>Is loading...</div>
}

  const options = {
      responsive: true,
      scales: {
      y: {
        beginAtZero: true
      }
    }
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
      <div className="pt-3">
          <div className="container is-max-desktop">
              <div className="pt-6 pb-6">
                <div className="p-4"> 
                    <h5 className="title is-5" id="title-of-forecast-1">{titleForForecast}</h5>
                    <BarChartforOccupancy options={options} data={dataOccupancy}></BarChartforOccupancy>           
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
     </div>
  )
}

export default OccupancyforGuests
