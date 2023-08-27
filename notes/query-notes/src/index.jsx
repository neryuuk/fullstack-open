import React from 'react'
import ReactDOM from 'react-dom/client'
import { QueryClient, QueryClientProvider as Provider } from '@tanstack/react-query'
import App from './App'
import './index.css'

const client = new QueryClient()

ReactDOM
  .createRoot(document.getElementById('root'))
  .render(<Provider client={client}><App /></Provider>)
