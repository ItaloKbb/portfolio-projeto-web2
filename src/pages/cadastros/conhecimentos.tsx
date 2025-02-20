import React, { useState, useEffect } from "react";
import { getIdUser } from "../../lib/auth";

import "bootstrap/dist/css/bootstrap.min.css";
import { UserConhecimentos } from "../../types/UserConhecimentos";
import { Conhecimento } from "../../types/Conhecimento";
import { getDataApi, postDataApi, deleteDataAPI } from "../../lib/apiUtils";

const Competencias = () => {
  const [competencias, setCompetencias] = useState<UserConhecimentos[]>([]);
  const [conhecimentos, setConhecimentos] = useState<Conhecimento[]>([]);
  const [userId, setUserId] = useState(0); // Defina dinamicamente se necessário
  const [conhecimentoId, setConhecimentoId] = useState("");
  const [nivel, setNivel] = useState(1);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const id: unknown = getIdUser();
    const parsedId = Number(id);

    if (!isNaN(parsedId) && parsedId > 0) {
      setUserId(parsedId);
    }
  }, []);

  useEffect(() => {
    if (userId === 0) return; // Evita chamadas antes do userId ser definido corretamente

    const fetchCompetencias = async () => {
      setLoading(true);
      try {
        console.log("Evento GET API... (Competências)");
        const response = await getDataApi("user-conhecimento", "");

        if (Array.isArray(response.data)) {
          setCompetencias(response.data);
        } else {
          console.warn("Formato inesperado em response.data:", response.data);
        }
      } catch (error) {
        console.error("Erro ao buscar competências:", error);
      } finally {
        setLoading(false);
      }
    };

    const fetchConhecimentos = async () => {
      try {
        console.log("Evento GET API... (Conhecimentos)");
        const queryParams = new URLSearchParams();
        queryParams.append("userId", String(userId));

        // Converte URLSearchParams para um objeto compatível com QueryParams
        const queryParamsObject = Object.fromEntries(queryParams.entries());

        const response = await getDataApi(
          "conhecimentos",
          "",
          queryParamsObject
        );

        if (Array.isArray(response.data)) {
          setConhecimentos(response.data);
        } else {
          console.warn("Formato inesperado em response.data:", response.data);
        }
      } catch (error) {
        console.error("Erro ao buscar conhecimentos:", error);
      }
    };

    fetchCompetencias();
    fetchConhecimentos();
  }, [userId]); // Só executa quando `userId` for atualizado

  // Log para garantir que `conhecimentos` foi atualizado corretamente
  useEffect(() => {
    console.log("Conhecimentos atualizados:", conhecimentos);
  }, [conhecimentos]);

  // Log para garantir que `Competencias` foi atualizado corretamente
  useEffect(() => {
    console.log("Competencias atualizados:", competencias);
  }, [competencias]);

  // Adicionar nova competência
  const handleAddCompetencia = async () => {
    console.log("ID conhecimento: " + conhecimentoId);
    console.log("Nivel conhecimento: " + nivel);
    if (!conhecimentoId || nivel < 1 || nivel > 10) {
      alert("Selecione um conhecimento e um nível válido (1 a 10).");
      return;
    }

    try {
      const novoConhecimento = {
        userId: Number(userId),
        conhecimentoId: Number(conhecimentoId),
        nivel: Number(nivel),
      };
      console.log(
        "Novo conhecimento body:",
        JSON.stringify(novoConhecimento, null, 2)
      );

      const response = await postDataApi(`user-conhecimento`, novoConhecimento);

      console.log("Resultado: " + response);

      setCompetencias([...competencias, response.data as UserConhecimentos]);
      setConhecimentoId("");
      setNivel(1);
    } catch (error) {
      console.error("Erro ao adicionar competência:", error);
    }
  };

  // Remover competência
  const handleDeleteCompetencia = async (id: number) => {
    try {
      await deleteDataAPI(`user-conhecimento/`, String(id));
      setCompetencias(competencias.filter((item) => item.id !== id));
    } catch (error) {
      console.error("Erro ao excluir competência:", error);
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Cadastro de Competências</h2>

      {/* Formulário para adicionar nova competência */}
      <div className="card p-3 mb-4">
        <h5>Adicionar Competência</h5>
        <div className="row">
          <div className="col-md-6">
            <label className="form-label">Conhecimento</label>
            <select
              className="form-select"
              value={conhecimentoId}
              onChange={(e) => setConhecimentoId(e.target.value)}
            >
              <option value="">Selecione um conhecimento</option>
              {conhecimentos.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.titulo}
                </option>
              ))}
            </select>
          </div>
          <div className="col-md-3">
            <label className="form-label">Nível</label>
            <input
              type="number"
              className="form-control"
              value={nivel}
              min="1"
              max="10"
              onChange={(e) => setNivel(Number(e.target.value))}
            />
          </div>
          <div className="col-md-3 d-flex align-items-end">
            <button
              className="btn btn-success w-100"
              onClick={handleAddCompetencia}
            >
              Adicionar
            </button>
          </div>
        </div>
      </div>

      {/* Lista de competências já cadastradas */}
      <div className="card p-3">
        <h5>Competências Cadastradas</h5>
        {loading ? (
          <p>Carregando...</p>
        ) : competencias.length === 0 ? (
          <p className="text-muted">Nenhuma competência cadastrada.</p>
        ) : (
          <ul className="list-group">
            {competencias.map((item) => (
              <li
                key={item.id}
                className="list-group-item d-flex justify-content-between align-items-center"
              >
                <div>
                  <strong>
                    {item.conhecimento
                      ? item.conhecimento.titulo
                      : conhecimentos.find((c) => c.id === item.conhecimentoId)
                          ?.titulo || "Competência não encontrada"}
                  </strong>{" "}
                  - Nível {item.nivel}
                </div>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => handleDeleteCompetencia(item.id)}
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

export default Competencias;
