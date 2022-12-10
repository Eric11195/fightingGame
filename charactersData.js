const GRAVITY = 0.65
export const speed = 4
export const jumpForce = -15
export const longJumpForce = -10
export const highJumpForce = -20
export const secondJumpForce = -12
export const longJumpSpeed = 10
export const runSpeed = 16
export const airRunSpeed = 10


const canvas = document.querySelector("canvas")
const c = canvas.getContext("2d")

export var pDerecha = "izq"

export let timer = 60;
export let timerId
//la partida no ha acabado
export let playing = true

export const FPS = 60;
export class Sprite {
    //parametros iniciales de cualquier objeto que creemos de esta clase.
    //({}) --> el orden ya no importa pq son propiedades de un objeto y no son obligatorias
    constructor({GB,WB, WS, wallSplated,juggleMultiplier, invulnerable,SKD, HKD, DashRemains, FramesCharging, position, velocity, jumps, color, side, perfectBlock, jumpMaxPoint, canvasContext, canvasRef, unable, blockType, blockState, framesBlocking, height, agachado, fakePosition, initAttack, blockStun}){
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
        this.blockState = blockState
        this.blockType = blockType
        this.framesBlocking = framesBlocking
        this.initAttack = initAttack
        this.blockStun = blockStun
        this.side = side
        this.perfectBlock = perfectBlock
        this.DashRemains = DashRemains
        this.FramesCharging = FramesCharging
        this.HKD = HKD
        this.SKD = SKD
        this.invulnerable = invulnerable
        this.juggleMultiplier = juggleMultiplier
        this.GB = GB
        this.WB = WB
        this.WS = WS
        this.wallSplated = wallSplated
    }

    //comprueba si se ha llegado a la posición de salto máx
    checkJumpMaxHeight(){
        if ((this.velocity.y == 0) && ((this.position.y + this.height + this.velocity.y) < this.canvasRef.height)){
            this.jumpMaxPoint = true
        }else this.jumpMaxPoint = false
    }

    wallCollision(){
        if(this.fakePosition.x < speed){
            this.fakePosition.x = speed
            if(this.WB){
                this.velocity.x = -this.velocity.x
                this.WB = false
            }
            if(this.WS){
                this.WS = false
                this.wallSplated = true
                this.velocity.x = 0

            }
        }
        if(this.fakePosition.x > (1024 - this.width - speed)){
            this.fakePosition.x = 1024 - speed - this.width
            if(this.WB){
                this.velocity.x = -this.velocity.x
            }
            if(this.WS){
                this.WS = false
                this.wallSplated = true
                this.velocity.x = 0
            }
        }
    }

    //para dibujar las cosas en la posición actualizada
    

}


export class Attack{
    constructor({juggleValue, attackClass, startup, active, recovery, position, width, height, offset, damage, pushblock, pushhit, onHit, onBlock, lowProfile,forceApply, forceX, forceY}){
            this.attackClass = attackClass
            this.damage = damage

            this.startup = startup
            this.active = active
            this.recovery = recovery
           
            //creation of hitbox
            this.position = position
            this.width = width
            this.height = height
            //desplazamiento de la hitbox para cambios de sentido
            this.offset = offset
            this.pushblock = pushblock
            this.pushhit = pushhit
            this.onBlock = onBlock
            this.onHit = onHit
            this.lowProfile = lowProfile
            this.forceApply = forceApply
            this.forceX = forceX
            this.forceY = forceY
            this.juggleValue = juggleValue
            }

}


