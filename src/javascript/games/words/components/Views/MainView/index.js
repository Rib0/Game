import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { VIEWS } from 'games/words/utils/constants';
import styles from './styles.css';

class MainView extends PureComponent {
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

MainView.propTypes = {
    view: PropTypes.oneOf(Object.keys(VIEWS)),
};

export default connect(mapStateToProps)(MainView);
