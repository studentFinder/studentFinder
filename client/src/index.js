import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import 'bootstrap/dist/css/bootstrap.css';
import App from './App';
import { AuthErrorEventBus, AuthProvider } from './context/AuthContent';

import { BrowserRouter } from "react-router-dom";
import HttpClient from './network/http';
import DataService from './service/data';
import AuthService from './service/auth';
import TokenStorage from './db/token';

const baseURL = process.env.REACT_APP_BASE_URL;
const tokenStorage = new TokenStorage();
const authErrorEventBus = new AuthErrorEventBus();
const httpClient = new HttpClient(baseURL, authErrorEventBus);
const authService = new AuthService(httpClient, tokenStorage);
const dataService = new DataService(httpClient, tokenStorage);


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    
      <AuthProvider authService={authService} authErrorEventBus={authErrorEventBus}>
        
        <BrowserRouter>
          <App dataService={dataService}/>
        </BrowserRouter>
      </AuthProvider>
  </React.StrictMode>
  
);


