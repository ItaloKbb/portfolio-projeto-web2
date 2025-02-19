import React, { useState, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import TemplateLandingPage from '../components/templates/LandingPage';
import { useFilter } from "../context/Filter";
import { getDataApi } from "../lib/apiUtils";
import { User } from "../types/User";

const LandingPage: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { filter } = useFilter();
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      if (filter.id && filter.id > 0) {
        try {
          setIsLoading(true);
          const queryParams = new URLSearchParams();
          if (filter.id) queryParams.append('id', filter.id.toString());

          const queryParamsObject = Object.fromEntries(queryParams.entries());
          const response = await getDataApi("users", "", queryParamsObject);

          setUsers(response?.data || []);
        } catch (error) {
          console.error("Erro ao buscar usuários:", error);
          setUsers([]);
        } finally {
          setIsLoading(false);
        }
      }
    };
    fetchUsers();
  }, [filter.id]);

  return (
    <div className="index-page">
      {isLoading ? (
        <p className="text-center my-5">Carregando usuários...</p>
      ) : (
        <TemplateLandingPage users={users} />
      )}
    </div>
  );
};

export default LandingPage;