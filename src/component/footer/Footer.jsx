import "./Footer.css";
import { Link } from "react-router-dom";

function Footer() {
    return (
        <footer className="footer">
            <div className="footer-container">
                <div className="footer-brand">
                    <img src="/Logo-white-2.png" alt="Shabdd Innovations" />   {/*/Logo-removebg-preview.png*/}
                    <p className="for-p-tag">
                        Shabdd Innovations is a visionary parent company operating an ecosystem of innovative,
                        market-leading ventures. We’re committed to delivering excellence across technology,
                        travel, events, and personal development. With a focus on transformation, integrity,
                        and boundless possibility, we’re building the future—today.
                    </p>
                </div>

                <div className="footer-column">
                    <h4>Service</h4>
                    <Link to="services/web-development">Web Development</Link>
                    <Link to="services/web-application">Web Application</Link>
                    <Link to="services/digital-marketing">Digital Marketing</Link>
                    <Link to="services/seo">SEO</Link>
                    <Link to="services/meta-ads">Meta ADS</Link>
                    <Link to="services/graphic-designing">Graphic Designin</Link>
                    <Link to="services/youtube-ads">Youtub ADS</Link>
                </div>

                <div className="footer-column">
                    <h4>VENTURES</h4>
   
                    <a href="https://shabddinnovations.in/" target="blank">Shabdd Innovations</a>
                    <a href="https://shabddtravels.in/" target="blank">Shabdd Travels</a>
                    <a href="https://lms.shabddtravels.in/" target="blank">Shabdd Learning Solution</a>
                </div>

                <div className="footer-column">
                    <h4>CONTACT</h4>
                    <p className="for-p-tag"><i class="fa-light fa-phone-arrow-right"></i>+91-9543305791  +91-7347673924 </p>
                    
                    <p className="for-p-tag">+1 (604) 834-0062 </p>
                    <p className="for-p-tag">shabddtechnology@gmail.com</p>
                    <p className="for-p-tag"><strong>Head Office:</strong> #232, 4th Floor, Street 14, Gulab Vatika, Loni Ghaziabad, 201102</p>
                    <p className="for-p-tag"><strong>Branch Office:</strong>  12342 72A Avenue, Surrey, BC V3W 9J6, Canada</p>
                 
                </div>
            </div>

            <div className="footer-bottom">
                <div>© 2026 <span><Link to="">Shabdd Innovations. </Link></span> All rights reserved.</div>
                <div className="footer-bottom-right">
                    <div className="footer-payment">
                        <Link to="/"><img src="/Payment/amazon-pay.png" alt="Amazon Pay" /></Link>
                        <Link to="/"><img src="/Payment/mastercard.png" alt="Mastercard" /></Link>
                        <Link to="/"><img src="/Payment/paypal.png" alt="PayPal" /></Link>
                        <Link to="/"><img src="/Payment/razorpay.png" alt="Razorpay" /></Link>
                        <Link to="/"><img src="/Payment/shop-pay.png" alt="Shop Pay" /></Link>
                         <Link to="/"><img src="/Payment/stripe.png" alt="Stripe" /></Link>
                    </div>
                  
                </div>

                  <div className="footer-policy">
                        <a href="#privacy">Privacy Policy</a>
                        <span>·</span>
                        <Link to="/terms-of-service">Terms of Service</Link>
                    </div>
            </div>
        </footer>
    );
}

export default Footer;
