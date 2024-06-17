import { useState, useEffect } from 'react'
import { Bar } from 'react-chartjs-2'
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js'
import requestService from '../services/requestservice'
import 'bulma/css/bulma.min.css'

const GuestView = () => {

  // Component to present occupancy data of restaurants and estimated amount of biowaste / day / restaurant based on visitor amounts.
  // Indexes in data matrix used to present restaurants: Chemicum - 0, Exactum - 1, Physicum - 2
  // Indexes in data matrix used to present weekdays: 0 - Monday, 1 - Tuesday, 2 - Wednesday, 3 - Thursday, 4 - Friday, 5 - Saturday

    const [ fetchedData, setFetchedData ] = useState([])
    const [ occupancyDataToDisplay, setOccupancyDataToDisplay ] = useState([])
    const [ isLoading, setIsLoading ] = useState(true)
    const [ restaurant, setRestaurant ] = useState(0)
    const [ weekday, setWeekday ] = useState(0)
    const [ titleForForecast, setTitleForForecast ] = useState('Estimated Amount of Occupancy, Chemicum')
    const dataLabels = ['9-10', '10-11', '11-12', '12-13', '13-14', '14-15', '15-16']
    const styleForInactiveButton = 'button is-link is-light'
    const styleForActiveButton = 'button is-link'
    const [ styleForChem, setStyleForChem ] = useState(styleForActiveButton)
    const [ styleForExa, setStyleForExa ] = useState(styleForInactiveButton)
    const [ styleForPhy, setStyleForPhy ] = useState(styleForInactiveButton)
    const [ styleForMon, setStyleForMon ] = useState(styleForActiveButton)
    const [ styleForTue, setStyleForTue ] = useState(styleForInactiveButton)
    const [ styleForWed, setStyleForWed ] = useState(styleForInactiveButton)
    const [ styleForThu, setStyleForThu ] = useState(styleForInactiveButton)
    const [ styleForFri, setStyleForFri ] = useState(styleForInactiveButton)
    const [ styleForSat, setStyleForSat ] = useState(styleForInactiveButton)

    useEffect(() => {
      let ignore = false
      const fetchData = async () => {
        try {
          const response = await requestService.getOccupancyOfRestaurantsByHour()
          if (!ignore) {
            const chemModified = Object.keys(response.data.Chemicum).map(key => response.data.Chemicum[key]).slice(0, 6)
            const chemDropEmptyHours = chemModified.map(arr => arr.slice(9, 16))
            const exaModified = Object.keys(response.data.Exactum).map(key => response.data.Exactum[key]).slice(0, 6)
            const exaDropEmptyHours = exaModified.map(arr => arr.slice(9, 16))
            const phyModified = Object.keys(response.data.Physicum).map(key => response.data.Physicum[key]).slice(0, 6)
            const phyDropEmptyHours = phyModified.map(arr => arr.slice(9, 16))  
            setFetchedData([chemDropEmptyHours, exaDropEmptyHours, phyDropEmptyHours])
            setOccupancyDataToDisplay(fetchedData)
            setIsLoading(false)
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

    ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

    const data_occupancy = {
        labels: dataLabels,
        datasets: [{
            label: 'Estimated occupancy by hour',
              data: occupancyDataToDisplay,
              borderWidth: 1
            }]
        }

    const options = {
        responsive: true,
        scales: {
        y: {
          beginAtZero: true
        }
      }
    }

    console.log(fetchedData)
          
      const clickChemicum = () => {
        setTitleForForecast('Estimated Amount of Occupancy, Chemicum')
        setRestaurant(0)
        setOccupancyDataToDisplay(fetchedData[0][weekday])
        setStyleForChem(styleForActiveButton)
        setStyleForExa(styleForInactiveButton)
        setStyleForPhy(styleForInactiveButton)
      }

      const clickExactum = () => {
        setTitleForForecast('Estimated Amount of Occupancy, Exactum')
        setRestaurant(1)    
        setOccupancyDataToDisplay(fetchedData[1][weekday])
        setStyleForExa(styleForActiveButton)
        setStyleForChem(styleForInactiveButton)
        setStyleForPhy(styleForInactiveButton)
      }

      const clickPhysicum = () => {
        setTitleForForecast('Estimated Amount of Occupancy, Physicum')
        setRestaurant(2)
        setOccupancyDataToDisplay(fetchedData[2][weekday])
        setStyleForPhy(styleForActiveButton)
        setStyleForChem(styleForInactiveButton)
        setStyleForExa(styleForInactiveButton)
      }

      const clickMon = () => {
        setWeekday(0)    
        setOccupancyDataToDisplay(fetchedData[restaurant][0])
        setStyleForMon(styleForActiveButton)
        setStyleForTue(styleForInactiveButton)
        setStyleForWed(styleForInactiveButton)
        setStyleForThu(styleForInactiveButton)
        setStyleForFri(styleForInactiveButton)
        setStyleForSat(styleForInactiveButton)        
      }

      const clickTue = () => {
        setWeekday(1)     
        setOccupancyDataToDisplay(fetchedData[restaurant][1])
        setStyleForTue(styleForActiveButton)
        setStyleForMon(styleForInactiveButton)
        setStyleForWed(styleForInactiveButton)
        setStyleForThu(styleForInactiveButton)
        setStyleForFri(styleForInactiveButton)
        setStyleForSat(styleForInactiveButton)       
      }

      const clickWed = () => {
        setWeekday(2)
        setOccupancyDataToDisplay(fetchedData[restaurant][2])
        setStyleForWed(styleForActiveButton)
        setStyleForMon(styleForInactiveButton)
        setStyleForTue(styleForInactiveButton)
        setStyleForThu(styleForInactiveButton)
        setStyleForFri(styleForInactiveButton)
        setStyleForSat(styleForInactiveButton)        
      }

      const clickThu = () => {
        setWeekday(3)
        setOccupancyDataToDisplay(fetchedData[restaurant][3])
        setStyleForThu(styleForActiveButton)
        setStyleForMon(styleForInactiveButton)
        setStyleForTue(styleForInactiveButton)
        setStyleForWed(styleForInactiveButton)
        setStyleForFri(styleForInactiveButton)
        setStyleForSat(styleForInactiveButton)        
      }

      const clickFri = () => {
        setWeekday(4)    
        setOccupancyDataToDisplay(fetchedData[restaurant][4])
        setStyleForFri(styleForActiveButton)
        setStyleForMon(styleForInactiveButton)
        setStyleForTue(styleForInactiveButton)
        setStyleForWed(styleForInactiveButton)
        setStyleForThu(styleForInactiveButton)
        setStyleForSat(styleForInactiveButton)
      }

      const clickSat = () => {
        setWeekday(5)
        setOccupancyDataToDisplay(fetchedData[restaurant][5])
        setStyleForSat(styleForActiveButton)
        setStyleForMon(styleForInactiveButton)
        setStyleForTue(styleForInactiveButton)
        setStyleForWed(styleForInactiveButton)
        setStyleForThu(styleForInactiveButton)   
        setStyleForFri(styleForInactiveButton)
      }

    return (
      <>
        <div className="pt-3">
            <div className={ isLoading ? "container is-max-desktop is-skeleton" : "container is-max-desktop" }>
                <div className="pt-6 pb-6">
                     <div className="p-4"> 
                          <h5 className="title is-5" id="title-of-forecast-1">{titleForForecast}</h5>
                          <Bar options={options} data={data_occupancy}></Bar>           
                     </div>
                     <div className="buttons">
                        <button className={styleForChem} onClick={clickChemicum}>Chemicum</button>
                        <button className={styleForExa} onClick={clickExactum}>Exactum</button> 
                        <button className={styleForPhy} onClick={clickPhysicum}>Physicum</button>
                      </div>
                      <div className="buttons">
                        <button className={styleForMon} onClick={clickMon}>Monday</button>
                        <button className={styleForTue} onClick={clickTue}>Tuesday</button>
                        <button className={styleForWed} onClick={clickWed}>Wednesday</button>
                        <button className={styleForThu} onClick={clickThu}>Thursday</button>
                        <button className={styleForFri} onClick={clickFri}>Friday</button>    
                        <button className={styleForSat} onClick={clickSat}>Saturday</button>                  
                     </div>
                </div>
            </div>
        </div>
      </>
    )
}

export default GuestView