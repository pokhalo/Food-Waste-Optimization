import { useState } from 'react'
import { AuthenticatedTemplate, UnauthenticatedTemplate } from '@azure/msal-react'
import { Doughnut } from 'react-chartjs-2'
import { Chart as ChartJS, LinearScale, ArcElement, Title, Tooltip, Legend } from 'chart.js'
import Unauthorized from './Unauthorized.jsx'
import 'bulma/css/bulma.min.css'

const ManagerView = ({ predData, fetchedBiowasteData }) => {

    console.log(fetchedBiowasteData)

    ChartJS.register(ArcElement, LinearScale, Title, Tooltip, Legend);


    const [ biowasteDataToDisplay, setbiowasteDataToDisplay ] = useState([])
    const dataLabels = ['Coffee', 'Customer', 'Kitchen', 'Hall']
    const styleForInactiveButton = 'button is-link is-light'
    const styleForActiveButton = 'button is-link'
    const [ titleForForecast, setTitleForForecast ] = useState('Estimated Amount of Biowaste, Chemicum')
    const [ styleForChem, setStyleForChem ] = useState(styleForActiveButton)
    const [ styleForExa, setStyleForExa ] = useState(styleForInactiveButton)
    const [ styleForPhy, setStyleForPhy ] = useState(styleForInactiveButton)


    // const formatBiowasteData = (data, restaurant) => {
    //   const coffeeWasteForMonChem = data.coffeBiowaste[0].Chemicum[0]
    //   const customerWasteForMonChem = data.customerBiowaste[0].Chemicum[0]
    //   const hallWasteForMonChem = data.hallBiowaste[0].Chemicum[0]
    //   const kitchenWasteForMonChem = data.kitchenBiowaste[0].Chemicum[0]

    //   const coffeeWasteForMonExa = data.coffeeBiowaste[1].Exactum[0]
    //   const customerWasteForMonExa = data.customerBiowaste[1].Exactum[0]
    //   const hallWasteForMonExa = data.hallBiowaste[1].Exactum[0]
    //   const kitchenWasteForMonExa = data.kitchenBiowaste[1].Exactum[0]

    //   const coffeWasteForMonPhy = data.coffeeBiowaste[2].Physicum[0]
    //   const customerWasteForMonPhy = data.customerBiowaste[2].Physicum[0]
    //   const hallWasteForMonPhy = data.hallBiowaste[2].Physicum[0]
    //   const kitchenWasteForMonPhy = data.kitchenBiowaste[2].Physicum[0]

    //   const dataChem = [ coffeeWasteForMonChem,
    //     customerWasteForMonChem,
    //     hallWasteForMonChem,
    //     kitchenWasteForMonChem ]
    //   const dataExa = [
    //     coffeeWasteForMonExa,
    //     customerWasteForMonExa,
    //     hallWasteForMonExa,
    //     kitchenWasteForMonExa ]
    //   const dataPhy = [ 
    //     coffeWasteForMonPhy,
    //     customerWasteForMonPhy,
    //     hallWasteForMonPhy,
    //     kitchenWasteForMonPhy,
    //   ]
    //   if (restaurant == 'Chemicum') {
    //     return dataChem
    //   }
    //   if (restaurant == 'Exactum') {
    //     return dataExa
    //   }
    //   if (restaurant == 'Physicum') {
    //     return dataPhy
    //   }
    // }

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
        setbiowasteDataToDisplay([15, 22, 14, 16])
        setStyleForChem(styleForActiveButton)
        setStyleForExa(styleForInactiveButton)
        setStyleForPhy(styleForInactiveButton)
      }

      const clickExactum = () => {
        setTitleForForecast('Estimated Amount of Biowaste, Exactum')       
        setbiowasteDataToDisplay([35, 13, 12, 18])
        setStyleForExa(styleForActiveButton)
        setStyleForChem(styleForInactiveButton)
        setStyleForPhy(styleForInactiveButton)
      }

      const clickPhysicum = () => {
        setTitleForForecast('Estimated Amount of Biowaste, Physicum')      
        setbiowasteDataToDisplay([24, 33, 21, 32])
        setStyleForPhy(styleForActiveButton)
        setStyleForChem(styleForInactiveButton)
        setStyleForExa(styleForInactiveButton)
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
                <div className="cell"></div>
                <div className="cell"></div>



                <div className="cell  is-col-span-4">
                    <h5 className="title is-5" id="title-of-forecast-1">{titleForForecast}</h5>
                    <Doughnut options={options} data={data}></Doughnut>
                    <div className="pt-3">

                            </div>
                            <div className="buttons">
                                <button className={styleForChem} onClick={clickChemicum}>Chemicum</button>
                                <button className={styleForExa} onClick={clickExactum}>Exactum</button> 
                                <button className={styleForPhy} onClick={clickPhysicum}>Physicum</button>
                            </div>

                    </div>
                
                <div className="cell"></div>
                <div className="cell"></div>
                <div className="cell"></div>
                <div className="cell"></div>
                <div className="cell"></div>
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