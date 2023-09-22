import React, { useEffect } from 'react'
import styles from './message.module.css';
import Portal from '../../helpers/portal';
import { useDispatch } from 'react-redux';
import { notificationActions } from '../../store/notification/notificationSlice';

const Message = ({ message }) => {
    const dispatch = useDispatch()

    useEffect(() => {
        if (message) {
            setTimeout(() => {
                dispatch(notificationActions.setMessage(''))
            }, 3000)
        }
    }, [message])

    // const bodyTag = document.getElementsByTagName("body")
    // bodyTag.style.overflow = 'hidden'
    // console.log();

    return (
        <Portal target='body'>
            <div className={styles.overlay}>
                <div className={styles.messageContainer}>
                    <div className={styles.message}>
                        {message}
                    </div>
                </div>
            </div>
        </Portal>
    )
}

export default Message
