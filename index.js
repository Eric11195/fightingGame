import {FPS, player, enemy, background, shop, speed, jumpForce, pDerecha, playerSide, xEnemyCollision, xPlayerCollision, minusxEnemyCollision, minusxPlayerCollision, hitboxCollision, attack, update, secondJumpForce, airDash, stAone, stAtwo, aAone ,aAtwo, crAone, crAtwo, Alvl1one, Alvl1two, Alvl3one, ddAone, ddAtwo, stBone, stBtwo, crBone, crBtwo, aBone, aBtwo, crstAone, crstAtwo, fBone, fBtwo, Alvl2one, Alvl2two, Alvl3two, Blvl1one,Blvl1two, Blvl2two, Blvl2one,  Blvl3one, Blvl3two, timer, timerId, playing, checkWinner, decreaseTimer, runSpeed, longJumpForce, highJumpForce, airRunSpeed, Dash, longJumpSpeed, rock1, rock2, ddBone, ddBtwo} from './charactersData.js'
import {keys, p1InputBuffer, p2InputBuffer, checkSpecialInputs, getPlayerOneInput, getPlayerTwoInput, SpecialInput1, SpecialInput2, playerOneRunning, playerTwoRunning, p1FramesCharging, p2FramesCharging} from './inputHandler.js'
import {canvas, c, CROUCHING, STANDING} from './System.js'

const A5 = "5A"
const aA = "a.A"
const A2 = "2A"
const A3 = "3A"
const qcfA1 = "236A1"
const qcfA2 = "236A2"
const qcfA3 = "236A3"
const qcfB1 = "236B1"
const qcfB2 = "236B2"
const qcfB3 = "236B3"
const ddA = "22A"
const B5 = "5B"
const B2 = "2B"
const B6 = "6B"
const aB = "a.B"
const ddB = "22B"

var myAttack1 = A5
var myAttack2 = A5 
var n = 0

var localPlayerOneInput = getPlayerOneInput()
var localPlayerTwoInput = getPlayerTwoInput()


//fondo
//hacer un rectangulo con vertices--> fillRect(xPosInicial,yPosInicial,xPosFinal,yPosInicial)
//c.fillRect(0,0,canvas.width,canvas.height)



