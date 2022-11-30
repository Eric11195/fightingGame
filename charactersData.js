const GRAVITY = 0.8;
export const speed = 4
export const jumpForce = -16

const canvas = document.querySelector("canvas")
const c = canvas.getContext("2d")

export var pDerecha = "izq"

export const FPS = 60;
export class Sprite {
    //parametros iniciales de cualquier objeto que creemos de esta clase.
    //({}) --> el orden ya no importa pq son propiedades de un objeto y no son obligatorias
    constructor({position, velocity, jumps, color, offset, jumpMaxPoint, canvasContext, canvasRef, unable, block, framesBlocking, height, agachado, fakePosition, initAttack, blockStun}){
        //creación de atributos del objeto
        this.canvasContext = canvasContext
        this.canvasRef = canvasRef
        this.position = position
        this.fakePosition = fakePosition
        this.agachado = agachado
        this.velocity = velocity
        this.height = height
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
        this.block = block
        this.framesBlocking = framesBlocking
        this.initAttack = initAttack
        this.blockStun = blockStun
    }
    draw() {
        //pintar personaje
        this.canvasContext.fillStyle = this.color //color
        this.canvasContext.fillRect(this.position.x, this.position.y, this.width, this.height)
        //agachado
    

        //painting hitBox
        if (this.isAttacking){
            this.canvasContext.fillStyle = "white"
            this.canvasContext.fillRect(
                this.hitBox.position.x, 
                this.hitBox.position.y, 
                this.hitBox.width, 
                this.hitBox.height)
        
            }
    }

    //comprueba si se ha llegado a la posición de salto máx
    checkJumpMaxHeight(){
        if ((this.velocity.y == 0) && ((this.position.y + this.height + this.velocity.y) < this.canvasRef.height)){
            this.jumpMaxPoint = true
        }else this.jumpMaxPoint = false
    }

    //para dibujar las cosas en la posición actualizada
    update() {
        console.log()
        
        //movimiento en eje x
        this.fakePosition.x += this.velocity.x
        //posición en y se le suma la velocidad que tenga en ese momento
        this.fakePosition.y += this.velocity.y
        if(this.agachado){
            this.height = 100
            this.position.y = this.fakePosition.y
        }else{
            this.height = 150
            this.position.y = this.fakePosition.y - 50
        }
        this.position.x = this.fakePosition.x

        this.hitBox.position.y = this.position.y + this.offset.y
        this.hitBox.position.x = this.position.x + this.offset.x

        this.draw()

        //comprobar si toca el suelo
        if(this.position.y + this.height + this.velocity.y >= this.canvasRef.height){
            this.velocity.y = 0
            this.jumps.n = 2
            this.offset.y = 10
            if(this.unable == true){
                this.velocity.x = 0
            }
        } else {
            this.offset.y = 110
            this.velocity.y += GRAVITY//aceleración en caida
        }
        this.checkJumpMaxHeight()
    }
        
    //startup,active,recovery
    attack() {
        this.unable = true
        this.initAttack = true
        setTimeout(() =>{
            this.isAttacking = true
            setTimeout(() =>{
                this.isAttacking = false
                setTimeout(() => {
                    this.initAttack = false
                    this.unable = false
                },(4+2+9)*1000/FPS)
            },(4+2)*1000/FPS)
        },4*1000/FPS)
    }

}



//crear un objeto de la clase Sprite-->({})
export const player = new Sprite({
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
    jumpMaxPoint: false,
    canvasContext: c,
    canvasRef: canvas,
    block: {
        state: false,
        type: "none"
    },
    framesBlocking: 0,
    height: 150,
    agachado: false,
    fakePosition:{
        x:0,
        y:0
    },
    initAttack: false,
    blockStun: false
});

export const enemy = new Sprite({
    position: {
        x:0,
        y:0
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
    jumpMaxPoint: false,
    canvasContext: c,
    canvasRef: canvas,
    block: {
        state: false,
        type: "none"
    },
    framesBlocking: 0,
    height: 150,
    agachado: false,
    fakePosition:{
        x:400,
        y:100
    },
    initAttack: false,
    blockStun: false
});

//-----------------------------------------------------------------------------
//checkea que personaje esta más a la izquierda del otro
export function playerSide() {
    if (player.position.x < enemy.position.x){
        pDerecha = "izq"
    } else pDerecha = "der"
        

}

//condicion la hitbox de un player tocando la del otro
export function hitboxCollision({hitbox, Enemy}) {
    return (
        hitbox.hitBox.position.x + hitbox.hitBox.width >= Enemy.position.x && 
        hitbox.hitBox.position.x <= Enemy.position.x + Enemy.width &&
        hitbox.hitBox.position.y + hitbox.hitBox.height >= Enemy.position.y &&
        hitbox.hitBox.position.y <= Enemy.position.y + Enemy.height
    )
}

//si se chocan al andar o en salto
export function xPlayerCollision({me, opponent}) {
    return (
        me.position.x + me.width + me.velocity.x + 10 >= opponent.position.x && pDerecha == "izq"
    )
}

export function xEnemyCollision({meE, opponentE}) {
    return (
        meE.position.x + meE.width + meE.velocity.x + 10 >= opponentE.position.x && pDerecha == "der"
    )
}

export function minusxPlayerCollision({Me, Opponent}){
    return (
        Opponent.position.x + Opponent.width + 10 >= Me.position.x && pDerecha == "der"
    )
}
export function minusxEnemyCollision({MeE, OpponentE}){
    return (
        OpponentE.position.x + OpponentE.width + 10 >= MeE.position.x && pDerecha == "izq"
    )
}