import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import { Button } from 'Base';

import styles from './styles.css';

class Modal extends PureComponent {
    static Content({ children }) {
        return <div className={styles.content}>{children}</div>;
    }

    render() {
        const { caption, isOpen, children, onAccept, acceptButtonText } = this.props;

        if (!isOpen) return null;

        return (
            <>
                <div className={styles.overlay} />
                <div className={styles.modal}>
                    {caption && <div className={styles.caption}>{caption}</div>}
                    {children}
                    <div className={styles.buttons}>
                        <Button text={acceptButtonText || 'Ок'} onClick={onAccept} />
                    </div>
                </div>
            </>
        );
    }
}

Modal.propTypes = {
    caption: PropTypes.string,
    isOpen: PropTypes.bool,
    children: PropTypes.element,
    onAccept: PropTypes.func,
    acceptButtonText: PropTypes.string,
};

export default Modal;
