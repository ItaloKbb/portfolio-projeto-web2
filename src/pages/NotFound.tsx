import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; // Importe o CSS do Bootstrap

const NotFound: React.FC = () => {
  return (
    <div className="d-flex flex-column min-vh-100">
      <main className="d-flex flex-grow-1 justify-content-center align-items-center">
        <div className="text-center">
          <h1 className="display-1 fw-bold">404</h1>
          <p className="lead">Página Não Encontrada</p>
          <p className="text-muted">A página que você está procurando não existe.</p>
        </div>
      </main>
    </div>
  );
};

export default NotFound;