import './style.css';
import ReactDOM from 'react-dom';
import React from 'react';
import App from './App.js';

const Render = () => {
    return (
        <App />
    )
}

ReactDOM.render(Render(), document.getElementById('react-container'));