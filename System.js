//espacio de juego
export const canvas = document.querySelector("canvas")
export const c = canvas.getContext("2d")
canvas.width = 1024
canvas.height = 576

//variables movimiento
export const CROUCHING = "crouching"
export const STANDING = "standing"

export let timer = 60;
export let timerId
//la partida no ha acabado
export let playing = true
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
