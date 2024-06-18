import { useState } from 'react'
import { Bar as BarChartforOccupancy } from 'react-chartjs-2'
import { Chart as ChartOccupancy, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js'
import 'bulma/css/bulma.min.css'

const OccupancyforGuests = ({ fetchedOccupancyData, isLoadingOccupancy }) => {

  // Component to present occupancy data of restaurants and estimated amount of biowaste / day / restaurant based on visitor amounts.
  // Indexes in occupancy data matrix used to present restaurants: Chemicum - 0, Exactum - 1, Physicum - 2
  // Indexes in occupancy data matrix used to present weekdays: 0 - Monday, 1 - Tuesday, 2 - Wednesday, 3 - Thursday, 4 - Friday, 5 - Saturday

  const [ occupancyDataToDisplay, setOccupancyDataToDisplay ] = useState([]) // variables containing selecte occupancy data displayed on chart
  const [ restaurant, setRestaurant ] = useState(0)
  const [ weekday, setWeekday ] = useState(0)
  const [ titleForForecast, setTitleForForecast ] = useState('Estimated Occupancy, Chemicum')
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

  ChartOccupancy.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

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
          
  const clickChemicum = () => {
    setTitleForForecast('Estimated Occupancy, Chemicum')
    setRestaurant(0)
    setOccupancyDataToDisplay(fetchedOccupancyData[0][weekday])
    setStyleForChem(styleForActiveButton)
    setStyleForExa(styleForInactiveButton)
    setStyleForPhy(styleForInactiveButton)
  }

  const clickExactum = () => {
    setTitleForForecast('Estimated Occupancy, Exactum')
    setRestaurant(1)    
    setOccupancyDataToDisplay(fetchedOccupancyData[1][weekday])
    setStyleForExa(styleForActiveButton)
    setStyleForChem(styleForInactiveButton)
    setStyleForPhy(styleForInactiveButton)
  }

  const clickPhysicum = () => {
    setTitleForForecast('Estimated Occupancy, Physicum')
    setRestaurant(2)
    setOccupancyDataToDisplay(fetchedOccupancyData[2][weekday])
    setStyleForPhy(styleForActiveButton)
    setStyleForChem(styleForInactiveButton)
    setStyleForExa(styleForInactiveButton)
  }

  const clickMon = () => {
    setWeekday(0)    
    setOccupancyDataToDisplay(fetchedOccupancyData[restaurant][0])
    setStyleForMon(styleForActiveButton)
    setStyleForTue(styleForInactiveButton)
    setStyleForWed(styleForInactiveButton)
    setStyleForThu(styleForInactiveButton)
    setStyleForFri(styleForInactiveButton)
    setStyleForSat(styleForInactiveButton)        
  }

  const clickTue = () => {
    setWeekday(1)     
    setOccupancyDataToDisplay(fetchedOccupancyData[restaurant][1])
    setStyleForTue(styleForActiveButton)
    setStyleForMon(styleForInactiveButton)
    setStyleForWed(styleForInactiveButton)
    setStyleForThu(styleForInactiveButton)
    setStyleForFri(styleForInactiveButton)
    setStyleForSat(styleForInactiveButton)       
  }

  const clickWed = () => {
    setWeekday(2)
    setOccupancyDataToDisplay(fetchedOccupancyData[restaurant][2])
    setStyleForWed(styleForActiveButton)
    setStyleForMon(styleForInactiveButton)
    setStyleForTue(styleForInactiveButton)
    setStyleForThu(styleForInactiveButton)
    setStyleForFri(styleForInactiveButton)
    setStyleForSat(styleForInactiveButton)        
  }

  const clickThu = () => {
    setWeekday(3)
    setOccupancyDataToDisplay(fetchedOccupancyData[restaurant][3])
    setStyleForThu(styleForActiveButton)
    setStyleForMon(styleForInactiveButton)
    setStyleForTue(styleForInactiveButton)
    setStyleForWed(styleForInactiveButton)
    setStyleForFri(styleForInactiveButton)
    setStyleForSat(styleForInactiveButton)        
  }

  const clickFri = () => {
    setWeekday(4)    
    setOccupancyDataToDisplay(fetchedOccupancyData[restaurant][4])
    setStyleForFri(styleForActiveButton)
    setStyleForMon(styleForInactiveButton)
    setStyleForTue(styleForInactiveButton)
    setStyleForWed(styleForInactiveButton)
    setStyleForThu(styleForInactiveButton)
    setStyleForSat(styleForInactiveButton)
  }

  const clickSat = () => {
    setWeekday(5)
    setOccupancyDataToDisplay(fetchedOccupancyData[restaurant][5])
    setStyleForSat(styleForActiveButton)
    setStyleForMon(styleForInactiveButton)
    setStyleForTue(styleForInactiveButton)
    setStyleForWed(styleForInactiveButton)
    setStyleForThu(styleForInactiveButton)   
    setStyleForFri(styleForInactiveButton)
  }
    return (

            <div className="pt-3">
                { isLoadingOccupancy ? 
                <div className="container is-max-desktop is-skeleton">
                    <div className="pt-6 pb-6">
                     <div className="p-4"> 
                          <h5 className="title is-5" id="title-of-forecast-1">{titleForForecast}</h5>
                          <BarChartforOccupancy options={options} data={data_occupancy}></BarChartforOccupancy>           
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
                : 
                <div className="container is-max-desktop">
                    <div className="pt-6 pb-6">
                         <div className="p-4"> 
                            <h5 className="title is-5" id="title-of-forecast-1">{titleForForecast}</h5>
                            <BarChartforOccupancy options={options} data={data_occupancy}></BarChartforOccupancy>           
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
                 }
            </div>
    )
}

export default OccupancyforGuests