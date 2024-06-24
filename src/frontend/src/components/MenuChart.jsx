import { AuthenticatedTemplate, UnauthenticatedTemplate } from '@azure/msal-react'
import { useState, useEffect } from 'react'
import Unauthorized from './Unauthorized'
import 'bulma/css/bulma.min.css'

const MenuChart = ({ fetchedMenuData, isLoadingMenuData, Chart, Doughnut }) => {
    const [ titleForData, setTitleForData ] = useState('Estimated Occupancy, Chemicum')
    const restaurants = ['Chemicum', 'Exactum', 'Physicum', 'Total']
    const quartals = ['Q123', 'Q223', 'Q323', 'Q423']
    const dataUnloaded = {
        labels: ['Fish', 'Chicken', 'Meat', 'Vegan'],
        datasets: [{
            label: 'Estimated occupancy by hour',
              data: [],
              borderWidth: 1
            }]
        }
    const [ selectedRestaurant, setSelectedRestaurant ] = useState('Chemicum')
    const [ selectedQuartal, setSelectedQuartal ] = useState('Q123')
    const [ dataToDisplay, setDataToDisplay ] = useState(dataUnloaded)

    useEffect(() => {
        const createDataForChart = () => {
          if (isLoadingMenuData) {
            setDataToDisplay(createDataSetToDisplay([10, 10, 10, 10])) 
          } else {
            const data1 = fetchedMenuData[selectedRestaurant][selectedQuartal]
            const dataset = createDataSetToDisplay(data1)
            setDataToDisplay(dataset)
        }
      }
        createDataForChart()
        setTitleForData(`Division of Menu Items, ${selectedRestaurant}, ${selectedQuartal}`)                     
      }, [selectedRestaurant, selectedQuartal, fetchedMenuData, isLoadingMenuData])

    const createDataSetToDisplay = (dataToShow) => {
        return ({
                labels: ['Fish', 'Chicken', 'Meat', 'Vegan'],
                datasets: [{
                    label: 'Meals Sold in Quartal',
                      data: dataToShow,
                      borderWidth: 1,
                      backgroundColor: ['black', 'red', 'blue', 'yellow'],
                      borderColor: ['white'],
                    }]
        })
    }

    if (isLoadingMenuData) {
        return ( 
            <div>Is Loading...</div>
        )
    }

      const options = {
        aspectRatio: 1,
        responsive: true,
        cutout: '40%',
        radius: '90%',
    }

    const handleRestaurantChange = (event) => {
        console.log(event.currentTarget.value)
        setSelectedRestaurant(event.currentTarget.value)
    }

    const handleQuartalChange = (event) => {
        setSelectedQuartal(event.currentTarget.value)
    }  
    return (
        <>
            <AuthenticatedTemplate>
            <div className="cell p-6 m-6">
            <div className="p-6 m-6"> 
                <h5 className="title is-5" id="title-of-data-2">{titleForData}</h5>
                <Doughnut options={options} data={dataToDisplay}></Doughnut>           
            </div>
            <div className="buttons">
                { restaurants.map((restaurant, i) => {
                        return (
                      <button className='button is-link' key={i} value={restaurant} onClick={handleRestaurantChange}>{restaurant}</button>                                
                      )
                   })}                            
            </div>
            <div className="buttons">
            { quartals.map((quartal, i) => {
                return (
                  <button className='button is-link' key={i} value={quartal} onClick={handleQuartalChange}>{quartal}</button>                                
                  )
                })}                            
            </div>                               
            </div>
            </AuthenticatedTemplate>
            <UnauthenticatedTemplate>
                <Unauthorized></Unauthorized>
            </UnauthenticatedTemplate>
        </>


    )
}

export default MenuChart