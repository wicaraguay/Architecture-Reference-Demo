import React, { useState, useEffect } from 'react';
import productService from '../services/productService';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({ name: '', price: '' });
  const [editingProduct, setEditingProduct] = useState(null);

  // Obtener todos los productos al cargar el componente
  useEffect(() => {
    fetchProducts();
  }, []);

  // Función para obtener todos los productos desde el backend (API Manager)
  const fetchProducts = () => {
    productService.getAll().then(response => {
      setProducts(response.data); // Actualiza el estado con los productos obtenidos
    }).catch(error => {
      console.error('Error al obtener los productos:', error);
    });
  };

  // Manejar cambios en el formulario
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProduct({ ...newProduct, [name]: value });
  };

  // Agregar nuevo producto
  const addProduct = (e) => {
    e.preventDefault();
    if (newProduct.name && newProduct.price) {
      productService.create(newProduct).then(() => {
        fetchProducts(); // Refrescar la lista de productos
        setNewProduct({ name: '', price: '' }); // Limpiar el formulario
      }).catch(error => {
        console.error('Error al agregar el producto:', error);
      });
    }
  };

  // Eliminar un producto por ID
  const deleteProduct = (id) => {
    productService.remove(id).then(() => {
      fetchProducts(); // Refrescar la lista de productos tras la eliminación
    }).catch(error => {
      console.error('Error al eliminar el producto:', error);
    });
  };

  // Editar un producto existente
  const editProduct = (product) => {
    setEditingProduct(product);
  };

  // Actualizar la información del producto
  const updateProduct = (e) => {
    e.preventDefault();
    if (editingProduct) {
      productService.update(editingProduct._id, editingProduct).then(() => {
        fetchProducts(); // Refrescar la lista de productos tras la actualización
        setEditingProduct(null); // Limpiar el formulario de edición
      }).catch(error => {
        console.error('Error al actualizar el producto:', error);
      });
    }
  };

  return (
    <div>
      <h2>Productos</h2>

      {/* Formulario para agregar o editar productos */}
      <form onSubmit={editingProduct ? updateProduct : addProduct}>
        <div className="mb-3">
          <label className="form-label">Nombre del Producto</label>
          <input
            type="text"
            className="form-control"
            name="name"
            value={editingProduct ? editingProduct.name : newProduct.name}
            onChange={(e) => {
              if (editingProduct) {
                setEditingProduct({ ...editingProduct, name: e.target.value });
              } else {
                handleInputChange(e);
              }
            }}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Precio</label>
          <input
            type="number"
            className="form-control"
            name="price"
            value={editingProduct ? editingProduct.price : newProduct.price}
            onChange={(e) => {
              if (editingProduct) {
                setEditingProduct({ ...editingProduct, price: e.target.value });
              } else {
                handleInputChange(e);
              }
            }}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">
          {editingProduct ? 'Actualizar Producto' : 'Agregar Producto'}
        </button>
        {editingProduct && (
          <button
            type="button"
            className="btn btn-secondary ms-2"
            onClick={() => setEditingProduct(null)}
          >
            Cancelar
          </button>
        )}
      </form>

      {/* Tabla para mostrar los productos */}
      <table className="table mt-4">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Precio</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {products.map(product => (
            <tr key={product._id}>
              <td>{product._id}</td>
              <td>{product.name}</td>
              <td>{product.price}</td>
              <td>
                <button className="btn btn-warning me-2" onClick={() => editProduct(product)}>
                  Editar
                </button>
                <button className="btn btn-danger" onClick={() => deleteProduct(product._id)}>
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

export default Products;
