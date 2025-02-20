import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate, useSearchParams, useLocation } from "react-router-dom";
import { useFilter } from "../../context/Filter";
import { getToken } from "../../lib/auth";
import { useAuth } from "../../context/AuthContext";

const Navbar: React.FC = () => {
  const { updateFilter } = useFilter();
  const [input, setInput] = useState<string>("");
  const navigate = useNavigate();
  const location = useLocation(); // Detecta mudança de rota
  const [searchParams] = useSearchParams();
  const effectRan = useRef(false);
  const { logout } = useAuth();

  // Estado para verificar se o usuário está logado
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(!!getToken());

  // Efeito para verificar o token ao carregar a página
  useEffect(() => {
    setIsAuthenticated(!!getToken());
  }, []);

  // 🛑 Limpa filtros ao mudar de página via navbar
  useEffect(() => {
    console.log(`Mudança de aba detectada: ${location.pathname}`);
    setInput(""); // Limpa campo de pesquisa
    updateFilter({}); // Reseta filtros globais
  }, [location.pathname]); // Executa sempre que o usuário muda de página

  // Efeito para ler o filtro da URL ao carregar a página
  useEffect(() => {
    if (effectRan.current) return;
    effectRan.current = true;

    const urlFilter = searchParams.get("filter");
    console.log("Inicializando filter...");
    if (urlFilter) {
      const decodedFilter = decodeURIComponent(urlFilter);
      console.log("Carregando filtro: URL filter = " + decodedFilter);
      setInput(decodedFilter);

      const filterData: { id?: number; nome?: string; email?: string } = {};
      if (!isNaN(Number(decodedFilter))) {
        filterData.id = Number(decodedFilter);
      } else if (decodedFilter.includes("@")) {
        filterData.email = decodedFilter;
      } else {
        filterData.nome = decodedFilter;
      }
      console.log(filterData);
      updateFilter(filterData);
    }
  }, [searchParams, updateFilter]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const filterData: { id?: number; nome?: string; email?: string } = {};
    console.log("Iniciando busca...");
    if (input.trim()) {
      if (!isNaN(Number(input))) {
        filterData.id = Number(input);
      } else if (input.includes("@")) {
        filterData.email = input;
      } else {
        filterData.nome = input;
      }

      console.log("Filtros da busca: ");
      console.log(filterData);
      navigate(`?filter=${encodeURIComponent(input)}`);
      updateFilter(filterData);
    } else {
      console.log("Console vazio, busca sem dados...");
      updateFilter({});
    }
  };

  // Função de logout
  const handleLogout = () => {
    logout();
    setIsAuthenticated(false);
    navigate("/login");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          "Web 2"
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link active" aria-current="page" to="/">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/about">
                Sobre
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/projetos">
                Projetos
              </Link>
            </li>
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                href="#"
                id="navbarDropdown"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Edição
              </a>
              <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                <li>
                  <Link className="dropdown-item" to="/cadastro/projetos">
                    Cadastro projetos
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item" to="/cadastro/conhecimentos">
                    Cadastro competencias
                  </Link>
                </li>
                <li>
                  <hr className="dropdown-divider" />
                </li>
                <li>
                  <a className="dropdown-item" href="#">
                    Fim.
                  </a>
                </li>
              </ul>
            </li>
          </ul>

          <form className="d-flex me-3" onSubmit={handleSearch}>
            <input
              className="form-control me-2"
              type="search"
              placeholder="Search"
              aria-label="Search"
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
            <button className="btn btn-outline-success" type="submit">
              Search
            </button>
          </form>

          {/* Botões de Login e Logout */}
          {isAuthenticated ? (
            <button className="btn btn-outline-danger" onClick={handleLogout}>
              Logout
            </button>
          ) : (
            <Link className="btn btn-outline-primary" to="/login">
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;