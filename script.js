
let data_productos = [];
let currentPage = 0;
const productsPerPage = 14;

// Función para crear elementos en el DOM
function create_elements(productos, startIndex, endIndex) {
    const contenedorTarjetas = document.getElementById('tarjeta');
    contenedorTarjetas.innerHTML = '';
    for (let i = startIndex; i <= endIndex && i < productos.length; i++) {
        const tarjeta = document.createElement('div');
        tarjeta.classList.add('tarjeta');
        tarjeta.innerHTML = `
            <img class="producto-imagen" src="${productos[i].image}" alt="${productos[i].nombre}">
            <div class="producto-info">
                <h2 class="producto-nombre">${productos[i].nombre}</h2>
                <p class="producto-precio">$${productos[i].precio.toFixed(2)}</p>
                <p class="producto-descripcion">${productos[i].descripcion}</p>
            </div>
        `;
        const gridItem = document.createElement('div');
        gridItem.classList.add('grid-item');
        gridItem.appendChild(tarjeta);
        contenedorTarjetas.appendChild(gridItem);
    }
}

// Función para actualizar la página con los productos filtrados
function updateProductosEnPagina(productosFiltrados, startIndex = 0, endIndex = productsPerPage - 1) {
    create_elements(productosFiltrados, startIndex, endIndex);
}

// Función para buscar productos por nombre
function buscarProductos(consultaBusqueda) {
    return new Promise((resolve, reject) => {
        const productosFiltrados = data_productos.filter(producto => {
            return producto.nombre.toLowerCase().includes(consultaBusqueda.toLowerCase());
        });
        if (productosFiltrados.length > 0) {
            resolve(productosFiltrados);
        } else {
            reject('No se encontraron productos');
        }
    });
}

// Carga inicial de productos
function read_json(url) {
    return fetch(url)
        .then(response => response.json())
        .then(data => {
            data_productos = data;
            create_elements(data_productos, 0, productsPerPage - 1); // Mostrar los primeros productos al cargar la página
        })
        .catch(error => {
            console.error('Error al cargar los datos:', error);
        });
}

// Llamar a read_json para cargar los datos inicialmente
read_json('dataset.json');

// Manejar el evento submit del formulario
document.getElementById('form-busqueda').addEventListener('submit', (event) => {
    event.preventDefault();
    const consultaBusqueda = document.getElementById('busqueda-producto').value;
    buscarProductos(consultaBusqueda)
        .then(productosFiltrados => {
            updateProductosEnPagina(productosFiltrados);
        })
        .catch(error => {
            console.error(error);
            document.getElementById('tarjeta').innerHTML = '<p>No se encontraron productos</p>';
        });
});

// Eventos para la paginación
document.getElementById('boton_next').addEventListener('click', () => {
    currentPage++;
    updatePage(currentPage);
});

document.getElementById('boton_prev').addEventListener('click', () => {
    if (currentPage > 0) {
        currentPage--;
        updatePage(currentPage);
    }
});

// Función actualizar página y llamar a create_elements
function updatePage(newPage) {
    const startIndex = newPage * productsPerPage;
    const endIndex = Math.min(startIndex + productsPerPage - 1, data_productos.length - 1);
    create_elements(data_productos, startIndex, endIndex);
    // Actualizar el índice de la página en el HTML
    document.getElementById('pagina_actual').innerText = currentPage + 1;
}

  

  
 /*****  Botón de ir inicio *****/
 document.getElementById('boton-recargar').addEventListener('click', () => {
  // Función para recargar productos iniciales
  recargarProductosIniciales();
});

function recargarProductosIniciales() {
const contenedorTarjetas = document.getElementById('tarjeta');
contenedorTarjetas.innerHTML = ''; // Vaciar el contenedor

read_json('dataset.json'); // Cargar productos iniciales

document.getElementById('busqueda-producto').value = ''; // Restablecer consulta de búsqueda
}



/***** Función para mostrar el formulario emergente *****/
function mostrarFormulario() {
  document.getElementById('formulario').classList.add('show');
}
// Función para cerrar el formulario emergente
function cerrarFormulario() {
  document.getElementById('formulario').classList.remove('show');
}

// Función para limpiar los campos del formulario 
function limpiarCampos() {
  // Implementar la limpieza de los campos del formulario
  document.getElementById("nombre").value = "";
  document.getElementById("descripcion").value = "";
  document.getElementById("precio").value = "";
  document.getElementById("imagen").value = "";
}
// Asignar el evento clic al botón "Registro"
document.getElementById('boton_registro').addEventListener('click', mostrarFormulario);




/*****  Función para mostrar el aviso emergente *****/
function mostrarAvisoInfo() {
  document.getElementById('aviso_info').classList.add('show');
}
// Función para cerrar el aviso emergente
function cerrarAvisoInfo() {
  document.getElementById('aviso_info').classList.remove('show');
}
// Función para regresar al inicio de la página
function regresarInicio() {
  window.location.href = "#";
}
// Función para recargar la página
function recargarPagina() {
  window.location.reload();
}
// Asignar eventos clic a los botones
document.getElementById('boton_info').addEventListener('click', mostrarAvisoInfo);
document.getElementById('boton_regresar').addEventListener('click', regresarInicio);
document.getElementById('boton_Inicio').addEventListener('click', recargarPagina);
