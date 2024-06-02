import Header from './components/Header';
import Footer from './components/Footer';
import Sidebar from './components/Sidebar'

const Home = () => {
    return (
        <div>
            <Header title="Admin Panel" showNotifications={false} />
            <Sidebar/>
            <Footer/>
        </div>
    )
}

export default Home;