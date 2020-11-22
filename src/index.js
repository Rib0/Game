import React from 'react';
import { render } from 'react-dom';

import { library } from '@fortawesome/fontawesome-svg-core';
import { faBars, faCheckSquare, faCoffee } from '@fortawesome/free-solid-svg-icons';
library.add(faBars, faCoffee);

import App from 'App';

render(<App />, document.getElementById('app'));
