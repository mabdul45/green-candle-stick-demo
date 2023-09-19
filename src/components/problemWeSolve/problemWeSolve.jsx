import React from 'react'
import { getImageUrl } from '../../helpers/utils'
import styles from './problemWeSolve.module.css';

const ProblemWeSolve = () => {
    return (<>
        <section className={styles.problemWeSolve}>
            <img src={getImageUrl("gcs.png")} alt="" />

            <div>
                <h1>What problem do we solve with this?</h1>
                <p>If you want to participate in the major launchpads with a high tier level, you need very high capital (often{">"}50,000$) for each individual launchpad. Very few of us can or want to afford that. However, we as a community and with the help of our token (GCT) can easily solve this problem! Everyone can invest as much as they want in our project and benefit directly from the advantages of the high tier levels! And every time we buy back our token and burn it, we will all see our beloved green candle or the #greencandleman !</p>
                <button type='submit'>Buy Now</button>
            </div>
        </section>
        <div className={styles.divider}></div>
        </>
    )
}

export default ProblemWeSolve
