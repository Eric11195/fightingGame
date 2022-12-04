import {FPS, player, enemy, speed, jumpForce, pDerecha, playerSide, xEnemyCollision, xPlayerCollision, minusxEnemyCollision, minusxPlayerCollision, hitboxCollision, attack, update, stAone, stAtwo, aAone ,aAtwo, crAone, crAtwo , timer, timerId, playing, checkWinner, decreaseTimer} from './charactersData.js'
import {keys, p1InputBuffer, p2InputBuffer, checkSpecialInputs, getPlayerOneInput, getPlayerTwoInput} from './inputHandler.js'
import {canvas, c, CROUCHING, STANDING} from './System.js'

var A5 = "5A"
var aA = "a.A"
var A2 = "2A"
var myAttack1 = A5
var myAttack2 = A5 
var n = 0

var localPlayerOneInput = getPlayerOneInput()
var localPlayerTwoInput = getPlayerTwoInput()


//fondo
//hacer un rectangulo con vertices--> fillRect(xPosInicial,yPosInicial,xPosFinal,yPosInicial)
c.fillRect(0,0,canvas.width,canvas.height)



//barras de vida, movimiento, ataques...
function animate(){ 
    n++

    if(!localPlayerOneInput){
        p1InputBuffer.push("")
    }else localPlayerOneInput = false

    if(!localPlayerTwoInput){
        p2InputBuffer.push("")
    }else localPlayerTwoInput = false

    p2InputBuffer.push("")
    checkSpecialInputs();
    
    if(p1InputBuffer.length > 14){
        p1InputBuffer.shift()
    }
    if(p2InputBuffer.length > 14){
        p2InputBuffer.shift()
    }
    
    //checkea para donde se mira y cambia la hitbox en consecuencia, mira a ver si toca bloquar
    playerSide()
    if(pDerecha == "izq"){
        if (keys.a.pressed){
            player.blockState= true
            player.framesBlocking++
            if(keys.s.pressed){
                player.blockType = CROUCHING
            }else player.blockType = STANDING
        }else {
            player.blockState = false
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
                player.blockType = CROUCHING
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


    //pintar fondo por encima como si fuese processing
    c.fillStyle = "black"
    c.fillRect(0, 0, canvas.width, canvas.height)
    //dibuja a los jugadores en la posición actualizada

    //updateeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee
    if (myAttack1 == aA){
        update(player, aAone)//objeto player de la clase Sprite usando metodo update del
    }else if(myAttack1 == A5){
        update(player, stAone)
    }else if(myAttack1 == A2){
        update(player, crAone)
    }

    if (myAttack2 == aA){
        update(enemy, aAtwo)//objeto player de la clase Sprite usando metodo update del
    }else if(myAttack2 == A5){
        update(enemy, stAtwo)
    }else if(myAttack2 == A2){
        //console.log(crAtwo.position.y)
        update(enemy, crAtwo)
    }




    if(playing) {
        //console.log(n)

//player--------------------------------------------------------------------------------------------------------
        if(keys.space.pressed && ((!player.unable || (player.velocity.y != 0 || player.jumpMaxPoint)))){
            keys.space.pressed = false
            if (player.jumps.n > 0 ){
                if (pDerecha == "izq"){
                    player.side = "left"
                }else{
                    player.side = "right"               
                }
                if (!keys.a.pressed && !keys.d.pressed || keys.a.pressed && keys.d.pressed){
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
        if(!player.unable){
            if(keys.s.pressed && player.velocity.y == 0 && !player.jumpMaxPoint){
                player.agachado = true
            }else{
                player.agachado = false
            }
        }

        if (!player.unable){
            //acciones cuando hay alguna tecla pulsada
            if (keys.f.pressed){
                n=0
                if(player.velocity.y != 0 || player.jumpMaxPoint){
                    myAttack1 = aA
                    attack(player,aAone)
                }else if(player.agachado == true){
                    myAttack1 = A2
                    attack(player,crAone)
                }else{                    
                    attack(player,stAone)
                    myAttack1 = A5
                }
                //para no quedarte dentro del ENEMIGO, pero poder saltarr sin que pasen cosas raras
            }else if (player.velocity.y != 0 || player.jumpMaxPoint){
                //los saltos no son controlables en el aire
            }else if (keys.d.pressed && keys.a.pressed){
                player.velocity.x = 0
            }else if (keys.d.pressed && !player.agachado){
                if(!xPlayerCollision({ me: player, opponent: enemy})){
                    player.velocity.x = speed
                }
            } else if (keys.a.pressed && !player.agachado){
                if(!minusxPlayerCollision({ Me: player, Opponent: enemy})){
                    player.velocity.x = -speed
                }
            } else if (!keys.d.pressed && !keys.a.pressed && !xPlayerCollision({ me: player, opponent: enemy}) && !minusxPlayerCollision({ Me: player, Opponent: enemy})) {
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

        if(!enemy.unable){
            if(keys.AD.pressed && enemy.velocity.y == 0 && !enemy.jumpMaxPoint){
                enemy.agachado = true
            }else{
                enemy.agachado = false
            }
        }
    
        if (!enemy.unable){
            //acciones cuando hay alguna tecla pulsada
            if (keys.dot.pressed){
                n = 0
                if(enemy.velocity.y != 0 || enemy.jumpMaxPoint){
                    myAttack2 = aA
                    attack(enemy,aAtwo)
                }else if(enemy.agachado == true){
                        myAttack2 = A2
                        attack(enemy,crAtwo)
                }else{
                    attack(enemy,stAtwo)
                    myAttack2 = A5
                }

            //los saltos no son controlables en el aire
            }else if (enemy.velocity.y != 0 || enemy.jumpMaxPoint){
            }else if (keys.AL.pressed && keys.AR.pressed){
                enemy.velocity.x = 0
            } else if (keys.AR.pressed && !enemy.agachado){
                if(!xEnemyCollision({ meE: enemy, opponentE: player})){
                    enemy.velocity.x = speed
                }
            } else if (keys.AL.pressed && !enemy.agachado){
                if(!minusxEnemyCollision({ MeE: enemy, OpponentE: player})){
                    enemy.velocity.x = -speed
                }
            } else if(!keys.AL.pressed && !keys.AR.pressed && !xEnemyCollision({ meE: enemy, opponentE: player})&& !minusxEnemyCollision({ MeE: enemy, OpponentE: player})) {
                enemy.velocity.x = 0
            }
        }


//general
        if(player.initAttack && enemy.blockState){
            enemy.velocity.x = 0
        }
        if(enemy.initAttack && player.blockState){
            player.velocity.x = 0
        }

//hit detection--------------------------------------------------------------------------------------------

        //detect for collision of hitbox and contrary character
        //se detecta si el lado más alejado del personaje de la hitbox, esta a más distancia que el lado más cercano del enemigo 
        //eje x
        if(myAttack1 == A5){
            if (hitboxCollision({hitbox: stAone, Enemy: enemy})) {
                if(player.isAttacking){
                    enemy.unable = true
                    if (enemy.blockState && (enemy.blockType == STANDING || enemy.blockType == CROUCHING)){
                        enemy.health -= stAone.damage/20

                        setTimeout(unableE, (stAone.active + stAone.recovery + stAone.onBlock)*1000/FPS)

                        if(pDerecha == "izq"){
                            enemy.fakePosition.x += stAone.pushblock
                        }else enemy.fakePosition.x -= stAone.pushblock

                    }else {
                        enemy.health -= stAone.damage

                        setTimeout(unableE, (stAone.active + stAone.recovery + stAone.onHit)*1000/FPS)


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
                if(enemy.isAttacking) {
                    player.unable = true
                    if (player.blockState && (player.blockType == STANDING || player.blockType == CROUCHING)){
                        player.health -= stAtwo.damage/20

                        setTimeout(unableP, (stAtwo.active + stAtwo.recovery + stAtwo.onBlock)*1000/FPS)

                        if(pDerecha == "der"){
                            player.fakePosition.x += stAtwo.pushblock
                        }else player.fakePosition.x -= stAtwo.pushblock
                    }else {
                        player.health -= stAtwo.damage

                        setTimeout(unableP, (stAtwo.active + stAtwo.recovery + stAtwo.onHit)*1000/FPS)

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
                if(player.isAttacking){
                    enemy.unable = true
                    if (enemy.blockState && enemy.blockType == STANDING){
                        enemy.health -= aAone.damage/20

                        setTimeout(unableE, (aAone.active + aAone.recovery + aAone.onBlock)*1000/FPS)

                        if(pDerecha == "izq"){
                            enemy.fakePosition.x += aAone.pushblock
                        }else enemy.fakePosition.x -= aAone.pushblock
                    }else {
                        enemy.health -= aAone.damage

                        setTimeout(unableE, (aAone.active + aAone.recovery + aAone.onHit)*1000/FPS)

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
                if(enemy.isAttacking) {
                    player.unable = true
                    if (player.blockState && player.blockType == STANDING){
                        player.health -= aAtwo.damage/20

                        setTimeout(unableP, (aAtwo.active + aAtwo.recovery + aAtwo.onBlock)*1000/FPS)

                        if(pDerecha == "der"){
                            player.fakePosition.x += aAtwo.pushblock
                        }else player.fakePosition.x -= aAtwo.pushblock
                    }else {
                        player.health -= aAtwo.damage

                        setTimeout(unableP, (aAtwo.active + aAtwo.recovery + aAtwo.onHit)*1000/FPS)
                        
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

        if(myAttack1 == A2){
            if (hitboxCollision({hitbox: crAone ,Enemy: enemy})) {
                if(player.isAttacking){
                    enemy.unable = true
                    if (enemy.blockState && enemy.blockType == CROUCHING){
                        enemy.health -= crAone.damage/20

                        setTimeout(unableE, (crAone.active + crAone.recovery + crAone.onBlock)*1000/FPS)

                        if(pDerecha == "izq"){
                            enemy.fakePosition.x += crAone.pushblock
                        }else enemy.fakePosition.x -= crAone.pushblock
                    }else {
                        enemy.health -= crAone.damage

                        setTimeout(unableE, (crAone.active + crAone.recovery + crAone.onHit)*1000/FPS)

                        if(pDerecha == "izq"){
                            enemy.fakePosition.x += crAone.pushhit
                        }else enemy.fakePosition.x -= crAone.pushhit
                    }

                    document.querySelector('#enemyHealth').style.width = enemy.health + '%'
                    //solo detecta una vez la colisión por cada vez que pulsemos la tecla
                    player.isAttacking = false
                }
            }
        }

        if(myAttack2 == A2){
            if (hitboxCollision({hitbox: crAtwo, Enemy: player})){
                if(enemy.isAttacking) {
                    player.unable = true
                    if (player.blockState && player.blockType == CROUCHING){
                        player.health -= crAtwo.damage/20

                        setTimeout(unableP, (crAtwo.active + crAtwo.recovery + crAtwo.onBlock)*1000/FPS)
                        
                        if(pDerecha == "der"){
                            player.fakePosition.x += crAtwo.pushblock
                        }else player.fakePosition.x -= crAtwo.pushblock
                    }else {
                        player.health -= crAtwo.damage

                        setTimeout(unableP, (crAtwo.active + crAtwo.recovery + crAtwo.onHit)*1000/FPS)
                        
                        if(pDerecha == "der"){
                            player.fakePosition.x += crAtwo.pushhit
                        }else player.fakePosition.x -= crAtwo.pushhit
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


    //console.log(player.velocity.x > 0 && xPlayerCollision({ me: player, opponent: enemy}))



    if((player.velocity.y == 0 && enemy.velocity.y == 0) || (player.velocity.y != 0 && enemy.velocity.y != 0) || (player.velocity.y > 0 && enemy.velocity.y == 0) || (player.velocity.y == 0 && enemy.velocity.y > 0)){

        if((xEnemyCollision({ meE: enemy, opponentE: player})&& minusxPlayerCollision({ Me: player, Opponent: enemy}))|| (xPlayerCollision({ me: player, opponent: enemy})&& minusxEnemyCollision({ MeE: enemy, OpponentE: player}) && !(keys.a.pressed || keys.AR.pressed || keys.d.pressed || player.velocity.y != 0 || player.jumpMaxPoint|| keys.AL.pressed || enemy.velocity.y != 0 || enemy.jumpMaxPoint))){
            player.velocity.x = 0
            enemy.velocity.x = 0
            if(pDerecha =="der"){
                player.fakePosition.x += 6
                enemy.fakePosition.x -= 6
            }else{
                enemy.fakePosition.x += 6
                player.fakePosition.x -= 6
            }
        }else if(xPlayerCollision({ me: player, opponent: enemy})|| minusxEnemyCollision({ MeE: enemy, OpponentE: player})){
            if(keys.d.pressed || player.velocity.y != 0 || player.jumpMaxPoint || keys.AL.pressed || enemy.velocity.y != 0 || enemy.jumpMaxPoint){
                if(enemy.velocity.x < 0 && player.velocity.x >0){
                    enemy.velocity.x = 0
                    player.velocity.x = 0
                }else if ((enemy.velocity.x == 0 || enemy.velocity.x == 2) && player.velocity.x >0){
                    enemy.velocity.x = speed/2
                    player.velocity.x = speed/2
                }else if(enemy.velocity.x < 0 && (player.velocity.x == 0|| player.velocity.x ==-2)){
                    enemy.velocity.x = -speed/2
                    player.velocity.x = -speed/2
                }

            }
        }else if(xEnemyCollision({ meE: enemy, opponentE: player})|| minusxPlayerCollision({ Me: player, Opponent: enemy})){
            if(keys.a.pressed || keys.AR.pressed || player.velocity.y != 0 || player.jumpMaxPoint || enemy.velocity.y != 0 || enemy.jumpMaxPoint ){
                if(enemy.velocity.x > 0 && player.velocity.x < 0){
                    enemy.velocity.x = 0
                    player.velocity.x = 0
                }else if ((enemy.velocity.x == 0 || enemy.velocity.x ==-2) && player.velocity.x < 0){
                    enemy.velocity.x = -speed/2
                    player.velocity.x = -speed/2
                }else if(enemy.velocity.x > 0 && (player.velocity.x == 0 || player.velocity.x == 2)){
                    enemy.velocity.x = speed/2
                    player.velocity.x = speed/2
                }
                
            }

        }
    }
    console.log(p1InputBuffer)
    //Crea un bucle infinito para que el juego funcione a un numero de fps concreto
    setTimeout(() => {
        requestAnimationFrame(animate)
    },1000/FPS)
}


function unableP(){
    player.unable = false
    console.log("recuperao1")
}
function unableE(){
    enemy.unable = false
    console.log("recuperao2")
}

animate()
decreaseTimer()
