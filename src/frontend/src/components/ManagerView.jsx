import { useState, useEffect } from 'react'
import { AuthenticatedTemplate, UnauthenticatedTemplate } from '@azure/msal-react'
import { Doughnut } from 'react-chartjs-2'
import { Chart as ChartJS, LinearScale, ArcElement, Title, Tooltip, Legend } from 'chart.js'
import Unauthorized from './Unauthorized.jsx'
import 'bulma/css/bulma.min.css'

const ManagerView = ({ predData, fetchedBiowasteData }) => {

    console.log(fetchedBiowasteData)

    ChartJS.register(ArcElement, LinearScale, Title, Tooltip, Legend);


    const [ biowasteDataToDisplay, setbiowasteDataToDisplay ] = useState([])
    const dataLabels = ['9-10', '10-11', '11-12', '12-13', '13-14', '14-15']
    const styleForInactiveButton = 'button is-link is-light'
    const styleForActiveButton = 'button is-link'
    const [ titleForForecast, setTitleForForecast ] = useState('Estimated Amount of Biowaste, Chemicum')
    const [ styleForChem, setStyleForChem ] = useState(styleForActiveButton)
    const [ styleForExa, setStyleForExa ] = useState(styleForInactiveButton)
    const [ styleForPhy, setStyleForPhy ] = useState(styleForInactiveButton)
    const [ styleForMon, setStyleForMon ] = useState(styleForActiveButton)
    const [ styleForTue, setStyleForTue ] = useState(styleForInactiveButton)
    const [ styleForWed, setStyleForWed ] = useState(styleForInactiveButton)
    const [ styleForThu, setStyleForThu ] = useState(styleForInactiveButton)
    const [ styleForFri, setStyleForFri ] = useState(styleForInactiveButton)
    const [ styleForSat, setStyleForSat ] = useState(styleForInactiveButton)



    const data = {
        labels: dataLabels,
        datasets: [{
            label: 'Estimated biowaste',
              data: biowasteDataToDisplay,
              borderWidth: 1,
              backgroundColor: ['black', 'red', 'blue', 'yellow', 'green', 'aquamarine'],
              borderColor: ['white'],
            }]
        }

    const options = {
        responsive: true,
        cutout: '40%',
        radius: '50%',
    }

      const clickChemicum = () => {
        setTitleForForecast('Estimated Amount of Biowaste, Chemicum')
        setbiowasteDataToDisplay(fetchedBiowasteData.coffeeBiowaste[0].Chemicum)
        setStyleForChem(styleForActiveButton)
        setStyleForExa(styleForInactiveButton)
        setStyleForPhy(styleForInactiveButton)
      }

      const clickExactum = () => {
        setTitleForForecast('Estimated Amount of Biowaste, Exactum')       
        setbiowasteDataToDisplay(fetchedBiowasteData.coffeeBiowaste[1].Exactum)
        setStyleForExa(styleForActiveButton)
        setStyleForChem(styleForInactiveButton)
        setStyleForPhy(styleForInactiveButton)
      }

      const clickPhysicum = () => {
        setTitleForForecast('Estimated Amount of Biowaste, Physicum')      
        setbiowasteDataToDisplay(fetchedBiowasteData.coffeeBiowaste[2].Physicum)
        setStyleForPhy(styleForActiveButton)
        setStyleForChem(styleForInactiveButton)
        setStyleForExa(styleForInactiveButton)
      }

      const clickMon = () => {
        setWeekday(0)
        setbiowasteDataToDisplay(fetchedBiowasteData[restaurant][weekday])
        setStyleForMon(styleForActiveButton)
        setStyleForTue(styleForInactiveButton)
        setStyleForWed(styleForInactiveButton)
        setStyleForThu(styleForInactiveButton)
        setStyleForFri(styleForInactiveButton)
      }

      const clickTue = () => {
        setWeekday(1)
        setbiowasteDataToDisplay(fetchedData[restaurant][weekday])
        setStyleForTue(styleForActiveButton)
        setStyleForMon(styleForInactiveButton)
        setStyleForWed(styleForInactiveButton)
        setStyleForThu(styleForInactiveButton)
        setStyleForFri(styleForInactiveButton)
      }

      const clickWed = () => {
        setWeekday(2)
        setbiowasteDataToDisplay(fetchedData[restaurant][weekday])
        setStyleForWed(styleForActiveButton)
        setStyleForMon(styleForInactiveButton)
        setStyleForTue(styleForInactiveButton)
        setStyleForThu(styleForInactiveButton)
        setStyleForFri(styleForInactiveButton)
      }

      const clickThu = () => {
        setWeekday(3)
        setbiowasteDataToDisplay(fetchedData[restaurant][weekday])
        setStyleForThu(styleForActiveButton)
        setStyleForMon(styleForInactiveButton)
        setStyleForTue(styleForInactiveButton)
        setStyleForWed(styleForInactiveButton)
        setStyleForFri(styleForInactiveButton)
      }

      const clickFri = () => {
        setWeekday(4)
        setbiowasteDataToDisplay(fetchedData[restaurant][weekday])
        setStyleForFri(styleForActiveButton)
        setStyleForMon(styleForInactiveButton)
        setStyleForTue(styleForInactiveButton)
        setStyleForWed(styleForInactiveButton)
        setStyleForThu(styleForInactiveButton)
      }

    return (
        <>
        <AuthenticatedTemplate>

        <h5 className="title is-5" id="title-of-forecast-2">Model Based Estimation of Number of Meals Sold for the Next Wednesday</h5>
                    <h5 className="title is-5" id="space-for-forecast">
                                            {predData && ( 
                            <div className="is-success is-light">{JSON.stringify(predData.content, null, 2)}</div>
                            )}
                </h5>
        <div className="fixed-grid has-8-cols">
            <div className="grid">
                <div className="cell">Cell 1</div>
                <div className="cell">Cell 2</div>



                <div className="cell  is-col-span-4">Cell 3
                    <h5 className="title is-5" id="title-of-forecast-1">{titleForForecast}</h5>
                    <Doughnut options={options} data={data}></Doughnut>
                    <div className="pt-3">

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
                            </div>
                    </div>
                
                <div className="cell">Cell 4</div>
                <div className="cell">Cell 5</div>
                <div className="cell">Cell 6</div>
                <div className="cell">Cell 7</div>
                <div className="cell">Cell 8</div>
                </div>
                </div>
                
                            
                
        </AuthenticatedTemplate>
        <UnauthenticatedTemplate>
            <Unauthorized></Unauthorized>
        </UnauthenticatedTemplate>
    </>
    )
}

export default ManagerView