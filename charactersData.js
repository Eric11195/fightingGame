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
class Sprite{
    //parametros iniciales de cualquier objeto que creemos de esta clase.
    //({}) --> el orden ya no importa pq son propiedades de un objeto y no son obligatorias
    constructor({fakePosition, imageSrc, scale = 1, framesMax = 1, offset = {x:0 ,y:0}, image = new Image()}){
        //creación de atributos del objeto
        this.fakePosition = fakePosition
        this.image = image
        this.image.src = imageSrc
        this.width = 50
        this.height = 150
        this.scale = scale
        this.framesMax = framesMax
        this.framesCurrent = 0
        this.framesElapsed = 0
        this.framesHold = 5
        this.offset = offset
    }
    draw(){
        c.drawImage(
            this.image,
            this.framesCurrent * (this.image.width / this.framesMax),
            0,
            this.image.width/this.framesMax,
            this.image.height,
            this.fakePosition.x - this.offset.x, 
            this.fakePosition.y - this.offset.y, 
            (this.image.width/this.framesMax) * this.scale, 
            this.image.height * this.scale)
    }

    update(){
        this.draw()
        this.framesElapsed++
        if(this.framesElapsed % this.framesHold === 0){
            if(this.framesCurrent < this.framesMax -1){
                this.framesCurrent++
            }else {
                this.framesCurrent = 0
            }
        }
    }

}

class Fighter extends Sprite{
    //parametros iniciales de cualquier objeto que creemos de esta clase.
    //({}) --> el orden ya no importa pq son propiedades de un objeto y no son obligatorias
    constructor({sprites,image, offset, imageSrc, scale = 1, framesMax = 1, inCombo, batting, cancelWindow, attackHasLand, GB,WB, WS, wallSplated,juggleMultiplier,attackHitting, invulnerable,SKD, HKD, DashRemains, FramesCharging, position, velocity, jumps, color, side, perfectBlock, jumpMaxPoint, canvasContext, canvasRef, unable, blockType, blockState, framesBlocking, height, agachado, fakePosition, initAttack, blockStun}){
        super({
            imageSrc,
            fakePosition,
            scale,
            framesMax,
            offset, 
            image
        })
        this.dirX = 1
        //creación de atributos del objeto
        this.canvasContext = canvasContext
        this.canvasRef = canvasRef
        this.position = position
        //this.fakePosition = fakePosition
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
        this.inCombo = inCombo
        this.attackHitting = attackHitting
        this.attackHasLand = attackHasLand
        this.cancelWindow = cancelWindow
        this.batting = batting

        this.framesCurrent = 0
        this.framesElapsed = 0
        this.framesHold = 5
        this.sprites = sprites

        for (const sprite in this.sprites){
            sprites[sprite].image = new Image()
            sprites[sprite].image.src = sprites[sprite].imageSrc
        }

    }

