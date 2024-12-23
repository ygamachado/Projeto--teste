// src/components/SidebarMenu.js
import React from 'react';
import { Link } from 'react-router-dom';

function SidebarMenu() {
  return (
    <div className="col-md-3 menu-lateral">
      <div className="custom-title-flag text-center">
        <h4 className="text-center h-custom">Menu</h4>
      </div>
      <ul className="nav flex-column">
        <li className="nav-item">
            <Link className="nav-link-custom" to="/">Localizações</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link-custom" to="/cadastro">Cadastrar Nova Localização</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link-custom" to="/busca">Buscar por Proximidade</Link>
        </li>
      </ul>
    </div>
  );
}

export default SidebarMenu;
