import './home.css';
import Poster from '../poster/Poster';
import Services from '../service/Services';
import Partner from '../partner/partner';
import Reviews from '../reviews/Reviews';
import OtherServices from '../otherServices/OtherServices';
import MySls from '../mysls/MySls';
import MySlsModule from '../mysls/MySlsModule';
import StartProject from '../startProject/StartProject';
import HowWeWork from '../howWeWork/HowWeWork';
import GlobalTeam from '../globalTeam/GlobalTeam';
import TrustedPartnersGlobe from '../trustedpartnerglobe/TrustedPartnersGlobe';



function Home() {
  return (
    <div className="home">
      <Poster />
      <Services />
      <MySls />
      <MySlsModule />
      <StartProject />
      <HowWeWork />
      <GlobalTeam />
      <TrustedPartnersGlobe />
      <Partner />
      <Reviews />
      <OtherServices />
    </div>
  );
}

export default Home;
