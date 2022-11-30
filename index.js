import {FPS, player, enemy, speed, jumpForce} from './charactersData.js'
import {keys, jumpingE, jumpingP} from './inputHandler.js'
import {checkWinner, decreaseTimer, timer, timerId, playing, canvas, c} from './System.js'

//fondo
//hacer un rectangulo con vertices--> fillRect(xPosInicial,yPosInicial,xPosFinal,yPosInicial)
c.fillRect(0,0,canvas.width,canvas.height)

//aceleración de la gravedad para cuando no toquen el suelo


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

//barras de vida, movimiento, ataques...
function animate(){

    //console.log(player.offset.y)
    //checkea para donde se mira y cambia la hitbox en consecuencia
    playerSide()
    //Crea un bucle infinito para que el juego funcione a un numero de fps concreto
    setTimeout(() => {
        requestAnimationFrame(animate)
    },1000/FPS)

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
            }else if(keys.space.pressed){
                keys.space.pressed = false
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
            }else if (player.velocity.y != 0 || player.jumpMaxPoint){
                if((enemy.velocity.y != 0 || enemy.jumpMaxPoint) && (xPlayerCollision({ me: player, opponent: enemy}) || minusxPlayerCollision({ Me: player, Opponent: enemy}))){
                    player.velocity.x = 0
                }
                //los saltos no son controlables en el aire
            }else if (keys.d.pressed && keys.a.pressed){
                player.velocity.x = 0
            }else if (keys.d.pressed){
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
            }else if(keys.AU.pressed){
                keys.AU.pressed = false
                if (enemy.jumps.n > 0 ){
                    if (pDerecha == "der"){
                        enemy.offset.x = 10
                    }else{
                        enemy.offset.x = -60                
                    }
                    if (keys.AL.pressed == false && keys.AR.pressed == false || keys.AR.pressed == true && keys.AL.pressed == true){
                        enemy.velocity.x = 0
                    }else if (keys.AL.pressed == true){
                        enemy.velocity.x = -speed
                    }else if (keys.AR.pressed == true){
                        enemy.velocity.x = speed
                    }
                enemy.velocity.y= jumpForce
                enemy.jumps.n--
                }
            
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
decreaseTimer()



