import React, { useState } from 'react';
import api from '../services/api';
import Layout from '../components/Layout';
import { useNavigate } from 'react-router-dom';

/* global Swal */

function SearchProximity() {
  const [coordenada_x, setLatitude] = useState('');
  const [coordenada_y, setLongitude] = useState('');
  const [distancia_maxima, setDistanciaMaxima] = useState('');
  const [results, setResults] = useState([]);
  const navigate = useNavigate();

  const handleSearch = async (e) => {
    e.preventDefault();

    const coordenada_x_int = parseFloat(coordenada_x);
    const coordenada_y_int = parseFloat(coordenada_y);
    const distancia_maxima_int = parseFloat(distancia_maxima);

    if (isNaN(coordenada_x_int) || isNaN(coordenada_y_int) || isNaN(distancia_maxima_int)) {
      Swal.fire({
        title: 'Aviso',
        text: 'Por favor, insira valores válidos para todas as coordenadas e distância.',
        icon: 'warning',
        confirmButtonText: 'OK'
      });
      return;
    }

    try {
      const response = await api.get('/poi/buscar/', {
        params: {
          coordenada_x: coordenada_x_int,
          coordenada_y: coordenada_y_int,
          distancia_maxima: distancia_maxima_int
        }
      });
      setResults(response.data);

      if (response.data.length === 0) {
        Swal.fire({
          title: 'Sem resultados',
          text: 'Nenhum ponto de interesse encontrado na área especificada.',
          icon: 'info',
          confirmButtonText: 'OK'
        });
      }
    } catch (error) {
      console.error('Erro ao buscar POIs próximos:', error);

      Swal.fire({
        title: 'Erro',
        text: 'Falha ao buscar pontos de interesse. Tente novamente mais tarde.',
        icon: 'error',
        confirmButtonText: 'OK'
      });
    }
  };

  return (
    <Layout>
      <div className="col-md-12">
        <div className="row">
          <div className="custom-title-flag text-center">
            <h1 className="h-custom">Buscar por Proximidade</h1>
          </div>
          <form onSubmit={handleSearch}>
            <div className="mb-3">
              <label className="form-label">Coordenada X:</label>
              <input
                type="text"
                className="form-control"
                value={coordenada_x}
                onChange={(e) => setLatitude(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Coordenada Y:</label>
              <input
                type="text"
                className="form-control"
                value={coordenada_y}
                onChange={(e) => setLongitude(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Distância Máxima (em metros):</label>
              <input
                type="text"
                className="form-control"
                value={distancia_maxima}
                onChange={(e) => setDistanciaMaxima(e.target.value)}
                required
              />
            </div>
            <div className="alinha-direita mt-3">
              <button type="submit" className="btn btn-primary me-2">Buscar</button>
              <button type="button" className="btn btn-secondary" onClick={() => navigate('/')}>Voltar</button>
            </div>
          </form>

          <div className="custom-title-result text-center">
            <h4 className="h4-custom mt-4">Resultados</h4>
          </div>
          <ul className="list-group">
            {results.map(result => (
              <li key={result.id} className="list-group-item">
                {result.nome} - {result.coordenada_x}, {result.coordenada_y}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Layout>
  );
}

export default SearchProximity;
