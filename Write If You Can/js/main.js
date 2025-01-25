const viewBox = document.querySelector('.view .box');
const exampleBox = document.querySelector('.example .box');
const point = document.querySelector('.point');
let audio = new Audio('music/stranger-things-124008.mp3');
const descBox = document.querySelector('.decs__box');
const btns = document.querySelectorAll('.btn');
const menu = document.querySelector('.menu');
const X = document.querySelector('.desc__btn');

btns[0].onclick  = () => {
   menu.style.top = '-100vh';
}

btns[1].onclick = () => {
    descBox.style.left = '50%';
};

X.onclick = () => {
    descBox.style.left = null;
}

let room = 1;
const winner = x => {
    room++
    point.innerHTML = `${room}<br>Point`;
    viewBox.style = x;
    editor.style.color = 'rgb(18, 175, 141)';
    if(room > 10){
        point.innerHTML = `You Winner`;
        point.style.transform = 'scale(1.3)';
            editor.style.pointerEvents = 'none';
            point.ontransitionend = () => {
                editor.style.color = null;
                editor.value  = '';
                audio.pause()
             };
    }
    exampleBox.style = null;
    viewBox.ontransitionend = () => {
       editor.style.color = null;
       editor.value  = '';
    };
}

editor.oninput = () => {
    if(room <= 10){
        audio.play()
    }
    let val = editor.value;
    exampleBox.style = val;
    if(room == 1 && val.includes('width: 100px;') && val.includes('height: 150px;') && val.includes('background: orange;') && !val.includes('/')){
        winner('width: 250px; height: 200px; background: yellow; border: 10px double black;');
    }else if(room == 2 && val.includes('width: 250px;') && val.includes('height: 200px;') && val.includes('background: yellow;') && val.includes('border: 10px double black;') && !val.includes('/')){
        winner('width: 350px; height: 150px; background: black; border-radius: 30px; border: 20px dotted white;');
    }else if(room == 3 && val.includes('width: 350px;') && val.includes('height: 150px;') && val.includes('background: black;') && val.includes('border: 20px dotted white;') && val.includes('border-radius: 30px;') && !val.includes('/')){
        winner('width: 400px; height: 300px; background: pink; border: 15px dashed purple; border-radius: 50%;')
    }else if(room == 4 && val.includes('width: 400px;') && val.includes('height: 300px;') && val.includes('background: pink;') && val.includes('border: 15px dashed purple;') && val.includes('border-radius: 50%;') && !val.includes('/')){
        winner('width: 200px; height: 150px; background: red; border-radius: 0 8px 20px 35px;');
    }else if(room == 5 && val.includes('width: 200px;') && val.includes('height: 150px;') && val.includes('background: red;') && val.includes('border-radius: 0 8px 20px 35px;') && !val.includes('/')){
        winner('width: 300px; height: 300px; background: white; border: 10px solid black; border-radius: 50% 30%');
    }else if(room == 6 && val.includes('width: 300px;') && val.includes('height: 300px;') && (val.includes('background: white;') && val.includes('border: 10px solid black;') || val.includes('border: 10px solid black;'))  && val.includes('border-radius: 50% 30%;')  && !val.includes('/')){
        winner('width: 400px; height: 500px; background: green; border-radius: 50% 20% 30% 40%');
    }else if(room == 7 && val.includes('width: 400px;') && val.includes('height: 500px;') && val.includes('background: green;') && val.includes('border-radius: 50% 20% 30% 40%;')  && !val.includes('/')){
        winner('width: 500px; height: 500px; background: blueviolet; border: 15px double black; border-radius: 30px 60px 120px 240px;')
    }else if(room == 8 && val.includes('width: 500px;') && val.includes('height: 500px;') && val.includes('background: blueviolet;') && val.includes('border: 15px double black;') && val.includes('border-radius: 30px 60px 120px 240px;')  && !val.includes('/')){
        winner('width: 300px; height: 100px; background: brown; border: 25px double blueviolet; rotate: -40deg;');
    }else if(room == 9 && val.includes('width: 300px;') && val.includes('height: 100px;') && val.includes('background: brown;') && val.includes('border: 25px double blueviolet;') && val.includes('rotate: -40deg;') && !val.includes('/')){
        winner('width: 200px; height: 200px; background: silver; border: 10px solid black; rotate: 45deg;');
    }else if(room == 10 && val.includes('width: 200px;') && val.includes('height: 200px;') && val.includes('background: silver;') && val.includes('border: 10px solid black;') && val.includes('rotate: 45deg;') && !val.includes('/')){
        winner('width: 200px; height: 200px; background: silver; border: 10px solid black; rotate: 45deg;');
    }
};

/*1
width: 100px;
height: 150px;
background: orange;
*/

/*2
width: 250px;
height: 200px;
background: yellow;
border: 10px double black;
*/

/*3
width: 350px;
height: 150px;
background: black;
border: 20px dotted white;
border-radius: 30px;
*/

/*4
width: 400px;
height: 300px;
background: pink;
border: 20px dashed black;
border-radius: 50%;
*/

/*5
width: 200px;
height: 150px;
background: red;
border-radius: 0 8px 20px 35px;
*/

/*6
width: 300px;
height: 300px;
border: 10px solid black;
border-radius: 50% 30%;
*/

