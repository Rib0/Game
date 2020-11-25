import React from 'react';
import { render } from 'react-dom';

import { library } from '@fortawesome/fontawesome-svg-core';
import { faBars, faCheckSquare, faCoffee } from '@fortawesome/free-solid-svg-icons';

import App from 'App';

library.add(faBars, faCoffee);

render(<App />, document.getElementById('app'));
