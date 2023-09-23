import { BigNumber, ethers } from 'ethers'
import { notificationActions } from '../../../store/notification/notificationSlice';
import { GCSCONTRACT, GCSABI, STAKECONTRACT, STAKEABI } from '../../config';


export const valueFee = {
    value: 0,
    gasLimit: 3000000,
};


export function numberToTwoDecimals(num) {
    if (num) {
        var with2Decimals = num.toString().match(/^-?\d+(?:\.\d{0,2})?/)[0];
        return Number(with2Decimals);
    } else {
        return 0;
    }
}

export const handleClaim = async (e, dispatch, userDetails) => {
    e.preventDefault()
    dispatch(notificationActions.setNotify(true))
    if (userDetails.claimable <= 0) {
        dispatch(notificationActions.setMessage('You don\'t have any rewards to claim'))
        return
    }

    if (window.ethereum) {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const getSigner = provider.getSigner();
        const contract = new ethers.Contract(STAKECONTRACT, STAKEABI, getSigner);

        try {
            dispatch(notificationActions.setLoading(true))
            console.log('claiming');
            const response = await contract.claim(valueFee);
            response.wait()
            dispatch(notificationActions.setMessage(`${userDetails.claimable} Rewards Claimed`))
        } catch (error) {
            dispatch(notificationActions.setMessage(error.reason))
        }
    }
}

export const getUserDetails = async (address, setUserDetails) => {
    if (window.ethereum) {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const contract = new ethers.Contract(STAKECONTRACT, STAKEABI, signer);
        try {
            const response = await contract.getUserDetails(address);
            // await response.wait()
            const details = {
                stakedAmount: Number(response[0][0]._hex) * 10 ** -18,
                totalClaimed: response[0][1]._hex,
                lastReward: Number(response[0][2]._hex),
                unStake: Number(response[0][3]._hex),
                claimable: Number(response[1]._hex) * 10 ** -18,
            }
            setUserDetails(details)
        } catch (error) {
            console.log(error);
        }

    }
}

export const getDistributedRewards = async (setRewards) => {
    if (window.ethereum) {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const contract = new ethers.Contract(STAKECONTRACT, STAKEABI, signer);

        try {
            //debugger;
            const response = await contract.totalRewardsDistributed();
            const num = Number(BigNumber.from(`${response._hex}`).toString()) * 10 ** -18;
            setRewards(num);
        } catch (error) {
            console.log("error", error);
        }
    }
};


export const checkApproved = async (address, setApproved) => {
    if (window.ethereum) {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const contract = new ethers.Contract(GCSCONTRACT, GCSABI, signer);

        try {
            //debugger;
            const response = await contract.allowance(address, STAKECONTRACT);
            const user_res = await contract.balanceOf(address);
            const num = Number(BigNumber.from(`${response._hex}`).toString());
            const user_bal = Number(BigNumber.from(`${user_res._hex}`).toString());
            const bal = user_bal > 0 ? user_bal : 1;
            num >= bal ? setApproved(true) : setApproved(false);
        } catch (error) {
            console.log("error", error);
        }
    }
};

export const handleStakingApproval = async (e, dispatch, setApproved) => {
    e.preventDefault()
    dispatch(notificationActions.setNotify(true))
    if (window.ethereum) {
        const provider = new ethers.providers.Web3Provider(window.ethereum)
        const signer = provider.getSigner()
        const contract = new ethers.Contract(GCSCONTRACT, GCSABI, signer)
        try {
            const response = await contract.approve(STAKECONTRACT, "100000000000000000000000000000000", valueFee)
            response.wait()
            setApproved(true)
            dispatch(notificationActions.setMessage('Staking Approved'))
        } catch (error) {
            dispatch(notificationActions.setMessage(error.reason))
        }
    }
}

export const submitStake = async (e, dispatch, stakeVal, GCSBalance) => {
    e.preventDefault();
    const minimum = 1;
    dispatch(notificationActions.setNotify(true))

    if (Number(stakeVal) > Number(GCSBalance) || Number(stakeVal) === 0 || Number(stakeVal) < Number(minimum)) {
        dispatch(notificationActions.setMessage(`You cannot stake this amount ${stakeVal}`))
        return;
    }

    if (window.ethereum) {
        const provider = new ethers.providers.Web3Provider(window.ethereum)
        const signer = provider.getSigner()
        const contract = new ethers.Contract(STAKECONTRACT, STAKEABI, signer)
        try {
            const response = await contract.stake(Math.floor(Number(stakeVal)), valueFee)
            console.log(response, 'stake response');
            await response.wait()
            dispatch(notificationActions.setMessage('Staking Successful'))
        } catch (error) {
            dispatch(notificationActions.setMessage(error.reason))
        }

    }
}

export const submitUnStake = async (e, dispatch, userDetails, unStakeVal) => {
    e.preventDefault()
    dispatch(notificationActions.setNotify(true))

    if (Number(userDetails.stakedAmount) < Number(unStakeVal) || Number(unStakeVal) === 0) {
        dispatch(notificationActions.setMessage(`You cannot unstake this amount ${unStakeVal}`))
        return;
    }

    if (window.ethereum) {
        const provider = new ethers.providers.Web3Provider(window.ethereum)
        const signer = provider.getSigner()
        const contract = new ethers.Contract(STAKECONTRACT, STAKEABI, signer)
        try {
            const response = await contract.unstake(Math.floor(unStakeVal), valueFee)
            await response.wait()
            dispatch(notificationActions.setMessage('Unstaking Successful'))
        } catch (error) {
            dispatch(notificationActions.setMessage(error.reason))
        }

    }
}


export const getDaily = async (setDaily) => {
    if (window.ethereum) {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const contract = new ethers.Contract(STAKECONTRACT, STAKEABI, signer);

        try {
            //debugger;
            const response = await contract.dailyReward();
            const num = Number(BigNumber.from(`${response._hex}`).toString());
            setDaily(num);
        } catch (error) {
            console.log("error", error);
        }
    }
};

export const getAPR = async (daily, setAPR, setUserDetails) => {
    if (window.ethereum) {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const contract = new ethers.Contract(STAKECONTRACT, STAKEABI, signer);

        try {
            //debugger;
            const response = await contract.amountStaked();
            console.log(response, 'response apr');
            const num = Number(BigNumber.from(`${response._hex}`).toString()) * 10 ** -18;
            console.log(Number(BigNumber.from(`${response._hex}`).toString()) * 10 ** -18);
            console.log(num, 'apr num');
            setUserDetails(prev => ({ ...prev, amountStaked: num }));
            const percentage = (1000 / (num + 1000));
            const year = percentage * daily * 365

            if (num > 0) {
                setAPR(numberToTwoDecimals(year / 10));
                console.log(year / 10);
            }

        } catch (error) {
            console.log("error", error);
        }
    }
};

export const getGCSBalance = async (address, setGCSBalance) => {
    if (window.ethereum) {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const contract = new ethers.Contract(GCSCONTRACT, GCSABI, signer);

        try {
            //debugger;
            const response = await contract.balanceOf(address);
            const num = Number(BigNumber.from(`${response._hex}`).toString()) * 10 ** -18;
            setGCSBalance(num);
        } catch (error) {
            console.log("error", error);
        }
    }
};
