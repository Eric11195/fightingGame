//espacio de juego
export const canvas = document.querySelector("canvas")
export const c = canvas.getContext("2d")
canvas.width = 1024
canvas.height = 576

//variables movimiento
export const CROUCHING = "crouching"
export const STANDING = "standing"
