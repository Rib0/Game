import React from 'react';

if (_ENV !== 'production') {
    /* eslint-disable-next-line global-require */
    const whyDidYouRender = require('@welldone-software/why-did-you-render'); // eslint-disable-line import/no-extraneous-dependencies
    whyDidYouRender(React, {
        trackAllPureComponents: true,
    });
}
