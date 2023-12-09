import './index.css';

import React from 'react';
import { render } from 'react-dom';

import { library } from '@fortawesome/fontawesome-svg-core';
import {
    faBars,
    faHome,
} from '@fortawesome/free-solid-svg-icons';

import { App } from '@/components/App';

library.add(faBars, faHome);

render(<App />, document.getElementById('app'));
