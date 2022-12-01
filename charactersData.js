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
    constructor({myAttack, position, velocity, jumps, color, side, jumpMaxPoint, canvasContext, canvasRef, unable, block, framesBlocking, height, agachado, fakePosition, initAttack, blockStun}){
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
        //control barra de vida
        this.health = 100
        //has pulsado el boton para atacar
        this.isAttacking
        this.block = block
        this.framesBlocking = framesBlocking
        this.initAttack = initAttack
        this.blockStun = blockStun
        this.side = side
        this.myAttack = myAttack
    }

    //comprueba si se ha llegado a la posición de salto máx
    checkJumpMaxHeight(){
        if ((this.velocity.y == 0) && ((this.position.y + this.height + this.velocity.y) < this.canvasRef.height)){
            this.jumpMaxPoint = true
        }else this.jumpMaxPoint = false
    }

    //para dibujar las cosas en la posición actualizada
    

}


export class Attack{
    constructor({attackClass, startup, active, recovery, position, width, height, offset}){
            this.attackClass = attackClass

            this.startup = startup
            this.active = active
            this.recovery = recovery
           
            //creation of hitbox
            this.position = position
            this.width = width
            this.height = height
            //desplazamiento de la hitbox para cambios de sentido
            this.offset = offset             
            }

}

export const stAone = new Attack({
    attackClass: "HIGH",

    startup: 4,
    active: 2,
    recovery: 9,

    position: {
        x:0,
        y:0
    },
    width:100,
    height:35,
    offset: {
        x: 50,
        y: 0,
    }

})
export const stAtwo = new Attack({
    attackClass: "HIGH",

    startup: 4,
    active: 2,
    recovery: 9,

    position: {
        x:0,
        y:0
    },
    width:100,
    height:35,
    offset: {
        x: 50,
        y: 0,
    }

})




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
    /*offset: {
        x:0,
        y:0
    },*/
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
        x:362 ,
        y:0
    },
    initAttack: false,
    blockStun: false,
    side: "left",
    myAttack: "none"
})

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
    /*offset: {
        x:0,
        y:0
    },*/
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
        x:612,
        y:0
    },
    initAttack: false,
    blockStun: false,
    side: "right",
    myAttack: "none"
})

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
        hitbox.position.x + hitbox.width >= Enemy.position.x && 
        hitbox.position.x <= Enemy.position.x + Enemy.width &&
        hitBox.position.y + hitBox.height >= Enemy.position.y &&
        hitBox.position.y <= Enemy.position.y + Enemy.height
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

export function attack(who,move) {
    who.unable = true
    who.initAttack = true

    if(who.side == "left"){
        move.position.x = who.fakePosition.x + move.offset.x
    }else{
        move.position.x = who.fakePosition.x - move.width //- move.offset.x
    }
    move.position.y = who.position.y + move.offset.y 

    setTimeout(() =>{
        who.isAttacking = true
        setTimeout(() =>{
            who.isAttacking = false
            setTimeout(() => {
                who.initAttack = false
                who.unable = false
                who.myAttack = "none"
            },(move.startup+move.active+move.recovery)*1000/FPS)
        },(move.startup+move.active)*1000/FPS)
    },move.startup*1000/FPS)
}

export function update(who, move) {
    //console.log(enemy.position.y)aaa.
    //console.log(player.position.y)
    if(who.agachado){
        who.height = 100
        who.position.y = who.fakePosition.y
    }else{
        who.height = 150
        who.position.y = who.fakePosition.y - 50
    }
    who.position.x = who.fakePosition.x
    //movimiento en eje x
    who.fakePosition.x += who.velocity.x
    //posición en y se le suma la velocidad que tenga en ese momento
    who.fakePosition.y += who.velocity.y

    draw(who, move)

    //comprobar si toca el suelo
    if(who.position.y + who.height + who.velocity.y >= who.canvasRef.height){
        who.velocity.y = 0
        who.position.y = who.canvasRef.height - who.height
        who.jumps.n = 2
        who.fakePosition.y = 476
        playerSide()
        if(who == player){
            if(pDerecha == "der"){
                player.side = "right"
            }else {
                player.side = "left"
            }
        }
        if(who == enemy){
            if(pDerecha == "izq"){
                enemy.side = "right"
            }else {
                enemy.side = "left"
            }
        }

        if(who.unable == true){
            who.velocity.x = 0
        }
    } else {
        //this.offset.y = 110
        who.velocity.y += GRAVITY//aceleración en caida
    }
    who.checkJumpMaxHeight()
}

export function draw(who, move) {
    //pintar personaje
    who.canvasContext.fillStyle = who.color //color
    who.canvasContext.fillRect(who.position.x, who.position.y, who.width, who.height)
    //painting hitBox
    if (who.isAttacking){
        who.canvasContext.fillStyle = "white"
        who.canvasContext.fillRect(
            move.position.x, 
            move.position.y, 
            move.width, 
            move.height)
        }
}