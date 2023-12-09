import React from 'react';

import Button from '@/components/Button';

import styles from './styles.css';

export default (props) => {
    const { caption, isOpen, children, onAccept, acceptButtonText } = props;

    if (!isOpen) return null;

    return (
        <>
            <div className={styles.overlay} />
            <div className={styles.modal}>
                {caption && <div className={styles.caption}>{caption}</div>}
                <div className={styles.content}>
                    {children}    
                </div>
                <div className={styles.buttons}>
                    <Button type="styled" text={acceptButtonText || 'Ок'} onClick={onAccept} />
                </div>
            </div>
        </>
    )
}