export const stAone = new Attack({
    attackClass: "HIGH",
    lowProfile: false,

    startup: 4,
    active: 2,
    recovery: 9,

    onHit: 3,
    onBlock: -2,

    position: {
        x:0,
        y:0
    },
    width:100,
    height:35,
    offset: {
        x: 40,
        y: 20,
    },
    damage:5,
    pushblock:20,
    pushhit:15, 

    forceApply: "air",
    forceX:1,
    forceY:-4,
    juggleValue: -15

})
export const stAtwo = new Attack({
    attackClass: "HIGH",
    lowProfile: false,

    startup: 4,
    active: 2,
    recovery: 9,

    onHit: 3,
    onBlock: -2,

    position: {
        x:0,
        y:0
    },
    width:100,
    height:35,
    offset: {
        x: 40,
        y: 20,
    },
    damage:5,
    pushblock:20,
    pushhit:15, 

    forceApply: "air",
    forceX:1,
    forceY:-4,
    juggleValue: -15

})
export const aAone = new Attack({
    attackClass: "OVERHEAD",
    lowProfile: false,

    startup: 5,
    active: 5,
    recovery: 8,

    onHit: 5,
    onBlock: 2,

    position: {
        x:0,
        y:0
    },
    width:80,
    height:50,
    offset: {
        x: -15,
        y: 120,
    },
    damage:2,
    pushblock:15,
    pushhit:5, 

    forceApply: "air",
    forceX:1,
    forceY:-4,
    juggleValue: -5

})
export const aAtwo = new Attack({
    attackClass: "OVERHEAD",
    lowProfile: false,

    startup: 5,
    active: 5,
    recovery: 8,

    onHit: 5,
    onBlock: 2,

    position: {
        x:0,
        y:0
    },
    width:80,
    height:50,
    offset: {
        x: -15,
        y: 120,
    },
    damage:2,
    pushblock:15,
    pushhit:5, 

    forceApply: "air",
    forceX:1,
    forceY:-4,
    juggleValue: -5

})

export const crAone = new Attack({
    attackClass: "LOW",
    lowProfile: true,

    startup: 7,
    active: 2,
    recovery: 12,

    onHit: 1,
    onBlock: -4,

    position: {
        x:0,
        y:0
    },
    width:140,
    height:30,
    offset: {
        x: 30,
        y: 70,
    },
    damage:4,
    pushblock:30,
    pushhit:20, 

    forceApply: "air",
    forceX:2,
    forceY:-5,
    juggleValue: -7
})
export const crAtwo = new Attack({
    attackClass: "LOW",
    lowProfile: true,

    startup: 7,
    active: 2,
    recovery: 12,

    onHit: 1,
    onBlock: -4,

    position: {
        x:0,
        y:0
    },
    width:140,
    height:30,
    offset: {
        x: 30,
        y: 70,
    },
    damage:4,
    pushblock:30,
    pushhit:20, 

    forceApply: "air",
    forceX:2,
    forceY:-5,
    juggleValue: -7
})
export const crstAone = new Attack({
    attackClass: "OVERHEAD",
    lowProfile: false,

    startup: 23,
    active: 2,
    recovery: 12,

    onHit: 1,
    onBlock: -8,

    position: {
        x:0,
        y:0
    },
    width:50,
    height:50,
    offset: {
        x: 70,
        y: 40,
    },
    damage:8,
    pushblock:30,
    pushhit:20, 

    forceApply: "GB",
    forceX:1,
    forceY:14,
    juggleValue: -15
})
export const crstAtwo = new Attack({
    attackClass: "OVERHEAD",
    lowProfile: false,

    startup: 23,
    active: 2,
    recovery: 17,

    onHit: 1,
    onBlock: -8,

    position: {
        x:0,
        y:0
    },
    width:50,
    height:50,
    offset: {
        x: 70,
        y: 40,
    },
    damage:8,
    pushblock:30,
    pushhit:20, 

    forceApply: "GB",
    forceX:1,
    forceY:14,
    juggleValue: -15
})
export const Alvl1one = new Attack({
    attackClass: "MID",
    lowProfile: false,

    startup: 5,
    active: 5,
    recovery: 20,

    onHit: "SKD",
    onBlock: -4,

    position: {
        x:0,
        y:0
    },
    width:150,
    height:120,
    offset: {
        x: 50,
        y: 0,
    },
    damage:6,
    pushblock:40,
    pushhit:25, 

    forceApply: "air",
    forceX:2,
    forceY:2,
})

export const Alvl1two = new Attack({
    attackClass: "MID",
    lowProfile: false,

    startup: 5,
    active: 5,
    recovery: 20,

    onHit: "SKD",
    onBlock: -4,

    position: {
        x:0,
        y:0
    },
    width:150,
    height:120,
    offset: {
        x: 50,
        y: 0,
    },
    damage:6,
    pushblock:40,
    pushhit:25, 

    forceApply: "air",
    forceX:2,
    forceY:2
})

