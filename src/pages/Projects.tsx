import React, { useState, useEffect, useRef } from "react";
import styles from "../styles/home.module.css";
import { getDataApi } from "../lib/apiUtils";
import { useFilter } from "../context/Filter";
import { Projeto } from "../types/Project";
import { useNavigate } from "react-router-dom"; // Adicione useSearchParams

const Projects: React.FC = () => {
  const [projects, setProjects] = useState<Projeto[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { filter, updateFilter } = useFilter();
  const effectRan = useRef(false);
  const navigate = useNavigate();

  useEffect(() => {
    console.log("Evento update projects...");
    const fetchprojects = async () => {
      setIsLoading(true);
      try {
        const queryParams = new URLSearchParams();
        if (filter.nome) queryParams.append("nome", filter.nome);
        console.log("Evento GET API...");
        const queryParamsObject = Object.fromEntries(queryParams.entries());
        console.log(queryParamsObject);
        const response = await getDataApi("projetos", "", queryParamsObject);
        if (response) {
          setProjects(response.data);
        }
      } catch (error) {
        console.error("Erro ao buscar projetos:", error);
        setProjects([]);
      } finally {
        setIsLoading(false);
      }
    };

    const condicionalFetch = async () => {
      if (!effectRan.current && !filter.nome) {
        await fetchprojects();
      } else if (effectRan.current && filter.nome) {
        await fetchprojects();
      } else if (filter.nome === "") {
        await fetchprojects();
      }
    };

    condicionalFetch();
    effectRan.current = true;
  }, [filter]);

  // Função de clique no card do usuário
  const handleProjectClick = (projeto: Projeto) => {
    console.log("Projeto selecionado:", projeto);
    const filterData: { id?: number; nome?: string; email?: string } = {};
    filterData.id = projeto.id;
    filterData.nome = projeto.nome;
    updateFilter(filterData);
    navigate(`/editProject?filter=${encodeURIComponent(projeto.id)}`);
  };

  return (
    <div className="d-flex flex-column min-vh-100">
      <div className={`container ${styles.container}`}>
        {isLoading ? (
          <p className="text-center my-5">Carregando projetos...</p>
        ) : projects.length > 0 ? (
          <div className="row">
            {projects.map((project) => (
              <UserCard
                key={project.id}
                project={project}
                onClick={handleProjectClick}
              />
            ))}
          </div>
        ) : (
          <p className="text-center my-5">Nenhum projeto encontrado</p>
        )}
      </div>
    </div>
  );
};
const UserCard: React.FC<{
  project: Projeto;
  onClick: (project: Projeto) => void;
}> = ({ project, onClick }) => (
  <div className="col-md-4 mb-4">
    <div
      className="card h-100 p-3 card-hover"
      onClick={() => onClick(project)}
      style={{ cursor: "pointer" }}
    >
      <div className="d-flex justify-content-between align-items-center">
        <div className="d-flex align-items-center">
          <div className="icon me-3">
            <i className="fa-solid fa-user fs-4"></i>
          </div>
          <div>
            <h6 className="mb-0 fw-bold">{project.nome}</h6>
            <small className="text-muted">{project.resumo}</small>
          </div>
        </div>
        <a href={project.link_externo}>
          <span className="badge bg-primary">Github</span>
        </a>
      </div>

      <div className="mt-4">
        <div className="mt-3">
          <div className="progress" style={{ height: "8px" }}>
            <div
              className="progress-bar"
              role="progressbar"
              style={{ width: "100%" }}
              aria-valuenow={100}
              aria-valuemin={0}
              aria-valuemax={100}
            ></div>
          </div>
          {Array.isArray(project.palavras_chave) &&
          project.palavras_chave.length > 0
            ? project.palavras_chave.map((palavra, index) => (
                <span key={index} className="badge text-bg-light">
                  {palavra.texto}
                </span>
              ))
            : null}
        </div>
      </div>
    </div>
  </div>
);

export default Projects;
