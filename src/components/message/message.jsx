import React, { useEffect } from 'react'
import styles from './message.module.css';
import Portal from '../../helpers/portal';
import { useDispatch } from 'react-redux';
import { notificationActions } from '../../store/notification/notificationSlice';
import Loader from '../loader/loader';

const Message = ({ message, loading, notify }) => {
    const dispatch = useDispatch()
    const htmlTag = document.documentElement

    useEffect(() => {
        if (message) {
            setTimeout(() => {
                dispatch(notificationActions.setMessage(''))
                dispatch(notificationActions.setLoading(false))
                dispatch(notificationActions.setNotify(false))
                htmlTag.classList.remove('overlay')
            }, 3000)
        }
    }, [message, loading, dispatch])

    if (notify) {
        htmlTag.classList.add('overlay')
    }

    let Message =
        <div className={styles.messageContainer}>
            <div className={styles.message}>
                <p>{message}</p>
                <div className={styles.linearactivity}>
                    <div className={styles.indeterminate}></div>
                </div>
            </div>
        </div>

    return (
        <Portal target='body'>
            <div className={styles.overlay}>
                {loading && <Loader> </Loader>}
                {message !== '' && Message}
            </div>
        </Portal>
    )
}

export default Message
