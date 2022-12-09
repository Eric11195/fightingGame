import {FPS, player, enemy, speed, jumpForce, pDerecha, playerSide, xEnemyCollision, xPlayerCollision, minusxEnemyCollision, minusxPlayerCollision, hitboxCollision, attack, update, secondJumpForce, airDash, stAone, stAtwo, aAone ,aAtwo, crAone, crAtwo, qcfAone, qcfAtwo, ddAone, ddAtwo, stBone, stBtwo, crBone, crBtwo, aBone, aBtwo , timer, timerId, playing, checkWinner, decreaseTimer, runSpeed, longJumpForce, highJumpForce, airRunSpeed, Dash, DashRemains} from './charactersData.js'
import {keys, p1InputBuffer, p2InputBuffer, checkSpecialInputs, getPlayerOneInput, getPlayerTwoInput, SpecialInput1, SpecialInput2, playerOneRunning, playerTwoRunning} from './inputHandler.js'
import {canvas, c, CROUCHING, STANDING} from './System.js'

var A5 = "5A"
var aA = "a.A"
var A2 = "2A"
var qcfA = "236A"
var ddA = "22A"
var B5 = "5B"
var B2 = "2B"
var aB = "a.B"

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
    //ea para donde se mira y cambia la hitbox en consecuencia, mira a ver si toca bloquar
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


    //ea bloqueos perfectos--------------------------
    if (player.framesBlocking <= 3 && player.framesBlocking != 0){
        player.perfectBlock = true
    }else  {
        player.perfectBlock = false
    }

    if (enemy.framesBlocking <= 3 && enemy.framesBlocking != 0){
        enemy.perfectBlock = true
    }else {
        enemy.perfectBlock = false
        
    }

        //pintar fondo por encima como si fuese processing
        c.fillStyle = "black"
        c.fillRect(0, 0, canvas.width, canvas.height)
        //dibuja a los jugadores en la posición actualizada
    
        //updateeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee
        if (myAttack1 == aA){
            update(player, aAone)//objeto player de la clase Sprite usando metodo update del
        }if (myAttack1 == ddA){
            update(player, ddAone)//objeto player de la clase Sprite usando metodo update del
        }else if(myAttack1 == qcfA){
            update(player, qcfAone)
        }else if(myAttack1 == A5){
            update(player, stAone)
        }else if(myAttack1 == A2){
            update(player, crAone)
        }else if(myAttack1 == B5){
            update(player, stBone)
        }else if(myAttack1 == B2){
            update(player, crBone)
        }else if(myAttack1 == aB){
            update(player, aBone)
        }
    
        if (myAttack2 == aA){
            update(enemy, aAtwo)//objeto player de la clase Sprite usando metodo update del
        }if (myAttack2 == ddA){
            update(enemy, ddAtwo)//objeto player de la clase Sprite usando metodo update del
        }else if(myAttack2 == qcfA){
            update(enemy, qcfAtwo)
        }else if(myAttack2 == A5){
            update(enemy, stAtwo)
        }else if(myAttack2 == A2){
            //console.log(crAtwo.position.y)
            update(enemy, crAtwo)
        }else if(myAttack2 == B5){
            update(enemy, stBtwo)
        }else if(myAttack2 == B2){
            update(enemy, crBtwo)
        }else if(myAttack2 == aB){
            update(enemy, aBtwo)
        }
    
    


    if(playing) {

        //qcf qcb, etc
        checkSpecialInputs();

//player--------------------------------------------------------------------------------------------------------
        if(keys.space.pressed && ((!player.unable || (player.velocity.y != 0 || player.jumpMaxPoint)))){
            keys.space.pressed = false
            if (player.jumps.n > 0 ){
                if (pDerecha == "izq"){
                    player.side = "left"
                }else{
                    player.side = "right"              
                }if (!keys.a.pressed && !keys.d.pressed || keys.a.pressed && keys.d.pressed){
                    player.velocity.x = 0
                    if(player.jumps.n == 2){
                        if(SpecialInput1 == "28"){
                            player.velocity.y= highJumpForce
                        } else {
                            player.velocity.y= jumpForce
                        }
                    }else player.velocity.y= secondJumpForce
                }else if (keys.a.pressed == true){
                    if(player.jumps.n == 2){
                        if(SpecialInput1 == "28"){
                            if(playerOneRunning){
                                player.velocity.x = -runSpeed
                                player.velocity.y = highJumpForce
                            }else {
                                player.velocity.x = -speed
                                player.velocity.y= highJumpForce
                            }
                        }else {
                            if(playerOneRunning){
                                player.velocity.x = -runSpeed
                                player.velocity.y = longJumpForce
                            }else {
                                player.velocity.x = -speed
                                player.velocity.y= jumpForce
                            }
                        }
                    }else {
                        player.velocity.x = -speed
                        player.velocity.y= secondJumpForce
                    }
                }else if (keys.d.pressed == true){
                    if(player.jumps.n == 2){
                        if(SpecialInput1 == "28"){
                            if(playerOneRunning){
                                player.velocity.x = runSpeed
                                player.velocity.y = highJumpForce
                            }else {
                                player.velocity.x = speed
                                player.velocity.y= highJumpForce
                            }
                        } else {
                            if(playerOneRunning){
                                player.velocity.x = runSpeed
                                player.velocity.y = longJumpForce
                            }else {
                                player.velocity.x = speed
                                player.velocity.y= jumpForce
                            }
                        }
                    }else {
                        player.velocity.x = speed
                        player.velocity.y= secondJumpForce
                    }
                }
            player.jumps.n--
            }
        }
        if(!player.unable){
            if(keys.s.pressed && player.velocity.y == 0 && !player.jumpMaxPoint){
                player.agachado = true
                player.velocity.x = 0
            }else{
                player.agachado = false
            }

            //airdashes
            if(player.jumps.n>0){
                if (player.velocity.y != 0 || player.jumpMaxPoint){
                    if(SpecialInput1 == "66"){
                        player.velocity.x = airRunSpeed
                        airDash(player,1)
                        player.jumps.n--
                    }else if(SpecialInput1 == "44"){
                        player.velocity.x = -airRunSpeed
                        airDash(player,-1)
                        player.jumps.n--
                    }
                }
            }
        }

        if (!player.unable){
            //acciones cuando hay alguna tecla pulsada
            if (keys.f.pressed){
                if(player.velocity.y != 0 || player.jumpMaxPoint){
                    myAttack1 = aA
                    attack(player,aAone)
                }else if(SpecialInput1 == "22A"){
                    myAttack1 = ddA
                    attack(player,ddAone)
                }else if((player.side == "right" && SpecialInput1 == "214P") || (player.side == "left" && SpecialInput1 == "236P")){
                    myAttack1 = qcfA
                    player.agachado = false
                    player.velocity.x = 0
                    attack(player, qcfAone)
                }else if(player.agachado == true){
                    myAttack1 = A2
                    attack(player,crAone)
                }else{                    
                    attack(player,stAone)
                    player.velocity.x = 0
                    myAttack1 = A5
                }

            }else if(keys.g.pressed){
                if(player.velocity.y != 0 || player.jumpMaxPoint){
                    myAttack1 = aB
                    attack(player,aBone)
                }else if(player.agachado == true){
                    myAttack1 = B2
                    attack(player,crBone)
                }else {
                    console.log("miau")
                    attack(player,stBone)
                    player.velocity.x = 0
                    myAttack1 = B5
                }
                //para no quedarte dentro del ENEMIGO, pero poder saltarr sin que pasen cosas raras
            }else if (player.velocity.y != 0 || player.jumpMaxPoint){
                //los saltos no son controlables en el aire
            }else if (keys.d.pressed && keys.a.pressed){
                player.velocity.x = 0
            }else if (keys.d.pressed && !player.agachado){
                if(!xPlayerCollision({ me: player, opponent: enemy})){
                    if(playerOneRunning){
                        player.velocity.x = runSpeed
                        Dash(player,1)
                    }else player.velocity.x = speed
                }
            } else if (keys.a.pressed && !player.agachado){
                if(!minusxPlayerCollision({ Me: player, Opponent: enemy})){
                    if(playerOneRunning){
                            player.velocity.x = -runSpeed
                            Dash(player, -1)
                    }else player.velocity.x = -speed
                }
            } else if (!keys.d.pressed && !keys.a.pressed && !xPlayerCollision({ me: player, opponent: enemy}) && !minusxPlayerCollision({ Me: player, Opponent: enemy})) {
                if(DashRemains == false){
                    player.velocity.x = 0
                }
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
                    if(enemy.jumps.n == 2){
                        if(SpecialInput2 == "28"){
                            enemy.velocity.y= highJumpForce
                        } else {
                            enemy.velocity.y= jumpForce
                        }
                    }else enemy.velocity.y= secondJumpForce
                }else if (keys.AL.pressed){
                    if(enemy.jumps.n == 2){
                        if(SpecialInput2 == "28"){
                            if(playerTwoRunning){
                                enemy.velocity.x = -runSpeed
                                enemy.velocity.y = highJumpForce
                            }else {
                                enemy.velocity.x = -speed
                                enemy.velocity.y= highJumpForce
                            }
                        }else {
                            if(playerTwoRunning){
                                enemy.velocity.x = -runSpeed
                                enemy.velocity.y = longJumpForce
                            }else {
                                enemy.velocity.x = -speed
                                enemy.velocity.y= jumpForce
                            }
                        }
                    }else {
                        enemy.velocity.x = -speed
                        enemy.velocity.y= secondJumpForce
                    }
                }else if (keys.AR.pressed){
                    if(enemy.jumps.n == 2){
                        if(SpecialInput2 == "28"){
                            if(playerTwoRunning){
                                enemy.velocity.x = runSpeed
                                enemy.velocity.y = highJumpForce
                            }else {
                                enemy.velocity.x = speed
                                enemy.velocity.y= highJumpForce
                            }
                        } else {
                            if(playerTwoRunning){
                                enemy.velocity.x = runSpeed
                                enemy.velocity.y = longJumpForce
                            }else {
                                enemy.velocity.x = speed
                                enemy.velocity.y= jumpForce
                            }
                        }
                    }else {
                        enemy.velocity.x = speed
                        enemy.velocity.y= secondJumpForce
                    }
                }
                enemy.jumps.n--
            }
        }

        if(!enemy.unable){
            if(keys.AD.pressed && enemy.velocity.y == 0 && !enemy.jumpMaxPoint){
                enemy.agachado = true
                enemy.velocity.x = 0
            }else{
                enemy.agachado = false
            }

            if(enemy.jumps.n>0){
                if (enemy.velocity.y != 0 || enemy.jumpMaxPoint){
                    if(SpecialInput2 == "66"){
                        enemy.velocity.x = airRunSpeed
                        airDash(enemy,1)
                        enemy.jumps.n--
                    }else if(SpecialInput2 == "44"){
                        enemy.velocity.x = -airRunSpeed
                        airDash(enemy,-1)
                        enemy.jumps.n--
                    }
        
                }
            }
        }

        
    
        if (!enemy.unable){
            //acciones cuando hay alguna tecla pulsada
            if (keys.dot.pressed){
                n = 0
                if(enemy.velocity.y != 0 || enemy.jumpMaxPoint){
                    myAttack2 = aA
                    attack(enemy,aAtwo)
                }else if(SpecialInput2 == "22A"){
                    myAttack2 = ddA
                    attack(enemy,ddAtwo)
                }else if((enemy.side == "right" && SpecialInput2 == "214P") || (enemy.side == "left" && SpecialInput2 == "236P")){
                    myAttack2 = qcfA
                    enemy.agachado = false
                    enemy.velocity.x = 0
                    attack(enemy, qcfAtwo)
                }else if(enemy.agachado == true){
                    enemy.velocity.x = 0
                    myAttack2 = A2
                    attack(enemy,crAtwo)
                }else{
                    enemy.velocity.x = 0
                    attack(enemy,stAtwo)
                    myAttack2 = A5
                }

            //los saltos no son controlables en el aire
            }else if(keys.barra.pressed){
                if(enemy.velocity.y != 0 || enemy.jumpMaxPoint){
                    myAttack2 = aB
                    attack(enemy,aBtwo)
                }else if(enemy.agachado == true){
                    enemy.velocity.x = 0
                    myAttack2 = B2
                    attack(enemy,crBtwo)
                }else{
                    console.log("miau")
                    attack(enemy,stBtwo)
                    enemy.velocity.x = 0
                    myAttack2 = B5
                }
                //para no quedarte dentro del ENEMIGO, pero poder saltarr sin que pasen cosas raras
            }else if (enemy.velocity.y != 0 || enemy.jumpMaxPoint){
            }else if (keys.AL.pressed && keys.AR.pressed){
                enemy.velocity.x = 0
            } else if (keys.AR.pressed && !enemy.agachado){
                if(!xEnemyCollision({ meE: enemy, opponentE: player})){
                    if(playerTwoRunning){
                        enemy.velocity.x = runSpeed
                        Dash(enemy, 1)
                    }else enemy.velocity.x = speed
                }
            } else if (keys.AL.pressed && !enemy.agachado){
                if(!minusxEnemyCollision({ MeE: enemy, OpponentE: player})){
                    if(playerTwoRunning){
                        enemy.velocity.x = -runSpeed
                        Dash(enemy, -1)
                    }else enemy.velocity.x = -speed
                }
            } else if(!keys.AL.pressed && !keys.AR.pressed && !xEnemyCollision({ meE: enemy, opponentE: player})&& !minusxEnemyCollision({ MeE: enemy, OpponentE: player})) {
                if(!DashRemains){
                    enemy.velocity.x = 0
                }
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
                attackFunction(player, enemy, stAone)
            }
        }
        if(myAttack1 == aA){
            if (hitboxCollision({hitbox: aAone ,Enemy: enemy})) {
                attackFunction(player, enemy, aAone)
            }
        }
        if(myAttack1 == A2){
            if (hitboxCollision({hitbox: crAone ,Enemy: enemy})) {
                attackFunction(player, enemy, crAone)
            }
        }
        if(myAttack1 == B5){
            if (hitboxCollision({hitbox: stBone, Enemy: enemy})) {
                attackFunction(player, enemy, stBone)
            }
        }
        if(myAttack1 == B2){
            if (hitboxCollision({hitbox: crBone, Enemy: enemy})) {
                attackFunction(player, enemy, crBone)
            }
        }
        if(myAttack1 == aB){
            if (hitboxCollision({hitbox: aBone, Enemy: enemy})) {
                attackFunction(player, enemy, aBone)
            }
        }
        if(myAttack1 == qcfA){
            if (hitboxCollision({hitbox: qcfAone, Enemy: enemy})) {
                attackFunction(player, enemy, qcfAone)
            }
        }
        if(myAttack1 == ddA){
            if (hitboxCollision({hitbox: ddAone, Enemy: enemy})) {
                attackFunction(player, enemy, ddAone)
            }
        }



        if(myAttack2 == A5){
            if (hitboxCollision({hitbox: stAtwo, Enemy: player})){
                attackFunction(enemy,player,stAtwo)}
        }
        if(myAttack2 == aA){
            if (hitboxCollision({hitbox: aAtwo, Enemy: player})){
                attackFunction(enemy,player,aAtwo)
            }
        }
        if(myAttack2 == A2){
            if (hitboxCollision({hitbox: crAtwo, Enemy: player})){
                attackFunction(enemy,player,crAtwo)
            }
        }
        if(myAttack2 == B5){
            if (hitboxCollision({hitbox: stBtwo, Enemy: player})){
                attackFunction(enemy,player,stBtwo)
            }
        }
        if(myAttack2 == B2){
            if (hitboxCollision({hitbox: crBtwo, Enemy: player})){
                attackFunction(enemy,player,crBtwo)
            }
        }
        if(myAttack2 == aB){
            if (hitboxCollision({hitbox: aBtwo, Enemy: player})){
                attackFunction(enemy,player,aBtwo)
            }
        }
        if(myAttack2 == qcfA){
            if (hitboxCollision({hitbox: qcfAtwo, Enemy: player})){
                attackFunction(enemy,player,qcfAtwo)
            }
        }
        if(myAttack2 == ddA){
            if (hitboxCollision({hitbox: ddAtwo, Enemy: player})){
                attackFunction(enemy,player,ddAtwo)
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
                }else if ((enemy.velocity.x == 0 || enemy.velocity.x == speed/2 || enemy.velocity.x == runSpeed/2) && player.velocity.x >0){
                    if(playerOneRunning){
                        enemy.velocity.x = runSpeed/2
                        player.velocity.x = runSpeed/2
                    }else{
                        enemy.velocity.x = speed/2
                        player.velocity.x = speed/2
                    }
                }else if(enemy.velocity.x < 0 && (player.velocity.x == 0|| player.velocity.x ==-speed/2 || player.velocity.x ==-runSpeed/2)){
                    if(playerTwoRunning){
                        enemy.velocity.x = -runSpeed/2
                        player.velocity.x = -runSpeed/2

                    }else{
                        enemy.velocity.x = -speed/2
                        player.velocity.x = -speed/2
                    }
                }

            }
        }else if(xEnemyCollision({ meE: enemy, opponentE: player})|| minusxPlayerCollision({ Me: player, Opponent: enemy})){
            if(keys.a.pressed || keys.AR.pressed || player.velocity.y != 0 || player.jumpMaxPoint || enemy.velocity.y != 0 || enemy.jumpMaxPoint ){
                if(enemy.velocity.x > 0 && player.velocity.x < 0){
                    enemy.velocity.x = 0
                    player.velocity.x = 0
                }else if ((enemy.velocity.x == 0 || enemy.velocity.x == -speed/2 ||  enemy.velocity.x == -runSpeed/2) && player.velocity.x < 0){
                    if(playerOneRunning){
                        enemy.velocity.x = -runSpeed/2
                        player.velocity.x = -runSpeed/2

                    }else{
                        enemy.velocity.x = -speed/2
                        player.velocity.x = -speed/2
                    }
                }else if(enemy.velocity.x > 0 && (player.velocity.x == 0 || player.velocity.x == speed/2 || player.velocity.x == runSpeed/2)){
                    if(playerTwoRunning){
                        enemy.velocity.x = runSpeed/2
                        player.velocity.x = runSpeed/2
                    }else{
                        enemy.velocity.x = speed/2
                        player.velocity.x = speed/2
                    }
                    
                }
                
            }

        }
    }
    //console.log(depuredBuffer1[depuredBuffer1.lastIndexOf(4)-1])
    //Crea un bucle infinito para que el juego funcione a un numero de fps concreto
    setTimeout(() => {
        requestAnimationFrame(animate)
    },1000/FPS)

    if(!localPlayerOneInput){
        p1InputBuffer.push("")
    }else localPlayerOneInput = false

    if(!localPlayerTwoInput){
        p2InputBuffer.push("")
    }else localPlayerTwoInput = false

    //p2InputBuffer.push("")
    
    if(p1InputBuffer.length > 14){
        p1InputBuffer.shift()
    }
    if(p2InputBuffer.length > 14){
        p2InputBuffer.shift()
    }
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


