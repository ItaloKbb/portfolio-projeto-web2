import React, { useState, useEffect } from "react";
import { getIdUser } from "../../lib/auth";

import "bootstrap/dist/css/bootstrap.min.css";
import { Projeto, PalavraChave } from "../../types/Projeto";
import { getDataApi, postDataApi, deleteDataAPI } from "../../lib/apiUtils";

const Projetos = () => {
  const [projetos, setProjetos] = useState<Projeto[]>([]);
  const [palavrasChave, setPalavrasChave] = useState<PalavraChave[]>([]);
  const [userId, setUserId] = useState(0);
  const [nome, setNome] = useState("");
  const [resumo, setResumo] = useState("");
  const [linkExterno, setLinkExterno] = useState("");
  const [palavrasSelecionadas, setPalavrasSelecionadas] = useState<number[]>(
    []
  );
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null); // Novo estado para armazenar erros da API

  useEffect(() => {
    const id: unknown = getIdUser();
    const parsedId = Number(id);

    if (!isNaN(parsedId) && parsedId > 0) {
      setUserId(parsedId);
    }
  }, []);

  useEffect(() => {
    if (userId === 0) return;

    const fetchProjetos = async () => {
      setLoading(true);
      try {
        console.log("Evento GET API... (Projetos)");
        const response = await getDataApi("projetos", "");

        if (Array.isArray(response.data)) {
          setProjetos(response.data);
        } else {
          console.warn("Formato inesperado em response.data:", response.data);
        }
      } catch (error) {
        console.error("Erro ao buscar projetos:", error);
      } finally {
        setLoading(false);
      }
    };

    const fetchPalavrasChave = async () => {
      try {
        console.log("Evento GET API... (Palavras-Chave)");
        const response = await getDataApi("palavras-chave", "");

        if (Array.isArray(response.data)) {
          setPalavrasChave(response.data);
        } else {
          console.warn("Formato inesperado em response.data:", response.data);
        }
      } catch (error) {
        console.error("Erro ao buscar palavras-chave:", error);
      }
    };

    fetchProjetos();
    fetchPalavrasChave();
  }, [userId]);

  // Adicionar novo projeto
  const handleAddProjeto = async () => {
    setErrorMessage(null); // Zera mensagens de erro antes de tentar enviar

    if (!nome || !resumo || !linkExterno || palavrasSelecionadas.length === 0) {
      setErrorMessage("Preencha todos os campos obrigatórios.");
      return;
    }

    try {
      const novoProjeto = {
        nome,
        resumo,
        link_externo: linkExterno,
        palavras_chave: palavrasSelecionadas,
        users: [userId], // Adiciona o usuário logado ao projeto
      };

      console.log("Novo projeto body:", JSON.stringify(novoProjeto, null, 2));

      const response = await postDataApi("projetos", novoProjeto);

      if (response.success && response.data) {
        setProjetos([...projetos, response.data as Projeto]);
        setNome("");
        setResumo("");
        setLinkExterno("");
        setPalavrasSelecionadas([]);
      } else {
        setErrorMessage(
          response.errorMessage || "Erro desconhecido ao cadastrar projeto."
        );
      }
    } catch (error) {
      console.error("Erro ao adicionar projeto:", error);
      setErrorMessage("Erro interno ao cadastrar projeto.");
    }
  };

  // Remover projeto
  const handleDeleteProjeto = async (id: number) => {
    try {
      await deleteDataAPI(`projetos/`, String(id));
      setProjetos(projetos.filter((item) => item.id !== id));
    } catch (error) {
      console.error("Erro ao excluir projeto:", error);
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Cadastro de Projetos</h2>

      {/* Exibição de Erros */}
      {errorMessage && (
        <div className="alert alert-danger">
          <label className="form-label">
            <strong>Erros:</strong>
          </label>
          <textarea
            className="form-control"
            rows={errorMessage.split("\n").length} // Define altura automática
            readOnly
            value={errorMessage}
          />
        </div>
      )}

      {/* Formulário para adicionar novo projeto */}
      <div className="card p-3 mb-4">
        <h5>Adicionar Projeto</h5>
        <div className="row">
          <div className="col-md-6">
            <label className="form-label">Nome do Projeto</label>
            <input
              type="text"
              className="form-control"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              placeholder="Digite o nome do projeto"
            />
          </div>
          <div className="col-md-6">
            <label className="form-label">Link Externo</label>
            <input
              type="text"
              className="form-control"
              value={linkExterno}
              onChange={(e) => setLinkExterno(e.target.value)}
              placeholder="Digite o link externo"
            />
          </div>
          <div className="col-md-12 mt-2">
            <label className="form-label">Resumo</label>
            <textarea
              className="form-control"
              value={resumo}
              onChange={(e) => setResumo(e.target.value)}
              placeholder="Escreva um resumo do projeto"
            />
          </div>
          <div className="col-md-6 mt-2">
            <label className="form-label">Palavras-Chave</label>
            <select
              multiple
              className="form-select"
              value={palavrasSelecionadas.map(String)}
              onChange={(e) =>
                setPalavrasSelecionadas(
                  Array.from(e.target.selectedOptions, (option) =>
                    Number(option.value)
                  )
                )
              }
            >
              {palavrasChave.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.texto}
                </option>
              ))}
            </select>
          </div>
          <div className="col-md-3 d-flex align-items-end mt-3">
            <button
              className="btn btn-success w-100"
              onClick={handleAddProjeto}
            >
              Adicionar
            </button>
          </div>
        </div>
      </div>

      {/* Lista de projetos cadastrados */}
      <div className="card p-3">
        <h5>Projetos Cadastrados</h5>
        {loading ? (
          <p>Carregando...</p>
        ) : projetos.length === 0 ? (
          <p className="text-muted">Nenhum projeto cadastrado.</p>
        ) : (
          <ul className="list-group">
            {projetos.map((item) => (
              <li
                key={item.id}
                className="list-group-item d-flex justify-content-between align-items-center"
              >
                <div>
                  <strong>{item.nome}</strong> - {item.resumo}
                  <br />
                  <a
                    href={item.link_externo}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {item.link_externo}
                  </a>
                </div>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => handleDeleteProjeto(item.id)}
                >
                  Remover
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Projetos;
