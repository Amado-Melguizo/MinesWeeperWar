//json-server --watch ./buscaminas/usuarios.json
const request = new XMLHttpRequest();
request.open("GET", "http://localhost:3000/usuarios", true);

request.onload = function () {
  if (request.status >= 200 && request.status < 400) {
    const data = JSON.parse(this.response);

    const user = document.getElementById("card-user");
    
    data.forEach((usuarios) => {

      //creamos la seccion
      const textoUser = document.createElement("p");
      //Damos un id a un usuario
      textoUser.setAttribute("id", "user");
      //Le damos contenido al parrafo
      textoUser.textContent = `${usuarios.usuario}`;
      //añadimos el parrafo al div
      user.appendChild(textoUser);
    });
  }
};
request.send();
