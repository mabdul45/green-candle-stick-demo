import Header from '../components/header/header'
import Hero from '../components/hero/hero'
import Stake from '../components/stake/stake'
import About from '../components/about/about'
import Tokenomics from '../components/tokenomics/tokenomics'
import ProblemWeSolve from '../components/problemWeSolve/problemWeSolve'
import Footer from '../components/footer/footer';

const AppHome = () => {
    return (
        <>
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
