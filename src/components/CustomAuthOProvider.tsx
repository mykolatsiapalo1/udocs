import { Auth0Provider } from '@auth0/auth0-react';
import { ReactElement } from 'react';


const CustomAuthOProvider = ({ children }: { children: ReactElement }) => {
    const domain = import.meta.env.VITE_DOMAIN_AUTHO || ""
    const clientId = import.meta.env.VITE_CLIENTID_AUTHO || ""

    return <Auth0Provider
        domain={domain}
        clientId={clientId}
        authorizationParams={{
            redirect_uri: window.location.origin
        }}
    >
        {children}
    </Auth0Provider>
}

export default CustomAuthOProvider;