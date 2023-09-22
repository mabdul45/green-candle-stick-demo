import Header from '../components/header/header'
import Hero from '../components/hero/hero'
import Stake from '../components/stake/stake'
import About from '../components/about/about'
import Tokenomics from '../components/tokenomics/tokenomics'
import ProblemWeSolve from '../components/problemWeSolve/problemWeSolve'
import Footer from '../components/footer/footer';
import Message from '../components/message/message'
import { useSelector } from 'react-redux';
import { useAccount, useNetwork } from 'wagmi'
import { useEffect } from 'react'
import { switchNetwork } from '@wagmi/core'

const AppHome = () => {

    const { message } = useSelector(state => state.notification)
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
            {message !== '' && <Message message={message} />}
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
