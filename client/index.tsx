import { createRoot } from 'react-dom/client'
import { BrowserRouter as Router } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from './store'
import './styles/index.css'

import App from './components/App'
import { Auth0Provider } from '@auth0/auth0-react'

const root = createRoot(document.getElementById('app') as HTMLElement)
root.render(
  <Auth0Provider
    domain="subminder-project.au.auth0.com"
    clientId="8hzZDC3vvjh1BLQll44AIKLwDSG0NpGZ"
    redirectUri={window.location.origin}
    audience="https://subminder-api/v1"
  >
    <Provider store={store}>
      <Router>
        <App />
      </Router>
    </Provider>
  </Auth0Provider>
)
