import React from 'react'
import { getImageUrl } from '../../helpers/utils';
import styles from './about.module.css'

const About = () => {
    return (<>
        <section className={styles.about}>
            <div>
                <h1>Green Candle token is defining DeFi on BSC Chain</h1>
                <p>However, our token (GCT) also has a great utility! We use the profits from the token sale (ICO) and the fees to participate in major launchpads and have a very high tier level. In turn, we use the profits from the launchpads to buy back and burn our own token. So, our token represents a share of the largest launchpads in the entire crypto market.</p>
                <button type='submit' >Buy Now</button>
            </div>
            <img src={getImageUrl("gcs.png")} alt="" />
        </section>
        <div className={styles.divider}></div>
    </>
    )
}

export default About