    //comprueba si se ha llegado a la posición de salto máx
    checkJumpMaxHeight(){
        if ((this.velocity.y == 0) && ((this.position.y + this.height + this.velocity.y + 95) < this.canvasRef.height)){
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

    switchSprite(sprite){
        if(this.side === "left"){
            switch(sprite){
                case 'idle': 
                    if(this.image !== this.sprites.idleI.image){
                        this.image = this.sprites.idleI.image
                        this.framesMax = this.sprites.idleI.framesMax
                        this.framesCurrent = 0
                        console.log("idle")
                    }
                    break
                case 'dash': 
                    if(this.image !== this.sprites.dashI.image){
                        this.image = this.sprites.dashI.image
                        this.framesMax = this.sprites.dashI.framesMax
                        this.framesCurrent = 0
                        console.log("dash")
                    }
                    break
                case 'run':
                    if(this.image !== this.sprites.runI.image){
                        this.image = this.sprites.runI.image
                        this.framesMax = this.sprites.runI.framesMax
                        this.framesCurrent = 0
                    }
                    break
                case 'back':
                    if(this.image !== this.sprites.backI.image){
                        this.image = this.sprites.backI.image
                        this.framesMax = this.sprites.backI.framesMax
                        this.framesCurrent = 0
                    }
                    break
                case 'jump':
                    if(this.image !== this.sprites.jumpingI.image){
                        this.image = this.sprites.jumpingI.image
                        this.framesMax = this.sprites.jumpingI.framesMax
                        this.framesCurrent = 0
                    }
                    break
                case 'fall':
                    if(this.image !== this.sprites.fallingI.image){
                        this.image = this.sprites.fallingI.image
                        this.framesMax = this.sprites.fallingI.framesMax
                        this.framesCurrent = 0
                    }
                    break
                case 'crouch':
                    if(this.image !== this.sprites.crouchI.image){
                        this.image = this.sprites.crouchI.image
                        this.framesMax = this.sprites.crouchI.framesMax
                        this.framesCurrent = 0
                    }
                    break
            }
        }else if(this.side === "right"){
            switch(sprite){
                case 'idle': 
                    if(this.image !== this.sprites.idleD.image){
                        this.image = this.sprites.idleD.image
                        this.framesMax = this.sprites.idleD.framesMax
                        this.framesCurrent = 0
                        console.log("idle")
                    }
                    break
                case 'run':
                    if(this.image !== this.sprites.backD.image){
                        this.image = this.sprites.backD.image
                        this.framesMax = this.sprites.backD.framesMax
                        this.framesCurrent = 0
                        
                    }
                    break
                case 'dash': 
                    if(this.image !== this.sprites.dashD.image){
                        this.image = this.sprites.dashD.image
                        this.framesMax = this.sprites.dashD.framesMax
                        this.framesCurrent = 0
                        console.log("dash")
                    }
                    break
                case 'back':
                    if(this.image !== this.sprites.runD.image){
                        this.image = this.sprites.runD.image
                        this.framesMax = this.sprites.runD.framesMax
                        this.framesCurrent = 0
                    }
                    break
                case 'jump':
                    if(this.image !== this.sprites.jumpingD.image){
                        this.image = this.sprites.jumpingD.image
                        this.framesMax = this.sprites.jumpingD.framesMax
                        this.framesCurrent = 0
                    }
                    break
                case 'fall':
                    if(this.image !== this.sprites.fallingD.image){
                        this.image = this.sprites.fallingD.image
                        this.framesMax = this.sprites.fallingD.framesMax
                        this.framesCurrent = 0
                    }
                    break
                case 'crouch':
                    if(this.image !== this.sprites.crouchD.image){
                        this.image = this.sprites.crouchD.image
                        this.framesMax = this.sprites.crouchD.framesMax
                        this.framesCurrent = 0
                    }
                    break
            }
        }
    }

    update(){ 
        this.draw()
        this.animating()
    }

    animating(){
        this.framesElapsed++
        if(this.framesElapsed % this.framesHold === 0){
            if(this.framesCurrent < this.framesMax -1){
                this.framesCurrent++
            }else {
                this.framesCurrent = 0
            }
        }
    }

    //para dibujar las cosas en la posición actualizada
    

}



export const background = new Sprite({
    fakePosition:{
        x:0,
        y:0
    },
    imageSrc: './img/background.png'
})

export const shop = new Sprite({
    fakePosition:{
        x:600,
        y:128
    },
    framesMax: 6,
    imageSrc: './img/shop.png',
    scale: 2.75
})

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

export class Projectile{
    constructor({juggleValue, noFalloff,timeUntilAppear, attackClass, hitstun, position, width, height, offset, damage, pushblock, pushhit,forceApply, forceX, forceY, velocity, onScreen}){
        this.onScreen = onScreen
        this.attackClass = attackClass
        this.damage = damage
        this.timeUntilAppear = timeUntilAppear
        this.hitstun = hitstun
       
        //creation of hitbox
        this.position = position
        this.velocity = velocity

        this.width = width
        this.height = height
        //desplazamiento de la hitbox para cambios de sentido
        this.offset = offset
        this.pushblock = pushblock
        this.pushhit = pushhit

        this.forceApply = forceApply
        this.forceX = forceX
        this.forceY = forceY
        this.juggleValue = juggleValue
        this.noFalloff = noFalloff
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
    width:70,
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
    width:70,
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
    width:90,
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
    width:90,
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
//special moves---------------------------------------------------------------------------------------------------------------------
export const ddBone = new Attack({
    attackClass: "MID",
    lowProfile: false,

    startup: 32,
    active: 0,
    recovery: 8,

    onHit: 0,
    onBlock: 0,

    position: {
        x:0,
        y:0
    },

    width:0,
    height:0,
    offset: {
        x: 0,
        y:  0,
    },

    damage:0,
    pushblock:0,
    pushhit:0, 

    forceApply: "none",
    forceX:0,
    forceY:0
})

export const ddBtwo = new Attack({
    attackClass: "MID",
    lowProfile: false,

    startup: 32,
    active: 0,
    recovery: 8,

    onHit: 0,
    onBlock: 0,

    position: {
        x:0,
        y:0
    },

    width:0,
    height:0,
    offset: {
        x: 0,
        y:  0,
    },

    damage:0,
    pushblock:0,
    pushhit:0, 

    forceApply: "none",
    forceX:0,
    forceY:0
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
    width:70,
    height:70,
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

//projectiles--------------------------------------------------------------------------------------------------------------------------------------------------

export const rock1 = new Projectile({
    attackClass: "PROJECTILE",
    onScreen: false,
    timeUntilAppear: ddBone.startup,

    hitstun: 24,

    position: {
        x:0,
        y:100
    },
    velocity: {
        x:0,
        y:-8
    },
    width:70,
    height:70,
    offset: {
        x: 70,
        y: 0,
    },
    damage:15,
    pushblock:40,
    pushhit: 10, 

    forceApply: "none",
    forceX:0,
    forceY:0,
    juggleValue: -50,
    noFalloff: false


})

export const rock2 = new Projectile({
    attackClass: "PROJECTILE",
    onScreen: false,
    timeUntilAppear: ddBtwo.startup,

    hitstun: 24,

    position: {
        x:0,
        y:100
    },
    velocity: {
        x:0,
        y:-8
    },
    width:80,
    height:80,
    offset: {
        x: 70,
        y: 0,
    },
    damage:15,
    pushblock:40,
    pushhit:10, 

    forceApply: "none",
    forceX:0,
    forceY:0,
    juggleValue: -50,
    noFalloff: false

})


//crear un objeto de la clase Sprite-->({})
export const player = new Fighter({
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
        y:374
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
    wallSplated: false,
    inCombo: false,
    attackHitting: false,
    attackHasLand: false,
    cancelWindow: false,
    batting: false,

    framesMax: 10,
    imageSrc: './img/batGirl/idleI.png',
    scale: 1.45,

    offset:{
        x:68,
        y:75
    },
    sprites:{
        idleI:{
            imageSrc: './img/batGirl/idleI.png',
            framesMax: 10
        },
        runI:{
            imageSrc: './img/batGirl/runI.png',
            framesMax: 3,
        },
        backI:{
            imageSrc: './img/batGirl/walkBackI.png',
            framesMax: 4,
        },
        fallingI:{
            imageSrc: './img/batGirl/riseI.png',
            framesMax: 2,
        },
        jumpingI:{
            imageSrc: './img/batGirl/descendI.png',
            framesMax: 2,
        },
        dashI:{
            imageSrc: './img/batGirl/dashI.png',
            framesMax: 2,
        },
        crouchI:{
            imageSrc: './img/batGirl/crouchI.png',
            framesMax: 10,
        },
        idleD:{
            imageSrc: './img/batGirl/idleD.png',
            framesMax: 10
        },
        runD:{
            imageSrc: './img/batGirl/runD.png',
            framesMax: 3,
        },
        backD:{
            imageSrc: './img/batGirl/walkBackD.png',
            framesMax: 4,
        },
        fallingD:{
            imageSrc: './img/batGirl/riseD.png',
            framesMax: 2,
        },
        jumpingD:{
            imageSrc: './img/batGirl/descendD.png',
            framesMax: 2,
        },
        dashD:{
            imageSrc: './img/batGirl/dashD.png',
            framesMax: 2,
        },
        crouchD:{
            imageSrc: './img/batGirl/crouchD.png',
            framesMax: 10,
        },
    }
})

export const enemy = new Fighter({
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
        y:374
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
    inCombo: false,
    attackHitting: false,
    attackHasLand: false,
    cancelWindow: false,
    batting: false, 

    framesMax: 4,
    imageSrc: './img/batGirl/idle2I.png',
    scale: 1.45,
    offset:{
        x:68,
        y:75
    },
    sprites:{
        idleI:{
            imageSrc: './img/batGirl/idle2I.png',
            framesMax: 10
        },
        runI:{
            imageSrc: './img/batGirl/run2I.png',
            framesMax: 3,
        },
        fallingI:{
            imageSrc: './img/batGirl/rise2I.png',
            framesMax: 2,
        },
        backI:{
            imageSrc: './img/batGirl/back2I.png',
            framesMax: 4,
        },
        jumpingI:{
            imageSrc: './img/batGirl/descend2I.png',
            framesMax: 2,
        },
        dashI:{
            imageSrc: './img/batGirl/dash2I.png',
            framesMax: 2,
        },
        idleD:{
            imageSrc: './img/batGirl/idle2D.png',
            framesMax: 10
        },
        crouchI:{
            imageSrc: './img/batGirl/crouch2I.png',
            framesMax: 10,
        },
        runD:{
            imageSrc: './img/batGirl/run2D.png',
            framesMax: 3,
        },
        fallingD:{
            imageSrc: './img/batGirl/rise2D.png',
            framesMax: 2,
        },
        backD:{
            imageSrc: './img/batGirl/back2D.png',
            framesMax: 4,
        },
        jumpingD:{
            imageSrc: './img/batGirl/descend2D.png',
            framesMax: 2,
        },
        dashD:{
            imageSrc: './img/batGirl/dash2D.png',
            framesMax: 2,
        },
        crouchD:{
            imageSrc: './img/batGirl/crouch2D.png',
            framesMax: 10,
        },
    }
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
    who.isAttacking = true
    who.initAttack = false
    who.attackHitting = true
}

function ACTIVE(who){
    who.isAttacking = false
    who.attackHitting = false
    who.cancelWindow = true

}

function RECOVERY(who){
    if(!who.batting){
        who.unable = false
        who.myAttack = "none"
        who.agachado = false
        who.cancelWindow = false
    }
}
export function update(who, move, playerProjectile) {

    draw(who, move, playerProjectile)
    who.update();

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

    if(playerProjectile.onScreen){
        playerProjectile.position.y += playerProjectile.velocity.y
        playerProjectile.position.x += playerProjectile.velocity.x

        if(playerProjectile.position.y + playerProjectile.height +100 <= who.canvasRef.height){
            if(!playerProjectile.noFalloff){
                playerProjectile.velocity.y += GRAVITY
            }else{
                playerProjectile.velocity.y = 0
            }
        }else {
            playerProjectile.onScreen = false
        }
    }

    who.wallCollision()
    //posición hitbox
    if(who.side == "left"){
        move.position.x = who.fakePosition.x + move.offset.x
    }else{
        move.position.x = who.fakePosition.x - move.width + who.width - move.offset.x
    }
    move.position.y = who.position.y + move.offset.y 


    //comprobar si toca el suelo
    if(who.position.y + who.height + who.velocity.y + 95>= who.canvasRef.height ){
        //lo toca
        who.position.y = who.canvasRef.height - who.height - 95
        who.jumps.n = 2
        //who.fakePosition.y = 380
        if(!who.GB){
            if(!who.DashRemains){
                who.inCombo = false
            }
                who.velocity.y = 0
            if(who.HKD){
                who.HKD = false
                who.juggleMultiplier = 100
                who.velocity.x = 0
                who.invulnerable = true
                who.unable = true
                setTimeout(GetUpKnockDown, (62)*1000/FPS, who)
            }else if(who.SKD){
                who.SKD = false
                who.juggleMultiplier = 100
                who.velocity.x = 0
                who.invulnerable = true
                who.unable = true
                setTimeout(GetUpKnockDown, (15)*1000/FPS, who)
            }
        }else{
            who.GB = false
            who.velocity.y = -who.velocity.y
            who.WB = false
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
                //console.log("miau")
                who.velocity.y = 0
                setTimeout(stopWS, (40)*1000/FPS, who)
            }
        }
    }
    who.checkJumpMaxHeight()
}

export function draw(who, move, playerProjectile) {
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
    if(playerProjectile.onScreen){
        who.canvasContext.fillStyle = "brown"
        who.canvasContext.fillRect(
            playerProjectile.position.x, 
            playerProjectile.position.y, 
            playerProjectile.width, 
            playerProjectile.height
        )
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
    character.velocity.x -= 3*direction
}


export function Dash(characterG){
    characterG.unable = true
    characterG.agachado = true
    characterG.DashRemains = true
    characterG.switchSprite("dash")
    setTimeout(DashFinished, (15)*1000/FPS, characterG)
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
    //console.log("miau")
}

function stopWS(character){
    character.wallSplated = false
}