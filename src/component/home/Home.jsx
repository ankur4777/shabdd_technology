import './home.css';
import Poster from '../poster/Poster';
import Services from '../service/Services';
import Partner from '../partner/partner';
import Reviews from '../reviews/Reviews';
import Blog from '../blog/Blog';
import OtherServices from '../otherServices/OtherServices';



function Home() {
  return (
    <div className="home">
      <Poster />
      <Services />
      <Partner />
      <Reviews />
      <Blog/>
      <OtherServices />
    </div>
  );
}

export default Home;
