
import './App.css';
import NavMain from './component/nav/navmain/NavMain';
import Home from './component/home/Home';
import Footer from './component/footer/Footer';
import { Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { FaPhoneAlt } from 'react-icons/fa';
import About from './pages/about/About';
import ServicePage from './pages/AllServices/ServicePage';
import Contact from './pages/contact/Contact';
import NotFound from './pages/notFound/NotFound';
import Blog from './component/blog/Blog';
import BlogDetail from './component/blog/BlogDetail';
import DestinationGallery from './component/gallery/DestinationGallery';
import Gallery from './component/gallery/Gallery';
import PrivacyPolicy from './component/privacy/PrivacyPolicy';
import TermsOfService from './component/terms/TermsOfService';
import GlobalNotification, { NotificationProvider } from './component/globalNotification/GlobalNotification'

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
            <Route path="blog" element={<Blog />} />
            <Route path="blog/:slug" element={<BlogDetail />} />
            <Route path="gallery" element={<Gallery />} />
            <Route path="gallery/:slug" element={<DestinationGallery />} />
            <Route path="privacy" element={<PrivacyPolicy />} />
            <Route path="privacy-policy" element={<PrivacyPolicy />} />
            <Route path="terms" element={<TermsOfService />} />
            <Route path="terms-of-service" element={<TermsOfService />} />
            <Route path="contact" element={<Contact/>}/>
            <Route path="terms-of-service" element={<TermsOfService />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
        <a className="mobile-call-button" href="tel:+917347673924" aria-label="Call Shabdd Technology">
          <FaPhoneAlt aria-hidden="true" />
        </a>
  
        <Footer />

        <a class="mobile-call-button" href="tel:+917347673924" aria-label="Call Shabdd Technology"><svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 512 512" aria-hidden="true" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M497.39 361.8l-112-48a24 24 0 0 0-28 6.9l-49.6 60.6A370.66 370.66 0 0 1 130.6 204.11l60.6-49.6a23.94 23.94 0 0 0 6.9-28l-48-112A24.16 24.16 0 0 0 122.6.61l-104 24A24 24 0 0 0 0 48c0 256.5 207.9 464 464 464a24 24 0 0 0 23.4-18.6l24-104a24.29 24.29 0 0 0-14.01-27.6z"></path></svg></a>

        
        </>
    </NotificationProvider>

    

  );
}

export default App;
