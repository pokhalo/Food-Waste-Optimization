import Proportions from '../assets/avg_proportion_sold_meal_types.png'
import StdofMeals from '../assets/std_of_meals.png'
import 'bulma/css/bulma.min.css';

const MainView = ({ predData }) => {


    return (
        <>
    <div className="container is-max-desktop mt-6">
      <div className="notification is-success is-light">
        <h5 className="title is-5" id="title-of-forecast-2">Model Based Estimation of Number of Meals Sold for the Next Wednesday</h5>
        <h5 className="title is-5" id="space-for-forecast">
                                {predData && ( 
                <div className="is-success is-light">{JSON.stringify(predData.content, null, 2)}</div>
                )}
        </h5>
      </div>
    </div>

    <div className="container is-fluid pt-6">
        <div className="container is-max-desktop">
            <h5 className="title is-5" id="title-of-forecast-2">Average Proportions of Meals Sold per Weekday, Sorted by type of Meal</h5>
        </div>
        <img src={Proportions} alt="Chart of average proportions of meals sold per weekday, sorted by type of meal." className="Proportions-image" />
    </div>

    <div className="container is-fluid pt-6">
        <div className="container is-max-desktop">
            <h5 className="title is-5" id="title-of-forecast-2">Average Proportions of Meals Sold per Weekday, Sorted by type of Meal</h5>            
        </div>
        <img src={StdofMeals} alt="Chart of standard deviation of the proportion of meal types sold by weekday, sorted by type of meal." className="Std-image" />
    </div>
    </>

    )
}

export default MainView