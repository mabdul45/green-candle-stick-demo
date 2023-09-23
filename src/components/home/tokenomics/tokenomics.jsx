import React from 'react'
import styles from './tokenomics.module.css'
import { getImageUrl } from '../../../helpers/utils';

const Tokenomics = () => {
    return (<>
        <section className={styles.tokenomics} >
            <h1>GCT Tokenomics</h1>
            <img src={getImageUrl("gcstokenomics.png")} alt="" />
        </section>
        <div className={styles.divider}></div>
    </>
    )
}

export default Tokenomics
