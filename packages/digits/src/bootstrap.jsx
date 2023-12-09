import React from 'react';
import { createRoot } from 'react-dom/client';

import MainView from './components/MainView';

if (_ENV !== 'production') {
    const container = document.getElementById('app');
    const root = createRoot(container);

    root.render(<MainView />)
}