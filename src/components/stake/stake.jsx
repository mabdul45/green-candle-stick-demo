import React from 'react'
import styles from './stake.module.css';
import { getImageUrl } from '../../helpers/utils';

const Stake = () => {
    return (
        <section className={styles.stake}>
            <div className={styles.overlay}>
                <p>Connect Your Wallet To Continue</p>
            </div>
            <div className={styles.background} >
                <div className={styles.backgroundGradient}>

                    <button type="submit" className={styles.claim}>CLaim 0 GCT </button>

                    <div className={styles.stakeHeader}>
                        <div className={styles.title}>
                            <p>Stake</p>
                            <p>Distributed GCT</p>
                            <p>Rewards</p>
                            <p>APR</p>
                        </div>

                        <div className={styles.details}>
                            <div>
                                <img src={getImageUrl("gcsstake.png")} alt="" />
                                <p>GCT</p>
                            </div>
                            <p>0</p>
                            <div>
                                <img src={getImageUrl("gcsstake.png")} alt="" />
                                <p>25,000 GCT / DAY</p>
                            </div>
                            <p>19.3%</p>
                        </div>
                    </div>

                    <div className={styles.forms}>
                        <form action="">
                            <label htmlFor="">GCT in wallet: 0</label>
                            <input type="text" value={'500'} id='stake' />
                            <button type='submit'>Stake</button>
                        </form>
                        <form action="">
                            <label htmlFor="unstake">GCT Staked: 0</label>
                            <input type="text" value={'1'} name="" id="unstake" />
                            <button type='submit' >UnStake</button>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Stake
