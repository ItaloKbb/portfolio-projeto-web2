import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { postDataApi } from "../lib/apiUtils";

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    senha: "",
    bio: "",
    emprego: "",
    area: "",
    nacionalidade: "Brasil",
  });
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // Manipula a mudança dos inputs
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Manipula o envio do formulário
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage(null);
    setSuccessMessage(null);

    try {
      const response = await postDataApi("users", formData);

      if (response.success) {
        setSuccessMessage("Cadastro realizado com sucesso! Redirecionando...");
        setTimeout(() => navigate("/login"), 2000); // Redireciona após 2 segundos
      } else {
        setErrorMessage(response.errorMessage || "Erro ao cadastrar. Tente novamente.");
      }
    } catch (error) {
      setErrorMessage("Erro inesperado ao cadastrar. Tente novamente.");
      console.error("Erro ao cadastrar:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="d-flex vh-100 justify-content-center align-items-center bg-light">
      <div className="card p-4 shadow-lg" style={{ width: "400px" }}>
        <h3 className="text-center mb-4">Cadastro</h3>

        {/* Exibição de Erros */}
        {errorMessage && <div className="alert alert-danger text-center">{errorMessage}</div>}

        {/* Exibição de Sucesso */}
        {successMessage && <div className="alert alert-success text-center">{successMessage}</div>}

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="nome" className="form-label">Nome</label>
            <input
              type="text"
              className="form-control"
              id="nome"
              name="nome"
              value={formData.nome}
              onChange={handleChange}
              placeholder="Digite seu nome"
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email</label>
            <input
              type="email"
              className="form-control"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Digite seu email"
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="senha" className="form-label">Senha</label>
            <input
              type="password"
              className="form-control"
              id="senha"
              name="senha"
              value={formData.senha}
              onChange={handleChange}
              placeholder="Digite sua senha"
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="bio" className="form-label">Bio</label>
            <textarea
              className="form-control"
              id="bio"
              name="bio"
              value={formData.bio}
              onChange={handleChange}
              placeholder="Fale um pouco sobre você"
              rows={2}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="emprego" className="form-label">Emprego</label>
            <input
              type="text"
              className="form-control"
              id="emprego"
              name="emprego"
              value={formData.emprego}
              onChange={handleChange}
              placeholder="Onde você trabalha?"
            />
          </div>

          <div className="mb-3">
            <label htmlFor="area" className="form-label">Área de atuação</label>
            <input
              type="text"
              className="form-control"
              id="area"
              name="area"
              value={formData.area}
              onChange={handleChange}
              placeholder="Ex: QA - Teste, Desenvolvimento"
            />
          </div>

          <div className="mb-3">
            <label htmlFor="nacionalidade" className="form-label">Nacionalidade</label>
            <input
              type="text"
              className="form-control"
              id="nacionalidade"
              name="nacionalidade"
              value={formData.nacionalidade}
              onChange={handleChange}
              placeholder="País de origem"
            />
          </div>

          <button type="submit" className="btn btn-primary w-100" disabled={loading}>
            {loading ? "Cadastrando..." : "Cadastrar"}
          </button>
        </form>

        <div className="mt-3 text-center">
          <a href="/login" className="text-decoration-none">Já tem uma conta? Faça login</a>
        </div>
      </div>
    </div>
  );
};

export default Register;