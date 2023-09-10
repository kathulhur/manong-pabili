import { FatalErrorBoundary, RedwoodProvider } from '@redwoodjs/web'
import { RedwoodApolloProvider } from '@redwoodjs/web/apollo'
import { InMemoryCache, ApolloClient } from '@apollo/client'
import FatalErrorPage from 'src/pages/FatalErrorPage'
import Routes from 'src/Routes'

import './scaffold.css'
import { AuthProvider, useAuth } from './auth'

import './index.css'
import { Toaster } from '@redwoodjs/web/toast'


const cache =  new InMemoryCache({
    typePolicies: {
    User: {
        fields: {
            productsOffered: {
                merge(existing = [], incoming) {
                    return incoming;
                },
            },
            mapVendors: {
                merge(existing = [], incoming) {
                    return incoming;
                },
            },
            }
        },
    },
})


const App = () => (
    <FatalErrorBoundary page={FatalErrorPage}>
        <RedwoodProvider titleTemplate="%PageTitle | %AppTitle">
            <AuthProvider>
                <RedwoodApolloProvider useAuth={useAuth} graphQLClientConfig={{ cache }}>
                    <Toaster />
                    <Routes />
                </RedwoodApolloProvider>
            </AuthProvider>
        </RedwoodProvider>
    </FatalErrorBoundary>
)

export default App
