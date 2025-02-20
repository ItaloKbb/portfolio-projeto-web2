import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";

const Login = () => {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await login(email, password);
      setErrorMessage(""); // Limpa a mensagem de erro ao logar com sucesso
    }catch (error: unknown) {
        const errorMessage = (error as Error).message || String(error);
        setErrorMessage(errorMessage);
      }      
  };
  

  return (
    <div className="d-flex vh-100 justify-content-center align-items-center bg-light">
      <div
        className="position-absolute top-0 start-50 translate-middle-x mt-3"
        style={{ width: "350px" }}
      >
        {errorMessage && (
          <div className="alert alert-danger text-center" role="alert">
            {errorMessage}
          </div>
        )}
      </div>
      <div className="card p-4 shadow" style={{ width: "350px" }}>
        <h3 className="text-center mb-4">Login</h3>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <input
              type="email"
              className="form-control"
              id="email"
              placeholder="Digite seu email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary w-100">
            Entrar
          </button>
        </form>
        <div className="mt-3 text-center">
          <a href="/registro" className="text-decoration-none">
            Não tem cadastro?
          </a>
        </div>
      </div>
    </div>
  );
};

export default Login;
