import React, { useEffect, useState } from 'react';
import api from '../services/api';
import { Link } from 'react-router-dom';
import Layout from '../components/Layout'

function LocationList() {
  const [locations, setLocations] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);

  useEffect(() => {
    api.get('/poi/')
      .then(response => {
        setLocations(response.data);
      })
      .catch(error => {
        console.error('Erro ao buscar localizações:', error);
      });
  }, []);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentLocations = locations.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(locations.length / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <Layout>
       <div className="custom-title-flag text-center">
         <h1 className="h-custom">Localizações <i class="fas fa-map-marker-alt"></i></h1>
       </div>

      <ul className="list-group lista-localizacoes text-center">
        {currentLocations.map(location => (
          <li key={location.id} className="list-group-item">
            {location.nome} - x: {location.coordenada_x}, y: {location.coordenada_y}
          </li>
        ))}
      </ul>

      <nav>
        <ul className="pagination">
          {pageNumbers.map(number => (
            <li key={number} className="page-item">
              <button onClick={() => paginate(number)} className="page-link">
                {number}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </Layout>
  );
}

export default LocationList;