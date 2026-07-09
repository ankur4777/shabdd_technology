
import './App.css';
import NavMain from './component/nav/navmain/NavMain';
import Home from './component/home/Home';
import Footer from './component/footer/Footer';
import { Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import About from './pages/about/About';
import ServicePage from './pages/AllServices/ServicePage';
import Contact from './pages/contact/Contact';
import GlobalNotification, { NotificationProvider } from './component/globalNotification/GlobalNotification'
import './typography.css';

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
  }, [pathname]);

  return null;
}

function App() {
  return (
    <NotificationProvider>
      <>
      <NavMain />
        <div className="App">
          <ScrollToTop />
          <GlobalNotification />
          
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="about" element={<About />} />
            <Route path="services/:serviceKey" element={<ServicePage />} />
            <Route path="contact" element={<Contact/>}/>
          </Routes>
        </div>
        <Footer />
      </>
    </NotificationProvider>
  );
}

export default App;
