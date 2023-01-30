import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import { ApiProvider } from '@reduxjs/toolkit/query/react';
import { api } from './components/services/services';

ReactDOM.createRoot(document.getElementById('root')).render(
    <ApiProvider api={api}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </ApiProvider>
);
