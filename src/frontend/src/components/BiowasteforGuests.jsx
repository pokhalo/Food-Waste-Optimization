import { useState, useEffect } from 'react'
import { Bar as BarChartforBiowaste } from 'react-chartjs-2'
import { Chart as ChartBiowaste, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js'
import 'bulma/css/bulma.min.css'

const BiowasteforGuests = ({ fetchedBiowasteData, isLoadingBiowaste }) => {


  console.log(fetchedBiowasteData)

    ChartBiowaste.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

      const [ titleForForecast, setTitleForForecast ] = useState('Estimated Biowaste / Customer, Chemicum')
      const restaurants = ['Chemicum', 'Exactum', 'Physicum']
      const [ selectedRestaurant, setSelectedRestaurant ] = useState('Chemicum')
      const [ selectedRestaurantIndex, setSelectedRestaurantIndex ] = useState(0)
      const [ dataBiowaste, setDataBiowaste ] = useState({
        labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
        datasets: [{
            label: 'Estimated Biowaste, kg',
              data: [10, 10, 10, 10, 10, 10],
              borderWidth: 1
            }]
        })

      useEffect(() => {
        const createDataForChart = () => {
          if (isLoadingBiowaste) {
            setDataBiowaste(      {
              labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
              datasets: [{
                  label: 'Estimated Occupancy',
                    data: [10, 10, 10, 10],
                    borderWidth: 1,
                  }]
              })
          } else {
            const biowaste = fetchedBiowasteData[selectedRestaurantIndex][selectedRestaurant]
            console.log('biowaste: ', biowaste)
            setDataBiowaste(
            {
              labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
              datasets: [{
                  label: 'Estimated Occupancy',
                    data: biowaste,
                    borderWidth: 1,
                  }]
              }
          )
        }
      }
      createDataForChart()
      setTitleForForecast(`Estimated Biowaste / Customer, ${selectedRestaurant}`)
    }, [selectedRestaurant, selectedRestaurantIndex, fetchedBiowasteData, isLoadingBiowaste])
    
    if (isLoadingBiowaste) {
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
        console.log('restaurant: ', event.currentTarget.value)
      }

    return (
        <div className="pt-3">
            <div className="container is-max-desktop">
             <div className="pt-6 pb-6">
                <div className="p-4"> 
                    <h5 className="title is-5" id="title-of-forecast-2">{titleForForecast}</h5>
                    <BarChartforBiowaste options={options} data={dataBiowaste}></BarChartforBiowaste>
                 </div>
                          <div className="buttons">
                            { restaurants.map((restaurant, i) => {
                              return (
                                <button className='button is-link' key={i} value={restaurant} onClick={(event) => handleRestaurantChange(event, i)}>{restaurant}</button>                                
                              )

                            })}                            
                          </div>
               </div>
            </div>
         </div>         
    )
}

export default BiowasteforGuests