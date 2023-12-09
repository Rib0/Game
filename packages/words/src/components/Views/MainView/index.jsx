import React, { PureComponent } from 'react';
import { connect, Provider } from 'react-redux';
import PropTypes from 'prop-types';

import { VIEWS } from '@/utils/constants';
import { dropStore } from '@/store/actions';
import store from '@/store/store';
import styles from './styles.css';

class MainView extends PureComponent {
    componentWillUnmount() {
        const { dropStore } = this.props;
        dropStore();
    }

    render() {
        const { view } = this.props;
        const { component: Component, props } = VIEWS[view];

        return (
            <div className={styles.container}>
                <Component {...props} />
            </div>
        );
    }
}

const mapStateToProps = ({ view }) => ({
    view,
});

const mapDispatchToProps = {
    dropStore,
};

MainView.propTypes = {
    view: PropTypes.oneOf(Object.keys(VIEWS)),
    dropStore: PropTypes.func,
};

const ConnectedMainView = connect(mapStateToProps, mapDispatchToProps)(MainView);

export default () => (
    <Provider store={store}>
        <ConnectedMainView />
    </Provider>
)
