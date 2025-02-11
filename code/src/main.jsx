import React from 'react';
import ReactDOM from 'react-dom/client';

import App from '@/app/App.jsx';

import '@/styles/normalize.css';
import '@/styles/custom.css';
import '@/styles/constants.css';

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
);
