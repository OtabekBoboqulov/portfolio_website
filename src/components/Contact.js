import React, { useEffect, useRef } from "react";
import "../styles/Contact.css";
import {
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaGithub,
  FaLinkedin,
} from "react-icons/fa";

const Contact = ({ profileData }) => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      {
        threshold: 0.2,
        rootMargin: "-50px",
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, [sectionRef]); // Added sectionRef as a dependency

  return (
    <div className="contact-section" id="contact" ref={sectionRef}>
      <div className="contact-content">
        <div className="contact-left">
          <span className="tag">&lt;Get in Touch/&gt;</span>
          <h2>Let's Build Something</h2>
          <p>
            Together<span className="accent">.</span>
          </p>

          <div className="contact-info">
            <div className="info-item">
              <FaEnvelope className="info-icon" />
              <span>{profileData.email}</span>
            </div>
            <div className="info-item">
              <FaPhone className="info-icon" />
              <span>{profileData.phone}</span>
            </div>
            <div className="info-item">
              <FaMapMarkerAlt className="info-icon" />
              <span>{profileData.location}</span>
            </div>
          </div>

          <div className="social-links">
            <a
              href={profileData.github}
              target="_blank"
              rel="noopener noreferrer"
              className="social-link"
            >
              <FaGithub />
            </a>
            <a
              href={profileData.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="social-link"
            >
              <FaLinkedin />
            </a>
          </div>
        </div>

        <div className="contact-right">
          <form>
            <div className="form-row">
              <input type="text" placeholder="Your Name" />
              <input type="email" placeholder="Your Email" />
            </div>
            <textarea placeholder="Your Message"></textarea>
            <button type="submit" className="send-message-btn">
              Send Message →
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;
