import { AuthenticatedTemplate, UnauthenticatedTemplate } from '@azure/msal-react'
import Unauthorized from './Unauthorized'

const MenuView = () => {

    return (
        <div>
            <AuthenticatedTemplate>
                <p>Menus here</p>
            </AuthenticatedTemplate>
            <UnauthenticatedTemplate>
                <Unauthorized></Unauthorized>
            </UnauthenticatedTemplate>
        </div>
    )
}

export default MenuView