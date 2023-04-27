import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import { FpjsProvider } from '@fingerprintjs/fingerprintjs-pro-react'

ReactDOM.render(
  <FpjsProvider
    loadOptions={{
      apiKey: process.env.REACT_APP_FPJS_API_KEY,
      region: process.env.REACT_APP_FPJS_API_REGION || undefined,
    }}
  >
    <App />
  </FpjsProvider>,
  document.getElementById('root')
)
