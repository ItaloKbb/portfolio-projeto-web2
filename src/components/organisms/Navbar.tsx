import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom"; // Adicione useSearchParams
import { useFilter } from "../../context/Filter";

const Navbar: React.FC = () => {
  const { updateFilter } = useFilter();
  const [input, setInput] = useState<string>("");
  const navigate = useNavigate();
  const [searchParams] = useSearchParams(); // Hook para ler query params
  const effectRan = useRef(false); // Controle de execução

  // Efeito para ler o filtro da URL ao carregar a página
  useEffect(() => {
    if (effectRan.current) return; // Já executou? Retorna.
    effectRan.current = true;

    const urlFilter = searchParams.get('filter');
    console.log("Inicializando filter...");
    if (urlFilter) {
      const decodedFilter = decodeURIComponent(urlFilter);
      console.log("Carregando filtro: URL filter = " + decodedFilter)
      setInput(decodedFilter); // Atualiza o input

      // Atualiza o contexto com o filtro da URL
      const filterData: { id?: number; nome?: string; email?: string } = {};
      if (!isNaN(Number(decodedFilter))) {
        filterData.id = Number(decodedFilter);
      } else if (decodedFilter.includes('@')) {
        filterData.email = decodedFilter;
      } else {
        filterData.nome = decodedFilter;
      }
      console.log(filterData);
      updateFilter(filterData);
    }
  });

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const filterData: { id?: number; nome?: string; email?: string } = {};
    console.log('Inciando busca...');
    if (input.trim()) {      
      if (!isNaN(Number(input))) {
        filterData.id = Number(input);
      } else if (input.includes('@')) {
        filterData.email = input;
      } else {
        filterData.nome = input;
      }

      console.log('Filtros da busca: ');
      console.log(filterData);
      navigate(`?filter=${encodeURIComponent(input)}`);
      updateFilter(filterData);
    }else{
      console.log("Console vazio, busca sem dados...");
      filterData.nome = "";
      console.log(filterData);
      updateFilter(filterData);
    }
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
                  <a className="dropdown-item" href="#">
                    Cadastro projeto
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="#">
                    Cadastro competencia
                  </a>
                </li>
                <li>
                  <hr className="dropdown-divider" />
                </li>
                <li>
                  <a className="dropdown-item" href="#">
                    Something else here
                  </a>
                </li>
              </ul>
            </li>
          </ul>

          <form className="d-flex" onSubmit={handleSearch}>
            <input
              className="form-control me-2"
              type="search"
              placeholder="Search"
              aria-label="Search"
              value={input} // Use o valor do contexto
              onChange={(e) => setInput(e.target.value)} // Atualiza o contexto com o valor digitado
            />
            <button className="btn btn-outline-success" type="submit">
              Search
            </button>
          </form>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;