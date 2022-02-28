import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import ModeReducer from "./redux/ModeReducer";
import LocationReducer from "./redux/LocationReducer";
import LocationCards from './redux/LocationCardsReducer';

const store = configureStore({
    reducer: {
        mode: ModeReducer,
        location: LocationReducer,
        locationCards: LocationCards
    },
});


ReactDOM.render(
    <React.StrictMode>
        <Provider store={store}>
            <App />
        </Provider>
    </React.StrictMode>,
    document.getElementById('root')
);
reportWebVitals();
