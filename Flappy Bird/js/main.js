const gameData = Object.freeze({
    game: document.querySelector('.game'),
    bird: document.querySelector('.bird'),
    pipe: document.querySelectorAll('.pipe'),
    pipeTop: document.querySelectorAll('.pipe.top'),
    gameOver: document.querySelector('.gameOver'),
    point: document.querySelector('.point'),
    time: document.querySelector('.time'),
    again: document.querySelector('.realod'),
    boxReload: document.querySelector('.boxReload'),
    totalPointsBox: document.querySelector('.totalPointsBox'),
    endPoint: document.querySelector('.endPoint'),
    endTime: document.querySelector('.endTime'),
    chords: Object.seal({
        birdY: document.querySelector('.bird').offsetTop,
        rot: 0,
    }),
});


gameData.pipe.forEach(item => {
    item.style.height = Math.trunc(Math.random() * (35  - 20) + 20) + '%';
})    

console.log(gameData.again)
let rand  = Math.trunc(Math.random() * (300 - 100) + 100);
let point = 0;
let time = 0;
let total  = 20;
let againPoint = 0;
const sound = new Audio('sound/flappy_whoosh-43099.mp3');
const current = new Audio('sound/collect-points-190037.mp3');
const gameOverSound = new Audio('sound/gameOverSound.mp3');
const music = new Audio('sound/Flappy Bird Theme Song.mp3');
let setTime = setInterval(() => {
    time++
    if(time >= total){
        rand  = Math.trunc(Math.random() * (300 - 50) + 50);
        total += 30;
        gameData.bird.style.filter = `hue-rotate(${Math.trunc(Math.random() * (300 - 100) + 100) + 'deg'})`;
        gameData.game.style.filter = `hue-rotate(${Math.trunc(Math.random() * (300 - 100) + 100) + 'deg'})`;
        gameData.pipe.forEach(item => {
            item.style.filter = `hue-rotate(${rand + 'deg'})`;
        });
    }
    gameData.time.innerText = `Time ${time}`;
}, 1000) 
let brakeBird = setInterval(() => {
    gameData.chords.birdY >= 670 ?  gameOver() : '';
   gameData.chords.birdY += 10;
   gameData.chords.rot <= 40 ? gameData.chords.rot += 5 : '';
   gameData.bird.style.rotate = gameData.chords.rot + 'deg';
   gameData.bird.style.top = gameData.chords.birdY + 'px';
}, 30);

document.onmousedown = e => {
        if(e.button == 0){
            music.play()
            sound.play()
            sound.currentTime = 0;
            sound.volume = .5;
            gameData.chords.birdY -= 120;
            gameData.chords.rot = -40;  
            gameData.bird.style.top = gameData.chords.birdY + 'px';
        }else if(e.button == 2){
            music.play()
            sound.play()
            sound.currentTime = 0;
            gameData.chords.birdY -= 240;
            gameData.chords.rot = -40;  
            gameData.bird.style.top = gameData.chords.birdY + 'px';
        }
};


let updatePipe = setInterval(() => {
    gameData.pipe.forEach(item => {
        if(item.className.includes('top')){
            if(gameData.bird.offsetLeft + gameData.bird.offsetWidth >= item.offsetLeft && gameData.bird.offsetTop <= item.offsetHeight + item.offsetTop && gameData.bird.offsetLeft <= item.offsetLeft + item.offsetWidth){
                gameOver()
            }
        }else{
            if(gameData.bird.offsetLeft + gameData.bird.offsetWidth >= item.offsetLeft && gameData.bird.offsetTop >= item.offsetTop - gameData.bird.offsetHeight && gameData.bird.offsetLeft <= item.offsetLeft + item.offsetWidth){
                gameOver()
            }
        }

        if(gameData.chords.birdY >= 670){
            item.style.animationPlayState = 'paused';
        }
        if(item.offsetLeft <= 0){
            item.style.height = Math.trunc(Math.random() * (38  - 20) + 20) + '%';
        }

        if(gameData.bird.offsetLeft > gameData.pipeTop[point % gameData.pipeTop.length].offsetLeft + gameData.pipeTop[point % gameData.pipeTop.length].offsetWidth){
            current.play()
            current.currentTime = 0;
            point++
            gameData.point.innerText = `${point} Point`;
        }   
    });
}, 1)
const gameOver = () => {
    music.pause()
    music.currentTime = 0;
    gameOverSound.play()
    clearInterval(brakeBird)
    clearInterval(updatePipe)
    clearInterval(setTime)
    gameData.endPoint.innerText = `Point ${point}`
    gameData.endTime.innerText = `Time ${time}`
    gameData.bird.style.filter = null;
    gameData.game.style.filter = null;
    document.onmousedown = null
    gameData.bird.style.rotate = 180 + 'deg';
    gameData.game.style.animationPlayState = 'paused'
    gameData.again.style.opacity = 1;
    gameData.gameOver.style.opacity = 1;
    gameData.totalPointsBox.style.display = 'block';
    gameData.again.style.pointerEvents = 'auto';
    setTimeout(() => {
        gameData.boxReload.style.top = '63%';
    }, 500)
    gameData.bird.style.top = innerHeight - 85 - gameData.bird.offsetHeight + 'px';
    gameData.pipe.forEach(item => {
        item.style.animationPlayState = 'paused';
        item.style.filter = null;
    });
}
gameData.again.onclick = () => location.reload();
document.oncontextmenu = () => false;