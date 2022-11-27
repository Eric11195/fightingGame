const canvas = document.querySelector("canvas")
const c = canvas.getContext("2d")

canvas.width = 1024
canvas.height = 576

//fondo
//hacer un rectangulo con vertices--> fillRect(xPosInicial,yPosInicial,xPosFinal,yPosInicial)
c.fillRect(0,0,canvas.width,canvas.height)

//aceleración de la gravedad para cuando no toquen el suelo
const gravity =0.16

//object for POO, are the characters
class Sprite {
    //parametros iniciales de cualquier objeto que creemos de esta clase.
    //({}) --> el orden ya no importa pq son propiedades de un objeto y no son obligatorias
    constructor({position, velocity, jumps, color, unable, offset}){
        //creación de atributos del objeto
        this.position = position
        this.velocity = velocity
        this.height = 150
        this.width = 50
        //number of jumps before touching floor again
        this.jumps = jumps
        //no estas haciendo nada
        this.unable = unable
        //color of the character
        this.color = color
        //creation of hitbox
        this.hitBox = {
            position: {
                x: this.position.x +10,
                y: this.position.y +10,
            },
            //desplazamiento de la hitbox para cambios de sentido
            offset,
            width: 100,
            height: 50,
        }
        //control barra de vida
        this.health = 100
        //has pulsado el boton para atacar
        this.isAttacking
    }
    draw() {
        //pintar personaje
        c.fillStyle = this.color //color
        c.fillRect(this.position.x, this.position.y, this.width, this.height)
    

        //painting hitBox
        if (this.isAttacking){
            c.fillStyle = "white"
        c.fillRect(
            this.hitBox.position.x, 
            this.hitBox.position.y, 
            this.hitBox.width, 
            this.hitBox.height)
        
        }
    }

    //para dibujar las cosas en la posición actualizada
    update() {
        this.draw()
        this.hitBox.position.y = this.position.y + this.hitBox.offset.y
        this.hitBox.position.x = this.position.x + this.hitBox.offset.x
        //movimiento en eje x
        this.position.x += this.velocity.x
        //posición en y se le suma la velocidad que tenga en ese momento
        this.position.y += this.velocity.y
        //comporbar si toca el suelo
        if(this.position.y + this.height + this.velocity.y >= canvas.height){
            this.velocity.y = 0
            this.jumps.n = 2
        } else this.velocity.y += gravity//aceleración en caida
    }
        
    attack() {
        if (player.velocity.y == 0){
            this.velocity.x = 0
        }
        setTimeout(() =>{
            this.isAttacking = true
            setTimeout(() =>{
                this.isAttacking = false
                setTimeout(() => {
                    this.unable = false
                },167)
            },123)
        },83)
    }
}

//crear un objeto de la clase Sprite-->({})
const player = new Sprite({
    //posición es un objeto
    position: {
        x:0,
        y:0
    },//velocity es otro objeto
    velocity: {
        x:0,
        y:0
    },
    jumps: {
        n:0
    },
    offset: {
        x:10,
        y:10
    },
    unable: false,
    color: "blue"

})

const enemy = new Sprite({
    position: {
        x:400,
        y:100
    },//velocity es otro objeto
    velocity: {
        x:0,
        y:0
    },
    //you can jump twice
    jumps: {
        n:0
    },
    offset: {
        x:-60,
        y:10
    },
    unable: false,
    color: "red"
})


//console.log(player)//saca por consola todos los parametros de player

//crear un objeto para saber que teclas se estan tocando
const keys = {
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

    AL: {
        pressed: false
    },
    AR: {
        pressed: false
    },
    AU: {
        pressed: false
    },
    dot: {
        pressed: false
    }
}

//condicion la hitbox de un player tocando la del otro
function hitboxCollision({hitbox, Enemy}) {
    return (
        hitbox.hitBox.position.x + hitbox.hitBox.width >= Enemy.position.x && 
        hitbox.hitBox.position.x <= Enemy.position.x + Enemy.width &&
        hitbox.hitBox.position.y + hitbox.hitBox.height >= Enemy.position.y &&
        hitbox.hitBox.position.y <= Enemy.position.y + Enemy.height
    )
}

//checkea si la partida se ha acabado
var playing = true

function checkWinner({player, enemy, timerId}){
    playing = false
    clearTimeout(timerId)
    if(player.health === enemy.health || player.health <=0 && enemy.health <=0){
        document.querySelector('#displayResults').innerHTML = 'Tie'
    }else if (player.health > enemy.health){
        document.querySelector('#displayResults').innerHTML = 'Player 1 WINS'
    }else if (player.health < enemy.health){
        document.querySelector('#displayResults').innerHTML = 'Player 2 WINS'
    }
}


let timer = 60;
let timerId
function decreaseTimer() {
    if (timer> 0) {
        //loop
        timerId = setTimeout (decreaseTimer, 1000)
        timer--
        document.querySelector('#timer').innerHTML = timer
    }else {
        checkWinner({player, enemy, timerId})
    }

}

