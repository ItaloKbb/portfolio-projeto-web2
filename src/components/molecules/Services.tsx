import React from 'react';
import { User } from "../../types/User";

interface ServicesProps {
  users: User[];
}

const Services: React.FC<ServicesProps> = ({ users }) => {
  return (
    <section id="services" className="services section light-background">

      <div className="container section-title" data-aos="fade-up">
        <h2>Projetos</h2>
        <p>Projetos criados por mim para aprofundar e desenvolver meus conhecimentos</p>
      </div>

      <div className="container" data-aos="fade-up" data-aos-delay="100">

        <div className="row g-4">
          {users.length > 0 && Array.isArray(users[0].projetos) && users[0].projetos.length > 0 ? users[0].projetos.map((projeto, index) => (
            <div key={index} className="col-lg-6" data-aos="fade-up" data-aos-delay="100">
              <div className="service-card d-flex">
                <div className="icon flex-shrink-0">
                  <i className="bi bi-box-arrow-up-right"></i>
                </div>
                <div>
                  <h3>{projeto.nome}</h3>
                  <p>{projeto.resumo}</p>
                  <a href={projeto.link_externo} className="read-more">Read More <i className="bi bi-arrow-right"></i></a>
                </div>
              </div>
            </div>
          )) :
            <div className="col-lg-6" data-aos="fade-up" data-aos-delay="100">
              <div className="service-card d-flex">
                <div className="icon flex-shrink-0">
                  <i className="bi bi-box-arrow-up-right"></i>
                </div>
                <div>
                  <h3>Usuario não possui projetos cadastrados no momento</h3>
                  <p>...</p>
                  <a href="/not found" className="read-more">Read More <i className="bi bi-arrow-right"></i></a>
                </div>
              </div>
            </div>
          }
        </div>
      </div>
    </section>
  );
};

export default Services;