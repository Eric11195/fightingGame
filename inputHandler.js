//checkea si la partida se ha acabado
export var jumpingP = false
export var jumpingE = false

var playerOne6 = false
var playerOne4 = false
var playerOne2 = false
var playerOneA = false
var playerOneB = false
var playerOneInput
export var playerOneRunning = false
export var p1FramesCharging = false

var playerTwo6 = false
var playerTwo4 = false
var playerTwo2 = false
var playerTwoA = false
var playerTwoB = false
var playerTwoInput
export var playerTwoRunning = false
export var p2FramesCharging = false

export var SpecialInput1 = "none" 
export var SpecialInput2 = "none" 

export const p1InputBuffer = new Array()
var depuredBuffer1 = new Array()

export const p2InputBuffer = new Array()
var depuredBuffer2 = new Array()

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
    g: {
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
    },
    barra: {
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
    //console.log(event.key)
    switch (event.key) {
        case 'D':
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
        case 'A':
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
        case 'F':
        case 'f':
            keys.f.pressed = true
            if(!playerOneA){
                p1FramesCharging = true
                //doble salto direccional
                checkInputBufferLength()
                p1InputBuffer.push("A")
                playerOneInput = true
            }
            //p1FramesCharging ++
            playerOneA = true
            break
        case 'G':
        case 'g':
            keys.g.pressed = true
            if(!playerOneB){
                p1FramesCharging = true
                //doble salto direccional
                checkInputBufferLength()
                p1InputBuffer.push("B")
                playerOneInput = true
            }
            //p1FramesCharging ++
            playerOneB = true
            break
        case 'S':
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
                checkInputBufferLength()
                p1InputBuffer.push(8)
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
                checkInputBufferLength()
                p2InputBuffer.push(6)
                playerTwoInput = true
            }
            playerTwo6 = true
            break
        case 'ArrowLeft':
            keys.AL.pressed = true
            if(!playerTwo4){
                checkInputBufferLength()
                p2InputBuffer.push(4)
                playerTwoInput = true
            }
            playerTwo4 = true
            break
        case 'ArrowDown':
            keys.AD.pressed = true
            if(!playerTwo2){
                checkInputBufferLength()
                p2InputBuffer.push(2)
                playerTwoInput = true
            }
            playerTwo2 = true
            break   
        case '.':
            keys.dot.pressed = true
            if(!playerTwoA){
                p2FramesCharging = true
                checkInputBufferLength()
                p2InputBuffer.push("A")
                playerTwoInput = true
            }
            playerTwoA = true
            break
        case '-':
            keys.barra.pressed = true
            if(!playerTwoB){
                p2FramesCharging = true
                checkInputBufferLength()
                p2InputBuffer.push("B")
                playerTwoInput = true
            }
            playerTwoA = true
            break
        case 'ArrowUp':             
            if(!jumpingE){
                keys.AU.pressed = true 
                checkInputBufferLength()
                p2InputBuffer.push(8)
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
        case 'D':
        case 'd':
            keys.d.pressed = false
            playerOne6 = false
            if(playerOneRunning){
                //playerOneRunning = false
            }
            break
        case 'A':
        case 'a':
            keys.a.pressed = false
            playerOne4 = false
            if(playerOneRunning){
                //playerOneRunning = false
            }
            break
        case ' ':
            keys.space.pressed = false
            jumpingP = false
            break
        case 'F':
        case 'f':
            keys.f.pressed = false
            playerOneA = false
            p1FramesCharging = false
            break
        case 'G':
        case 'g':
            keys.g.pressed = false
            playerOneB = false
            p1FramesCharging = false
            break
        case 'S':
        case 's':
            keys.s.pressed = false
            playerOne2 = false
            /*if(playerOneRunning){
                //playerOneRunning = false
            }*/
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
            p2FramesCharging = false
            break
        case '-':
            keys.barra.pressed = false
            playerTwoB = false
            p2FramesCharging = false
            break
        case 'ArrowUp':
            keys.AU.pressed = false
            jumpingE = false
            break

    }
})

function checkInputBufferLength(){
    if(p1InputBuffer.length > 20){
        p1InputBuffer.shift()
    }
    if(p2InputBuffer.length > 20){
        p2InputBuffer.shift()
    }
}

