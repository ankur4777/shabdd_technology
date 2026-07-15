import "./Footer.css";
import { Link } from "react-router-dom";

function Footer() {
    return (
        <footer className="footer">
            <div className="footer-container">
                <div className="footer-brand">
                    <img src="/Logo-removebg-preview.png" alt="Shabdd Innovations" />
                    <p className="for-p-tag">
                        Shabdd Innovations is a visionary parent company operating an ecosystem of innovative,
                        market-leading ventures. We’re committed to delivering excellence across technology,
                        travel, events, and personal development. With a focus on transformation, integrity,
                        and boundless possibility, we’re building the future—today.
                    </p>
                </div>

                <div className="footer-column">
                    <h4>COMPANY</h4>
                    <a href="#home">Home</a>
                    <a href="#about">About Us</a>
                    <a href="#team">Our Team</a>
                    <a href="#contact">Contact Us</a>
                </div>

                <div className="footer-column">
                    <h4>VENTURES</h4>
                    <a href="#technology">Shabdd Technology</a>
                    <a href="#travels">Shabdd Travels</a>
                    <a href="#events">Shabdd Events</a>
                    <a href="#coach">Shabdd Success Coach</a>
                </div>

                <div className="footer-column">
                    <h4>CONTACT</h4>
                    <p className="for-p-tag">+91-9543305791 +91-7347673924</p>
                    <p className="for-p-tag">info@shabddinnovations.in</p>
                    <p className="for-p-tag"><strong>Registered Office:</strong> #232, 4th Floor, Street 14, Gulab Vatika, Loni Ghaziabad, 201102</p>
                 
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
                        <a href="#terms">Terms of Service</a>
                    </div>
            </div>
        </footer>
    );
}

export default Footer;