export const Blvl1one = new Attack({
    attackClass: "MID",
    lowProfile: false,

    startup: 7,
    active: 5,
    recovery: 20,

    onHit: "SKD",
    onBlock: -13,

    position: {
        x:0,
        y:0
    },
    width:150,
    height:120,
    offset: {
        x: 50,
        y: 0,
    },
    damage:3,
    pushblock:30,
    pushhit:15, 

    forceApply: "WS",
    forceX:15,
    forceY:-2,
    juggleValue: -50
})
export const Blvl1two = new Attack({
    attackClass: "MID",
    lowProfile: false,

    startup: 7,
    active: 5,
    recovery: 20,

    onHit: "SKD",
    onBlock: -4,

    position: {
        x:0,
        y:0
    },
    width:150,
    height:120,
    offset: {
        x: 50,
        y: 0,
    },
    damage:3,
    pushblock:30,
    pushhit:15, 

    forceApply: "WS",
    forceX:15,
    forceY:-2,
    juggleValue: -50
})
export const Blvl2one = new Attack({
    attackClass: "MID",
    lowProfile: false,

    startup: 2,
    active: 5,
    recovery: 20,

    onHit: "SKD",
    onBlock: -2,

    position: {
        x:0,
        y:0
    },
    width:150,
    height:120,
    offset: {
        x: 50,
        y: 0,
    },
    damage:5,
    pushblock:40,
    pushhit:25, 

    forceApply: "WB",
    forceX:13,
    forceY:-17,
    juggleValue: -20
})
export const Blvl2two = new Attack({
    attackClass: "MID",
    lowProfile: false,

    startup: 2,
    active: 5,
    recovery: 20,

    onHit: "SKD",
    onBlock: -2,

    position: {
        x:0,
        y:0
    },
    width:150,
    height:120,
    offset: {
        x: 50,
        y: 0,
    },
    damage:5,
    pushblock:40,
    pushhit:25, 

    forceApply: "WB",
    forceX:35,
    forceY:-20,
    juggleValue: -20
})
export const Alvl2one = new Attack({
    attackClass: "MID",
    lowProfile: false,

    startup: 2,
    active: 5,
    recovery: 20,

    onHit: "HKD",
    onBlock: 3,

    position: {
        x:0,
        y:0
    },
    width:150,
    height:120,
    offset: {
        x: 50,
        y: 0,
    },
    damage:10,
    pushblock:60,
    pushhit:20, 

    forceApply: "air",
    forceX:2,
    forceY:3
})
export const Alvl2two = new Attack({
    attackClass: "MID",
    lowProfile: false,

    startup: 2,
    active: 5,
    recovery: 20,

    onHit: "HKD",
    onBlock: 3,

    position: {
        x:0,
        y:0
    },
    width:150,
    height:120,
    offset: {
        x: 50,
        y: 0,
    },
    damage:10,
    pushblock:60,
    pushhit:20, 

    forceApply: "air",
    forceX:2,
    forceY:3
})
export const Alvl3one = new Attack({
    attackClass: "UNBLOCKABLE",
    lowProfile: false,

    startup: 1,
    active: 5,
    recovery: 30,

    onHit: "HKD",
    onBlock: 40,

    position: {
        x:0,
        y:0
    },
    width:150,
    height:120,
    offset: {
        x: 50,
        y: 0,
    },
    damage:12,
    //pushblock:80,
    pushhit:100, 

    forceApply: "GB",
    forceX:1,
    forceY: 20,
    juggleValue: 0
})
export const Alvl3two = new Attack({
    attackClass: "UNBLOCKABLE",
    lowProfile: false,

    startup: 1,
    active: 5,
    recovery: 30,

    onHit: "HKD",
    onBlock: 40,

    position: {
        x:0,
        y:0
    },
    width:150,
    height:120,
    offset: {
        x: 50,
        y: 0,
    },
    damage:12,
    //pushblock:80,
    pushhit:100, 

    forceApply: "GB",
    forceX:1,
    forceY: 20,
    juggleValue: 0
})
export const Blvl3two = new Attack({
    attackClass: "UNBLOCKABLE",
    lowProfile: false,

    startup: 1,
    active: 5,
    recovery: 35,

    onHit: "HKD",
    //onBlock: 40,

    position: {
        x:0,
        y:0
    },
    width:150,
    height:120,
    offset: {
        x: 50,
        y: 0,
    },
    damage:5,
    //pushblock:80,
    pushhit:30, 

    forceApply: "WB",
    forceX:40,
    forceY:-18,
    juggleValue: 0
})

