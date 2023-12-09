import React from 'react';
import { createRoot } from 'react-dom/client';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faSyncAlt, faReply, faPlus, faPalette } from '@fortawesome/free-solid-svg-icons';

import MainView from './components/MainView';

import './wdyr';

if (_ENV !== 'production') {
    const container = document.getElementById('app');
    const root = createRoot(container);

    root.render(<MainView />);
}

library.add(faSyncAlt, faReply, faPlus, faPalette);
