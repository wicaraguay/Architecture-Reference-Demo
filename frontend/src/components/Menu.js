import React from 'react';
import { Link } from 'react-router-dom';

const Menu = () => (
  <nav className="navbar navbar-expand-lg navbar-light bg-light">
    <div className="container-fluid">
      <Link className="navbar-brand" to="/">CRUD App</Link>
      <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav">
          <li className="nav-item">
            <Link className="nav-link" to="/users">Usuarios</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/products">Productos</Link>
          </li>
        </ul>
      </div>
    </div>
  </nav>
);

export default Menu;
