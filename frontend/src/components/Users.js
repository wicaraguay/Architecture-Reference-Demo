import React, { useState, useEffect } from 'react';
import userService from '../services/userService';

const Users = () => {
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({ name: '', email: '' });
  const [editingUser, setEditingUser] = useState(null);

  // Obtener todos los usuarios al cargar el componente
  useEffect(() => {
    fetchUsers();
  }, []);

  // Función para obtener todos los usuarios desde el backend (API Manager)
  const fetchUsers = () => {
    userService.getAll().then(response => {
      setUsers(response.data); // Actualiza el estado con los usuarios obtenidos
    }).catch(error => {
      console.error('Error al obtener los usuarios:', error);
    });
  };

  // Manejar cambios en el formulario
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewUser({ ...newUser, [name]: value });
  };

  // Agregar nuevo usuario
  const addUser = (e) => {
    e.preventDefault();
    if (newUser.name && newUser.email) {
      userService.create(newUser).then(() => {
        fetchUsers(); // Refrescar la lista de usuarios
        setNewUser({ name: '', email: '' }); // Limpiar el formulario
      }).catch(error => {
        console.error('Error al agregar el usuario:', error);
      });
    }
  };

  // Eliminar un usuario por ID
  const deleteUser = (id) => {
    userService.remove(id).then(() => {
      fetchUsers(); // Refrescar la lista de usuarios tras la eliminación
    }).catch(error => {
      console.error('Error al eliminar el usuario:', error);
    });
  };

  // Editar un usuario existente
  const editUser = (user) => {
    setEditingUser(user);
  };

  // Actualizar la información del usuario
  const updateUser = (e) => {
    e.preventDefault();
    if (editingUser) {
      userService.update(editingUser._id, editingUser).then(() => {
        fetchUsers(); // Refrescar la lista de usuarios tras la actualización
        setEditingUser(null); // Limpiar el formulario de edición
      }).catch(error => {
        console.error('Error al actualizar el usuario:', error);
      });
    }
  };

  return (
    <div>
      <h2>Usuarios</h2>

      {/* Formulario para agregar o editar usuarios */}
      <form onSubmit={editingUser ? updateUser : addUser}>
        <div className="mb-3">
          <label className="form-label">Nombre</label>
          <input
            type="text"
            className="form-control"
            name="name"
            value={editingUser ? editingUser.name : newUser.name}
            onChange={(e) => {
              if (editingUser) {
                setEditingUser({ ...editingUser, name: e.target.value });
              } else {
                handleInputChange(e);
              }
            }}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Email</label>
          <input
            type="email"
            className="form-control"
            name="email"
            value={editingUser ? editingUser.email : newUser.email}
            onChange={(e) => {
              if (editingUser) {
                setEditingUser({ ...editingUser, email: e.target.value });
              } else {
                handleInputChange(e);
              }
            }}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">
          {editingUser ? 'Actualizar Usuario' : 'Agregar Usuario'}
        </button>
        {editingUser && (
          <button
            type="button"
            className="btn btn-secondary ms-2"
            onClick={() => setEditingUser(null)}
          >
            Cancelar
          </button>
        )}
      </form>

      {/* Tabla para mostrar los usuarios */}
      <table className="table mt-4">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Email</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user._id}>
              <td>{user._id}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>
                <button className="btn btn-warning me-2" onClick={() => editUser(user)}>
                  Editar
                </button>
                <button className="btn btn-danger" onClick={() => deleteUser(user._id)}>
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Users;
