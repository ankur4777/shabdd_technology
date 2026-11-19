import './home.css';
import Poster from '../poster/Poster';
import Services from '../service/Services';
import Partner from '../partner/partner';
import Reviews from '../reviews/Reviews';
import OtherServices from '../otherServices/OtherServices';
import MySls from '../mysls/MySls.jsx';
import MySlsModule from '../mysls/MySlsModule.jsx';
import ProductShowcase from '../productshowcase/ProductShowcase';
import TrustedPartnersGlobe from '../trustedpartnerglobe/TrustedPartnersGlobe';
import HowWeWork from '../howWeWork/HowWeWork';



function Home() {
  return (
    <div className="home">
      <Poster />
      <Services />
      <MySls />
      <MySlsModule />
      <ProductShowcase />
      <TrustedPartnersGlobe />
      <HowWeWork />
      <Partner />
      <Reviews />
      <OtherServices />
    </div>
  );
}

export default Home;
