import React, { useState } from 'react';
import api from '../services/api';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';

/* global Swal */

function LocationForm() {
  const [nome, setName] = useState('');
  const [coordenada_x, setLatitude] = useState('');
  const [coordenada_y, setLongitude] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const coordenada_x_int = parseFloat(coordenada_x);
    const coordenada_y_int = parseFloat(coordenada_y);

    if (isNaN(coordenada_x_int) || isNaN(coordenada_y_int)) {
      Swal.fire({
        title: 'Aviso',
        text: 'Por favor, insira coordenadas válidas.',
        icon: 'warning',
        confirmButtonText: 'OK'
      });
      return;
    }

    try {
      await api.post('/locations/', { nome, coordenada_x: coordenada_x_int, coordenada_y: coordenada_y_int });

      Swal.fire({
        title: 'Sucesso!',
        text: 'Localização cadastrada com sucesso!',
        icon: 'success',
        confirmButtonText: 'OK'
      }).then(() => {
        navigate('/');
      });

    } catch (error) {
      console.error('Erro ao cadastrar localização:', error);

      Swal.fire({
        title: 'Erro!',
        text: 'Falha ao cadastrar localização.',
        icon: 'error',
        confirmButtonText: 'Tentar novamente'
      });
    }
  };

  return (
    <Layout>
      <div className="col-md-12">
        <div className="custom-title-flag text-center">
          <h1 className="h-custom">Cadastro de Localização</h1>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Nome:</label>
            <input
              type="text"
              className="form-control"
              value={nome}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Coordenada X:</label>
            <input
              type="text"
              className="form-control"
              value={coordenada_x}
              onChange={(e) => setLatitude(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Coordenada Y:</label>
            <input
              type="text"
              className="form-control"
              value={coordenada_y}
              onChange={(e) => setLongitude(e.target.value)}
              required
            />
          </div>
          <div className="alinha-direita mt-3">
            <button type="submit" className="btn btn-primary me-2">Cadastrar</button>
            <button type="button" className="btn btn-secondary" onClick={() => navigate('/')}>Voltar</button>
          </div>
        </form>
      </div>
    </Layout>
  );
}

export default LocationForm;
