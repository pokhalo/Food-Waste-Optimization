import { useState } from 'react'
import { Bar as BarChartforBiowaste } from 'react-chartjs-2'
import { Chart as ChartBiowaste, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js'
import 'bulma/css/bulma.min.css'

const BiowasteforGuests = ({ fetchedBiowasteData, isLoadingBiowaste }) => {

    const [ biowasteDataToDisplay, setBiowasteDataToDisplay ] = useState([]) // variables containing selected biowaste data displayed on chart
    const [ titleForForecast, setTitleForForecast ] = useState('Estimated Biowaste, Chemicum')
    const dataLabels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
    const styleForInactiveButton = 'button is-link is-light'
    const styleForActiveButton = 'button is-link'
    const [ styleForChemB, setStyleForChemB ] = useState(styleForActiveButton)
    const [ styleForExaB, setStyleForExaB ] = useState(styleForInactiveButton)
    const [ styleForPhyB, setStyleForPhyB ] = useState(styleForInactiveButton)

    ChartBiowaste.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

    const data = {
        labels: dataLabels,
        datasets: [{
            label: 'Estimated Biowaste, kg',
              data: biowasteDataToDisplay,
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

    const clickChemBiowaste = () => {
        setTitleForForecast('Estimated Biowaste, Chemicum')
        setBiowasteDataToDisplay(fetchedBiowasteData[0].Chemicum)
        setStyleForChemB(styleForActiveButton)
        setStyleForExaB(styleForInactiveButton)
        setStyleForPhyB(styleForInactiveButton)
      }

      const clickExaBiowaste = () => {
        setTitleForForecast('Estimated Biowaste, Exactum')
        setBiowasteDataToDisplay(fetchedBiowasteData[1].Exactum)
        setStyleForExaB(styleForActiveButton)
        setStyleForChemB(styleForInactiveButton)
        setStyleForPhyB(styleForInactiveButton)
      }

      const clickPhyBiowaste = () => {
        setTitleForForecast('Estimated Biowaste, Physicum')
        setBiowasteDataToDisplay(fetchedBiowasteData[2].Physicum)     
        setStyleForPhyB(styleForActiveButton)
        setStyleForChemB(styleForInactiveButton)
        setStyleForExaB(styleForInactiveButton)
      }


    return (
        <div className="pt-3">
            { isLoadingBiowaste ? 
            <div className="container is-max-desktop is-skeleton">
             <div className="pt-6 pb-6">
             <div className="p-4"> 
                  <h5 className="title is-5" id="title-of-forecast-2">{titleForForecast}</h5>
                  <BarChartforBiowaste options={options} data={data}></BarChartforBiowaste>
             </div>
             <div className="buttons">
                <button className={styleForChemB} onClick={clickChemBiowaste}>Chemicum</button>
                <button className={styleForExaB} onClick={clickExaBiowaste}>Exactum</button> 
                <button className={styleForPhyB} onClick={clickPhyBiowaste}>Physicum</button>
              </div>
              </div>
            </div>
            :
            <div className="container is-max-desktop">
            <div className="pt-6 pb-6">
                 <div className="p-4"> 
                      <h5 className="title is-5" id="title-of-forecast-2">{titleForForecast}</h5>
                      <BarChartforBiowaste options={options} data={data}></BarChartforBiowaste>
                 </div>
                 <div className="buttons">
                    <button className={styleForChemB} onClick={clickChemBiowaste}>Chemicum</button>
                    <button className={styleForExaB} onClick={clickExaBiowaste}>Exactum</button> 
                    <button className={styleForPhyB} onClick={clickPhyBiowaste}>Physicum</button>
                  </div>
            </div>
        </div>    
      }
    </div>         
    )
}

export default BiowasteforGuests