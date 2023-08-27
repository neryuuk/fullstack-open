import ReactDOM from 'react-dom/client'
import { QueryClient, QueryClientProvider as Provider } from '@tanstack/react-query'
import App from './App'
import './index.css'

ReactDOM
  .createRoot(document.getElementById('root'))
  .render(<Provider client={new QueryClient()}><App /></Provider>)