export const Blvl3one = new Attack({
    attackClass: "UNBLOCKABLE",
    lowProfile: false,

    startup: 1,
    active: 5,
    recovery: 35,

    onHit: "HKD",
    //onBlock: -2,

    position: {
        x:0,
        y:0
    },
    width:150,
    height:120,
    offset: {
        x: 50,
        y: 0,
    },
    damage:5,
    pushblock:40,
    pushhit:25, 

    forceApply: "WB",
    forceX:40,
    forceY:-18,
    juggleValue: 0
})

export const ddAone = new Attack({
    attackClass: "MID",
    lowProfile: false,

    startup: 12,
    active: 4,
    recovery: 18,

    onHit: "HKD",
    onBlock: -12,

    position: {
        x:0,
        y:0
    },
    width:80,
    height:80,
    offset: {
        x: 70,
        y: 70,
    },
    damage:6,
    pushblock:30,
    pushhit:10, 

    forceApply: "ground",
    forceX:1,
    forceY:-15,
    juggleValue: 0
})
export const ddAtwo = new Attack({
    attackClass: "MID",
    lowProfile: false,

    startup: 12,
    active: 4,
    recovery: 18,

    onHit: 40,
    onBlock: -12,

    position: {
        x:0,
        y:0
    },
    width:80,
    height:80,
    offset: {
        x: 70,
        y: 70,
    },
    damage:6,
    pushblock:30,
    pushhit:10, 

    forceApply: "ground",
    forceX:1,
    forceY:-15,
    juggleValue: 0
})

