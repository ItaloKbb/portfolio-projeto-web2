import React from 'react';

const Contact: React.FC = () => {
  return (
    <section id="contact" className="contact section light-background">

      <div className="container section-title" data-aos="fade-up">
        <h2>Contact</h2>
        <p>Entre em contato comigo através dos dados abaixo.</p>
      </div>

      <div className="container" data-aos="fade-up" data-aos-delay="100">

        <div className="row g-4 g-lg-5">
          <div className="col-lg-5">
            <div className="info-box" data-aos="fade-up" data-aos-delay="200">
              <h3>Informações de contato</h3>
              <div className="info-item" data-aos="fade-up" data-aos-delay="300">
                <div className="icon-box">
                  <i className="bi bi-geo-alt"></i>
                </div>
                <div className="content">
                  <h4>Our Location</h4>
                  <p>A108 Adam Street</p>
                  <p>New York, NY 535022</p>
                </div>
              </div>

              <div className="info-item" data-aos="fade-up" data-aos-delay="400">
                <div className="icon-box">
                  <i className="bi bi-telephone"></i>
                </div>
                <div className="content">
                  <h4>Phone Number</h4>
                  <p>+1 5589 55488 55</p>
                  <p>+1 6678 254445 41</p>
                </div>
              </div>

              <div className="info-item" data-aos="fade-up" data-aos-delay="500">
                <div className="icon-box">
                  <i className="bi bi-envelope"></i>
                </div>
                <div className="content">
                  <h4>Email Address</h4>
                  <p>info@example.com</p>
                  <p>contact@example.com</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;