window.onload = () => {
    const record = document.querySelector('.record');
    let arr =  Array.from(localStorage.getItem('point'));
    record.innerText = 'Record Point' + ' ' +  Math.max(...arr);
}
const startBox = document.querySelector('.startBox');
const play = document.querySelector('.btnPlay');
const inp = document.querySelector('.inp');
const code = document.querySelector('.code');
const secondLine = document.querySelector('.secondLine');
const time = document.querySelector('.second');
const trueLines = document.querySelectorAll('.trueLine');
const blackboard = document.querySelector('.blackboard');
const loseBox = document.querySelector('.loseBox');
const game = document.querySelector('.game');
const pointBox = document.querySelector('.pointBox');
const timeSound = new Audio('sound effect/time.mp3'); 
const loseSound = new Audio('sound effect/lose.mp3'); 
const trueSound = new Audio('sound effect/trueSound.mp3'); 
const winGameSound = new Audio('sound effect/memoryGameWin.mp3'); 
let codesArray  = [['n2F', 'GH9', 'O01', '0o!', 'J9m', 'kk1', '{I}', 'Ll!', 'YM3', 'LL&', 'P*i', 'j@)', 'G1M', 'S+q', 'a0b', 'Aim', 'im7', 'M*S', 'hV4', 'GHj', '<lI', 'Klo', 'L9s', '%Tn', '5U9', '0#O', 'LOL', 'ReD', '<0>', 'k:a', 'p{;', 'd/D', 'HJx', '?a?', 'lPF', '6To', 'L"n', 'NcA', 'Op8', 'KoM'], ['GhM!Amm', 'UioAjM9', 'Hm%KlnV', 'FtMnA0@', 'Jnm=/<J', 'L=>{;4c', 'LmVh9n^', 'JmnC0A5', 'GjmAb7]', 'Lavdfo:']];
let arrNum = 0;
function hero(bullets, dragons){
    if(bullets % 2 == 0){
        return true;
    }
    return false;
  }
  
  function correct(string){
    let relust;
	for(let i = 0; i < string.length; i++){
      if(string[i] == '0'){
        relust = string.replace(/0/gi, 'O');
      }else if(string[i] == '1'){
        relust = string.replace(/1/gi, 'I');
      }else if(string[i] == '5'){
        relust = string.replace(/5/gi, 'S');
      }
  }
  return relust.toUpperCase()
}
console.log(correct("Par05"))
inp.maxLength = 7;
let emptyArr = [];
let arrPoint = [];
let text = '';
let secLineH = 100;
let timeS = 10;
let trueLineWidth = 0;
let rand = Math.trunc(Math.random() * codesArray[arrNum].length);
code.innerText = codesArray[arrNum][rand];
let secT;
let secInt;
let numLIne = 0;
let point = 0;
play.onclick = () => {
    timeSound.play()
    startBox.style.top = 100 + '%';
    second()
};
inp.oninput = () => {
    if(inp.value == code.innerText){
        setTimeout(() => {
            inp.value = '';
        }, 200)
        trueSound.play()
        trueSound.currentTime = 0;
        setTimeout(() => {
        emptyArr.length == 0  ? emptyArr.push(rand) : '';
        clearInterval(secT);
        clearInterval(secInt);
        timeS = 10;
        time.innerText = `${timeS}s`;
        secLineH = 100;
        secondLine.style.height = secLineH + '%';
        trueLineWidth += 100 / codesArray[arrNum].length * 2;
        trueLines[numLIne].style.width = trueLineWidth + '%';
        if(trueLineWidth == 100){
            trueLines[numLIne].style.width = 100 + '%'
            trueLineWidth = 0;
            numLIne++
            numLIne  > trueLines.length ? numLIne = trueLines.length - 1 : '';
        }
        point++
        arrPoint.push(point)
        parseInt(localStorage.setItem('point', arrPoint))
        pointBox.firstElementChild.innerText = point;
        pointBox.style.top = 80 + '%';
        inp.maxLength = 0;
        inp.style.color = 'rgb(44, 183, 44)'
        setTimeout(() => {
            inp.style.color = null;
            pointBox.style.top = null;
            inp.maxLength = codesArray[arrNum][0].length;
        }, 500)
        second()
        arrNum != codesArray.length  ? ( winner(codesArray[arrNum])) : '';
       }, 100)
    }else if(inp.value.length == code.innerText.length && inp.value != code.innerText){
        inp.style.color = 'red';
        setTimeout(() => {
            loseGame()
        }, 200)
    }
};
const winner = (arr) => {
    timeSound.currentTime = 0;
        if(arrNum == codesArray.length - 2){
            setTimeout(() => {
                numLIne == trueLines.length  ? (trueLines.forEach(item => (item.style.width = null, item.style.background = 'orangered')), numLIne = 0) : '';
            }, 50)
    }
    if(emptyArr.length != arr.length){
        rand = Math.trunc(Math.random() * arr.length);
        if(!emptyArr.includes(rand)){
            emptyArr.push(rand);
            code.innerText = arr[rand];
        }else{
            rand = Math.trunc(Math.random() * arr.length);
            winner(codesArray[arrNum])
        }
    }else{
        arrNum++
        arrNum != codesArray.length ? ( emptyArr = [],   inp.maxLength = codesArray[arrNum][0].length,  winner(codesArray[arrNum])) : (victory());
    }
};

const second = () => {
     secT = setInterval(() => {
        timeS--
        time.innerText = `${timeS}s`;
    }, 1000);
    secInt = setInterval(() => {
        secLineH--
        secondLine.style.height = secLineH + '%';
        time.style.top = secLineH + '%';
        if(secLineH <= 0){
            clearInterval(secT);
            clearInterval(secInt);
            time.style.marginTop = 9 + 'px';
            loseGame()
        }
    }, 100)
};
const victory = () => {
    arrNum = 0;
    timeSound.pause()
    trueSound.volume = .5;
    winGameSound.play()
    clearInterval(secT);
    clearInterval(secInt);
    blackboard.style.transform  = 'rotateY(180deg)';
    loseBox.style.transform  = 'rotateY(180deg)';
    code.style.opacity  = 0;
    setTimeout(() => {
        loseBox.style.scale = 1;
        trueLines.forEach((item) => {
            item.style.width = null;
        });
    }, 200);
    game.style.pointerEvents = 'none';
    inp.maxLength = 0;
    secondLine.style = null;
    time.style = null;
    loseBox.lastElementChild.innerText = 'You Win'
    setTimeout(() => {
        pointBox.firstElementChild.innerText = point;
        pointBox.style.top = 80 + '%';
    }, 700)
    setTimeout(() => {
      location.reload()
    }, 4000)
};
const loseGame = () => {
    loseSound.play()
    timeSound.pause()
    arrPoint.push(point)
    localStorage.setItem('point', arrPoint)
    blackboard.style.transform  = 'rotateY(180deg)';
        loseBox.style.transform  = 'rotateY(180deg)';
        code.style.opacity  = 0;
        inp.maxLength = 0;
        clearInterval(secT);
        clearInterval(secInt);
        pointBox.firstElementChild.innerText = point;
        pointBox.style.top = 80 + '%';
        setTimeout(() => {
            loseBox.style.scale = 1;
            trueLines.forEach((item) => {
                item.style.width = null;
            });
        }, 200);
        setTimeout(() => {
            location.reload()
          }, 4000)
};