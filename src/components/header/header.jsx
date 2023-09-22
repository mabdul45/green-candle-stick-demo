import React from 'react'
import styles from './header.module.css';
import { getImageUrl } from '../../helpers/utils';

import { Web3Button, Web3NetworkSwitch } from '@web3modal/react'

const Header = () => {

    return (
        <header className={styles.header}>
            <img src={getImageUrl("gcslogo.png")} alt="dvsr" />
            <nav>
                <ul>
                    <li><a href="#">Stake GTC</a> </li>
                    <li><a href="#">About GTC</a></li>
                    <li><a href="#">Tokenomics</a></li>
                </ul>
                <Web3Button styles={{ overflow: 'hidden' }} icon='hide' label="Connect Wallet" />
            </nav>
        </header >
    )
}

export default Header
