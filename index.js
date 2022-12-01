import {FPS, player, enemy, speed, jumpForce, pDerecha, playerSide, xEnemyCollision, xPlayerCollision, minusxEnemyCollision, minusxPlayerCollision, hitboxCollision, attack, update, stAone, stAtwo} from './charactersData.js'
import {keys, jumpingE, jumpingP} from './inputHandler.js'
import {checkWinner, decreaseTimer, timer, timerId, playing, canvas, c, CROUCHING, STANDING} from './System.js'



//fondo
//hacer un rectangulo con vertices--> fillRect(xPosInicial,yPosInicial,xPosFinal,yPosInicial)
c.fillRect(0,0,canvas.width,canvas.height)


//barras de vida, movimiento, ataques...
function animate(){   
    
    //console.log(keys.AU.pressed && ((enemy.unable && enemy.velocity.y != 0 || !enemy.jumpMaxPoint) || (enemy.velocity.y != 0 || enemy.jumpMaxPoint)))

    //console.log(player.offset.y)
    //checkea para donde se mira y cambia la hitbox en consecuencia
    playerSide()
    if(pDerecha == "izq"){
        if (keys.a.pressed){
            player.block.state = true
            player.framesBlocking++
            if(keys.s.pressed){
                player.block.type = CROUCHING
            }else player.block.type = STANDING
        }else {
            player.block.state = false
            player.framesBlocking = 0
        }
        if (keys.AR.pressed){
            enemy.block.state = true
            enemy.framesBlocking++
            if(keys.AD.pressed){
                enemy.block.type = CROUCHING
            }else enemy.block.type = STANDING
        }else {
            enemy.block.state = false
            enemy.framesBlocking = 0
        }
    }else{
        if (keys.d.pressed){
            player.block.state = true
            player.framesBlocking++
        }else {
            player.block.state = false
            player.framesBlocking = 0
        }
        if (keys.AL.pressed){
            enemy.block.state = true
            enemy.framesBlocking++
        }else {
            enemy.block.state = false
            enemy.framesBlocking = 0
        }
    }


    //checkea bloqueos perfectos--------------------------
    if (player.framesBlocking <= 3 && player.framesBlocking != 0){
    }else  {

    }

    if (enemy.framesBlocking <= 3 && enemy.framesBlocking != 0){
    }else {
        
    }



    //Crea un bucle infinito para que el juego funcione a un numero de fps concreto
    setTimeout(() => {
        requestAnimationFrame(animate)
    },1000/FPS)

    //pintar fondo por encima como si fuese processing
    c.fillStyle = "black"
    c.fillRect(0, 0, canvas.width, canvas.height)
    //dibuja a los jugadores en la posición actualizada
    update(player, stAone)//objeto player de la clase Sprite usando metodo update del
    update(enemy,stAtwo)
    

    if(playing) {
        //player.realPOSnHEIGHT()
        //enemy.realPOSnHEIGHT()



//player--------------------------------------------------------------------------------------------------------
        if(keys.space.pressed && ((player.unable && player.velocity.y == !0 || !player.jumpMaxPoint) || (player.velocity.y != 0 || player.jumpMaxPoint))){
            keys.space.pressed = false
            if (player.jumps.n > 0 ){
                if (pDerecha == "izq"){
                    player.side = "left"
                }else{
                    player.side = "right"               
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
        if(keys.s.pressed && enemy.velocity.y == 0 && !player.jumpMaxPoint){
            player.agachado = true
        }else{
            player.agachado = false
        }
        if (!player.unable){
            if(!(player.velocity.y != 0 || player.jumpMaxPoint == true)){
                /*if (pDerecha == "izq"){
                    //player.side = "right"
                }else{
                    //player.side = "left"               
                }*/
            }
            //acciones cuando hay alguna tecla pulsada
            if (keys.f.pressed){
                attack(player,stAone)
                player.myAttack = stAone
            }else if (player.velocity.y != 0 || player.jumpMaxPoint){
                if((enemy.velocity.y != 0 || enemy.jumpMaxPoint) && (xPlayerCollision({ me: player, opponent: enemy}) || minusxPlayerCollision({ Me: player, Opponent: enemy}))){
                    player.velocity.x = 0
                }
                //los saltos no son controlables en el aire
            }else if (keys.d.pressed && keys.a.pressed && !player.agachado){
                player.velocity.x = 0
            }else if (keys.d.pressed && !player.agachado){
                if(!xPlayerCollision({ me: player, opponent: enemy}) || (enemy.velocity.y != 0 || enemy.jumpMaxPoint == true)){
                    player.velocity.x = speed
                }else player.velocity.x = 0
            } else if (keys.a.pressed && !player.agachado){
                if(!minusxPlayerCollision({ Me: player, Opponent: enemy}) || (enemy.velocity.y != 0 || enemy.jumpMaxPoint == true)){
                    player.velocity.x = -speed
                }else player.velocity.x = 0
            } else {
                player.velocity.x = 0
            }
        }

//enemy---------------------------------------------------------------------------------------------------------
        if(keys.AU.pressed && ((enemy.unable && enemy.velocity.y != 0 || !enemy.jumpMaxPoint) || (enemy.velocity.y != 0 || enemy.jumpMaxPoint))){
            keys.AU.pressed = false
            if (enemy.jumps.n > 0 ){
                if (pDerecha == "der"){
                    enemy.side = "left"
                }else{
                    enemy.side = "right"               
                }
                if (!keys.AL.pressed && !keys.AR.pressed || keys.AL.pressed && keys.AR.pressed){
                    enemy.velocity.x = 0
                }else if (keys.AL.pressed){
                    enemy.velocity.x = -speed
                }else if (keys.AR.pressed){
                    enemy.velocity.x = speed
                }
                enemy.velocity.y = jumpForce
                enemy.jumps.n--
            }
        }
        if(keys.AD.pressed && enemy.velocity.y == 0 && !enemy.jumpMaxPoint){
            enemy.agachado = true
        }else{
            enemy.agachado = false
        }
        if (!enemy.unable){
            //acciones cuando hay alguna tecla pulsada
            if (keys.dot.pressed){
                /*if((enemy.velocity.y = 0 || enemy.jumpMaxPoint) && pDerecha == "der"){
                    //enemy.side = "right"
                }else{
                    //enemy.side = "left"                
                    }*/
                attack(enemy,stAtwo)
                enemy.myAttack = stAtwo

            //los saltos no son controlables en el aire
            }else if (enemy.velocity.y != 0 || enemy.jumpMaxPoint){
                if((player.velocity.y != 0 || player.jumpMaxPoint) && (xEnemyCollision({ meE: enemy, opponentE: player}) || minusxEnemyCollision({ MeE: enemy, OpponentE: player}))){
                    enemy.velocity.x = 0
                }
            }else if (keys.AL.pressed && keys.AR.pressed && !enemy.agachado){
                enemy.velocity.x = 0
            } else if (keys.AR.pressed && !enemy.agachado){
                if(!xEnemyCollision({ meE: enemy, opponentE: player}) || (player.velocity.y != 0 || player.jumpMaxPoint)){
                    enemy.velocity.x = speed
                }else enemy.velocity.x = 0
            } else if (keys.AL.pressed && !enemy.agachado){
                if(!minusxEnemyCollision({ MeE: enemy, OpponentE: player}) || (player.velocity.y != 0 || player.jumpMaxPoint)){
                    enemy.velocity.x = -speed
                }else enemy.velocity.x = 0
            } else {
                enemy.velocity.x = 0
            }
        }
        /*if(enemy.blockStun){
            enemy.unable = true
        }else{
            enemy.unable = false
        }*/

//common--------------------------------------------------------------------------------------------

        //detect for collision of hitbox and contrary character
        //se detecta si el lado más alejado del personaje de la hitbox, esta a más distancia que el lado más cercano del enemigo 
        //eje x
        if(player.myAttack != "none"){
            if (hitboxCollision({hitbox: player.myAttack ,Enemy: enemy,})) {
                if(player.initAttack){
                    enemy.blockStun = true
                }else {
                    enemy.blockStun = false
                }
                if(player.isAttacking){
                    if (enemy.block.state){
                        enemy.health -= 1
                    }else {
                        enemy.health -= 20
                    }

                    document.querySelector('#enemyHealth').style.width = enemy.health + '%'
                    //solo detecta una vez la colisión por cada vez que pulsemos la tecla
                    player.isAttacking = false
                }
            }
        }

        if(player.myAttack != "none"){
            if (hitboxCollision({hitbox: enemy.myAttack, Enemy: player}) && enemy.isAttacking) {
                if (player.block.state){
                    player.health -= 1
                }else {
                    player.health -= 20
                }
                document.querySelector('#playerHealth').style.width = player.health + '%'
                //solo detecta una vez la colisión por cada vez que pulsemos la tecla
                enemy.isAttacking = false
            }

            if(enemy.health <= 0 || player.health <= 0 || timer <=0){
                checkWinner({player, enemy, timerId})

            }
        }
    }else{
        player.isAttacking = false
        enemy.isAttacking = false
        enemy.velocity.x = 0
        player.velocity.x = 0
    }
    //console.log(stAtwo.offset)
}

animate()
decreaseTimer()



