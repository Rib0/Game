import './index.css';

import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';

import MainView from './components/Views/MainView';
import store from './store/store';

if (_ENV !== 'production') {
    const container = document.getElementById('app');
    const root = createRoot(container);

    root.render(
        <div style={{ backgroundColor: 'black', width: '100vw', height: '100vh', margin: 0, backgroundSize: 'cover' }}>
            <Provider store={store}>
                <MainView />
            </Provider>
        </div>
    )
}