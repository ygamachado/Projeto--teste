import React from 'react';
import SidebarMenu from './SidebarMenu';

function Layout({ children }) {
  return (
    <div className="container">
      <div className="row">
        <SidebarMenu />
        <div className="col-md-9 conteudo-principal">
          {children}
        </div>
      </div>
    </div>
  );
}

export default Layout;