//barras de vida, movimiento, ataques...
function animate(){ 
    background.update()
    shop.update()

    n++    
    //ea para donde se mira y cambia la hitbox en consecuencia, mira a ver si toca bloquar
    playerSide()
    if(pDerecha == "izq"){
        if (keys.a.pressed && !player.inCombo){
            player.blockState= true
            player.framesBlocking++
            if(keys.s.pressed){
                player.blockType = CROUCHING
            }else player.blockType = STANDING
        }else {
            player.blockState = false
            player.framesBlocking = 0
        }
        if (keys.AR.pressed && !enemy.inCombo){
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
        if (keys.d.pressed && !player.inCombo){
            player.blockState = true
            player.framesBlocking++
            if(keys.s.pressed){
                player.blockType = CROUCHING
            }else player.blockType = STANDING
        }else {
            player.blockState = false
            player.framesBlocking = 0
        }
        if (keys.AL.pressed && !enemy.inCombo){
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
        //c.fillStyle = "grey"
        //c.fillRect(0, 0, canvas.width, canvas.height)
        //dibuja a los jugadores en la posición actualizada
    
        //updateeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee
        if (myAttack1 == aA){
            update(player, aAone, rock1)//objeto player de la clase Sprite usando metodo update del
        }if (myAttack1 == ddA){
            update(player, ddAone, rock1)//objeto player de la clase Sprite usando metodo update del
        }else if(myAttack1 == qcfA1){
            update(player, Alvl1one, rock1)
        }else if(myAttack1 == qcfA2){
            update(player, Alvl2one, rock1)
        }else if(myAttack1 == qcfA3){
            update(player, Alvl3one, rock1)
        }else if(myAttack1 == qcfB1){
            update(player, Blvl1one, rock1)
        }else if(myAttack1 == qcfB2){
            update(player, Blvl2one, rock1)
        }else if(myAttack1 == qcfB3){
            update(player, Blvl3one, rock1)
        }else if(myAttack1 == A5){
            update(player, stAone, rock1)
        }else if(myAttack1 == A2){
            update(player, crAone, rock1)
        }else if(myAttack1 == A3){
            update(player, crstAone, rock1)
        }else if(myAttack1 == B5){
            update(player, stBone, rock1)
        }else if(myAttack1 == B2){
            update(player, crBone, rock1)
        }else if(myAttack1 == aB){
            update(player, aBone, rock1)
        }else if(myAttack1 == B6){
            update(player, fBone, rock1)
        }else if(myAttack1 == ddB){
            update(player, ddBone, rock1)
        }
    
        if (myAttack2 == aA){
            update(enemy, aAtwo, rock2)//objeto player de la clase Sprite usando metodo update del
        }if (myAttack2 == ddA){
            update(enemy, ddAtwo, rock2)//objeto player de la clase Sprite usando metodo update del
        }else if(myAttack2 == qcfA1){
            update(enemy, Alvl1two, rock2)
        }else if(myAttack2 == qcfA2){
            update(enemy, Alvl2two, rock2)
        }else if(myAttack2 == qcfA3){
            update(enemy, Alvl3two, rock2)
        }else if(myAttack2 == qcfB1){
            update(enemy, Blvl1two, rock2)
        }else if(myAttack2 == qcfB2){
            update(enemy, Blvl2two, rock2)
        }else if(myAttack2 == qcfB3){
            update(enemy, Blvl3two, rock2)
        }else if(myAttack2 == A5){
            update(enemy, stAtwo, rock2)
        }else if(myAttack2 == A2){
            update(enemy, crAtwo, rock2)
        }else if(myAttack2 == A3){
            update(enemy, crstAtwo, rock2)
        }else if(myAttack2 == B5){
            update(enemy, stBtwo, rock2)
        }else if(myAttack2 == B2){
            update(enemy, crBtwo, rock2)
        }else if(myAttack2 == aB){
            update(enemy, aBtwo, rock2)
        }else if(myAttack2 == B6){
            update(enemy, fBtwo, rock2)
        }else if(myAttack2 == ddB){
            update(enemy, ddBtwo, rock2)
        }
    
    


    if(playing) {

        console.log(player.side)
        // qcb, etc
        checkSpecialInputs();

//player--------------------------------------------------------------------------------------------------------
        if(keys.space.pressed && ((!player.unable || player.DashRemains || (player.velocity.y != 0 || player.jumpMaxPoint)))){
            player.inCombo = true
            setTimeout(jumpInvulnerabilityEnds, 6*1000/FPS, player)
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
                            if(player.DashRemains){
                                player.velocity.x = -longJumpSpeed
                                player.velocity.y = highJumpForce
                            }else {
                                player.velocity.x = -speed
                                player.velocity.y= highJumpForce
                            }
                        }else {
                            if(player.DashRemains){
                                player.velocity.x = -longJumpSpeed
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
                            if(player.DashRemains){
                                player.velocity.x = longJumpSpeed
                                player.velocity.y = highJumpForce
                            }else {
                                player.velocity.x = speed
                                player.velocity.y= highJumpForce
                            }
                        } else {
                            if(player.DashRemains){
                                player.velocity.x = longJumpSpeed
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
                player.switchSprite("crouch")
                player.agachado = true
                player.velocity.x = 0
            }else{
                player.agachado = false
            }

            //airdashes
            if(player.jumps.n>0){
                if (player.velocity.y != 0 || player.jumpMaxPoint){
                    if(SpecialInput1 == "66"){
                        player.inCombo = true
                        setTimeout(jumpInvulnerabilityEnds, 6*1000/FPS, player)
                        player.velocity.x = airRunSpeed
                        airDash(player,1)
                        player.jumps.n--
                    }else if(SpecialInput1 == "44"){
                        player.inCombo = true
                        setTimeout(jumpInvulnerabilityEnds, 6*1000/FPS, player)
                        player.velocity.x = -airRunSpeed
                        airDash(player,-1)
                        player.jumps.n--
                    }
                }
            }
        }

        if (player.cancelWindow && myAttack1 == ddB){
            //console.log("ñeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee1")
            if (keys.f.pressed){
                player.myAttack = "none"
                player.agachado = false
                player.cancelWindow = false
                player.batting = true
                player.unable = true
                setTimeout(unableP, 20*1000/FPS)
                setTimeout(throwRockLowP, 15*1000/FPS)
            }else if (keys.g.pressed){
                player.myAttack = "none"
                player.agachado = false
                player.cancelWindow = false
                player.batting = true
                player.unable = true
                setTimeout(unableP, 20*1000/FPS)
                setTimeout(throwRockHighP, 15*1000/FPS)
            }
        }

        if (!player.unable){
            //acciones cuando hay alguna tecla pulsada
            if (keys.f.pressed){
                if(player.velocity.y != 0 || player.jumpMaxPoint){
                    myAttack1 = aA
                    attack(player,aAone)
                }else if(player.agachado && ((keys.a.pressed && pDerecha == "der")|| (keys.d.pressed && pDerecha == "izq"))){
                    player.switchSprite('stcrA')
                    myAttack1 = A3
                    attack(player,crstAone)
                }else if(SpecialInput1 == "22A"){
                    myAttack1 = ddA
                    attack(player,ddAone)
                }else if((player.side == "right" && SpecialInput1 == "214A") || (player.side == "left" && SpecialInput1 == "236A")){
                    player.agachado = false
                    player.velocity.x = 0
                    player.unable = true
                    twoThreeSixPlayer("A")
                }else if(player.agachado){
                    player.switchSprite('crA')
                    myAttack1 = A2
                    attack(player,crAone)
                }else{                    
                    attack(player,stAone)
                    player.switchSprite('stA')
                    player.velocity.x = 0
                    myAttack1 = A5
                }
            }else if(keys.g.pressed){
                //console.log(SpecialInput1)
                if(player.velocity.y != 0 || player.jumpMaxPoint){
                    myAttack1 = aB
                    attack(player,aBone)
                }else if(SpecialInput1 == "22B"){
                    if(!rock1.onScreen){
                        myAttack1 = ddB
                        attack(player,ddBone)
                        setTimeout(() => {
                            summonProjectile(rock1, player)
                        },(ddBone.startup)*1000/FPS)
                    }
                }else if((player.side == "right" && SpecialInput1 == "214B") || (player.side == "left" && SpecialInput1 == "236B")){
                    player.agachado = false
                    player.velocity.x = 0
                    player.unable = true
                    twoThreeSixPlayer("B")
                }else if(player.agachado){
                    myAttack1 = B2
                    attack(player,crBone)
                }else if((keys.d.pressed && pDerecha == "izq")|| (keys.a.pressed && pDerecha == "der")){
                    player.velocity.x = 0
                    myAttack1 = B6
                    attack(player,fBone)
                }else {
                    attack(player,stBone)
                    player.velocity.x = 0
                    myAttack1 = B5
                }
                //para no quedarte dentro del ENEMIGO, pero poder saltarr sin que pasen cosas raras
            }else if (player.velocity.y < 0 || player.jumpMaxPoint){ 
                player.switchSprite('fall')
                //los saltos no son controlables en el aire
            }else if (player.velocity.y > 0){ 
                player.switchSprite('jump')
                //los saltos no son controlables en el aire
            }else if(keys.s.pressed && player.velocity.y == 0 && !player.jumpMaxPoint){
                player.switchSprite("crouch")
            }else if (keys.d.pressed && keys.a.pressed){
                player.velocity.x = 0
                player.switchSprite('idle')
            }else if (keys.d.pressed && !player.agachado){
                player.switchSprite('run')
                if(!xPlayerCollision({ me: player, opponent: enemy})){
                    if(playerOneRunning){
                        player.velocity.x = runSpeed
                        Dash(player,1)
                        player.inCombo = true
                        setTimeout(jumpInvulnerabilityEnds, 12*1000/FPS, player)
                    }else player.velocity.x = speed
                }
            } else if (keys.a.pressed && !player.agachado){
                player.switchSprite('back')
                if(!minusxPlayerCollision({ Me: player, Opponent: enemy})){
                    if(playerOneRunning){
                        player.velocity.x = -runSpeed
                        Dash(player, -1)
                        player.inCombo = true
                        setTimeout(jumpInvulnerabilityEnds, 12*1000/FPS, player)
                    }else player.velocity.x = -speed
                }
            }else if (!keys.d.pressed && !keys.a.pressed && !xPlayerCollision({ me: player, opponent: enemy}) && !minusxPlayerCollision({ Me: player, Opponent: enemy})) {
                player.switchSprite('idle')
                if(!player.DashRemains){
                    player.velocity.x = 0
                }
            }
        }



//enemy---------------------------------------------------------------------------------------------------------
        if(keys.AU.pressed && ((!enemy.unable || enemy.DashRemains || (enemy.velocity.y != 0 || enemy.jumpMaxPoint)))){
            enemy.inCombo = true
            setTimeout(jumpInvulnerabilityEnds, 5.2*1000/FPS, enemy)
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
                            if(enemy.DashRemains){
                                enemy.velocity.x = -longJumpSpeed
                                enemy.velocity.y = highJumpForce
                            }else {
                                enemy.velocity.x = -speed
                                enemy.velocity.y= highJumpForce
                            }
                        }else {
                            if(enemy.DashRemains){
                                enemy.velocity.x = -longJumpSpeed
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
                            if(enemy.DashRemains){
                                enemy.velocity.x = longJumpSpeed
                                enemy.velocity.y = highJumpForce
                            }else {
                                enemy.velocity.x = speed
                                enemy.velocity.y= highJumpForce
                            }
                        } else {
                            if(enemy.DashRemains){
                                enemy.velocity.x = longJumpSpeed
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
                        enemy.inCombo = true
                        setTimeout(jumpInvulnerabilityEnds, 5.2*1000/FPS, enemy)
                        enemy.velocity.x = airRunSpeed
                        airDash(enemy,1)
                        enemy.jumps.n--
                    }else if(SpecialInput2 == "44"){
                        enemy.inCombo = true
                        setTimeout(jumpInvulnerabilityEnds, 5.2*1000/FPS, enemy)
                        enemy.velocity.x = -airRunSpeed
                        airDash(enemy,-1)
                        enemy.jumps.n--
                    }
        
                }
            }
        }

        if (enemy.cancelWindow && myAttack2 == ddB){
            console.log("ñeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee2")
            if (keys.dot.pressed){
                enemy.myAttack = "none"
                enemy.agachado = false
                enemy.cancelWindow = false
                enemy.batting = true
                enemy.unable = true
                setTimeout(unableE, 20*1000/FPS)
                setTimeout(throwRockLowE, 15*1000/FPS)
            }else if (keys.barra.pressed){
                enemy.myAttack = "none"
                enemy.agachado = false
                enemy.cancelWindow = false
                enemy.batting = true
                enemy.unable = true
                setTimeout(unableE, 20*1000/FPS)
                setTimeout(throwRockHighE, 15*1000/FPS)
            }
        }

        
    
        if (!enemy.unable){
            //acciones cuando hay alguna tecla pulsada
            if (keys.dot.pressed){
                n = 0
                if(enemy.velocity.y != 0 || enemy.jumpMaxPoint){
                    myAttack2 = aA
                    attack(enemy,aAtwo)
                }else if(enemy.agachado && ((keys.AR.pressed && pDerecha == "der")|| (keys.AL.pressed && pDerecha == "izq"))){
                    myAttack2 = A3
                    enemy.switchSprite('stcrA')
                    attack(enemy,crstAtwo)
                }else if(SpecialInput2 == "22A"){
                    myAttack2 = ddA
                    attack(enemy,ddAtwo)
                }else if((enemy.side == "right" && SpecialInput2 == "214A") || (enemy.side == "left" && SpecialInput2 == "236A")){
                    enemy.agachado = false
                    enemy.velocity.x = 0
                    enemy.unable = true
                    twoThreeSixEnemy("A")
                }else if(enemy.agachado == true){
                    enemy.velocity.x = 0
                    enemy.switchSprite('crA')
                    myAttack2 = A2
                    attack(enemy,crAtwo)
                }else{
                    enemy.velocity.x = 0
                    enemy.switchSprite('stA')
                    attack(enemy,stAtwo)
                    myAttack2 = A5
                }

            //los saltos no son controlables en el aire
            }else if(keys.barra.pressed){
                if(enemy.velocity.y != 0 || enemy.jumpMaxPoint){
                    myAttack2 = aB
                    attack(enemy,aBtwo)
                }else if(SpecialInput2 == "22B"){
                    myAttack2 = ddB
                    attack(enemy,ddBtwo)
                    setTimeout(() => {
                        summonProjectile(rock2, enemy)
                    },(ddBtwo.startup)*1000/FPS)
                }else if((enemy.side == "right" && SpecialInput2 == "214B") || (enemy.side == "left" && SpecialInput2 == "236B")){
                    enemy.agachado = false
                    enemy.velocity.x = 0
                    enemy.unable = true
                    twoThreeSixEnemy("B")
                }else if(enemy.agachado == true){
                    enemy.velocity.x = 0
                    myAttack2 = B2
                    attack(enemy,crBtwo)
                }else if((keys.AL.pressed && pDerecha == "izq")|| (keys.AR.pressed && pDerecha == "der")){
                    enemy.velocity.x = 0
                    myAttack2 = B6
                    attack(enemy,fBone)
                }else{
                    attack(enemy,stBtwo)
                    enemy.velocity.x = 0
                    myAttack2 = B5
                }
                //para no quedarte dentro del ENEMIGO, pero poder saltarr sin que pasen cosas raras
            }else if (enemy.velocity.y > 0 || enemy.jumpMaxPoint){
                enemy.switchSprite('jump')
            }else if (enemy.velocity.y < 0){
                enemy.switchSprite('fall')
            }else if(keys.AD.pressed && enemy.velocity.y == 0 && !enemy.jumpMaxPoint){
                enemy.switchSprite("crouch")
            }else if (keys.AL.pressed && keys.AR.pressed){
                enemy.velocity.x = 0
                enemy.switchSprite('idle')
            }else if (keys.AR.pressed && !enemy.agachado){
                enemy.switchSprite('run')
                if(!xEnemyCollision({ meE: enemy, opponentE: player})){
                    if(playerTwoRunning){
                        enemy.velocity.x = runSpeed
                        Dash(enemy)
                        enemy.inCombo = true
                        setTimeout(jumpInvulnerabilityEnds, 9.9*1000/FPS, enemy)
                    }else enemy.velocity.x = speed
                }
            } else if (keys.AL.pressed && !enemy.agachado){
                if(!minusxEnemyCollision({ MeE: enemy, OpponentE: player})){
                    enemy.switchSprite('back')
                    if(playerTwoRunning){
                        enemy.velocity.x = -runSpeed
                        Dash(enemy)
                        enemy.inCombo = true
                        setTimeout(jumpInvulnerabilityEnds, 9.9*1000/FPS, enemy)
                    }else enemy.velocity.x = -speed
                }
            } else if(!keys.AL.pressed && !keys.AR.pressed && !xEnemyCollision({ meE: enemy, opponentE: player})&& !minusxEnemyCollision({ MeE: enemy, OpponentE: player})) {
                enemy.switchSprite('idle')
                if(!enemy.DashRemains){
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

        if(rock1.onScreen){
            if (hitboxCollision({hitbox: rock1, Enemy: enemy})) {
                attackFunction(player, enemy, rock1)
                //player.isAttacking = true
                player.attackHasLand = true
            }else{
                player.attackHasLand = false
            }
        }
        if(myAttack1 == A5){
            if (hitboxCollision({hitbox: stAone, Enemy: enemy})) {
                attackFunction(player, enemy, stAone)
                player.attackHasLand = true
            }else if(player.attackHitting){
                player.attackHasLand = false
            }
        }
        if(myAttack1 == aA){
            if (hitboxCollision({hitbox: aAone ,Enemy: enemy})) {
                attackFunction(player, enemy, aAone)
                player.attackHasLand = true
            }else if(player.attackHitting){
                player.attackHasLand = false
            }
        }
        if(myAttack1 == A2){
            if (hitboxCollision({hitbox: crAone ,Enemy: enemy})) {
                attackFunction(player, enemy, crAone)
                player.attackHasLand = true
            }else if(player.attackHitting){
                player.attackHasLand = false
            }
        }
        if(myAttack1 == A3){
            if (hitboxCollision({hitbox: crstAone ,Enemy: enemy})) {
                attackFunction(player, enemy, crstAone)
                player.attackHasLand = true
            }else if(player.attackHitting){
                player.attackHasLand = false
            }
        }
        if(myAttack1 == B5){
            if (hitboxCollision({hitbox: stBone, Enemy: enemy})) {
                attackFunction(player, enemy, stBone)
                player.attackHasLand = true
            }else if(player.attackHitting){
                player.attackHasLand = false
            }
        }
        if(myAttack1 == B2){
            if (hitboxCollision({hitbox: crBone, Enemy: enemy})) {
                attackFunction(player, enemy, crBone)
                player.attackHasLand = true
            }else if(player.attackHitting){
                player.attackHasLand = false
            }
        }
        if(myAttack1 == aB){
            if (hitboxCollision({hitbox: aBone, Enemy: enemy})) {
                attackFunction(player, enemy, aBone)
                player.attackHasLand = true
            }else if(player.attackHitting){
                player.attackHasLand = false
            }
        }
        if(myAttack1 == B6){
            if (hitboxCollision({hitbox: fBone, Enemy: enemy})) {
                attackFunction(player, enemy, fBone)
                player.attackHasLand = true
            }else if(player.attackHitting){
                player.attackHasLand = false
            }
        }
        if(myAttack1 == qcfA1){
            if (hitboxCollision({hitbox: Alvl1one, Enemy: enemy})) {
                attackFunction(player, enemy, Alvl1one)
                player.attackHasLand = true
            }else if(player.attackHitting){
                player.attackHasLand = false
            }
        }
        if(myAttack1 == qcfA2){
            if (hitboxCollision({hitbox: Alvl2one, Enemy: enemy})) {
                attackFunction(player, enemy, Alvl2one)
                player.attackHasLand = true
            }else if(player.attackHitting){
                player.attackHasLand = false
            }
        }
        if(myAttack1 == qcfA3){
            if (hitboxCollision({hitbox: Alvl3one, Enemy: enemy})) {
                attackFunction(player, enemy, Alvl3one)
                player.attackHasLand = true
            }else if(player.attackHitting){
                player.attackHasLand = false
            }
        }
        if(myAttack1 == qcfB1){
            if (hitboxCollision({hitbox: Blvl1one, Enemy: enemy})) {
                attackFunction(player, enemy, Blvl1one)
                player.attackHasLand = true
            }else if(player.attackHitting){
                player.attackHasLand = false
            }
        }
        if(myAttack1 == qcfB2){
            if (hitboxCollision({hitbox: Blvl2one, Enemy: enemy})) {
                attackFunction(player, enemy, Blvl2one)
                player.attackHasLand = true
            }else if(player.attackHitting){
                player.attackHasLand = false
            }
        }
        if(myAttack1 == qcfB3){
            if (hitboxCollision({hitbox: Blvl3one, Enemy: enemy})) {
                attackFunction(player, enemy, Blvl3one)
                player.attackHasLand = true
            }else if(player.attackHitting){
                player.attackHasLand = false
            }
        }
        if(myAttack1 == ddA){
            if (hitboxCollision({hitbox: ddAone, Enemy: enemy})) {
                attackFunction(player, enemy, ddAone)
                player.attackHasLand = true
            }else if(player.attackHitting){
                player.attackHasLand = false
            }
        }


        if(rock2.onScreen){
            if (hitboxCollision({hitbox: rock2, Enemy: player})) {
                attackFunction(enemy,player, rock2)
                //enemy.isAttacking = true
                enemy.attackHasLand = true
            }else{
                enemy.attackHasLand = false
            }
        }
        if(myAttack2 == A5){
            if (hitboxCollision({hitbox: stAtwo, Enemy: player})){
                attackFunction(enemy,player,stAtwo)
                enemy.attackHasLand = true
            }else if(enemy.attackHitting){
                enemy.attackHasLand = false
            }
        }
        if(myAttack2 == aA){
            if (hitboxCollision({hitbox: aAtwo, Enemy: player})){
                attackFunction(enemy,player,aAtwo)
                enemy.attackHasLand = true
            }else if(enemy.attackHitting){
                enemy.attackHasLand = false
            }
        }
        if(myAttack2 == A2){
            if (hitboxCollision({hitbox: crAtwo, Enemy: player})){
                attackFunction(enemy,player,crAtwo)
                enemy.attackHasLand = true
            }else if(enemy.attackHitting){
                enemy.attackHasLand = false
            }
        }
        if(myAttack2 == A3){
            if (hitboxCollision({hitbox: crstAtwo, Enemy: player})){
                attackFunction(enemy,player,crstAtwo)
                enemy.attackHasLand = true
            }else if(enemy.attackHitting){
                enemy.attackHasLand = false
            }
        }
        if(myAttack2 == B5){
            if (hitboxCollision({hitbox: stBtwo, Enemy: player})){
                attackFunction(enemy,player,stBtwo)
                enemy.attackHasLand = true
            }else if(enemy.attackHitting){
                enemy.attackHasLand = false
            }
        }
        if(myAttack2 == B2){
            if (hitboxCollision({hitbox: crBtwo, Enemy: player})){
                attackFunction(enemy,player,crBtwo)
                enemy.attackHasLand = true
            }else if(enemy.attackHitting){
                enemy.attackHasLand = false
            }
        }
        if(myAttack2 == aB){
            if (hitboxCollision({hitbox: aBtwo, Enemy: player})){
                attackFunction(enemy,player,aBtwo)
                enemy.attackHasLand = true
            }else if(enemy.attackHitting){
                enemy.attackHasLand = false
            }
        }
        if(myAttack2 == B6){
            if (hitboxCollision({hitbox: fBtwo, Enemy: player})){
                attackFunction(enemy,player,fBtwo)
                enemy.attackHasLand = true
            }else if(enemy.attackHitting){
                enemy.attackHasLand = false
            }
        }
        if(myAttack2 == qcfA1){
            if (hitboxCollision({hitbox: Alvl1two, Enemy: player})){
                attackFunction(enemy,player,Alvl1two)
                enemy.attackHasLand = true
            }else if(enemy.attackHitting){
                enemy.attackHasLand = false
            }
        }
        if(myAttack2 == qcfA2){
            if (hitboxCollision({hitbox: Alvl2two, Enemy: player})){
                attackFunction(enemy,player,Alvl2two)
                enemy.attackHasLand = true
            }else if(enemy.attackHitting){
                enemy.attackHasLand = false
            }
        }
        if(myAttack2 == qcfA3){
            if (hitboxCollision({hitbox: Alvl3two, Enemy: player})){
                attackFunction(enemy,player,Alvl3two)
                enemy.attackHasLand = true
            }else if(enemy.attackHitting){
                enemy.attackHasLand = false
            }
        }
        if(myAttack2 == qcfB1){
            if (hitboxCollision({hitbox: Blvl1two, Enemy: player})){
                attackFunction(enemy,player,Blvl1two)
                enemy.attackHasLand = true
            }else if(enemy.attackHitting){
                enemy.attackHasLand = false
            }
        }
        if(myAttack2 == qcfB2){
            if (hitboxCollision({hitbox: Blvl2two, Enemy: player})){
                attackFunction(enemy,player,Blvl2two)
                enemy.attackHasLand = true
            }else if(enemy.attackHitting){
                enemy.attackHasLand = false
            }
        }
        if(myAttack2 == qcfB3){
            if (hitboxCollision({hitbox: Blvl3two, Enemy: player})){
                attackFunction(enemy,player,Blvl3two)
                enemy.attackHasLand = true
            }else if(enemy.attackHitting){
                enemy.attackHasLand = false
            }
        }
        if(myAttack2 == ddA){
            if (hitboxCollision({hitbox: ddAtwo, Enemy: player})){
                attackFunction(enemy,player,ddAtwo)
                enemy.attackHasLand = true
            }else if(enemy.attackHitting){
                enemy.attackHasLand = false
            }
        }




    }else{
        player.isAttacking = false
        enemy.isAttacking = false
        enemy.velocity.x = 0
        player.velocity.x = 0
    }

    if(player.HKD){
        player.color = "green"
    }else if(player.SKD) {
        player.color = "purple"
    }else if(player.FramesCharging  > 60){
        player.color = "grey"
    }else if(player.FramesCharging  > 25){
        player.color = "magenta"
        player.switchSprite('charging2')
    }else if(player.FramesCharging  <= 25 && player.FramesCharging  != 0){
        player.color = "violet"
        player.switchSprite('charging1')
    }else if(player.unable) {
        player.color = "yellow"
    }else player.color = "blue"

    if(enemy.HKD){
        enemy.color = "green"
    }else if(enemy.SKD) {
        enemy.color = "purple"
    }else if(enemy.FramesCharging  > 60){
        enemy.color = "grey"
    }else if(enemy.FramesCharging  > 25){
        enemy.color = "magenta"
        enemy.switchSprite('charging2')
    }else if(enemy.FramesCharging  <= 25 && enemy.FramesCharging  != 0){
        enemy.color = "violet"
        enemy.switchSprite('charging1')
    }else if(enemy.unable) {
        enemy.color = "yellow"
    }else enemy.color = "red"


    //console.log(SpecialInput1)



    if(!(player.DashRemains || enemy.DashRemains) &&((player.velocity.y == 0 && enemy.velocity.y == 0) || (player.velocity.y != 0 && enemy.velocity.y != 0) || (player.velocity.y > 0 && enemy.velocity.y == 0) || (player.velocity.y == 0 && enemy.velocity.y > 0))){

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
    //Crea un bucle infinito para que el juego funcione a un numero de fps concreto
    setTimeout(() => {unableP
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

//jugador o enemigo se recuperan tras un ataque, no pasa si hay un ataque del que ha hecho un ataque pegando a la vez que se recupera
function unableP(){
    if(!(enemy.attackhitting && enemy.attackHasLand)){
        player.unable = false
    }
}
function unableE(){
    if(!(player.attackHitting && player.attackHasLand)){
        enemy.unable = false
    }
}

animate()
decreaseTimer()


function attackFunction(goodGuy, badGuy, theAttack){
    if(((goodGuy.isAttacking || theAttack.onScreen) && !(badGuy.agachado && theAttack.attackClass =="HIGH")) && !badGuy.invulnerable){
        badGuy.velocity.x = 0
        badGuy.unable = true
        if (badGuy.blockState && theAttack.attackClass !="UNBLOCKABLE" &&((badGuy.velocity.y != 0 || badGuy.jumpMaxPoint)|| ((theAttack.attackClass =="MID" || theAttack.attackClass =="PROJECTILE") || (badGuy.blockType == CROUCHING && theAttack.attackClass =="LOW") || (badGuy.blockType == STANDING && theAttack.attackClass =="OVERHEAD") || (theAttack.attackClass =="HIGH" && badGuy.blockType == STANDING)))){ 
            if(badGuy.perfectBlock){
                badGuy.health += 3
            }else{
                badGuy.health -= theAttack.damage/20
            }
            if(goodGuy == player){
                document.querySelector('#enemyHealth').style.width = badGuy.health + '%'
                if(theAttack.attackClass !="PROJECTILE"){
                    setTimeout(unableE, (theAttack.active + theAttack.recovery + theAttack.onBlock)*1000/FPS)
                }else setTimeout(unableE, (theAttack.hitstun)*1000/FPS)
                if(pDerecha == "izq"){
                    badGuy.fakePosition.x += theAttack.pushblock
                }else badGuy.fakePosition.x -= theAttack.pushblock
            }else{
                document.querySelector('#playerHealth').style.width = badGuy.health + '%'
                if(theAttack.attackClass !="PROJECTILE"){
                    setTimeout(unableP, (theAttack.active + theAttack.recovery + theAttack.onBlock)*1000/FPS)
                } else setTimeout(unableP, (theAttack.hitstun)*1000/FPS)
                if(pDerecha == "der"){
                    badGuy.fakePosition.x += theAttack.pushblock
                }else badGuy.fakePosition.x -= theAttack.pushblock
            }

        }else{
            badGuy.inCombo = true
            badGuy.health -= theAttack.damage
            if(theAttack.forceApply == "GB"){
                badGuy.HKD = true
                badGuy.SKD = false
                badGuy.WB = false
                badGuy.GB = true
                badGuy.velocity.y = theAttack.forceY * (badGuy.juggleMultiplier/100)
                badGuy.juggleMultiplier += theAttack.juggleValue
                if(pDerecha == "izq"){
                    if(badGuy == enemy){
                        badGuy.velocity.x = theAttack.forceX
                    }else{
                        badGuy.velocity.x = -theAttack.forceX
                    }
                }else{
                    if(badGuy == player){
                        badGuy.velocity.x = theAttack.forceX
                    }else{
                        badGuy.velocity.x = -theAttack.forceX
                    }
                }
            }else if(theAttack.forceApply == "WB"){
                badGuy.HKD = true
                badGuy.SKD = false
                badGuy.WB = true
                badGuy.GB = false
                badGuy.velocity.y = theAttack.forceY * (badGuy.juggleMultiplier/100)
                badGuy.juggleMultiplier += theAttack.juggleValue
                if(pDerecha == "izq"){
                    if(badGuy == enemy){
                        badGuy.velocity.x = theAttack.forceX
                    }else{
                        badGuy.velocity.x = -theAttack.forceX
                    }
                }else{
                    if(badGuy == player){
                        badGuy.velocity.x = theAttack.forceX
                    }else{
                        badGuy.velocity.x = -theAttack.forceX
                    }
                }
            }else if(((theAttack.forceApply == "air") && (badGuy.velocity.y != 0 || badGuy.jumpMaxPoint)) || (theAttack.forceApply == "WS") || ((theAttack.forceApply == "ground") && !(badGuy.velocity.y != 0 || badGuy.jumpMaxPoint))){
                if(theAttack.onHit != "HKD"){
                    badGuy.SKD = true
                    badGuy.HKD = false
                }else{
                    badGuy.SKD = false
                    badGuy.HKD = true
                }
                badGuy.velocity.y = theAttack.forceY * (badGuy.juggleMultiplier/100)
                badGuy.juggleMultiplier += theAttack.juggleValue
                if(pDerecha == "izq"){
                    if(badGuy == enemy){
                        badGuy.velocity.x = theAttack.forceX
                    }else{
                        badGuy.velocity.x = -theAttack.forceX
                    }
                }else{
                    if(badGuy == player){
                        badGuy.velocity.x = theAttack.forceX
                    }else{
                        badGuy.velocity.x = -theAttack.forceX
                    }
                }
                if(theAttack.forceApply == "WS"){
                    badGuy.WS = true
                }
            }
            if(theAttack.onHit == "HKD"){
                setTimeout(hardKnockedDown, (theAttack.active + theAttack.recovery)*1000/FPS, badGuy)
                if(goodGuy == player){
                    document.querySelector('#enemyHealth').style.width = badGuy.health + '%'
                    if(pDerecha == "izq"){
                        badGuy.fakePosition.x += theAttack.pushhit
                    }else badGuy.fakePosition.x -= theAttack.pushhit
                }else{
                    document.querySelector('#playerHealth').style.width = badGuy.health + '%'
                    if(pDerecha == "der"){
                        badGuy.fakePosition.x += theAttack.pushhit
                    }else badGuy.fakePosition.x -= theAttack.pushhit
                }

            }else if(theAttack.onHit == "SKD"){
                setTimeout(softKnockedDown, (theAttack.active + theAttack.recovery)*1000/FPS, badGuy)
                if(goodGuy == player){
                    document.querySelector('#enemyHealth').style.width = badGuy.health + '%'
                    if(pDerecha == "izq"){
                        badGuy.fakePosition.x += theAttack.pushhit
                    }else badGuy.fakePosition.x -= theAttack.pushhit
                }else{
                    document.querySelector('#playerHealth').style.width = badGuy.health + '%'
                    if(pDerecha == "der"){
                        badGuy.fakePosition.x += theAttack.pushhit
                    }else badGuy.fakePosition.x -= theAttack.pushhit
                }

            }else if(goodGuy == player){
                document.querySelector('#enemyHealth').style.width = badGuy.health + '%'
                if(theAttack.attackClass != "PROJECTILE"){
                    setTimeout(unableE, (theAttack.active + theAttack.recovery + theAttack.onHit)*1000/FPS)
                }else {
                    if(!badGuy.HKD && !badGuy.SKD){
                        //console.log("miau1")
                        setTimeout(unableE, (theAttack.hitstun)*1000/FPS)
                        theAttack.onScreen = false
                    }
                }
                if(pDerecha == "izq"){
                    badGuy.fakePosition.x += theAttack.pushhit
                }else badGuy.fakePosition.x -= theAttack.pushhit
            }else {
                document.querySelector('#playerHealth').style.width = badGuy.health + '%'
                if(theAttack.attackClass != "PROJECTILE"){
                    setTimeout(unableP, (theAttack.active + theAttack.recovery + theAttack.onHit)*1000/FPS)
                }else {
                    if(!badGuy.HKD && !badGuy.SKD){
                        setTimeout(unableP, (theAttack.hitstun)*1000/FPS)
                        theAttack.onScreen = false
                    }
                }
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

function twoThreeSixPlayer(whatAttack){
    if(whatAttack == "A"){
        if(!p1FramesCharging || player.FramesCharging > 120){
            if(player.FramesCharging  > 60){
                attack(player, Alvl3one)
                myAttack1 = qcfA3
            }else if(player.FramesCharging  > 25){
                attack(player, Alvl2one)
                myAttack1 = qcfA2
            }else{
                attack(player, Alvl1one)
                myAttack1 = qcfA1
            }
            player.FramesCharging = 0
        }else if(p1FramesCharging){
            player.FramesCharging ++
            if(SpecialInput1 != "66" && SpecialInput1 != "44" && SpecialInput1 != "22"){
                setTimeout (twoThreeSixPlayer, 1000/FPS, whatAttack)
            }else if(SpecialInput1 == "22"){
                setTimeout (unableP, 5* 1000/FPS)
                player.FramesCharging = 0
            }else if(SpecialInput1 == "44"){
                player.velocity.x = -runSpeed
                Dash(player)
                player.FramesCharging = 0
            }else if(SpecialInput1 == "66"){
                player.velocity.x = runSpeed
                Dash(player)
                player.FramesCharging = 0
            }
        }
    }else{
        if(!p1FramesCharging || player.FramesCharging > 120){
            if(player.FramesCharging  > 60){
                attack(player, Blvl3one)
                myAttack1 = qcfB3
            }else if(player.FramesCharging  > 25){
                attack(player, Blvl2one)
                myAttack1 = qcfB2
            }else{
                attack(player, Blvl1one)
                myAttack1 = qcfB1
            }
            player.FramesCharging = 0
        }else if(p1FramesCharging){
            player.FramesCharging ++
            if(SpecialInput1 != "66" && SpecialInput1 != "44" && SpecialInput1 != "22"){
                setTimeout (twoThreeSixPlayer, 1000/FPS, whatAttack)
            }else if(SpecialInput1 == "22"){
                setTimeout (unableP, 5* 1000/FPS)
                player.FramesCharging = 0
            }else if(SpecialInput1 == "44"){
                player.velocity.x = -runSpeed
                Dash(player)
                player.FramesCharging = 0
            }else if(SpecialInput1 == "66"){
                player.velocity.x = runSpeed
                Dash(player)
                player.FramesCharging = 0
            }
        }
    }
    
}
function twoThreeSixEnemy(whatAttack){
    if(whatAttack == "A"){
        if(!p2FramesCharging || enemy.FramesCharging > 120){
            if(enemy.FramesCharging  > 60){
                attack(enemy, Alvl3two)
                myAttack2 = qcfA3
            }else if(enemy.FramesCharging  > 25){
                attack(enemy, Alvl2two)
                myAttack2 = qcfA2
            }else{
                attack(enemy, Alvl1two)
                myAttack2 = qcfA1
            }
            enemy.FramesCharging = 0
        }else if(p2FramesCharging){
            enemy.FramesCharging ++
            if(SpecialInput2 != "66" && SpecialInput2 != "44" && SpecialInput2 != "22"){
                setTimeout (twoThreeSixEnemy, 1000/FPS, whatAttack)
            }else if(SpecialInput2 == "22"){
                setTimeout (unableE, 5* 1000/FPS)
                enemy.FramesCharging = 0
            }else if(SpecialInput2 == "44"){
                enemy.velocity.x = -runSpeed
                Dash(enemy)
                enemy.FramesCharging = 0
            }else if(SpecialInput2 == "66"){
                enemy.velocity.x = runSpeed
                Dash(enemy)
                enemy.FramesCharging = 0
            }
        }
    }else{
        if(!p2FramesCharging || enemy.FramesCharging > 120){
            if(enemy.FramesCharging  > 60){
                attack(enemy, Blvl3two)
                myAttack2 = qcfB3
            }else if(enemy.FramesCharging  > 25){
                attack(enemy, Blvl2two)
                myAttack2 = qcfB2
            }else{
                attack(enemy, Blvl1two)
                myAttack2 = qcfB1
            }
            enemy.FramesCharging = 0
        }else if(p2FramesCharging){
            enemy.FramesCharging ++
            if(SpecialInput2 != "66" && SpecialInput2 != "44" && SpecialInput2 != "22"){
                setTimeout (twoThreeSixEnemy, 1000/FPS, whatAttack)
            }else if(SpecialInput2 == "22"){
                setTimeout (unableE, 5* 1000/FPS)
                enemy.FramesCharging = 0
            }else if(SpecialInput2 == "44"){
                enemy.velocity.x = -runSpeed
                Dash(enemy)
                enemy.FramesCharging = 0
            }else if(SpecialInput2 == "66"){
                enemy.velocity.x = runSpeed
                Dash(enemy)
                enemy.FramesCharging = 0
            }
        }
    }
    
}

function hardKnockedDown(who){
    who.HKD = true
}

function softKnockedDown(who){
    who.SKD = true
}

function jumpInvulnerabilityEnds(who){
    who.inCombo = false
}

function summonProjectile(projectileName, who){
    projectileName.noFalloff = false
    projectileName.velocity.y = -10
    projectileName.velocity.x = 0
    if(who.side == "left"){
        projectileName.position.x = who.fakePosition.x + projectileName.offset.x
    }else{
        projectileName.position.x = who.fakePosition.x - projectileName.width + who.width - projectileName.offset.x//10
    }
    projectileName.position.y = 576- projectileName.height - 120
    projectileName.onScreen = true
}

function throwRockLowP(){
    rock1.noFalloff= true
    setTimeout (BattingP, 1*1000/FPS)
    rock1.velocity.y = -7
    if(pDerecha == "izq"){
        rock1.velocity.x = 26
    }else {
        rock1.velocity.x = -26
    }
}
function throwRockHighP(){
    setTimeout (BattingP, 1*1000/FPS)
    if(pDerecha == "izq"){
        rock1.velocity.x = 10
    } else {
        rock1.velocity.x = -10
    }
    rock1.velocity.y = -19
}

function BattingP(){
    player.batting = false
}

function throwRockLowE(){
    rock2.noFalloff = true
    setTimeout (BattingE, 1*1000/FPS)
    if(pDerecha == "der"){
        rock2.velocity.x = 26
    }else {
        rock2.velocity.x = -26
    }
    rock2.velocity.y = -7
}
function throwRockHighE(){
    setTimeout (BattingE, 1*1000/FPS)
    if(pDerecha == "der"){
        rock2.velocity.x = 10
    } else {
        rock2.velocity.x = -10
    }
    rock2.velocity.y = -19
}

function BattingE(){
    enemy.batting = false
}