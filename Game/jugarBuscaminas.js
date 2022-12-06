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
let juego = new Map();

juego.set('TAM_MAX',10);
// juego.set('NumBombas', (TAM_MAX * TAM_MAX) / 2))

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
