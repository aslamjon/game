function addZero(i) {
    if (i < 10) 
      i = "0" + i;
    return i;
}

function getDatee() {
    let d = new Date()
    time.innerHTML = `${addZero(d.getHours())}:${addZero(d.getMinutes())}`;
}

getDatee()

setInterval('getDatee()', 10000)


let ball = document.querySelector('.ball');


let translateY = 300;
let x = 10;
let y = 320;
let level = 0;
let lastPlaceOfX = card.clientWidth-22;

let rightBtn = undefined;
let leftBtn = undefined;

let rowPlace = document.querySelector(".rowPlace");
rowPlace.style.transform = `translateY(${translateY}px)`;

let decimal = 0;
let secondItem = 0;
let difference = [];
let twentyPre = 0;
function random() {
    let cardWidth = String(card.clientWidth);
    let cardNum = '';
    for (let index = 1; index < cardWidth.length-1; index++) 
        cardNum += '0';
    let cardWidthNum = Number(cardWidth[0] + cardNum + '1');

    decimal =  Math.floor(Math.random() * cardWidthNum);

    twentyPre = (card.clientWidth * 20) / 100;

    secondItem = Math.floor(card.clientWidth-(twentyPre+decimal));

    let lastNumberOfDecimal = String(decimal)[String(decimal).length-1];
    if (secondItem < 20 || decimal < 50 || lastNumberOfDecimal !== '0') 
        random()
    
}
function createPlace(){
    random()
    rowWay = document.createElement('div');
    rowWay.className = "row-way"
    let item1 = document.createElement("div");
    let item2 = document.createElement('div');
    item1.className = "item1";
    item2.className = "item2";
    item1.style.width = `${decimal}px`;
    item2.style.width = `${secondItem}px`;

    rowWay.appendChild(item1);
    rowWay.appendChild(item2);
    rowPlace.appendChild(rowWay);
    difference.push({"item1": decimal,'item2': Math.floor(twentyPre+decimal-10)});
}
createPlace()
createPlace()
createPlace()
createPlace()

card.style.background = 'rgba(0, 0, 0, 0.8)';

right.style.display = 'none';
left.style.display = 'none';
right.style.opacity = 0;
left.style.opacity = 0;

let runTopId = undefined;

function startBtn() {
    // ==================- Reset -==============================
    console.log('restart');
    translateY = 300;
    difference = [];
    x = 10;
    y = 320;
    level = 0;
    log.innerHTML = `Ball: <span>${level}</span>`;
    rowPlace.style.transform = `translateY(${translateY}px)`;
    rowPlace.innerHTML = '';
    createPlace()
    createPlace()
    createPlace()
    createPlace()
    ballWalk()
    gameOver.style.display = 'none';
    // ==================- Start -==============================
    settingsKeyboardAndMouse();
    card.style.background = 'rgba(255, 255, 255, 1)';
    ball.style.background = '#408ec6';
    ball.style.background = 'url(img/volleyball.svg)'
    start.style.opacity = '0';
    title.style.opacity = '0';
    reload.style.display = 'inline-block';
    if (window.innerWidth >= 500) {
        right.style.display = 'block';
        left.style.display = 'block';
        setTimeout(function() {
            start.style.display = 'none';
            right.style.opacity = 1;
            left.style.opacity = 1;
            title.style.display = 'none';
            reload.style.opacity = 1;
        }, 500);
    } else {
        setTimeout(function() {
            right.style.opacity = 0;
            right.style.display = 'none';
            left.style.opacity = 0;
            left.style.display = 'none';

        },500);
    }
    // One is setInterval. The other one is a nested setTimeout, like this:
    runTopId = setTimeout(function runSet() {
        runTopId = setInterval(runToTop, 500);

    }, 600)
    
}
start.onclick = startBtn;
reload.onclick = startBtn;
function runToTopSettings(transY) {
    translateY -= transY;
    y -= transY;
    rowPlace.style.transform = `translateY(${translateY}px)`;
    ballWalk()
    createPlace()
}
let defaultTop = 20
function runToTop() {
    runToTopSettings (defaultTop);
    if (y < 10) {
        clearInterval(runTopId);
        // clearTimeout(runTopId);
        gameOverBtn();
    } else if (y > card.clientHeight -20) {
        runToTopSettings (defaultTop + 40);
    }
    if (level == 50) defaultTop += 10, ball.style.background = 'url(img/basketball.svg)';
    else if (level == 100) defaultTop += 10, ball.style.background = 'url(img/tennis (1).svg)';
    else if (level == 150) defaultTop += 10, ball.style.background = 'url(img/soccer-ball-variant.svg)';
    else if (level == 200) defaultTop += 10, ball.style.background = 'url(img/tennis.svg)';
    else if (level == 250) defaultTop += 10;
    else if (level == 300) defaultTop += 10;
    
}

