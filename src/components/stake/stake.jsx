import React, { useEffect, useState } from 'react'
import styles from './stake.module.css';
import { getImageUrl } from '../../helpers/utils';
import { getAPR, getDaily, getDistributedRewards, getGCSBalance, getUserDetails, handleStakingApproval, submitStake, submitUnStake, checkApproved, handleClaim } from './helper'
import { useDispatch, useSelector } from 'react-redux';

import { useAccount, useNetwork } from 'wagmi'
import numberWithCommas from '../../helpers/commaSeperator';

const Stake = () => {
    const [stakeVal, setStakeVal] = useState(500)
    const [unStakeVal, setUnStakeVal] = useState(1)
    const [approved, setApproved] = useState(false)
    const [userDetails, setUserDetails] = useState({
        stakedAmount: 0,
        totalClaimed: 0,
        lastReward: 0,
        claimable: 0,
    })
    const [rewards, setRewards] = useState(0)
    const [APR, setAPR] = useState(19.3)
    const [daily, setDaily] = useState(0)
    const [GCSBalance, setGCSBalance] = useState(0)

    const { address, isConnected } = useAccount()
    const { chain } = useNetwork()

    const dispatch = useDispatch()
    const { message } = useSelector((state) => state.notification);


    useEffect(() => {
        (async function () {
            setStakeVal(500);
            setUnStakeVal(1);
            if (isConnected && chain.id == 56) {
                await checkApproved(address, setApproved);
                await getDistributedRewards(setRewards);
                await getGCSBalance(address, setGCSBalance);
                await getDaily(setDaily);
                await getAPR(daily, setAPR, setUserDetails);
            }
        })()

    }, [isConnected, address, daily, message, chain.id])

    useEffect(() => {
        const interval = setInterval(async () => {
            isConnected && chain.id == 56 && await getUserDetails(address, setUserDetails)
        }, 3000);

        return () => clearInterval(interval)
    }, [isConnected, address, chain.id])

    return (
        <section className={styles.stake}>

            <div className={styles.background} >
                {!isConnected || chain?.id !== 56 ?
                    <div className={styles.overlay}>
                        {isConnected ? null : <p>Connect Your Wallet To Continue</p>}
                        {isConnected && chain.id !== 56 ? <p>Switch Network To Start Staking</p> : null}
                    </div> : null
                }
                <div className={styles.backgroundGradient}>

                    <button type="submit" onClick={(e) => handleClaim(e, dispatch)} className={styles.claim}>CLaim {numberWithCommas(userDetails.claimable)} GCT </button>

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
                            <p>{numberWithCommas(rewards)}</p>
                            <div>
                                <img src={getImageUrl("gcsstake.png")} alt="" />
                                <p>25,000 GCT / DAY</p>
                            </div>
                            <p>{numberWithCommas(APR)}%</p>
                        </div>
                    </div>

                    <div className={styles.forms}>

                        <form onSubmit={approved ? (e) => submitStake(e, dispatch, stakeVal, GCSBalance) : (e) => handleStakingApproval(e, dispatch, setApproved)} action="">
                            <label htmlFor="">GCT in wallet: {numberWithCommas(GCSBalance)}</label>
                            <input type="number" value={stakeVal} onChange={(e) => setStakeVal(e.target.val)} id='stake' />
                            <button type='submit'> {approved ? 'Stake' : 'Approve'}</button>
                        </form>

                        <form onSubmit={approved ? (e) => submitUnStake(e, dispatch, userDetails, unStakeVal) : (e) => handleStakingApproval(e, dispatch, setApproved)} action="">
                            <label htmlFor="unstake">GCT Staked: {numberWithCommas(userDetails.stakedAmount)}</label>
                            <input type="number" value={unStakeVal} onChange={(e) => setUnStakeVal(e.target.val)} name="" id="unstake" />
                            <button type='submit' >{approved ? "UnStake" : "Approve"}</button>
                        </form>

                    </div>
                </div>
            </div>
        </section >
    )
}

export default Stake
