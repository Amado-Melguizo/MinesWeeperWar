export function generarTableroJs(tablero, tablero_recursivo, TAM_MAX) {
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

export function colocarBombasTableroJS(TAM_MAX, tablero) {
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

export function dibujarTableroHtml(TAM_MAX, tablero) {
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
      celda.innerHTML = `${tablero[i][j]}`;
      celda.id = `idCelda_${i}_${j}`;
      fila.appendChild(celda);
    }
    tabla.appendChild(fila);
  }
}

export function calcularMinas(e) {
  let movimientos = 0;
  let id = e.target.id;
  let jugada = document.getElementById(id).innerHTML;

  if (jugada != 1) {
    movimientos++;
  } else {
    alert("Has perdido");
  }

  // let coordenadas = e.target.id.split("_");
  // let x = coordenadas[1];
  // let y = coordenadas[2];
  // console.log(`Coordenadas x ${x} , y = ${y}`);
}
export function colocarbandera(event) {
  event.preventDefault();
  //event.target.style.background="white";
  event.target.innerHTML = "🏳️";

  console.log("vas a colocar una bandera");
}

export function mostrarCoordenadas(event) {
  //console.log(event.target.id)
  let coordenadas = event.target.id.split("_");
  let x = coordenadas[1];
  let y = coordenadas[2];

  console.log(x, y);

  event.target.style.background = "white";
  liberarRecursivo(x, y);
}

function liberarRecursivo(tablero, tablero_recursivo, x, y) {
  x = parseInt(x);
  y = parseInt(y);
  //let cercanos = [[x,y-1] , [x-1,y-1] , [x-1 , y] , [x-1 , y+1] , [x , y+1] , [x+1 , y+1] , [x+1 , y ] , [x+1 , y-1] ]
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

export function asociarEventClick() {
  let celdas = document.querySelectorAll('td[id^="idCelda"]');

  celdas.forEach((e) => e.addEventListener("click", mostrarCoordenadas));

  celdas.forEach((e) => e.addEventListener("contextmenu", colocarbandera));
}
