import { assets } from '../../assets/frontend_assets/assets';
import './Footer.css';

export default function Footer() {
  return (
    <div className='footer' id='contact'>
      <div className="footer-left">
        <img src={assets.logo} className='logo' alt="logo" />

        <p>We connect food lovers with the best local kitchens using smart technology for a faster, smoother, and tastier delivery experience.From your favorite restaurants to your home, we deliver happiness in every bite. Order, relax, and enjoy delicious food anytime</p>

        <div className="socials">
            <img src={assets.facebook_icon} className='socials-icon' alt="social" />
            <img src={assets.twitter_icon} className='socials-icon' alt="social" />
            <img src={assets.linkedin_icon} className='socials-icon' alt="social" />
        </div>
      </div>

      <div className="footer-center">
        <h2>Company</h2>

        <ul>
            <li>Home</li>
            <li>About us</li>
            <li>Delivery</li>
            <li>Privacy policy</li>
        </ul>
      </div>

      <div className="footer-right">
        <h2>GET IN TOUCH</h2>

        <div className="contact-details">
            <p>1234567890</p>
            <p>contactus@foodadda.com</p>
        </div>
      </div>

     
    </div>
  )
}
