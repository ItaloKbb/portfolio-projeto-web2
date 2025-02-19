import React from 'react';
import resumeImage from '../../assets/img/Resume-cuate.svg'; // Importe a imagem
import { User } from "../../types/User";

interface HeroSectionProps {
    users: User[];
}

const HeroSection: React.FC<HeroSectionProps> = ({ users }) => {
    return (
        <section id="hero" className="hero section">
            <div className="container" data-aos="fade-up" data-aos-delay="100">
                <div className="row align-items-center">
                    <div className="col-lg-6">
                        <div className="hero-content" data-aos="fade-up" data-aos-delay="200">
                            <div className="company-badge mb-4">
                                <i className="bi bi-gear-fill me-2"></i>
                                {users.length > 0 ? users[0].area : "Área não disponível"}
                            </div>
                            <h1 className="mb-4">
                                {users.length > 0 ? users[0].nome : "Nome não disponível"} <br />
                                <i className="bi bi-geo-alt"></i> {users.length > 0 ? users[0].nacionalidade : "Nacionalidade não disponível"} <br />
                            </h1>
                            <p className="mb-4 mb-md-5">
                                {users.length > 0 ? users[0].bio : "Bio não disponível"}
                            </p>
                            <div className="hero-buttons">
                                <a href="#about" className="btn btn-primary me-0 me-sm-2 mx-1">Get Started</a>
                                <a href="https://www.youtube.com/watch?v=Y7f98aduVJ8" className="btn btn-link mt-2 mt-sm-0 glightbox">
                                    <i className="bi bi-play-circle me-1"></i>
                                    Play Video
                                </a>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-6">
                        <div className="hero-image" data-aos="zoom-out" data-aos-delay="300">
                            <img src={resumeImage} alt="Hero Image" className="img-fluid" />
                        </div>
                    </div>
                    <div className="row stats-row gy-4 mt-5" data-aos="fade-up" data-aos-delay="500">
                        {users.length > 0 && Array.isArray(users[0].conhecimentos) && users[0].conhecimentos.length > 0 ? users[0].conhecimentos.map((conhecimento, index) => (
                            <div key={index} className="col-lg-3 col-md-6">
                                <div className="stat-item">
                                    <div className="stat-icon">
                                        <i className="bi bi-trophy"></i>
                                    </div>
                                    <div className="stat-content">
                                        <h4>{conhecimento.titulo}</h4>
                                        <p className="mb-0">{conhecimento.nivel}</p>
                                    </div>
                                </div>
                            </div>
                        )) :
                            <div className="col-lg-3 col-md-6">
                                <div className="stat-item">
                                    <div className="stat-icon">
                                        <i className="bi bi-emoji-frown"></i>
                                    </div>
                                    <div className="stat-content">
                                        <h4>Por enquanto sem nenhum conhecimento registrado</h4>
                                        <p className="mb-0">...</p>
                                    </div>
                                </div>
                            </div>
                        }
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HeroSection;