function attackFunction(goodGuy, badGuy, theAttack){
    if(goodGuy.isAttacking && !(badGuy.agachado && theAttack.attackClass =="HIGH")){
        badGuy.velocity.x = 0
        badGuy.unable = true
        if (badGuy.blockState &&(theAttack.attackClass =="MID" || (badGuy.blockType == CROUCHING && theAttack.attackClass =="LOW") || (badGuy.blockType == STANDING && theAttack.attackClass =="OVERHEAD") || (theAttack.attackClass =="HIGH" && badGuy.blockType == STANDING))){ 
            if(badGuy.perfectBlock){
                badGuy.health += 3
            }else{
                badGuy.health -= theAttack.damage/20
            }
            if(goodGuy == player){
                document.querySelector('#enemyHealth').style.width = badGuy.health + '%'
                setTimeout(unableE, (theAttack.active + theAttack.recovery + theAttack.onBlock)*1000/FPS)
                if(pDerecha == "izq"){
                    badGuy.fakePosition.x += theAttack.pushblock
                }else badGuy.fakePosition.x -= theAttack.pushblock
            }else{
                document.querySelector('#playerHealth').style.width = badGuy.health + '%'
                setTimeout(unableP, (theAttack.active + theAttack.recovery + theAttack.onBlock)*1000/FPS)
                if(pDerecha == "der"){
                    badGuy.fakePosition.x += theAttack.pushblock
                }else badGuy.fakePosition.x -= theAttack.pushblock
            }

        }else {
            badGuy.health -= theAttack.damage
            if(goodGuy == player){
                document.querySelector('#enemyHealth').style.width = badGuy.health + '%'
                setTimeout(unableE, (theAttack.active + theAttack.recovery + theAttack.onHit)*1000/FPS)
                if(pDerecha == "izq"){
                    badGuy.fakePosition.x += theAttack.pushhit
                }else badGuy.fakePosition.x -= theAttack.pushhit
            }else {
                document.querySelector('#playerHealth').style.width = badGuy.health + '%'
                setTimeout(unableP, (theAttack.active + theAttack.recovery + theAttack.onHit)*1000/FPS)
                if(pDerecha == "der"){
                    badGuy.fakePosition.x += theAttack.pushhit
                }else badGuy.fakePosition.x -= theAttack.pushhit
            }
        }
        goodGuy.isAttacking = false

        if(enemy.health <= 0 || player.health <= 0 || timer <=0){
            checkWinner({player, enemy, timerId})
        }
    }
}
