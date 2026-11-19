import './home.css';
import Poster from '../poster/Poster';
import Services from '../service/Services';
import Partner from '../partner/partner';
import Reviews from '../reviews/Reviews';
import OtherServices from '../otherServices/OtherServices';
import MySls from '../mysls/MySls.jsx';



function Home() {
  return (
    <div className="home">
      <Poster />
      <Services />
      <MySls />
      <Partner />
      <Reviews />
      <OtherServices />
    </div>
  );
}

export default Home;
