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

function calcularMinas(e) {
  console.log(e);
  console.log(`Has pulsado la celda ${e.target.id}`);
  let id = e.target.id;
  let jugada = document.getElementById(id).innerHTML;
  if (jugada != 1) {
  } else {
    alert("Has perdido");
    window.onload.location.href = "juego.html";
  }
  let coordenadas = e.target.id.split("_");
  let x = coordenadas[1];
  let y = coordenadas[2];
  //console.log(`Coordenadas x ${x} , y = ${y}`)
}

export function asociarEventClick() {
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
  if (jugada != 1) {
    let coordenadas = e.target.id.split("_");
    let x = coordenadas[1];
    let y = coordenadas[2];
    console.log(x, y);

    liberarRecursivo(x, y);
  } else {
    alert("!Fallastes, mira tus errores!");

    setTimeout(function () {
      window.location.href = "ranking.html";
    }, 5000);

    // Swal.fire({
    //   title: "¡Has perdido!",
    //   imageAlt: "img/loseGame.gif",
    //   imageUrl: "",
    //   imageWidth: 400,
    //   imageHeight: 200,
    //   imageAlt: "Custom image",
    // });

    // swal({
    //     title: 'Yeeeaaaah!!!',
    //     text: '',
    //     imageUrl: 'https://wasabiBD.github.io/test-repo/dia2/images/feito.png',
    //     imageWidth: 164,
    //     imageHeight: 205,
    //     padding: 10,
    //     animation: true,
    //   });
  }
  //console.log(e.target.id)
}


let banderas = 10;

export function colocarbandera(event) {
  event.preventDefault();

  banderas--;

  //Actualizar número de banderas
  if (banderas == 0) {
    alert("No quedan banderas.");
  } else {
    event.target.innerHTML = "🏳️";
    console.log(`TE QUEDAN ${banderas} banderas`);
  }
}

export function verCelda(tablero, tablero_recursivo, e) {
  console.log(e);
  console.log(`Has pulsado la celda ${e.target.id}`);
  let id = e.target.id;
  let jugada = document.getElementById(id).innerHTML;
  if (jugada != 1) {
    let coordenadas = e.target.id.split("_");
    let x = coordenadas[1];
    let y = coordenadas[2];
    console.log(x, y);

    liberarRecursivo(tablero, tablero_recursivo, x, y);
  } else {
    alert("Has perdido");
    onclick = window.location.href = "juego.html";

    // Swal.fire({
    //   title: "¡Has perdido!",
    //   imageAlt: "img/loseGame.gif",
    //   imageUrl: "",
    //   imageWidth: 400,
    //   imageHeight: 200,
    //   imageAlt: "Custom image",
    // });

    // swal({
    //     title: 'Yeeeaaaah!!!',
    //     text: '',
    //     imageUrl: 'https://wasabiBD.github.io/test-repo/dia2/images/feito.png',
    //     imageWidth: 164,
    //     imageHeight: 205,
    //     padding: 10,
    //     animation: true,
    //   });
  }
  //console.log(e.target.id)
}

function liberarRecursivo(tablero, tablero_recursivo, x, y) {
  x = parseInt(x);
  y = parseInt(y);
  console.log(x, y);
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
