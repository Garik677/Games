const keybord  = document.querySelector('.keybord');
const textBox = document.querySelector('.textBox');
const btns = document.querySelectorAll('.btn');
const lose = document.querySelectorAll('.lose');
const hangman = document.querySelector('.hangman');
const winnerBox = document.querySelector('.winnerBox');
const trueText = document.querySelector('.nameTrueText');
const winText = document.querySelector('.won');
const next = document.querySelector('.next');
let cur = 0;
let loseNum = 0;
let fruitArray = ['apple', 'banan', 'rare', 'kiwi', 'blueberry', 'watermelon', 'peach', 'lemon', 'pear', 'orange'];
let animalsArray = ['lion', 'snake', 'tiger', 'falcon', 'dog', 'cat', 'wolf', 'leopard', 'lizard', 'owl'];
let countreis = ['Armenia', 'America', 'Russia', 'france', 'germany', 'spain', 'canada', 'england', 'brazil', 'china'];
let buttonArray = []
let lineBox = [];
let str = '';
let line;
let bool = true;
let loseBool = true;
let clickBool = true;
let arr;
let clickEffect = new Audio('sound effect/click1.wav');
let TrueWord = new Audio('sound effect/trueLetter.mp3');
let falseeclick  = new Audio('sound effect/falseLetter.wav');
let loseEffect = new Audio('sound effect/lose.mp3');
let gameEnd = new Audio('sound effect/gameEnd.mp3');
btns.forEach((item) => {
    item.onclick = () => {
        clickEffect.play()
        hangman.style.height = '600px';
        winnerBox.style.height = '600px';
        hangman.ontransitionend = () => {
            keybord.style.opacity = 1;
            textBox.style.opacity = 1;
        };
        btns.forEach((item) => {
            item.style.opacity = .5;
            item.style.pointerEvents = 'none';
        });
        item.style.background = 'orange';
        item.style.opacity = 1;
        for(let i = 65; i < 91; i++){
            let button = document.createElement("button");
            button.classList.add('button');
            button.innerText = String.fromCharCode(i);
            keybord.append(button);
            buttonArray.push(button);

        }
        if(item.innerText ==  'Fruits'){
            gameFunc(fruitArray);
        }else if(item.innerText == 'Animals'){
            gameFunc(animalsArray);
        }else{
            gameFunc(countreis);
        }
    }; 
});

const gameFunc = (x) => {
    str = '';
    loseNum = 0;
    lose.forEach((item) => {
        item.style.opacity = 0;
    });
    buttonArray.forEach((item) => {
        item.style.background = null;
        item.style.opacity = 1;
        item.style.pointerEvents = 'auto';
    });  
    for(let i =  0; i < x[cur].length; i++){
        line = document.createElement("div");
        line.classList.add('line');
        line.innerText = '-';
        textBox.append(line);
        lineBox.push(line);
    }
    
    buttonArray.forEach((item) => {
        item.onclick = () => {
            bool = true;
            for(let i = 0; i < x[cur].length; i++){
                if(item.innerText == x[cur][i].toUpperCase()){
                    clickEffect.play()
                    clickEffect.currentTime = 0;
                    let e = x[cur].lastIndexOf(x[cur][i]);
                    let y = x[cur].indexOf(x[cur][i]);
                    if(bool){
                        item.style.opacity = .5;
                        item.style.pointerEvents = 'none';
                        item.style.background = 'orange';
                        lineBox[e].innerText = item.innerText;
                        lineBox[y].innerText = item.innerText;
                        str += '1';
                    }
                    if(str.length == x[cur].length){
                        TrueWord.play()
                        TrueWord.currentTime = 0;
                        bool = false;
                        lineBox = [];
                        str = '';
                        setTimeout(() => {
                            line.innerText = null;
                            textBox.innerHTML = null;
                        }, 200)
                        if(cur == x.length - 1){
                            TrueWord.pause()
                            gameEnd.play()
                            gameEnd.currentTime = 0;
                                clickBool = false;
                                winnerBox.style.zIndex = 2;
                                hangman.style.zIndex = 1;
                                trueText.innerText = 'Genius';
                                next.innerText = 'New Game';
                        }else{
                            winnerBox.style.zIndex = 2;
                            hangman.style.zIndex = 1;
                            st.innerText = x[cur].toUpperCase();
                            arr = x;
                        }
                    }
                }
            }
            if(!x[cur].toUpperCase().includes(item.innerText)){
                falseeclick.play()
                falseeclick.currentTime = 0;
               item.style.opacity = .5;
               item.style.pointerEvents = 'none'; 
               lose[loseNum].style.opacity = 1;
               loseNum++
               if(loseNum == lose.length){
                falseeclick.pause()
                    loseEffect.play()
                   clickBool = false;
                    setTimeout(() => {
                        winnerBox.style.zIndex = 2;
                        hangman.style.zIndex = 1;
                        next.innerText = 'New Game';
                        winText.innerText = 'You To Lose!!';
                        trueText.innerText = '';
                        next.style.background = 'orangered';
                    }, 300)
               }
            }
        };
    });
};

next.onclick = () => {
    TrueWord.pause();
    TrueWord.currentTime = 0;
    clickEffect.play();
        if(clickBool){
            cur++
            winnerBox.style.zIndex = 1;
            hangman.style.zIndex = 2;
            gameFunc(arr);
        }else{
            location.reload()
        }
}