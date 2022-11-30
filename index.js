import {FPS, player, enemy, speed, jumpForce, pDerecha, playerSide, xEnemyCollision, xPlayerCollision, minusxEnemyCollision, minusxPlayerCollision, hitboxCollision} from './charactersData.js'
import {keys, jumpingE, jumpingP} from './inputHandler.js'
import {checkWinner, decreaseTimer, timer, timerId, playing, canvas, c} from './System.js'

//fondo
//hacer un rectangulo con vertices--> fillRect(xPosInicial,yPosInicial,xPosFinal,yPosInicial)
c.fillRect(0,0,canvas.width,canvas.height)

//aceleración de la gravedad para cuando no toquen el suelo




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
        if(keys.space.pressed && ((!player.unable && !(player.velocity.y != 0 || player.jumpMaxPoint == true)) || (player.velocity.y != 0 || player.jumpMaxPoint == true))){
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
        }
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


        if(keys.AU.pressed && ((!enemy.unable && !(enemy.velocity.y != 0 || enemy.jumpMaxPoint == true)) || (enemy.velocity.y != 0 || enemy.jumpMaxPoint == true))){
            keys.AU.pressed = false
            if (enemy.jumps.n > 0 ){
                if (pDerecha == "der"){
                    enemy.offset.x = 10
                }else{
                    enemy.offset.x = -60                
                }
                if (keys.AL.pressed == false && keys.AR.pressed == false || keys.AL.pressed == true && keys.AR.pressed == true){
                    enemy.velocity.x = 0
                }else if (keys.AL.pressed == true){
                    enemy.velocity.x = -speed
                }else if (keys.AR.pressed == true){
                    enemy.velocity.x = speed
                }
                enemy.velocity.y= jumpForce
                enemy.jumps.n--
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



