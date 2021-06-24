'use strict'
const score=document.querySelector('.score'),
      start=document.querySelector('.start'),
      gameArea=document.querySelector('.gameArea'),
      car=document.createElement('div');
    
const keys={
    ArrowUp: false,
    ArrowDown: false,
    ArrowRight: false,
    ArrowLeft: false
};

const setting={
    start: false,
    score: 0,
    speed: 3
};

start.addEventListener('click', startGame);
document.addEventListener('keydown', startRun);
document.addEventListener('keyup', stopRun);


function startGame(){
    start.classList.add('hide');
    setting.start=true;
    for(let i=0; i<20; i++){
        const line=document.createElement('div');
        line.classList.add('line');
        line.style.top=(i*50)+'px';
        gameArea.appendChild(line);
    }
    gameArea.appendChild(car);
    car.classList.add('car');
    setting.x=car.offsetLeft;
    setting.y=car.offsetLeft;
    requestAnimationFrame(playGame);
}

function playGame(){
    if(setting.start){
        if(keys.ArrowLeft && setting.x>=5){
            setting.x-=setting.speed;
        }
        if(keys.ArrowRight && setting.x<gameArea.offsetWidth-car.offsetWidth-5){
            setting.x+=setting.speed;
        }
        if(keys.ArrowUp && setting.y<gameArea.offsetHeight-car.offsetHeight){
            setting.y+=setting.speed;
        }
        if(keys.ArrowDown && setting.y>=5){
            setting.y-=setting.speed;
        }
        car.style.left=setting.x+'px';
        car.style.bottom=setting.y+'px';
        requestAnimationFrame(playGame);
    }
}

function startRun(event){
    event.preventDefault();
    keys[event.key]=true; //в объекте обращение к "строковой переменной" идет через []
}

function stopRun(event){
    event.preventDefault();
    keys[event.key]=false;
}