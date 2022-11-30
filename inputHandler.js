//checkea si la partida se ha acabado
export var jumpingP = false
export var jumpingE = false

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

//espera a que pase algo (''), y devuelve lo siguiente ,()
//se activa cada vez que se presiona una tecla
export const KEYDOWN = window.addEventListener('keydown', (event) => {
    //mira que teclas as tocado
    switch (event.key) {
        case 'd':
            //si la d esta presionada el objeto keys dice que d= true
            //o sea que estamos pulsando esta tecla vamos
            keys.d.pressed = true
            break
        case 'a':
            keys.a.pressed = true
            break
        case 'f':
            keys.f.pressed = true
            break
        case 's':
            keys.s.pressed = true
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
            break
        case 'ArrowLeft':
            keys.AL.pressed = true
            break
        case 'ArrowDown':
            keys.AD.pressed = true
            break   
        case '.':
            keys.dot.pressed = true
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
            break
        case 'a':
            keys.a.pressed = false
            break
        case ' ':
            keys.space.pressed = false
            jumpingP = false
            break
        case 'f':
            keys.f.pressed = false
            break
        case 's':
            keys.s.pressed = false
            break

        case 'ArrowRight':
            keys.AR.pressed = false
            break
        case 'ArrowLeft':
            keys.AL.pressed = false
            break
        case 'ArrowDown':
            keys.AD.pressed = false
            break
        case '.':
            keys.dot.pressed = false
            break
        case 'ArrowUp':
            keys.AU.pressed = false
            jumpingE = false
            break

    }
})