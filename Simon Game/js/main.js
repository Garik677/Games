const gameData = Object.freeze({
    btns: document.querySelectorAll('.btn'),
    start: document.querySelector('.start'),
    time: document.querySelector('.time'),
    reload: document.querySelector('.reload'),
    g: document.querySelector('.check.g'),
    r: document.querySelector('.check.x'),
    score: document.querySelector('.score')
});
let colors = ['#343a40', '#c9184a', '#248277', '#eeef20'];
let emptyArray = [];
// function getEmptyElementsCount(arr){
//     let num = 0;
//     for(let i = Math.min(...arr); i <= Math.max(...arr); i++){
//          arr.includes(i) ? '' : num++;
//     }
//     return num ? num : arr;
// }

// function markEmptyPositions(arr){
//     let emptyArr = [];
//     for(let i = Math.min(...arr); i <= Math.max(...arr); i++){
//         arr.includes(i) ? emptyArr.push(i) : emptyArr.push('-');
//     }

//     return emptyArr;
// }
// console.log(markEmptyPositions([4, 5, 6]))
let text = '';
let str = '';
let cur = 0;
let num = 0;
let score = 0;
let bool = true;
let clickBool = true;
let rand;
let audio = new Audio('sound effect/simon game.wav');
let clickSound = new Audio('sound effect/click1.wav');
let loseSound = new Audio('sound effect/lose2.mp3');
let winSound = new Audio('sound effect/win.wav');
gameData.btns.forEach((item, index) => {
    item.style.background = colors[index];
});
gameData.start.onclick = () => {
    clickBool ? ( clickBool = false, gameFunc()) : '';
};
const gameFunc = () => {
    gameData.btns.forEach((item) => {
        item.style.pointerEvents = 'none';
    })
    gameData.g.style.left = null;
    num = 0;
    audio.play()
    audio.currentTime = 0;
    if(bool){
            rand = Math.trunc(Math.random() * 4);
            bool = false;
            emptyArray.push(rand);
            text += rand;
        }
        str = '';
        gameData.btns[emptyArray[cur]].style.filter = 'brightness(7)';
        setTimeout(() => {
            gameData.btns[emptyArray[cur]].style.filter = null;
        }, 300)
        if(cur == emptyArray.length - 1){
            clickItem()
        }else{
            setTimeout(() => {
                cur++
                gameFunc();
            }, 800)
        }
    }
    const clickItem = () => {
        gameData.btns.forEach((item, index) => {
            item.style.pointerEvents = 'auto';
             item.onclick = () => {
                clickSound.play();
                clickSound.currentTime  = 0;
                 str += index;
                 if(emptyArray[num] == index){
                    num++
                    if(str.length == text.length){
                        gameData.btns.forEach((item) => {
                            item.style.pointerEvents = 'none';
                        });
                        gameData.g.style.left = '1%';
                        winSound.play()
                        winSound.currentTime = 0;
                        score++
                        gameData.score.innerText = 'Score' + ' ' +  score;
                        setTimeout(() => {
                            cur = 0;
                            rand = Math.trunc(Math.random() * 4);
                            text += rand;
                            emptyArray.push(rand);
                             gameFunc()
                        }, 1000)
                     }
                 }else{
                    loseSound.play()
                    loseSound.currentTime = 0;
                   gameData.btns.forEach((item) => {
                        item.style.pointerEvents = 'none';
                    });
                    gameData.reload.style = 'top: 65%; left: 50%';
                    gameOver.style = 'opacity: 1; pointer-events: auto;';
                    gameData.r.style.left = '1%';
                 }
                 
             };
        });
     }

gameData.reload.onclick = () => {
    clickSound.play();
    clickSound.currentTime  = 0;
    setTimeout(() => {
        location.reload()
    }, 500)
};