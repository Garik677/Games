const table = document.querySelector('.tbl');
const inputs = document.querySelectorAll('input');
const btns = document.querySelectorAll('.funBtn');
const nums = document.querySelectorAll('.num');
let tbW;
let tbH;
const arrayTd = [];
let color = inputs[2].value;
let bool = false;
console.log('z'.charCodeAt())
inputs[0].oninput = () => (tbW = inputs[0].value, nums[0].innerText = inputs[0].value);
inputs[1].oninput = () => (tbH = inputs[1].value, nums[1].innerText = inputs[1].value);
btns[0].onclick = () => {
    btns[0].style.pointerEvents = 'none';
    document.body.firstElementChild.style.height = 700 + 'px';
    document.body.firstElementChild.children[0].style.height = 15 + '%';
    document.body.firstElementChild.ontransitionend = () => {
        table.style.opacity = 1;
        document.body.firstElementChild.children[1].style.height = 15 + '%';
        document.body.firstElementChild.children[2].style.transition = '.5s';
        document.body.firstElementChild.children[2].style.height = 70 + '%';
    }
    for(let i = 0; i < tbH; i++){
        let tr = document.createElement("tr");
        table.append(tr);
        for(let j = 0; j < tbW; j++){
            let td = document.createElement("td");
            arrayTd.push(td);
            td.style.border = '1px solid black';
            tr.append(td);
        }
    }
    arrayTd.forEach(item => {
        item.onmousedown = () => (bool = true, item.style.background = color);
        item.onmouseover = () => {
            bool ? item.style.background = color : '';
        }
    });
}
document.onmouseup = () => bool = false;
btns[1].onclick = () => location.reload();
inputs[2].oninput = () => color = inputs[2].value;
btns[2].onclick = () => (color = 'white', bool = false);
btns[3].onclick = () => color = (inputs[2].value);