export function checkSpecialInputs(){
    SpecialInput1 = "none"
    SpecialInput2 = "none"
    playerOneRunning = false
    playerTwoRunning = false
    //depuredBuffer1 = checkSpecialInputs.slice()
    depuredBuffer1 = p1InputBuffer.filter(filterBlankSpace)
    //console.log(depuredBuffer1)
    depuredBuffer2 = p2InputBuffer.filter(filterBlankSpace)

    //console.log(depuredBuffer1.lastIndexOf(6) != -1 && (6 == depuredBuffer1[depuredBuffer1.lastIndexOf(6)-1]))


    if(depuredBuffer1.lastIndexOf("A") != -1 && depuredBuffer1.lastIndexOf(2) != -1 && depuredBuffer1.lastIndexOf(4) !=-1 && ((depuredBuffer1.lastIndexOf(4) == 1 + depuredBuffer1.lastIndexOf(2)) && (depuredBuffer1.lastIndexOf("A") == 1 + depuredBuffer1.lastIndexOf(4)))){
        SpecialInput1 = "214A"
        p1InputBuffer.splice(0)
    }
    if(depuredBuffer1.lastIndexOf("A") != -1 && depuredBuffer1.lastIndexOf(2) != -1 && depuredBuffer1.lastIndexOf(6) !=-1 && ((depuredBuffer1.lastIndexOf(6) == 1 + depuredBuffer1.lastIndexOf(2)) && (depuredBuffer1.lastIndexOf("A") == 1 + depuredBuffer1.lastIndexOf(6)))){
        SpecialInput1 = "236A"
        p1InputBuffer.splice(0)
    }
    if(depuredBuffer1.lastIndexOf("B") != -1 && depuredBuffer1.lastIndexOf(2) != -1 && depuredBuffer1.lastIndexOf(6) !=-1 && ((depuredBuffer1.lastIndexOf(6) == 1 + depuredBuffer1.lastIndexOf(2)) && (depuredBuffer1.lastIndexOf("B") == 1 + depuredBuffer1.lastIndexOf(6)))){
        SpecialInput1 = "236B"
        p1InputBuffer.splice(0)
    }
    if(depuredBuffer1.lastIndexOf("B") != -1 && depuredBuffer1.lastIndexOf(2) != -1 && depuredBuffer1.lastIndexOf(4) !=-1 && ((depuredBuffer1.lastIndexOf(4) == 1 + depuredBuffer1.lastIndexOf(2)) && (depuredBuffer1.lastIndexOf("B") == 1 + depuredBuffer1.lastIndexOf(4)))){
        SpecialInput1 = "214B"
        p1InputBuffer.splice(0)
    }
    if(depuredBuffer1.lastIndexOf(6) != -1 && (6 == depuredBuffer1[depuredBuffer1.lastIndexOf(6)-1] )){
        SpecialInput1 = "66"
        playerOneRunning = true
        p1InputBuffer.splice(0)
    }
    if(depuredBuffer1.lastIndexOf(4) != -1 && (4 == depuredBuffer1[depuredBuffer1.lastIndexOf(4)-1] )){
        SpecialInput1 = "44"
        playerOneRunning = true
        p1InputBuffer.splice(0)
    }
    if(depuredBuffer1.lastIndexOf(8) != -1 && (2 == depuredBuffer1[depuredBuffer1.lastIndexOf(8)-1] )){
        SpecialInput1 = "28"
        p1InputBuffer.splice(0)
    }
    if(depuredBuffer1.lastIndexOf(2) != -1 && (2 == depuredBuffer1[depuredBuffer1.lastIndexOf(2)-1] )){
        SpecialInput1 = "22"
    }
    if(depuredBuffer1.lastIndexOf("A") != -1 && depuredBuffer1.lastIndexOf(2) != -1 && (2 == depuredBuffer1[depuredBuffer1.lastIndexOf(2)-1])&& ("A" == depuredBuffer1[depuredBuffer1.lastIndexOf(2)+1] )){
        SpecialInput1 = "22A"
        p1InputBuffer.splice(0)
    }
    if(depuredBuffer1.lastIndexOf("B") != -1 && depuredBuffer1.lastIndexOf(2) != -1 && (2 == depuredBuffer1[depuredBuffer1.lastIndexOf(2)-1])&& ("B" == depuredBuffer1[depuredBuffer1.lastIndexOf(2)+1] )){
        //console.log("miau")
        SpecialInput1 = "22B"
        p1InputBuffer.splice(0)
    }
    

    if(depuredBuffer2.lastIndexOf("A") != -1 && depuredBuffer2.lastIndexOf(2) != -1 && depuredBuffer2.lastIndexOf(6) !=-1 && ((depuredBuffer2.lastIndexOf(6) == 1 + depuredBuffer2.lastIndexOf(2)) && (depuredBuffer2.lastIndexOf("A") == 1 + depuredBuffer2.lastIndexOf(6)))){
        SpecialInput2 = "236A"
        p2InputBuffer.splice(0)
    }
    if(depuredBuffer2.lastIndexOf("A") != -1 && depuredBuffer2.lastIndexOf(2) != -1 && depuredBuffer2.lastIndexOf(4) !=-1 && ((depuredBuffer2.lastIndexOf(4) == 1 + depuredBuffer2.lastIndexOf(2)) && (depuredBuffer2.lastIndexOf("A") == 1 + depuredBuffer2.lastIndexOf(4)))){
        SpecialInput2 = "214A"
        p2InputBuffer.splice(0)
    }
    if(depuredBuffer2.lastIndexOf("B") != -1 && depuredBuffer2.lastIndexOf(2) != -1 && depuredBuffer2.lastIndexOf(4) !=-1 && ((depuredBuffer2.lastIndexOf(4) == 1 + depuredBuffer2.lastIndexOf(2)) && (depuredBuffer2.lastIndexOf("B") == 1 + depuredBuffer2.lastIndexOf(4)))){
        SpecialInput2 = "214B"
        p2InputBuffer.splice(0)
    }
    if(depuredBuffer2.lastIndexOf("B") != -1 && depuredBuffer2.lastIndexOf(2) != -1 && depuredBuffer2.lastIndexOf(6) !=-1 && ((depuredBuffer2.lastIndexOf(6) == 1 + depuredBuffer2.lastIndexOf(2)) && (depuredBuffer2.lastIndexOf("B") == 1 + depuredBuffer2.lastIndexOf(6)))){
        SpecialInput2 = "236B"
        p2InputBuffer.splice(0)
    }
    if(depuredBuffer2.lastIndexOf(6) != -1 && (6 == depuredBuffer2[depuredBuffer2.lastIndexOf(6)-1] )){
        SpecialInput2 = "66"
        playerTwoRunning = true
        p2InputBuffer.splice(0)
    }
    if(depuredBuffer2.lastIndexOf(4) != -1 && (4 == depuredBuffer2[depuredBuffer2.lastIndexOf(4)-1] )){
        SpecialInput2 = "44"
        playerTwoRunning = true
        p2InputBuffer.splice(0)
    }
    if(depuredBuffer2.lastIndexOf(8) != -1 && (2 == depuredBuffer2[depuredBuffer2.lastIndexOf(8)-1] )){
        SpecialInput2 = "28"
        p2InputBuffer.splice(0)
    }
    if(depuredBuffer2.lastIndexOf(2) != -1 && (2 == depuredBuffer2[depuredBuffer2.lastIndexOf(2)-1] )){
        SpecialInput2 = "22"
    }
    if(depuredBuffer2.lastIndexOf("A") != -1 && depuredBuffer2.lastIndexOf(2) != -1 && (2 == depuredBuffer2[depuredBuffer2.lastIndexOf(2)-1])&& ("A" == depuredBuffer2[depuredBuffer2.lastIndexOf(2)+1] )){
        SpecialInput2 = "22A"
        p1InputBuffer.splice(0)
    }
    if(depuredBuffer2.lastIndexOf("B") != -1 && depuredBuffer2.lastIndexOf(2) != -1 && (2 == depuredBuffer2[depuredBuffer2.lastIndexOf(2)-1])&& ("B" == depuredBuffer2[depuredBuffer2.lastIndexOf(2)+1] )){
        SpecialInput2 = "22B"
        p1InputBuffer.splice(0)
    }
}

function filterBlankSpace(input){
    if(input !== ""){
        return true
    }
    return false

}