function gameOverBtn() {
    gameOver.style.display = 'flex';
    card.style.background = 'rgba(0, 0, 0, 0.8)';
    removeSettingsKeyboardAndMouse()
    setTimeout(function() {
        gameOver.style.opacity = 1;
    },500)
    restart.onclick = startBtn;
}

function ballWalk() {
    // console.log(difference[0].item1, x, difference[0].item2, y);
    if (x >= difference[0].item1 && x < difference[0].item2){
        y += 60;
        level++;
        log.innerHTML = `Ball: <span>${level}</span>`;
        ball.style.transform = `translate(${x}px, ${y}px) rotate(${y+80}deg)`;
        difference.shift();
        if (x >= difference[0].item1 && x < difference[0].item2){
            ballWalk()
        }
    }
    else {
        ball.style.transform = `translate(${x}px, ${y}px) rotate(${y+80}deg)`;
    }

}

function toLeft() {
    if (x > 0) x -= 10;
    if (x >= 0) ballWalk();
}
function toRight() {
    if (x < lastPlaceOfX) x += 10;
    if (x <= lastPlaceOfX) ballWalk();
}

function settingsKeyboardAndMouse() {
    // document.addEventListener("keydown", temp)
    document.onkeydown = function(event) {
        // console.log(event);
        // console.log(event.which);
        // right arrow = 39
        // left arrow = 37
        // bottom arrow = 40
        // top arrow = 38
        // Enter = 13
        if (event.which === 39) {
            toRight()
        } else if (event.which === 37) {
            toLeft()
        } else if (event.which === 13) {
            startBtn() 
        }
    };
    
    if (window.innerWidth > 500) {
        right.onclick = () => { toRight() };
        right.onmousedown = () => { rightBtn = setInterval("toRight()", 50) };
        right.onmouseup = () => { clearInterval(rightBtn) };
        left.onclick = () => { toLeft() };
        left.onmousedown = () => { leftBtn = setInterval("toLeft()", 50) };
        left.onmouseup = () => { clearInterval(leftBtn) };
        
    } else {
        // left.ontouchstart = () => { leftBtn = setInterval(toLeft, 50); logs.innerHTML = 'start' + leftBtn; };
        // left.ontouchend = () => {clearInterval(leftBtn); logs.innerHTML = 'end'+left; };
        // right.ontouchstart = () => { rightBtn = setInterval(toRight, 50); logs.innerHTML = 'start' + rightBtn; };
        // right.ontouchend = () => { clearInterval(rightBtn); logs.innerHTML = 'end' + rightBtn; };
    }
    let v = 0;
    range.oninput = function() {
        if (range.value > v) toRight(); 
        else toLeft();
        v = range.value;
    }
}

function removeSettingsKeyboardAndMouse() {
    document.onkeydown = undefined;
    
    right.onclick = undefined;
    right.onmousedown = undefined;
    right.onmouseup = undefined;
    left.onclick = undefined;
    left.onmousedown = undefined;
    left.onmouseup = undefined;
}

log.innerHTML = `Ball: <span>${level}</span>`;



