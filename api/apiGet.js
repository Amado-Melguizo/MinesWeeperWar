//json-server --watch ./buscaminas/usuarios.json
const request = new XMLHttpRequest();
request.open('GET', 'http://localhost:3000/usuarios', true);

request.onload = function () {
  if (request.status >= 200 && request.status < 400) {

    const data = JSON.parse(this.response);
    
    const contenedor = document.getElementById('contenedor');
    contenedor.setAttribute('class', 'card-columns');
    
    data.forEach((usuarios) => {
      
      // Creamos una tarjeta
      const tarjeta = document.createElement('div');
      tarjeta.setAttribute('class', 'card');

      // Creamos el la cabecera y el cuerpo de la tarjeta
      const cabeceraTarjeta = document.createElement('div');
      cabeceraTarjeta.setAttribute('class', 'card-header');

      const cuerpoTarjeta = document.createElement('div');
      cuerpoTarjeta.setAttribute('class', 'card-body');

      // Creamos el encabezado y le asignamos el título de la película
      const nombre = document.createElement('h5');
      nombre.setAttribute('class', 'card-nombre');
      nombre.textContent = `Nombre real: ${usuarios.usuario}`;

      // Creamos la párrafo y le asignamos la descripción de la película
      const descripcion = document.createElement('p');
      descripcion.setAttribute('class', 'card-usuario');
      descripcion.textContent = `Usuario: ${usuarios.usuario } & Contraseña: ${usuarios.password }`;

      // Agregamos la tarjeta
      contenedor.appendChild(tarjeta);

      // Agregamos la cabecera y el cuerpo a la tarjeta
      tarjeta.appendChild(cabeceraTarjeta);
      tarjeta.appendChild(cuerpoTarjeta);

      // Agregamos el título a la cabecera
      cabeceraTarjeta.appendChild(nombre);
      
      // Agregamos la descripción al cuerpo
      cuerpoTarjeta.appendChild(descripcion);
    });
  } else {

    const contenedor = document.getElementById('contenedor');
    const mensajeError = document.createElement('div');

    mensajeError.setAttribute('class', 'alert alert-danger');
    mensajeError.textContent = `Ha ocurrido un error con código ${request.status}`;

    contenedor.appendChild(mensajeError);
  }
}

request.send();