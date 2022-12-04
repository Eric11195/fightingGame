//checkea si la partida se ha acabado
export var jumpingP = false
export var jumpingE = false

var playerOne6 = false
var playerOne4 = false
var playerOne2 = false
var playerOneA = false
var playerOneInput

var playerTwo6 = false
var playerTwo4 = false
var playerTwo2 = false
var playerTwoA = false
var playerTwoInput

export const p1InputBuffer = new Array()
export const p2InputBuffer = new Array()

//crear un objeto para saber que teclas se estan tocando
export const keys = {
    a: {
        pressed: false
    },
    d: {
        pressed: false
    },
    space: {
        pressed: false
    },
    f: {
        pressed: false
    },
    s: {
        pressed: false
    },

    AL: {
        pressed: false
    },
    AR: {
        pressed: false
    },
    AU: {
        pressed: false
    },
    AD: {
        pressed: false
    },
    dot: {
        pressed: false
    }
};

export function getPlayerOneInput() {
    return playerOneInput;
}
export function getPlayerTwoInput() {
    return playerTwoInput;
}

//espera a que pase algo (''), y devuelve lo siguiente ,()
//se activa cada vez que se presiona una tecla
export const KEYDOWN = window.addEventListener('keydown', (event) => {
    //mira que teclas as tocado
    switch (event.key) {
        case 'd':
            //si la d esta presionada el objeto keys dice que d= true
            //o sea que estamos pulsando esta tecla vamos
            keys.d.pressed = true
            if(!playerOne6){
                //doble salto direccional
                checkInputBufferLength()
                p1InputBuffer.push(6)
                playerOneInput = true
            }
            playerOne6 = true

            break
        case 'a':
            keys.a.pressed = true
            if(!playerOne4){
                //doble salto direccional
                checkInputBufferLength()
                p1InputBuffer.push(4)
                playerOneInput = true
            }
            playerOne4 = true
            break
        case 'f':
            keys.f.pressed = true
            if(!playerOneA){
                //doble salto direccional
                checkInputBufferLength()
                p1InputBuffer.push("A")
                playerOneInput = true
            }
            playerOneA = true
            break
        case 's':
            keys.s.pressed = true
            if(!playerOne2){
                //doble salto direccional
                checkInputBufferLength()
                p1InputBuffer.push(2)
                playerOneInput = true
            }
            playerOne2 = true
            break
        case ' ':
            //condición para que en caso de que se pulse la tecla durante más de un frame no haga los dos saltos instantaneamente
            //registra solo 1 vez cada vez que se pulse la tecla
            if(!jumpingP){
                //doble salto direccional
                keys.space.pressed = true
            }
            jumpingP = true
            break


        case 'ArrowRight':
            //si la d esta presionada el objeto keys dice que d= true
            //o sea que estamos pulsando esta tecla vamos
            keys.AR.pressed = true
            if(!playerTwo6){
                //doble salto direccional
                checkInputBufferLength()
                p2InputBuffer.push(6)
                playerTwoInput = true
            }
            playerTwo6 = true
            break
        case 'ArrowLeft':
            keys.AL.pressed = true
            if(!playerTwo4){
                //doble salto direccional
                checkInputBufferLength()
                p2InputBuffer.push(4)
                playerTwoInput = true
            }
            playerTwo4 = true
            break
        case 'ArrowDown':
            keys.AD.pressed = true
            if(!playerTwo2){
                //doble salto direccional
                checkInputBufferLength()
                p2InputBuffer.push(2)
                playerTwoInput = true
            }
            playerTwo2 = true
            break   
        case '.':
            keys.dot.pressed = true
            if(!playerTwoA){
                //doble salto direccional
                checkInputBufferLength()
                p2InputBuffer.push("A")
                playerTwoInput = true
            }
            playerTwoA = true
            break
        case 'ArrowUp':             
            if(!jumpingE){
                //doble salto direccional
                keys.AU.pressed = true 
            }
            jumpingE = true
            break
        }
    }
)


//se activa cada vez que se suelta una tecla
export const KEYUP = window.addEventListener('keyup', (event) => {
    //mira que teclas as levantado y poner esa tecla como que no esta siendo pulsada
    switch (event.key) {
        case 'd':
            keys.d.pressed = false
            playerOne6 = false
            break
        case 'a':
            keys.a.pressed = false
            playerOne4 = false
            break
        case ' ':
            keys.space.pressed = false
            jumpingP = false
            break
        case 'f':
            keys.f.pressed = false
            playerOneA = false
            break
        case 's':
            keys.s.pressed = false
            playerOne2 = false
            break

        case 'ArrowRight':
            keys.AR.pressed = false
            playerTwo6 = false
            break
        case 'ArrowLeft':
            keys.AL.pressed = false
            playerTwo4 = false
            break
        case 'ArrowDown':
            keys.AD.pressed = false
            playerTwo2 = false
            break
        case '.':
            keys.dot.pressed = false
            playerTwoA = false
            break
        case 'ArrowUp':
            keys.AU.pressed = false
            jumpingE = false
            break

    }
})

function checkInputBufferLength(){
    if(p1InputBuffer.length > 14){
        p1InputBuffer.shift()
    }
    if(p2InputBuffer.length > 14){
        p2InputBuffer.shift()
    }
}

export function checkSpecialInputs(){
    if(p1InputBuffer.lastIndexOf("A") != -1 && p1InputBuffer.lastIndexOf(2) != -1 && p1InputBuffer.lastIndexOf(6) !=-1 && ((p1InputBuffer.lastIndexOf(6) > p1InputBuffer.lastIndexOf(2)) && (p1InputBuffer.lastIndexOf("A")> p1InputBuffer.lastIndexOf(6)))){
        console.log("236P")
        p1InputBuffer.splice(0)
    }
    if(p1InputBuffer.lastIndexOf("A") != -1 && p1InputBuffer.lastIndexOf(2) != -1 && p1InputBuffer.lastIndexOf(4) !=-1 && ((p1InputBuffer.lastIndexOf(4) > p1InputBuffer.lastIndexOf(2)) && (p1InputBuffer.lastIndexOf("A")> p1InputBuffer.lastIndexOf(4)))){
        console.log("214P")
        p1InputBuffer.splice(0)
    }

    if(p2InputBuffer.lastIndexOf("A") != -1 && p2InputBuffer.lastIndexOf(2) != -1 && p2InputBuffer.lastIndexOf(6) !=-1 && ((p2InputBuffer.lastIndexOf(6) > p2InputBuffer.lastIndexOf(2)) && (p2InputBuffer.lastIndexOf("A")> p2InputBuffer.lastIndexOf(6)))){
        console.log("236E")
        p2InputBuffer.splice(0)
    }
    if(p2InputBuffer.lastIndexOf("A") != -1 && p2InputBuffer.lastIndexOf(2) != -1 && p2InputBuffer.lastIndexOf(4) !=-1 && ((p2InputBuffer.lastIndexOf(4) > p2InputBuffer.lastIndexOf(2)) && (p2InputBuffer.lastIndexOf("A")> p2InputBuffer.lastIndexOf(4)))){
        console.log("214E")
        p2InputBuffer.splice(0)
    }
}