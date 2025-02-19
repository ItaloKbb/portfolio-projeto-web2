import React, { useState, useEffect, useRef } from "react";
import styles from "../styles/home.module.css";
import { getDataApi } from "../lib/apiUtils";
import { useFilter } from "../context/Filter";
import { User } from "../types/User";
import {useNavigate } from "react-router-dom"; // Adicione useSearchParams

const Home: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { filter, updateFilter } = useFilter();
  const effectRan = useRef(false);
  const navigate = useNavigate();

  useEffect(() => {
    console.log("Evento update home...");
    const fetchUsers = async () => {
      setIsLoading(true);
      try {
        const queryParams = new URLSearchParams();
        if (filter.id) queryParams.append("id", filter.id.toString());
        if (filter.email) queryParams.append("email", filter.email);
        if (filter.nome) queryParams.append("nome", filter.nome);
        console.log("Evento GET API...");
        const queryParamsObject = Object.fromEntries(queryParams.entries());
        console.log(queryParamsObject);
        const response = await getDataApi("users", "", queryParamsObject);
        if (response) {
          setUsers(response.data);
        }
      } catch (error) {
        console.error("Erro ao buscar usuários:", error);
        setUsers([]);
      } finally {
        setIsLoading(false);
      }
    };

    const condicionalFetch = async () => {
      if (!effectRan.current && !(filter.id || filter.nome || filter.email)) {
        await fetchUsers();
      } else if (effectRan.current && (filter.id || filter.nome || filter.email)) {
        await fetchUsers();
      }else if(filter.nome === ''){
        await fetchUsers();
      }
    };

    condicionalFetch();
    effectRan.current = true;
  }, [filter]);

  // Função de clique no card do usuário
  const handleUserClick = (user: User) => {
    console.log("Usuário selecionado:", user);
    const filterData: { id?: number; nome?: string; email?: string } = {};
    filterData.id = user.id;
    filterData.nome = user.nome;
    filterData.email = user.email;
    updateFilter(filterData);
    navigate(`/layout?filter=${encodeURIComponent(filterData.id)}`);
  };

  return (
    <div className="d-flex flex-column min-vh-100">
      <div className={`container ${styles.container}`}>
      {isLoading ? (
        <p className="text-center my-5">Carregando usuários...</p>
      ) : users.length > 0 ? (
        <div className="row">
          {users.map((user) => (
            <UserCard key={user.id} user={user} onClick={handleUserClick} />
          ))}
        </div>
      ) : (
        <p className="text-center my-5">Nenhum usuário encontrado</p>
      )}
    </div>
    </div>
  );
};
const UserCard: React.FC<{ user: User; onClick: (user: User) => void }> = ({ user, onClick }) => (
  <div className="col-md-4 mb-4">
    <div className="card h-100 p-3 card-hover" onClick={() => onClick(user)} style={{ cursor: "pointer" }}>
      <div className="d-flex justify-content-between align-items-center">
        <div className="d-flex align-items-center">
          <div className="icon me-3">
            <i className="fa-solid fa-user fs-4"></i>
          </div>
          <div>
            <h6 className="mb-0 fw-bold">{user.nome}</h6>
            <small className="text-muted">{user.email}</small>
          </div>
        </div>
        <span className="badge bg-primary">Dev</span>
      </div>

      <div className="mt-4">
        <h5 className="fw-bold">
          {user.area} <br />
          <small className="text-muted">{user.emprego}</small>
        </h5>

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
          <div className="mt-3">
            <span className="text-secondary">
              Nacionalidade: <span className="text-dark">{user.nacionalidade}</span>
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default Home;