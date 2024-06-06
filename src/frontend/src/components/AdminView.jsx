import { AuthenticatedTemplate, UnauthenticatedTemplate } from '@azure/msal-react'
import Unauthorized from './Unauthorized'

const AdminView = () => {

    return (
        <div>
            <AuthenticatedTemplate>
                <p>Admin view</p>
            </AuthenticatedTemplate>
            <UnauthenticatedTemplate>
                <Unauthorized></Unauthorized>
            </UnauthenticatedTemplate>
        </div>
    )
}

export default AdminView