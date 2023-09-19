import React from 'react'
import styles from './hero.module.css'
import { getImageUrl } from '../../helpers/utils';

const Hero = () => {
    return (
        <section className={styles.hero}>
            <div>
                <h1>Green CandleStick Token.</h1>
                <p>We call our project with the associated token GCT a smart Meme Coin. On the one hand, our token is a tribute to the green chart candle, which every investor likes to see and what it`s all about. In addition, there is our mascot, the green candle man, who will soon get his own NFT series.</p>
                <button type="submit">Buy Now</button>
            </div>
            <img src={getImageUrl("gcs.png")} alt="" />
        </section>
    )
}

export default Hero
