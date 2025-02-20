import React from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";

const About: React.FC = () => {
  return (
    <div className="min-vh-100 d-flex flex-column">
      <Container className="flex-grow-1 py-5">
        {/* Cabeçalho */}
        <Row className="text-center mb-4">
          <Col>
            <h1 className="fw-bold">Sobre Nós</h1>
            <p className="lead text-muted">
              Conheça mais sobre a nossa aplicação e o que podemos oferecer!
            </p>
          </Col>
        </Row>

        {/* Seção de Introdução */}
        <Row className="justify-content-center mb-5">
          <Col md={8}>
            <Card className="shadow-lg border-0">
              <Card.Body>
                <Card.Title className="fw-bold">O que fazemos?</Card.Title>
                <Card.Text>
                  Nossa plataforma foi desenvolvida para facilitar a gestão de projetos,
                  colaborando com profissionais e empresas para otimizar processos e
                  aprimorar a eficiência.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* Seção de Recursos */}
        <Row className="g-4 text-center">
          <Col md={4}>
            <Card className="h-100 shadow-sm">
              <Card.Body>
                <i className="bi bi-check-circle-fill text-success fs-1"></i>
                <Card.Title className="mt-3 fw-bold">Facilidade de Uso</Card.Title>
                <Card.Text>
                  Interface intuitiva e simplificada para uma melhor experiência.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card className="h-100 shadow-sm">
              <Card.Body>
                <i className="bi bi-lock-fill text-primary fs-1"></i>
                <Card.Title className="mt-3 fw-bold">Segurança</Card.Title>
                <Card.Text>
                  Dados criptografados e protegidos para garantir sua privacidade.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card className="h-100 shadow-sm">
              <Card.Body>
                <i className="bi bi-speedometer2 text-warning fs-1"></i>
                <Card.Title className="mt-3 fw-bold">Alto Desempenho</Card.Title>
                <Card.Text>
                  Plataforma ágil e otimizada para máxima eficiência e rapidez.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* Seção Call to Action */}
        <Row className="text-center mt-5">
          <Col>
            <h2 className="fw-bold">Quer saber mais?</h2>
            <p className="lead text-muted">
              Entre em contato conosco para descobrir como podemos ajudar o seu negócio!
            </p>
            <Button variant="primary" href="/contato">
              Fale Conosco
            </Button>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default About;