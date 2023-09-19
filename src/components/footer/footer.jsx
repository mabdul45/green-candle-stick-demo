import React from 'react'
import styles from './footer.module.css';

const Footer = () => {
    return (
        <footer className={styles.footer}>
            <h2>Green Candle Token</h2>
            <ul>
                <li><a href="#">Bscscan</a></li>
                <li><a href="#">Telegram</a></li>
                <li><a href="#">Twitter</a></li>
            </ul>
        </footer>
    )
}

export default Footer
