const canvas = document.querySelector("canvas")
const c = canvas.getContext("2d")

canvas.width = 1024
canvas.height = 576

//fondo
//hacer un rectangulo con vertices--> fillRect(xPosInicial,yPosInicial,xPosFinal,yPosInicial)
c.fillRect(0,0,canvas.width,canvas.height)

//aceleración de la gravedad para cuando no toquen el suelo
const gravity = 0.5
const speed = 3
const jumpForce = -15

//object for POO, are the characters
class Sprite {
    //parametros iniciales de cualquier objeto que creemos de esta clase.
    //({}) --> el orden ya no importa pq son propiedades de un objeto y no son obligatorias
    constructor({position, velocity, jumps, color, unable, offset, jumpMaxPoint}){
        //creación de atributos del objeto
        this.position = position
        this.velocity = velocity
        this.height = 150
        this.width = 50
        //number of jumps before touching floor again
        this.jumps = jumps
        this.jumpMaxPoint = jumpMaxPoint
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
            width: 100,
            height: 50,
        }
        //desplazamiento de la hitbox para cambios de sentido
        this.offset = offset
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

    //comprueba si se ha llegado a la posición de salto máx
    checkJumpMaxHeight(){
        if (this.velocity.y == 0 && this.position.y + this.height + this.velocity.y != canvas.height){
            this.jumpMaxPoint = true
        }else this.jumpMaxPoint = false
    }

    //para dibujar las cosas en la posición actualizada
    update() {
        //movimiento en eje x
        this.position.x += this.velocity.x
        //posición en y se le suma la velocidad que tenga en ese momento
        this.position.y += this.velocity.y

        this.hitBox.position.y = this.position.y + this.offset.y
        this.hitBox.position.x = this.position.x + this.offset.x

        this.draw()

        //comprobar si toca el suelo
        if(this.position.y + this.height + this.velocity.y >= canvas.height){
            this.velocity.y = 0
            this.jumps.n = 2
            this.offset.y = 10
            if(this.unable == true){
                this.velocity.x = 0
            }
        } else {
            this.offset.y = 110
            this.velocity.y += gravity//aceleración en caida
        }
        this.checkJumpMaxHeight()
    }
        
    //startup,active,recovery
    attack() {
        this.unable = true
        setTimeout(() =>{
            this.isAttacking = true
            setTimeout(() =>{
                this.isAttacking = false
                setTimeout(() => {
                    this.unable = false
                },(4+2+9)*1000/fps)
            },(4+2)*1000/fps)
        },4*1000/fps)
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
        x:0,
        y:0
    },
    unable: false,
    color: "blue",
    jumpMaxPoint: false

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
        x:0,
        y:0
    },
    unable: false,
    color: "red",
    jumpMaxPoint: false
})



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

