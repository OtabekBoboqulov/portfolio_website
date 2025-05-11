import React from "react";
import {
  FaTelegram,
  FaWhatsapp,
  FaFacebookF,
  FaInstagram,
  FaYoutube,
  FaEnvelope,
  FaPhoneAlt,
  FaMapMarkerAlt,
} from "react-icons/fa";
import "../styles/Contact.css";

const Contact = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
  };

  return (
    <section className="contact-section" id="contact">
      <div className="contact-content">
        <div className="contact-left">
          <span className="tag">&lt;Contact&gt;</span>
          <h2>Let's Talk</h2>
          <p>
            if you want know more about <span className="accent">me</span>
          </p>

          <div className="contact-info">
            <div className="info-item">
              <FaEnvelope className="info-icon" />
              <span>shokhrukh.sharipov.2006@gmail.com</span>
            </div>
            <div className="info-item">
              <FaPhoneAlt className="info-icon" />
              <span>+998-91-447-65-08</span>
            </div>
            <div className="info-item">
              <FaMapMarkerAlt className="info-icon" />
              <span>Chilonzor, Tashkent, Uzbekistan</span>
            </div>
          </div>

          <div className="social-links">
            <a href="facebook.com" className="social-link">
              <FaFacebookF />
            </a>
            <a href="https://www.whatsapp.com/" className="social-link">
              <FaWhatsapp />
            </a>
            <a href="https://t.me/D3c0deM3" className="social-link">
              <FaTelegram />
            </a>
            <a
              href="https://www.instagram.com/shokhrukh_108/"
              className="social-link"
            >
              <FaInstagram />
            </a>
            <a href="youtube.com" className="social-link">
              <FaYoutube />
            </a>
          </div>
        </div>

        <div className="contact-right">
          <form onSubmit={handleSubmit}>
            <div className="form-row">
              <input type="text" placeholder="Full Name*" required />
              <input type="email" placeholder="Email Address*" required />
            </div>
            <div className="form-row">
              <input type="tel" placeholder="Phone Number" />
              <input type="text" placeholder="Subject" />
            </div>
            <textarea placeholder="Write your massage*" required></textarea>
            <button type="submit" className="send-message-btn">
              Send Us Message →
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
