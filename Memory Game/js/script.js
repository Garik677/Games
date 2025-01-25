const gallerys  = document.querySelectorAll('.gallery');
const score = document.querySelector('.score');
const memory = document.querySelector('.memory');
const winnerText = document.querySelector('.winner');
const relod = document.querySelector('.relod');
const gameOverBG  = document.querySelector('.gameOverBg');
let winnerSound = new Audio('sound effect/memoryGameWin.mp3');
let cardClickSound = new Audio('sound effect/cardclickSound.mp3');
let trueSound = new Audio('sound effect/trueSound.mp3');
let fasleSound = new Audio('sound effect/fasleSound.mp3');
let loseSound = new Audio('sound effect/loseSound.mp3');
let oneCard;
let twoCard;
let game = true;
let iOne;
let iTwo;
let s = 0;
let m = 0;
let x;
let y;
let active = [];
const comparison = () => {
    active.push(x)
    active.push(y)
    console.log(active)
        gallerys.forEach((item) => {
            item.style.pointerEvents = 'none';
        });
        if(oneCard == twoCard){
            cardClickSound.volume = .2;
            trueSound.play()
            trueSound.currentTime = 0;
            s++
            score.innerText = `Score ${s}`;
            console.log(true)
            oneCard = '';
            twoCard = '';
            gallerys.forEach((item) => {
                item.style.pointerEvents = 'auto';
                active.forEach((item) => {
                    item.style.pointerEvents = 'none';
                })
            })
            gallerys[iTwo].style.pointerEvents = 'none';
            gallerys[iOne].style.pointerEvents = 'none';
            if(s >= 8){
                gallerys.forEach((item) => {
                    item.style.pointerEvents = 'none';
                    winner()
                })
            }
        }else{
            cardClickSound.volume = .2;
            fasleSound.play()
            fasleSound.currentTime = 0;
            active.pop(x);
            active.pop(y);
            m++
            memory.innerText = `Memory ${m}`
            setTimeout(() => {
                gallerys[iOne].firstElementChild.classList.remove('box');
                gallerys[iOne].lastElementChild.style = null;
                gallerys[iTwo].firstElementChild.classList.remove('box');
                gallerys[iTwo].lastElementChild.style = null;
                gallerys[iTwo].style.pointerEvents = 'auto';
                gallerys[iOne].style.pointerEvents = 'auto';
                gallerys.forEach((item) => {
                    item.style.pointerEvents ='auto';
                    active.forEach((item) => {
                        item.style.pointerEvents = 'none';
                    })
                })
            }, 1000)
            setTimeout(() => {
                gallerys[iTwo].style.translate = '5px 0';
                gallerys[iOne].style.translate = '5px 0';
                setTimeout(() => {
                    gallerys[iTwo].style.translate = '-5px 0';
                    gallerys[iOne].style.translate = '-5px 0';
                }, 200)
                setTimeout(() => {
                    gallerys[iTwo].style.translate = null;
                    gallerys[iOne].style.translate  = null;
                }, 500)
            },100)
            oneCard = '';
            twoCard = '';
        }
        clickCard()
}

const clickCard = () => {
    if(m >= 10){
        gameOver()
    }else{
        gallerys.forEach((item, index) => {
            item.onclick = () => {
                cardClickSound.play()
                cardClickSound.volume = 1;
                cardClickSound.currentTime = 0;
                    if(game){
                        item.firstElementChild.classList.add('box');
                        item.lastElementChild.style = 'opacity: 1; z-index: 1; transform: rotateY(-180deg)';
                        oneCard = item.lastElementChild.src;
                        x = item;
                        console.log(oneCard, 'onecard')
                        iOne = index
                        item.style.pointerEvents = 'none';
                    }else{
                        item.firstElementChild.classList.toggle('box');
                        item.lastElementChild.style = 'opacity: 1; z-index: 1';
                        twoCard = item.lastElementChild.src;
                        y = item;
                        console.log(twoCard, 'twocard')
                        iTwo = index;
                        item.style.pointerEvents = 'none';
                    }
                    game = !game; 
                    if(oneCard && twoCard){
                        comparison()
                    }
            }
    });
    }
}

clickCard()

relod.onclick = () => {
    location.reload();
}


const gameOver = () => {
    fasleSound.pause()
    loseSound.play();
    winnerText.innerText = 'GameOver';
    winnerText.style.color = 'red';
    winnerText.style.opacity = 1;
    gameOverBG.style.pointerEvents = 'auto';
    gameOverBG.style.opacity = 1;
    relod.innerText = 'New Game';
    relod.style = 'left: 50%; top: 50%; translate: -50% -50%;'
}

const winner = () => {
    trueSound.pause()
    winnerSound.play()
    setTimeout(() => {
        winnerText.innerText = 'Winner';
        winnerText.style.color = null;
        winnerText.style.opacity = 1;
        gameOverBG.style.pointerEvents = 'auto';
        gameOverBG.style.opacity = 1;
        relod.innerText = 'New Game';
        relod.style = 'left: 50%; top: 50%; translate: -50% -50%;'
    }, 300)
}

