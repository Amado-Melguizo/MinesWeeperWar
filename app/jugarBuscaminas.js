import {
  generarTableroJs,
  dibujarTableroHtml,
  colocarBombasTableroJS,
  asociarEventClick,
} from "./iniciarBuscaminas.js";

// import { cronometrar } from "./cronometro.js";

// window.onload = cronometrar;

// let ancho = 9;
// let alto = 9;
// switch (option) {
//   case "level1":
//     const TAM_MAX_FACIL = 10;
//   case "level2":
//     const TAM_MAX_MEDIO = 20;
//   case "level3":
//     const TAM_MAX_DIFICIL = 30;
// }

// let juego = new Set();

// juego.add(TAM_MAX);
// juego.add(mitad);
// juego.add(TAM_MAX);
const TAM_MAX = 10;
let tablero = [];
let tablero_recursivo = [];
//let mitad = (TAM_MAX * TAM_MAX) / 2;

generarTableroJs(tablero, tablero_recursivo, TAM_MAX);
colocarBombasTableroJS(TAM_MAX, tablero);
dibujarTableroHtml(TAM_MAX, tablero);
asociarEventClick();
// calcularNumMinas(parseInt(prompt()), parseInt(prompt()), tablero);
console.log(tablero);
