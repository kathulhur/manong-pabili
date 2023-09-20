import { FatalErrorBoundary, RedwoodProvider } from '@redwoodjs/web'
import { RedwoodApolloProvider } from '@redwoodjs/web/apollo'
import { InMemoryCache, ApolloClient } from '@apollo/client'
import FatalErrorPage from 'src/pages/FatalErrorPage'
import Routes from 'src/Routes'

import './scaffold.css'
import { AuthProvider, useAuth } from './auth'

import './index.css'
import { Toaster } from '@redwoodjs/web/toast'

export const cache = new InMemoryCache({
    typePolicies: {},
})

const App = () => (
    <FatalErrorBoundary page={FatalErrorPage}>
        <RedwoodProvider titleTemplate="%PageTitle | %AppTitle">
            <AuthProvider>
                <RedwoodApolloProvider
                    useAuth={useAuth}
                    graphQLClientConfig={{
                        cacheConfig: {
                            typePolicies: {
                                User: {
                                    fields: {
                                        productsOffered: {
                                            merge(existing = [], incoming) {
                                                return incoming
                                            },
                                        },
                                        mapVendors: {
                                            merge(existing = [], incoming) {
                                                return incoming
                                            },
                                        },
                                        featuredImages: {
                                            merge(existing = [], incoming) {
                                                return incoming
                                            },
                                        },
                                    },
                                },
                                Query: {
                                    fields: {
                                        mapVendors: {
                                            merge(existing = [], incoming) {
                                                return incoming
                                            },
                                        },
                                    },
                                },
                            },
                        },
                    }}
                >
                    <Toaster />
                    <Routes />
                </RedwoodApolloProvider>
            </AuthProvider>
        </RedwoodProvider>
    </FatalErrorBoundary>
)

export default App
