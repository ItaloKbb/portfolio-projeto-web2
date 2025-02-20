import React, { useState, useEffect } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { UserConhecimentos } from "../../types/UserConhecimentos";
import { Conhecimentos } from "../../types/Conhecimentos";
import { getDataApi } from "../../lib/apiUtils";

const Competencias = () => {
  const [competencias, setCompetencias] = useState<UserConhecimentos[]>([]);
  const [conhecimentos, setConhecimentos] = useState<Conhecimentos[]>([]);
  const [userId, setUserId] = useState(0); // Defina dinamicamente se necessário
  const [conhecimentoId, setConhecimentoId] = useState("");
  const [nivel, setNivel] = useState(1);
  const [loading, setLoading] = useState(false);

  // Carregar as competências já cadastradas
  useEffect(() => {
    setUserId(1);

    const fetchCompetencias = async () => {
      setLoading(true);
      try {
        const queryParams = new URLSearchParams();
        console.log("Evento GET API...");
        const queryParamsObject = Object.fromEntries(queryParams.entries());
        console.log(queryParamsObject);

        const response = await getDataApi("conhecimentos", "", queryParamsObject);
        setCompetencias(response.data);
      } catch (error) {
        console.error("Erro ao buscar competências:", error);
      } finally {
        setLoading(false);
      }
    };

    const fetchConhecimentos = async () => {
      try {
        const queryParams = new URLSearchParams();
        if (userId) queryParams.append("userId", String(userId));
        console.log("Evento GET API...");
        const queryParamsObject = Object.fromEntries(queryParams.entries());
        console.log(queryParamsObject);

        const response = await getDataApi("user-conhecimento", "", queryParamsObject);
        setConhecimentos(response.data.data);
      } catch (error) {
        console.error("Erro ao buscar conhecimentos:", error);
      }
    };

    fetchCompetencias();
    fetchConhecimentos();
  }, []);

  // Adicionar nova competência
  const handleAddCompetencia = async () => {
    if (!conhecimentoId || nivel < 1 || nivel > 10) {
      alert("Selecione um conhecimento e um nível válido (1 a 10).");
      return;
    }

    try {
      const response = await axios.post(`${API_URL}/user-conhecimento`, {
        userId,
        conhecimentoId,
        nivel,
      });

      setCompetencias([...competencias, response.data]); // Atualiza a lista com o novo item
      setConhecimentoId("");
      setNivel(1);
    } catch (error) {
      console.error("Erro ao adicionar competência:", error);
    }
  };

  // Remover competência
  const handleDeleteCompetencia = async (id: number) => {
    try {
      await axios.delete(`${API_URL}/user-conhecimento/${id}`);
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
            <button className="btn btn-success w-100" onClick={handleAddCompetencia}>
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
              <li key={item.id} className="list-group-item d-flex justify-content-between align-items-center">
                <div>
                  <strong>{item.conhecimento.titulo}</strong> - Nível {item.nivel}
                </div>
                <button className="btn btn-danger btn-sm" onClick={() => handleDeleteCompetencia(item.id)}>
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