import React from 'react';

const About: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow container mx-auto p-4 text-center">
        <h1 className="text-3xl font-bold mb-4">Sobre Nós</h1>
        <p className="text-lg">Esta é a página sobre a nossa aplicação.</p>
      </main>
    </div>
  );
};

export default About;