decreaseTimer()


//barras de vida, movimiento, ataques...
function animate(){
    //Crea un bucle infinito
    window.requestAnimationFrame(animate)
    //pintar fondo por encima como si fuese processing
    c.fillStyle = "black"
    c.fillRect(0, 0, canvas.width, canvas.height)
    //dibuja a los jugadores en la posición actualizada
    player.update()//objeto player de la clase Sprite usando metodo update del
    enemy.update()
    
        if(playing) {

        if (player.unable == false){
            //acciones cuando hay alguna tecla pulsada
            if (keys.f.pressed){
                player.attack()
                player.unable = true
            }else if (player.velocity.y != 0){
                //los saltos no son controlables en el aire
            }else if (keys.d.pressed && keys.a.pressed){
                player.velocity.x = 0
            } else if (keys.d.pressed){
                player.velocity.x = 1
            } else if (keys.a.pressed){
                player.velocity.x = -1
            } else {
                player.velocity.x = 0
            }
        }


        if (enemy.unable == false){
            //acciones cuando hay alguna tecla pulsada
            if (keys.dot.pressed){
                enemy.attack()
                enemy.unable = true
            }else if (enemy.velocity.y != 0){
                //los saltos no son controlables en el aire
            }else if (keys.AL.pressed && keys.AR.pressed){
                enemy.velocity.x = 0
            } else if (keys.AR.pressed){
                enemy.velocity.x = 1
            } else if (keys.AL.pressed){
                enemy.velocity.x = -1
            } else {
                enemy.velocity.x = 0
            }
        }

        //detect for collision of hitbox and contrary character
        //se detecta si el lado más alejado del personaje de la hitbox, esta a más distancia que el lado más cercano del enemigo 
        //eje x
        if (hitboxCollision({
            hitbox: player,
            Enemy: enemy,
            }) && player.isAttacking
        ) {
            console.log("goPlayer")
            enemy.health -= 20
            document.querySelector('#enemyHealth').style.width = enemy.health + '%'
            //solo detecta una vez la colisión por cada vez que pulsemos la tecla
            player.isAttacking = false
        }
        if (hitboxCollision({
            hitbox: enemy,
            Enemy: player,
            }) && enemy.isAttacking
        ) {
            console.log("goEnemy")
            player.health -= 20
            document.querySelector('#playerHealth').style.width = player.health + '%'
            //solo detecta una vez la colisión por cada vez que pulsemos la tecla
            enemy.isAttacking = false
        }

        if(enemy.health <= 0 || player.health <= 0 || timer <=0){
            checkWinner({player, enemy, timerId})

        }
    }else{
        player.isAttacking = false
        enemy.isAttacking = false
    }
}

animate()

//espera a que pase algo (''), y devuelve lo siguiente ,()
//se activa cada vez que se presiona una tecla
window.addEventListener('keydown', (event) => {
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
        case ' ':
            //doble salto direccional
            keys.space.pressed = true
            if(playing){
                if (player.jumps.n > 0){
                    if (keys.a.pressed == false && keys.d.pressed == false || keys.a.pressed == true && keys.d.pressed == true){
                        player.velocity.x = 0
                    }else if (keys.a.pressed == true){
                        player.velocity.x = -1
                    }else if (keys.d.pressed == true){
                        player.velocity.x = 1
                    }
                    player.velocity.y= -9
                    player.jumps.n --
                }
            }
            break


        case 'ArrowRight':
            //si la d esta presionada el objeto keys dice que d= true
            //o sea que estamos pulsando esta tecla vamos
            keys.AR.pressed = true
            break
        case 'ArrowLeft':
            keys.AL.pressed = true
            break

        case '.':
            keys.dot.pressed = true
            break
        case 'ArrowUp':
            if (playing){
                keys.AU.pressed = true
                if (enemy.jumps.n > 0){
                    if (keys.AL.pressed == false && keys.AR.pressed == false || keys.AL.pressed == true && keys.AR.pressed == true){
                        enemy.velocity.x = 0
                    }else if (keys.AL.pressed == true){
                        enemy.velocity.x = -1
                    }else if (keys.AU.pressed == true){
                        enemy.velocity.x = 1
                    }
                    enemy.velocity.y= -9
                    enemy.jumps.n --
                }
            }
            break
        }
    }
)

//se activa cada vez que se suelta una tecla
window.addEventListener('keyup', (event) => {
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
            break
        case 'f':
            keys.f.pressed = false
            break

        case 'ArrowRight':
            keys.AR.pressed = false
            break
        case 'ArrowLeft':
            keys.AL.pressed = false
            break
        case '.':
            keys.dot.pressed = false
            break
        case 'ArrowUp':
            keys.AU.pressed = false
            break

    }
    console.log(event)
})