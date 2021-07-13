import './wdyr';

import React from 'react';
import { render } from 'react-dom';
import './javascript/polyfills';

import { library } from '@fortawesome/fontawesome-svg-core';
import { faBars, faHome, faSyncAlt, faReply, faPlus, faPalette } from '@fortawesome/free-solid-svg-icons';

import App from 'App';

library.add(faBars, faHome, faSyncAlt, faReply, faPlus, faPalette);

render(<App />, document.getElementById('app'));