export const stBone = new Attack({
    attackClass: "MID",
    lowProfile: false,

    startup: 9,
    active: 5,
    recovery: 15,

    onHit: 5,
    onBlock: 2,

    position: {
        x:0,
        y:0
    },
    width:100,
    height:100,
    offset: {
        x: 50,
        y: 25,
    },
    damage:5,
    pushblock:15,
    pushhit:8, 

    forceApply: "air",
    forceX:3,
    forceY:-7,
    juggleValue: -3
})
export const stBtwo = new Attack({
    attackClass: "MID",
    lowProfile: false,

    startup: 9,
    active: 5,
    recovery: 15,

    onHit: 5,
    onBlock: 2,

    position: {
        x:0,
        y:0
    },
    width:100,
    height:100,
    offset: {
        x: 50,
        y: 25,
    },
    damage:5,
    pushblock:15,
    pushhit:8, 

    forceApply: "air",
    forceX:3,
    forceY:-7,
    juggleValue: -3
})
export const crBone = new Attack({
    attackClass: "LOW",
    lowProfile: true,

    startup: 16,
    active: 7,
    recovery: 15,

    onHit: "HKD",
    onBlock: -14,

    position: {
        x:0,
        y:0
    },

    width:370,
    height:40,
    offset: {
        x: -150,
        y: 60,
    },

    damage:8,
    pushblock:15,
    pushhit:8, 

    forceApply: "air",
    forceX:3,
    forceY:5
})
export const crBtwo = new Attack({
    attackClass: "LOW",
    lowProfile: true,

    startup: 16,
    active: 7,
    recovery: 36,

    onHit: "HKD",
    onBlock: -14,

    position: {
        x:0,
        y:0
    },

    width:370,
    height:40,
    offset: {
        x: -150,
        y: 60,
    },
    
    damage:8,
    pushblock:15,
    pushhit:8, 

    forceApply: "air",
    forceX:3,
    forceY:5
})
export const aBone = new Attack({
    attackClass: "OVERHEAD",
    lowProfile: false,

    startup: 16,
    active: 5,
    recovery: 20,

    onHit: 12,
    onBlock: 5,

    position: {
        x:0,
        y:0
    },

    width:175,
    height:150,
    offset: {
        x: 25,
        y:  90,
    },

    damage:4,
    pushblock:30,
    pushhit:20, 

    forceApply: "air",
    forceX:2,
    forceY:-18,
    juggleValue: -20
})
export const aBtwo = new Attack({
    attackClass: "OVERHEAD",
    lowProfile: false,

    startup: 16,
    active: 5,
    recovery: 20,

    onHit: 12,
    onBlock: 5,

    position: {
        x:0,
        y:0
    },

    width:175,
    height:150,
    offset: {
        x: 25,
        y:  90,
    },

    damage:4,
    pushblock:30,
    pushhit:20, 

    forceApply: "air",
    forceX:2,
    forceY:-18,
    juggleValue: -20
})
export const fBone = new Attack({
    attackClass: "HIGH",
    lowProfile: false,

    startup: 18,
    active: 4,
    recovery: 18,

    onHit: 5,
    onBlock: -7,

    position: {
        x:0,
        y:0
    },

    width:230,
    height:40,
    offset: {
        x: 50,
        y:  20,
    },

    damage:4,
    pushblock:40,
    pushhit:30, 

    forceApply: "air",
    forceX:10,
    forceY:5
})
export const fBtwo = new Attack({
    attackClass: "HIGH",
    lowProfile: false,

    startup: 18,
    active: 4,
    recovery: 18,

    onHit: 5,
    onBlock: -7,

    position: {
        x:0,
        y:0
    },

    width:230,
    height:40,
    offset: {
        x: 50,
        y:  20,
    },

    damage:4,
    pushblock:40,
    pushhit:30, 

    forceApply: "air",
    forceX:10,
    forceY:5
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
    unable: false,
    color: "blue",
    jumpMaxPoint: false,
    canvasContext: c,
    canvasRef: canvas,
    blockState: false,
    blocktype: "none",
    framesBlocking: 0,
    height: 150,
    agachado: false,
    fakePosition:{
        x:362 ,
        y:874
    },
    initAttack: false,
    blockStun: false,
    side: "left",
    isAttacking: false,
    perfectBlock: false,
    FramesCharging: 0,
    HKD: false,
    SKD: false,
    invulnerable: false,
    juggleMultiplier: 100,
    GB: false,
    WB: false,
    WS: false,
    wallSplated: false
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
    unable: false,
    color: "red",
    jumpMaxPoint: false,
    canvasContext: c,
    canvasRef: canvas,
    blockState: false,
    blockType: "none",
    framesBlocking: 0,
    height: 150,
    agachado: false,
    fakePosition:{
        x:612,
        y:874
    },
    initAttack: false,
    blockStun: false,
    side: "right",
    isAttacking: false,
    perfectBlock: false,
    FramesCharging: 0,
    HKD: false,
    SKD: false,
    invulnerable: false,
    juggleMultiplier: 100,
    GB: false,
    WB: false,
    WS: false,
    wallSplated: false,
})

//-----------------------------------------------------------------------------
//checkea que personaje esta más a la izquierda del otro
export function playerSide() {
    if (player.position.x < enemy.position.x){
        pDerecha = "izq"
    } else pDerecha = "der"
        

}

//condicion la hitbox de un player tocando la del otro....................................................hereadbnawuiodhbauiowd
export function hitboxCollision({hitbox, Enemy}) {
    return (
        hitbox.position.x + hitbox.width >= Enemy.position.x && 
        hitbox.position.x <= Enemy.position.x + Enemy.width &&
        hitbox.position.y + hitbox.height >= Enemy.position.y &&
        hitbox.position.y <= Enemy.position.y + Enemy.height
    )
}

//si se chocan al andar o en salto
export function xPlayerCollision({me, opponent}) {
    return (
        (me.fakePosition.x + me.width + me.velocity.x +1 >= opponent.fakePosition.x) && ((pDerecha == "izq") && (me.fakePosition.y + me.height >= opponent.fakePosition.y && me.fakePosition.y <= opponent.fakePosition.y + opponent.height))
    )
}

export function xEnemyCollision({meE, opponentE}) {
    return (
        (meE.fakePosition.x + meE.width + meE.velocity.x +1  >= opponentE.fakePosition.x && pDerecha == "der" && (meE.fakePosition.y + meE.height >= opponentE.fakePosition.y && meE.fakePosition.y <= opponentE.fakePosition.y + opponentE.height))
    )
}

