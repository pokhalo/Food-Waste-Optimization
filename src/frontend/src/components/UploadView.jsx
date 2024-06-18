import { AuthenticatedTemplate, UnauthenticatedTemplate } from '@azure/msal-react'
import Unauthorized from './Unauthorized'

const UploadView = () => {

    return (
        <div>
            <AuthenticatedTemplate>
                <p>Upload</p>
            </AuthenticatedTemplate>
            <UnauthenticatedTemplate>
                <Unauthorized></Unauthorized>
            </UnauthenticatedTemplate>
        </div>
    )
}

export default UploadView