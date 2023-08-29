import { FatalErrorBoundary, RedwoodProvider } from '@redwoodjs/web'
import { RedwoodApolloProvider } from '@redwoodjs/web/apollo'

import FatalErrorPage from 'src/pages/FatalErrorPage'
import Routes from 'src/Routes'

import './scaffold.css'
import { AuthProvider, useAuth } from './auth'

import './index.css'
import { Toaster } from '@redwoodjs/web/toast'

const App = () => (
    <FatalErrorBoundary page={FatalErrorPage}>
        <RedwoodProvider titleTemplate="%PageTitle | %AppTitle">
            <AuthProvider>
                <RedwoodApolloProvider useAuth={useAuth}>
                    <Toaster />
                    <Routes />
                </RedwoodApolloProvider>
            </AuthProvider>
        </RedwoodProvider>
    </FatalErrorBoundary>
)

export default App
