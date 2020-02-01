import React, { PureComponent } from 'react';
import { connect } from 'react-redux';

import { VIEWS } from 'utils/constants';
import MenuView from './MenuView';

class MainView extends PureComponent {
    renderView() {
        const { view } = this.props;
        const currentView = VIEWS[view];

        switch (currentView.type) {
            case 'navigation':
                return () => <MenuView options={currentView.options} />;
            case 'component':
                return () => <currentView.component />;
        }
    }

    render() {
        const Component = this.renderView();

        return <Component />;
    }
}

const mapStateToProps = ({ view }) => ({
    view,
});

export default connect(mapStateToProps)(MainView);
