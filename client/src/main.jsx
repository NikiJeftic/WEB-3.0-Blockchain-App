import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'

//importing Tranaction Provider
import {TransactionProvider} from './context/TransactionContext'; 

ReactDOM.createRoot(document.getElementById('root')).render(
  //Wrapping application with Transaction provider
  <TransactionProvider>
    
    <React.StrictMode>
    <App />
    </React.StrictMode>
  
  </TransactionProvider>
  
)