var pDerecha = "izq"
//checkea que personaje esta más a la izquierda del otro
function playerSide() {
    if (player.position.x < enemy.position.x){
        pDerecha = "izq"
    } else pDerecha = "der"

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

//si se chocan al andar o en salto
function xPlayerCollision({me, opponent}) {
    return (
        me.position.x + me.width + me.velocity.x + 10 >= opponent.position.x && pDerecha == "izq"
    )
}

function xEnemyCollision({meE, opponentE}) {
    return (
        meE.position.x + meE.width + meE.velocity.x + 10 >= opponentE.position.x && pDerecha == "der"
    )
}

function minusxPlayerCollision({Me, Opponent}){
    return (
        Opponent.position.x + Opponent.width + 10 >= Me.position.x && pDerecha == "der"
    )
}
function minusxEnemyCollision({MeE, OpponentE}){
    return (
        OpponentE.position.x + OpponentE.width + 10 >= MeE.position.x && pDerecha == "izq"
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

const fps = 60
//barras de vida, movimiento, ataques...
function animate(){

    console.log(player.offset.y)
    //checkea para donde se mira y cambia la hitbox en consecuencia
    playerSide()
    //Crea un bucle infinito para que el juego funcione a un numero de fps concreto
    setTimeout(() => {
        requestAnimationFrame(animate)
    },1000/fps)

    //pintar fondo por encima como si fuese processing
    c.fillStyle = "black"
    c.fillRect(0, 0, canvas.width, canvas.height)
    //dibuja a los jugadores en la posición actualizada
    player.update()//objeto player de la clase Sprite usando metodo update del
    enemy.update()
    
    if(playing) {

        if (!player.unable){
            if(!(player.velocity.y != 0 || player.jumpMaxPoint == true)){
                if (pDerecha == "izq"){
                    player.offset.x = 10
                }else{
                    player.offset.x = -60                
                }
            }
            //acciones cuando hay alguna tecla pulsada
            if (keys.f.pressed){
                player.attack()
            }else if (player.velocity.y != 0 || player.jumpMaxPoint == true){
                if((enemy.velocity.y != 0 || enemy.jumpMaxPoint == true) && (xPlayerCollision({ me: player, opponent: enemy}) || minusxPlayerCollision({ Me: player, Opponent: enemy}))){
                    player.velocity.x = 0
                }
                //los saltos no son controlables en el aire
            }else if (keys.d.pressed && keys.a.pressed){
                player.velocity.x = 0
            } else if (keys.d.pressed){
                if(!xPlayerCollision({ me: player, opponent: enemy}) || (enemy.velocity.y != 0 || enemy.jumpMaxPoint == true)){
                    player.velocity.x = speed
                }else player.velocity.x = 0
            } else if (keys.a.pressed){
                if(!minusxPlayerCollision({ Me: player, Opponent: enemy}) || (enemy.velocity.y != 0 || enemy.jumpMaxPoint == true)){
                    player.velocity.x = -speed
                }else player.velocity.x = 0
            } else {
                player.velocity.x = 0
            }
        }


        if (!enemy.unable){
            //acciones cuando hay alguna tecla pulsada
            if (keys.dot.pressed){
                if(!(enemy.velocity.y != 0 || enemy.jumpMaxPoint == true)){
                    if (pDerecha == "der"){
                        enemy.offset.x = 10
                    }else{
                        enemy.offset.x = -60                
                    }
                }
                enemy.attack()
            //los saltos no son controlables en el aire
            }else if (enemy.velocity.y != 0 || enemy.jumpMaxPoint == true){
                if((player.velocity.y != 0 || player.jumpMaxPoint == true) && (xEnemyCollision({ meE: enemy, opponentE: player}) || minusxEnemyCollision({ MeE: enemy, OpponentE: player}))){
                    enemy.velocity.x = 0
                }
            }else if (keys.AL.pressed && keys.AR.pressed){
                enemy.velocity.x = 0
            } else if (keys.AR.pressed){
                if(!xEnemyCollision({ meE: enemy, opponentE: player}) || (player.velocity.y != 0 || player.jumpMaxPoint == true)){
                    enemy.velocity.x = speed
                }else enemy.velocity.x = 0
            } else if (keys.AL.pressed){
                if(!minusxEnemyCollision({ MeE: enemy, OpponentE: player}) || (player.velocity.y != 0 || player.jumpMaxPoint == true)){
                    enemy.velocity.x = -speed
                }else enemy.velocity.x = 0
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
        enemy.velocity.x = 0
        player.velocity.x = 0
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
                if (player.jumps.n > 0 ){
                        if (pDerecha == "izq"){
                            player.offset.x = 10
                        }else{
                            player.offset.x = -60                
                        }
                    if (keys.a.pressed == false && keys.d.pressed == false || keys.a.pressed == true && keys.d.pressed == true){
                        player.velocity.x = 0
                    }else if (keys.a.pressed == true){
                        player.velocity.x = -speed
                    }else if (keys.d.pressed == true){
                        player.velocity.x = speed
                    }
                    player.velocity.y= jumpForce
                    player.jumps.n--
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
            keys.AU.pressed = true
            if (playing){                 
                if (enemy.jumps.n > 0){
                    if (pDerecha == "der"){
                        enemy.offset.x = 10
                    }else{
                        enemy.offset.x = -60                
                    }
                    if (keys.AL.pressed == false && keys.AR.pressed == false || keys.AL.pressed == true && keys.AR.pressed == true){
                        enemy.velocity.x = 0
                    }else if (keys.AL.pressed == true){
                        enemy.velocity.x = -speed
                    }else if (keys.AU.pressed == true){
                        enemy.velocity.x = speed
                    }
                    enemy.velocity.y= jumpForce
                    enemy.jumps.n--
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
    //console.log(event)
})