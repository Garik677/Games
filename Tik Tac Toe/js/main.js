const itemBox = document.querySelector('.itemBox');
const effBox = document.querySelector('.effBox');
const playNew = document.querySelector('.playNew');
const itemsArray = [];
const winAndDraw = document.querySelector('.winAndDraw');
let turn = 'X';
let cur = 0;
let drawBool = true;
let clickSound = new Audio('sound effect/click1.wav');
let winSound = new Audio('sound effect/tictacWin.mp3');
for(let i = 0; i < 9; i++){
    let item = document.createElement("div");
    item.classList.add('item');
    itemsArray.push(item);
    itemBox.appendChild(item);
}

itemsArray.forEach((item) => {
    item.onclick = () => {
        clickSound.play()
        clickSound.currentTime = 0;
        cur++
        item.style.pointerEvents = 'none';
       if(turn == 'X'){
        item.innerText = turn;
        turn = 'O';
        effBox.style.borderRight = 'none';
        effBox.style.borderLeft = '2px solid black';
        effBox.style.left = '90px'
        item.style.color = null;
       }else{
        item.innerText = turn;
        turn = 'X'
        effBox.style = null;
        item.style.color = 'orangered';
       }
       winner()
       Draw()
    }
});

const winner = () => {
    let winners = [[0 , 1, 2], [3, 4 ,5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]];
        winners.forEach((item, index) => {
            if(itemsArray[item[0]].innerText != '' && itemsArray[item[0]].innerText == itemsArray[item[1]].innerText && itemsArray[item[1]].innerText == itemsArray[item[2]].innerText){
                winSound.play()
                drawBool = false;
                itemsArray[item[0]].style.background = '#08D9D6';
                itemsArray[item[1]].style.background = '#08D9D6';
                itemsArray[item[2]].style.background = '#08D9D6';
                playNew.style.scale = 1;
                winAndDraw.innerText = `${itemsArray[item[0]].innerText} Win`;
                winAndDraw.style.opacity = 1;
                if(itemsArray[item[0]].innerText == 'X'){
                    effBox.style = null;
                }else{
                    effBox.style.borderRight = 'none';
                    effBox.style.borderLeft = '2px solid black';
                    effBox.style.left = '90px'
                }
                itemsArray.forEach((item) => {
                    item.style.pointerEvents = 'none';
                })
            }
        })
}

const Draw = () => {
    if(cur == itemsArray.length && drawBool){
        winAndDraw.innerText = 'Draw';
        winAndDraw.style.opacity = 1;
        playNew.style.scale = 1;
        itemsArray.forEach((item) => {
            item.style.pointerEvents = 'none';
        })
    }
}

playNew.onclick = () => {
    location.reload()
} 