import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import './ListEmails.css';

function ListEmails() {
  const navigate = useNavigate();

  const [filters, setFilters] = useState({
    linkOrder: '',
    emailStatus: '',
    cargo: '',
    status: '',
    linkSearch: ''
  });

  const [filteredEmails, setFilteredEmails] = useState([]);

  // Simulação de dados
  const emails = [
    { id: 1, link: '@oficialjsl', email: 'contato@jsl.com.br', cargo: 'Motorista', emailEnviado: 'Sim', status: 'Ativo' },
    { id: 2, link: '@evo.solutionstec', email: 'comercial@evosolutionstec.com.br', cargo: 'Tecnico T.I', emailEnviado: 'Não', status: 'Inativo' },
    // Mais dados...
  ];

  // Filtragem com useMemo para evitar re-renders desnecessários
  const filteredEmailsMemo = useMemo(() => {
    let filtered = emails;

    if (filters.linkSearch) {
      filtered = filtered.filter(email => email.link.includes(filters.linkSearch));
    }

    if (filters.emailStatus) {
      filtered = filtered.filter(email => email.emailEnviado === (filters.emailStatus === 'yes' ? 'Sim' : 'Não'));
    }

    if (filters.cargo) {
      filtered = filtered.filter(email => email.cargo === filters.cargo);
    }

    if (filters.status) {
      filtered = filtered.filter(email => email.status === (filters.status === '1' ? 'Ativo' : 'Inativo'));
    }

    if (filters.linkOrder === 'az') {
      filtered.sort((a, b) => a.link.localeCompare(b.link));
    } else if (filters.linkOrder === 'za') {
      filtered.sort((a, b) => b.link.localeCompare(a.link));
    }

    return filtered;
  }, [filters, emails]);

  useEffect(() => {
    setFilteredEmails(filteredEmailsMemo);
  }, [filteredEmailsMemo]);

  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  const handleBackButtonClick = () => {
    navigate('/');
  };

  return (
    <div className="list-emails-container">
      <div className="content-wrapper">
        <button className="back-button-list" onClick={handleBackButtonClick}>Voltar</button>
        <h1>Lista de Empresas</h1>
        <div className="filter-section">
          <div className="filter-group">
            <label>Instagram:</label>
            <input
              type="text"
              name="linkSearch"
              value={filters.linkSearch}
              onChange={handleFilterChange}
              placeholder="Digite o Instagram"
            />
          </div>
          <div className="filter-group">
            <label>Já Enviado:</label>
            <select name="emailStatus" value={filters.emailStatus} onChange={handleFilterChange}>
              <option value="">Selecione</option>
              <option value="yes">Sim</option>
              <option value="no">Não</option>
            </select>
          </div>
          <div className="filter-group">
            <label>Cargo:</label>
            <select name="cargo" value={filters.cargo} onChange={handleFilterChange}>
              <option value="">Selecione</option>
              <option value="Advogado">Advogado</option>
              <option value="Médico">Médico</option>
              {/* Outros cargos */}
            </select>
          </div>
          <div className="filter-group">
            <label>Status:</label>
            <select name="status" value={filters.status} onChange={handleFilterChange}>
              <option value="">Selecione</option>
              <option value="1">Ativo</option>
              <option value="0">Inativo</option>
            </select>
          </div>
          <div className="filter-group">
            <label>Ordenar Link:</label>
            <select name="linkOrder" value={filters.linkOrder} onChange={handleFilterChange}>
              <option value="">Selecione</option>
              <option value="az">A-Z</option>
              <option value="za">Z-A</option>
            </select>
          </div>
        </div>

        <div className="grid-section">
          <table className="grid-table">
            <thead>
              <tr>
                <th>Link do Instagram</th>
                <th>Email</th>
                <th>Cargo</th>
                <th>Já Enviado</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredEmails.length > 0 ? (
                filteredEmails.map((email) => (
                  <tr key={email.id}>
                    <td>{email.link}</td>
                    <td>{email.email}</td>
                    <td>{email.cargo}</td>
                    <td>{email.emailEnviado}</td>
                    <td>{email.status}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} style={{ textAlign: 'center' }}>Nenhum resultado encontrado.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default ListEmails;
