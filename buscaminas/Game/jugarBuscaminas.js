import {
  generarTableroJs,
  dibujarTableroHtml,
  colocarBombasTableroJS,
  asociarEventClick,
} from "./iniciarBuscaminas.js";

// $config: {
//   let ancho = 9;
//   let alto = 9;
//   let tablero = [];
//   let mitad = (ancho * alto) / 2;
// }

// function calcularNumMinas(y, x, tablero) {
//   if (tablero[y][x] == 1) {
//     document.getElementById("perder").style.display = "block";
//   } else {
//     calcularNumMinas(parseInt(prompt()), parseInt(prompt()), tablero);
//   }
// }

// let ancho = 9;
// let alto = 9;
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
