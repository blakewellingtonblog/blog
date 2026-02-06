import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './styles/universalStyling.css'
import { Provider } from 'react-redux'
import { store } from '@shared/redux/store'

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App />
  </Provider>
)
