import { AuthenticatedTemplate, UnauthenticatedTemplate } from '@azure/msal-react'
import { loginRequest } from '../utils/authConfig.js'
import { Link } from 'react-router-dom'
import 'bulma/css/bulma.min.css'

const Menu = ({ instance }) => {

    const handleLogoutRedirect = () => {
        instance.logoutRedirect().catch((error) => console.log(error))
    }

    const handleLoginRedirect = () => {
      instance.loginRedirect(loginRequest).catch((error) => console.log(error))
  }

    return (
      <>
      <UnauthenticatedTemplate>
        <nav className="navbar" role="navigation" aria-label="main navigation">
            <div className="navbar-brand">
                <div className="p-5">
                    <h2 className="title is-2">Food Waste Optimization</h2>
                    <h4 className="subtitle is-4">AI assisted model to forecast food consumption in YLVA restaurants</h4>             
                </div>
              </div>
            <div className="navbar-start is-right">
                  <div className="navbar-item is-right"></div>
            </div>           
              <div className="navbar-end is-right">
                <div className="navbar-item is-right">
                  <div className="buttons">

                    <button className="button is-light" onClick={handleLoginRedirect}>
                      Log in for YLVA staff members
                   </button>
                  </div>
                </div>
              </div>
        </nav>
      </UnauthenticatedTemplate>
      <AuthenticatedTemplate>
        <nav className="navbar" role="navigation" aria-label="main navigation">
            <div className="navbar-brand">
                <div className="p-5">
                    <h2 className="title is-2">Food Waste Optimization</h2>
                    <h4 className="subtitle is-4">AI assisted model to forecast food consumption in YLVA restaurants</h4>             
                </div>
              </div>
              <div className="navbar-start is-right">
                  <div className="navbar-item is-right"></div>
            </div>           
              <div className="navbar-end is-right">
                <div className="navbar-item is-right">
                  <div className="buttons">
                    <button className="signInButton" onClick={handleLogoutRedirect}>
                    <Link to={`/`} className="button is-light">
                      Sign out
                    </Link>
                   </button>

                  </div>
                </div>
              </div>        
            
        </nav>
        <div className="tabs">
        <ul>
          <li className="is-active"><Link to={`/sales`}>Manager View</Link></li>
          <li><Link to={`/menus`}> Menu Creators View</Link></li>
          <li><Link to={`/upload`}>Data upload</Link></li>
          <li><Link to={`/admin`}>Admin</Link></li>
        </ul>
      </div>
    </AuthenticatedTemplate>
    </>
    )
}

export default Menu