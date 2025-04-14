import { useState } from 'react';
import '../assets/css/MenuCategorias.css';

function MenuCategorias({ onSelectCategory }) {
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState('all');

  const categorias = [
    { id: 'all', label: 'Todas' },
    { id: 'hombre', label: 'Hombre' },
    { id: 'mujer', label: 'Mujer' },
    { id: 'accesorios', label: 'Accesorios' },
    { id: 'tecnología', label: 'Tecnología' }
  ];

  const handleCategoryClick = (categoriaId) => {
    setCategoriaSeleccionada(categoriaId);
    onSelectCategory(categoriaId);
  };

  return (
    <div className="menu-categorias">
      <h3>Categorías</h3>
      <ul>
        {categorias.map(categoria => (
          <li 
            key={categoria.id}
            className={categoria.id === categoriaSeleccionada ? 'active' : ''}
            onClick={() => handleCategoryClick(categoria.id)}
          >
            {categoria.label}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default MenuCategorias;
