import "bootstrap/dist/css/bootstrap.min.css";

const Register = () => {
  return (
    <div className="d-flex vh-100 justify-content-center align-items-center bg-light">
      <div className="card p-4 shadow" style={{ width: "350px" }}>
        <h3 className="text-center mb-4">Cadastro</h3>
        <form>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">
              Nome
            </label>
            <input
              type="text"
              className="form-control"
              id="name"
              placeholder="Digite seu nome"
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <input
              type="email"
              className="form-control"
              id="email"
              placeholder="Digite seu email"
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Senha
            </label>
            <input
              type="password"
              className="form-control"
              id="password"
              placeholder="Digite sua senha"
              required
            />
          </div>
          <button type="submit" className="btn btn-primary w-100">
            Cadastrar
          </button>
        </form>
        <div className="mt-3 text-center">
          <a href="#" className="text-decoration-none">
            Já tem uma conta? Faça login
          </a>
        </div>
      </div>
    </div>
  );
};

export default Register;
