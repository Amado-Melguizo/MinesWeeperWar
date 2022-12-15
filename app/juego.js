// import swal from 'sweetalert2';
// swal.fire("Hello");

/* Código cronómetro */
window.onload = cronometrar;

function cronometrar() {
  min = 0;
  sec = 0;
  document.getElementById("ms").innerHTML = "00:00";
  escribir();
  id = setInterval(escribir, 1000);
}

function escribir() {
  var mAux, sAux;
  sec++;
  if (sec > 59) {
    min++;
    sec = 0;
  }

  if (sec < 10) {
    sAux = "0" + sec;
  } else {
    sAux = sec;
  }

  if (min < 10) {
    mAux = "0" + min;
  } else {
    mAux = min;
  }

  document.getElementById("ms").innerHTML = mAux + ":" + sAux;
}

/*código buscaminas */
let tablero = [];
let tablero_recursivo = [];
const TAM_MAX = 10;

function generartablero() {
  for (let i = 0; i < TAM_MAX; i++) {
    tablero[i] = new Array(TAM_MAX);
    tablero_recursivo[i] = new Array(TAM_MAX);
    for (let j = 0; j < TAM_MAX; j++) {
      tablero[i][j] = 0;
      tablero_recursivo[i][j] = 0;
    }
  }
}

let numeroAletorio = () => {
  return parseInt(10 * Math.random());
};

function colocarbombas() {
  let cont = 0;
  let i = 0;
  let j = 0;
  while (cont <= (TAM_MAX * TAM_MAX) / 2) {
    i = numeroAletorio();
    j = numeroAletorio();
    if (tablero[i][j] == 0) {
      tablero[i][j] = 1;
      cont++;
    }
  }
}

function dibujarTablero() {
  // ¿Ubicación de la tabla?
  let tableroHTML = document.getElementById("idTablero");

  // Crear la tabla
  let tabla = document.createElement("table");
  tabla.setAttribute("border", 1);
  //console.log(tabla)

  //Insertar o dibujar en el documento.
  tableroHTML.appendChild(tabla);

  // Dibujamos las filas
  for (let i = 0; i < TAM_MAX; i++) {
    let fila = document.createElement("tr");
    for (let j = 0; j < TAM_MAX; j++) {
      let celda = document.createElement("td");
      celda.innerHTML = "";
      celda.id = `idCelda_${i}_${j}`;
      fila.appendChild(celda);
    }
    tabla.appendChild(fila);
  }
}
function calcularMinas(e) {
  console.log(e);
  console.log(`Has pulsado la celda ${e.target.id}`);
  let id = e.target.id;
  let jugada = document.getElementById(id).innerHTML;
  console.log("jug", jugada);
  if (jugada != "") {
  } else {
    alert("Has perdido");
    window.onload.location.href = "juego.html";
  }
  let coordenadas = e.target.id.split("_");
  let x = coordenadas[1];
  let y = coordenadas[2];
  //console.log(`Coordenadas x ${x} , y = ${y}`)
}

function asociarEventClick() {
  let celdas = document.querySelectorAll('td[id^="idCelda"]');

  celdas.forEach((e) => e.addEventListener("click", mostrarCoordenadas));

  celdas.forEach((e) => e.addEventListener("contextmenu", colocarbandera));
}

var clicks = 0;

function mostrarCoordenadas(e) {
  clicks += 1;
  document.getElementById("clicks").innerHTML = clicks;

  console.log(e);
  console.log(`Has pulsado la celda ${e.target.id}`);
  let id = e.target.id;
  let jugada = document.getElementById(id).innerHTML;
  if (jugada != "") {
    let coordenadas = e.target.id.split("_");
    let x = coordenadas[1];
    let y = coordenadas[2];
    console.log(x, y);

    liberarRecursivo(x, y);
  } else {
    alert("!Fallastes, mira tus errores!");
    window.location.href = "ranking.html";
    // setTimeout(function () {
    //   window.location.href = "ranking.html";
    // }, 5000);
  }
}

let banderas = 11;
document.getElementById("banderas").innerHTML = banderas;
function colocarbandera(event) {
  event.preventDefault();

  if (event.target.innerHTML == "") {
    event.target.innerHTML = "🏳️";
    banderas--;
    document.getElementById("banderas").innerHTML = banderas;
  } else if (event.target.innerHTML == "🏳️") {
    event.target.innerHTML = "";
    banderas++;
    document.getElementById("banderas").innerHTML = banderas;
  } else if (banderas == 0) {
    alert("No quedan banderas.");
  }
}

function liberarRecursivo(x, y) {
  x = parseInt(x);
  y = parseInt(y);
  let cercanos = [
    [x, y - 1],
    [x - 1, y],
    [x, y + 1],
    [x + 1, y],
  ];

  if (tablero[x][y] == 0) {
    for (let i = 0; i < cercanos.length; i++) {
      console.log(`Analizo ${cercanos[i]}`);
      if (cercanos[i][0] >= 0 && cercanos[i][1] >= 0) {
        if (cercanos[i][0] < TAM_MAX && cercanos[i][1] < TAM_MAX) {
          if (
            tablero[cercanos[i][0]][cercanos[i][1]] == 0 &&
            tablero_recursivo[cercanos[i][0]][cercanos[i][1]] == 0
          ) {
            document.getElementById(
              `idCelda_${cercanos[i][0]}_${cercanos[i][1]}`
            ).style.background = "white";
            tablero_recursivo[cercanos[i][0]][cercanos[i][1]] = "v";
            liberarRecursivo(cercanos[i][0], cercanos[i][1]);
          }
        }
      }
    }
  }
}

generartablero();
colocarbombas();
dibujarTablero();
asociarEventClick();
