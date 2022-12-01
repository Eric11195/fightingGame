import {FPS, player, enemy, speed, jumpForce, pDerecha, playerSide, xEnemyCollision, xPlayerCollision, minusxEnemyCollision, minusxPlayerCollision, hitboxCollision, attack, update, stAone, stAtwo, aAone ,aAtwo , timer, timerId, playing, checkWinner, decreaseTimer,} from './charactersData.js'
import {keys, jumpingE, jumpingP} from './inputHandler.js'
import {canvas, c, CROUCHING, STANDING} from './System.js'

var A5 = "5A"
var aA = "a.A"
var myAttack1 = A5
var myAttack2 = A5 


//fondo
//hacer un rectangulo con vertices--> fillRect(xPosInicial,yPosInicial,xPosFinal,yPosInicial)
c.fillRect(0,0,canvas.width,canvas.height)


//barras de vida, movimiento, ataques...
function animate(){   
    
    //console.log(keys.AU.pressed && ((enemy.unable && enemy.velocity.y != 0 || !enemy.jumpMaxPoint) || (enemy.velocity.y != 0 || enemy.jumpMaxPoint)))

    //console.log(player.offset.y)
    //checkea para donde se mira y cambia la hitbox en consecuencia, mira a ver si toca bloquar
    playerSide()
    if(pDerecha == "izq"){
        if (keys.a.pressed){
            player.blockState= true
            player.framesBlocking++
            if(keys.s.pressed){
                player.blockState = CROUCHING
            }else player.blockType = STANDING
        }else {
            player.block = false
            player.framesBlocking = 0
        }
        if (keys.AR.pressed){
            enemy.blockState = true
            enemy.framesBlocking++
            if(keys.AD.pressed){
                enemy.blockType = CROUCHING
            }else enemy.blockType = STANDING
        }else {
            enemy.blockState = false
            enemy.framesBlocking = 0
        }
    }else{
        if (keys.d.pressed){
            player.blockState = true
            player.framesBlocking++
            if(keys.s.pressed){
                player.blockState = CROUCHING
            }else player.blockType = STANDING
        }else {
            player.blockState = false
            player.framesBlocking = 0
        }
        if (keys.AL.pressed){
            enemy.blockState = true
            enemy.framesBlocking++
            if(keys.AD.pressed){
                enemy.blockType = CROUCHING
            }else enemy.blockType = STANDING
        }else {
            enemy.blockState = false
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

    //updateeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee
    if (myAttack1 == aA){
        update(player, aAone)//objeto player de la clase Sprite usando metodo update del
    }else if(myAttack1 == A5){
        update(player, stAone)
    }

    if (myAttack2 == aA){
        update(enemy, aAtwo)//objeto player de la clase Sprite usando metodo update del
    }else if(myAttack2 == A5){
        update(enemy, stAtwo)
    }

    if(playing) {



//player--------------------------------------------------------------------------------------------------------
        if(keys.space.pressed && ((!player.unable || (player.velocity.y != 0 || player.jumpMaxPoint)))){
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
            }
            //acciones cuando hay alguna tecla pulsada
            if (keys.f.pressed){
                if(player.velocity.y != 0 || player.jumpMaxPoint){
                    myAttack1 = aA
                    attack(player,aAone)
                }else{
                    attack(player,stAone)
                    myAttack1 = A5
                }
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
        if(keys.AU.pressed && ((!enemy.unable || (enemy.velocity.y != 0 || enemy.jumpMaxPoint)))){
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
                if(enemy.velocity.y != 0 || enemy.jumpMaxPoint){
                    myAttack2 = aA
                    attack(enemy,aAtwo)
                }else{
                    attack(enemy,stAtwo)
                    myAttack2 = A5
                }

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

//hit detection--------------------------------------------------------------------------------------------

        //detect for collision of hitbox and contrary character
        //se detecta si el lado más alejado del personaje de la hitbox, esta a más distancia que el lado más cercano del enemigo 
        //eje x
        if(myAttack1 == A5){
            if (hitboxCollision({hitbox: stAone ,Enemy: enemy})) {
                if(player.initAttack){
                    enemy.blockStun = true
                }else {
                    enemy.blockStun = false
                }
                if(player.isAttacking){
                    if (enemy.blockState){
                        enemy.health -= stAone.damage/20
                        if(pDerecha == "izq"){
                            enemy.fakePosition.x += stAone.pushblock
                        }else enemy.fakePosition.x -= stAone.pushblock
                    }else {
                        console.log(pDerecha)
                        enemy.health -= stAone.damage
                        if(pDerecha == "izq"){
                            enemy.fakePosition.x += stAone.pushhit
                        }else enemy.fakePosition.x -= stAone.pushhit
                    }

                    document.querySelector('#enemyHealth').style.width = enemy.health + '%'
                    //solo detecta una vez la colisión por cada vez que pulsemos la tecla
                    player.isAttacking = false
                }
            }
        }

        if(myAttack2 == A5){
            if (hitboxCollision({hitbox: stAtwo, Enemy: player})){
                if(enemy.initAttack){
                    player.blockStun = true
                }else {
                    player.blockStun = false
                }
                if(enemy.isAttacking) {
                    if (player.blockState){
                        player.health -= stAtwo.damage/20
                        if(pDerecha == "der"){
                            player.fakePosition.x += stAtwo.pushblock
                        }else player.fakePosition.x -= stAtwo.pushblock
                    }else {
                        player.health -= stAtwo.damage
                        if(pDerecha == "der"){
                            player.fakePosition.x += stAtwo.pushhit
                        }else player.fakePosition.x -= stAtwo.pushhit
                    }
                }
                document.querySelector('#playerHealth').style.width = player.health + '%'
                //solo detecta una vez la colisión por cada vez que pulsemos la tecla
                enemy.isAttacking = false
            }

            if(enemy.health <= 0 || player.health <= 0 || timer <=0){
                checkWinner({player, enemy, timerId})
            }
        }

        if(myAttack1 == aA){
            if (hitboxCollision({hitbox: aAone ,Enemy: enemy})) {
                if(player.initAttack){
                    enemy.blockStun = true
                }else {
                    enemy.blockStun = false
                }
                if(player.isAttacking){
                    if (enemy.blockState){
                        enemy.health -= aAone.damage/20
                        if(pDerecha == "izq"){
                            enemy.fakePosition.x += aAone.pushblock
                        }else enemy.fakePosition.x -= aAone.pushblock
                    }else {
                        console.log(pDerecha)
                        enemy.health -= aAone.damage
                        if(pDerecha == "izq"){
                            enemy.fakePosition.x += aAone.pushhit
                        }else enemy.fakePosition.x -= aAone.pushhit
                    }

                    document.querySelector('#enemyHealth').style.width = enemy.health + '%'
                    //solo detecta una vez la colisión por cada vez que pulsemos la tecla
                    player.isAttacking = false
                }
            }
        }

        if(myAttack2 == aA){
            if (hitboxCollision({hitbox: aAtwo, Enemy: player})){
                if(enemy.initAttack){
                    player.blockStun = true
                }else {
                    player.blockStun = false
                }
                if(enemy.isAttacking) {
                    if (player.blockState){
                        player.health -= aAtwo.damage/20
                        if(pDerecha == "der"){
                            player.fakePosition.x += aAtwo.pushblock
                        }else player.fakePosition.x -= aAtwo.pushblock
                    }else {
                        player.health -= aAtwo.damage
                        if(pDerecha == "der"){
                            player.fakePosition.x += aAtwo.pushhit
                        }else player.fakePosition.x -= aAtwo.pushhit
                    }
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

    if(player.unable) {
        player.color = "yellow"
    }else player.color = "blue"

    if(enemy.unable) {
        enemy.color = "yellow"
    }else enemy.color = "red"
    console.log(myAttack1)
}

animate()
decreaseTimer()



