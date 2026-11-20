
import './App.css';
import NavMain from './component/nav/navmain/NavMain';
import Home from './component/home/Home';
import Footer from './component/footer/Footer';
import { Routes, Route, useLocation } from 'react-router-dom';
import { lazy, Suspense, useEffect } from 'react';
import { FaPhoneAlt } from 'react-icons/fa';
import GlobalNotification, { NotificationProvider } from './component/globalNotification/GlobalNotification'

const About = lazy(() => import('./pages/about/About'));
const ServicePage = lazy(() => import('./pages/AllServices/ServicePage'));
const Contact = lazy(() => import('./pages/contact/Contact'));
const NotFound = lazy(() => import('./pages/notFound/NotFound'));
const Blog = lazy(() => import('./component/blog/Blog'));
const BlogDetail = lazy(() => import('./component/blog/BlogDetail'));
const DestinationGallery = lazy(() => import('./component/gallery/DestinationGallery'));
const Gallery = lazy(() => import('./component/gallery/Gallery'));
const PrivacyPolicy = lazy(() => import('./component/privacy/PrivacyPolicy'));
const TermsOfService = lazy(() => import('./component/terms/TermsOfService'));

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

          <Suspense fallback={<div className="route-loading" role="status">Loading page...</div>}>
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
              <Route path="contact" element={<Contact />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </div>
        <a className="mobile-call-button" href="tel:+917347673924" aria-label="Call Shabdd Technology">
          <FaPhoneAlt aria-hidden="true" />
        </a>

        <Footer />

      </>
    </NotificationProvider>

    

  );
}

export default App;
