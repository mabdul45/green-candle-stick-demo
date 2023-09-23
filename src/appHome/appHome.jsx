import Header from '../components/header/header'
import Hero from '../components/home/hero/hero'
import Stake from '../components/home/stake/stake'
import About from '../components/home/about/about'
import Tokenomics from '../components/home/tokenomics/tokenomics'
import ProblemWeSolve from '../components/home/problemWeSolve/problemWeSolve'
import Footer from '../components/footer/footer';
import Message from '../components/message/message'
import { useSelector } from 'react-redux';
import { useAccount, useNetwork } from 'wagmi'
import { useEffect } from 'react'
import { switchNetwork } from '@wagmi/core'

const AppHome = () => {

    const { message, loading, notify } = useSelector(state => state.notification)
    const { isConnected } = useAccount()
    const { chain } = useNetwork()

    useEffect(() => {
        if (isConnected && chain.id !== 56) {

            (async function () {
                await switchNetwork({ chainId: 56 })
                console.log('switching');
            })()
        }
    }, [isConnected, chain?.id])

    return (
        <>
            {notify && <Message message={message} loading={loading} notify={notify} />}
            <Header />
            <Hero />
            <Stake />
            <About />
            <ProblemWeSolve />
            <Tokenomics />
            <Footer />
        </>
    )
}

export default AppHome
