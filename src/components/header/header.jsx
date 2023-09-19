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
                    <li>Stake GTC</li>
                    <li>About GTC</li>
                    <li>Tokenomics</li>
                </ul>
                <Web3Button icon="show" label="Connect Wallet" balance="show" />
                <br />

                <Web3NetworkSwitch />
                <br />
            </nav>
        </header >
    )
}

export default Header