export function minusxPlayerCollision({Me, Opponent}){
    return (
        Opponent.fakePosition.x + Opponent.width +1  >= Me.fakePosition.x - Me.velocity.x && ((pDerecha == "der") && (Me.fakePosition.y + Me.height >= Opponent.fakePosition.y && Me.fakePosition.y <= Opponent.fakePosition.y + Opponent.height))
    )
}
export function minusxEnemyCollision({MeE, OpponentE}){
    return (
        (OpponentE.fakePosition.x + OpponentE.width +1 >= MeE.fakePosition.x - MeE.velocity.x) && ((pDerecha == "izq") && (MeE.fakePosition.y + MeE.height >= OpponentE.fakePosition.y && MeE.fakePosition.y <= OpponentE.fakePosition.y + OpponentE.height))
    )
}

export function attack(who,move) {
    who.unable = true
    who.initAttack = true
    if(move.lowProfile){
        who.agachado = true
    }else who.agachado = false

    setTimeout(STARTUP, move.startup*1000/FPS, who)
    setTimeout(ACTIVE, (move.startup+move.active)*1000/FPS, who)
    setTimeout(RECOVERY, (move.startup+move.active+move.recovery)*1000/FPS, who)
}

function STARTUP(who){
    //console.log("S")
    who.isAttacking = true
    who.initAttack = false
}

function ACTIVE(who){
    //console.log("A")
    who.isAttacking = false
}

function RECOVERY(who){
    who.unable = false
    who.myAttack = "none"
    who.agachado = false
}
export function update(who, move) {
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

    who.wallCollision()
    //posición hitbox
    if(who.side == "left"){
        move.position.x = who.fakePosition.x + move.offset.x
    }else{
        move.position.x = who.fakePosition.x - move.width + who.width - move.offset.x//10
    }
    move.position.y = who.position.y + move.offset.y 

    draw(who, move)

    //comprobar si toca el suelo
    if(who.position.y + who.height + who.velocity.y >= who.canvasRef.height){
        //lo toca
        who.position.y = who.canvasRef.height - who.height
        who.jumps.n = 2
        who.fakePosition.y = 476
        if(!who.GB){
            who.velocity.y = 0
            if(who.HKD){
                who.juggleMultiplier = 100
                who.velocity.x = 0
                who.invulnerable = true
                who.unable = true
                setTimeout(GetUpKnockDown, (52)*1000/FPS, who)
            }else if(who.SKD){
                who.juggleMultiplier = 100
                who.velocity.x = 0
                who.invulnerable = true
                who.unable = true
                setTimeout(GetUpKnockDown, (15)*1000/FPS, who)
            }
        }else{
            who.GB = false
            who.WB = false
            //who.WS = false
        }
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
    } else {
        if(!who.airDashRemains){
            if(!who.wallSplated){
                who.velocity.y += GRAVITY//aceleración en caida
            }else{
                console.log("miau")
                who.velocity.y = 0
                setTimeout(stopWS, (40)*1000/FPS, who)
            }
        }
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

//reloj-----------------------------------------------------------------------------------
export function decreaseTimer() {
    if (timer> 0) {
        //loop
        timerId = setTimeout (decreaseTimer, 1000)
        timer--
        document.querySelector('#timer').innerHTML = timer
    }else {
        checkWinner({player, enemy, timerId})
    }

}

export function checkWinner({player, enemy, timerId}){
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

export function airDash(character, direction){
    character.velocity.y = -8
    //setTimeout(airDashFinished, (10)*1000/FPS, character)
    character.velocity.x -= 3*direction
}


/*function airDashFinished(character){
    console.log('miau')
}*/

export function Dash(characterG, directionG){
    characterG.unable = true
    characterG.agachado = true
    characterG.DashRemains = true
    setTimeout(DashFinished, (15)*1000/FPS, characterG)
    characterG.velocity.x -= 2*directionG
}
function DashFinished(characterG){
    characterG.unable = false
    characterG.agachado = false
    characterG.DashRemains = false
    //console.log('miau')
}

function GetUpKnockDown(character){
    character.invulnerable = false
    character.unable = false
    character.HKD = false
    character.SKD = false
}

function stopWS(character){
    character.wallSplated = false
}