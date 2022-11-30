

const GRAVITY = 0.8;
export const speed = 4
export const jumpForce = -16

const canvas = document.querySelector("canvas")
const c = canvas.getContext("2d")

export const FPS = 60;
export class Sprite {
    
    
    //parametros iniciales de cualquier objeto que creemos de esta clase.
    //({}) --> el orden ya no importa pq son propiedades de un objeto y no son obligatorias
    constructor({position, velocity, jumps, color, offset, jumpMaxPoint, canvasContext, canvasRef, unable}){
        //creación de atributos del objeto
        this.canvasContext = canvasContext;
        this.canvasRef = canvasRef;
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
        this.canvasContext.fillStyle = this.color //color
        this.canvasContext.fillRect(this.position.x, this.position.y, this.width, this.height)
    

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
        
        //movimiento en eje x
        this.position.x += this.velocity.x
        //posición en y se le suma la velocidad que tenga en ese momento
        this.position.y += this.velocity.y

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
        setTimeout(() =>{
            this.isAttacking = true
            setTimeout(() =>{
                this.isAttacking = false
                setTimeout(() => {
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
    canvasRef: canvas

});

export const enemy = new Sprite({
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
    jumpMaxPoint: false,
    canvasContext: c,
    canvasRef: canvas
});