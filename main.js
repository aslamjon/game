let ball = document.querySelector('.ball');

let translateY = 300;

let rowPlace = document.querySelector(".rowPlace");
rowPlace.style.transform = `translateY(${translateY}px)`;

let decimal = 0;
let secondItem = 0;
let difference = [];
function random() {
    decimal =  Math.floor(Math.random() * 101);
    secondItem = 100-decimal-20;
    if (secondItem < 20) {
        random()
    } else {
        difference.push({"item1": decimal,'item2': secondItem});
    }
}

function createPlace(){
    random()
    rowWay = document.createElement('div');
    rowWay.className = "row-way"
    let item1 = document.createElement("div");
    let item2 = document.createElement('div');
    item1.className = "item1";
    item2.className = "item2";
    item1.style.width = `${decimal}%`;
    item2.style.width = `${secondItem}%`;
    rowWay.appendChild(item1);
    rowWay.appendChild(item2);
    rowPlace.appendChild(rowWay);
}
createPlace()
createPlace()
createPlace()
createPlace()
let card = document.querySelector('.card');
card.style.background = 'rgba(0, 0, 0, 0.8)';

right.style.display = 'none';
left.style.display = 'none';
right.style.opacity = 0;
left.style.opacity = 0;
start.onclick = function () {
    card.style.background = 'rgba(255, 255, 255, 1)';
    ball.style.background = '#408ec6';
    this.style.opacity = '0';
    right.style.display = 'block';
    left.style.display = 'block';
    setTimeout(function() {
        start.style.display = 'none';
        right.style.opacity = 1;
        left.style.opacity = 1;
    }, 500)
    // ============================================
};

let x = 10;
let ballRow = 0;
let y = 320;
function ballWalk(xpx, ypx = y) {
    let item1PreToPx = ((380 * difference[ballRow].item1) / 100);
    let item2PreToPx = ((380 * difference[ballRow].item2) / 100);
    if (xpx > item1PreToPx && xpx < item2PreToPx){
        y += 60;
        ballRow++;
        ball.style.transform = `translate(${xpx}px, ${ypx}px)`;
        ballWalk(x,y)
    }
    else {
        ball.style.transform = `translate(${xpx}px, ${ypx}px)`;
    }

}

let lastPlace = 380;

function toLeft() {
    if (x !== 0) x -= 10;
    if (x >= 0) ballWalk(x);
}
function toRight() {
    if (x !== lastPlace) x += 10;
    if (x <= lastPlace) ballWalk(x);
}
document.addEventListener("keydown", function(event) {
    // console.log(event);
    // console.log(event.which);
    // right arrow = 39
    // left arrow = 37
    // bottom arrow = 40
    // top arrow = 38
    if (event.which === 39) {
        toRight()
    } else if (event.which === 37) {
        toLeft()
    } 
})


right.onclick = () => { toRight() };
right.onmousedown = () => { toRight() };
left.onclick = () => { toLeft() };
left.onmousedown = () => { toLeft() };

log.innerHTML = card.style.width;


