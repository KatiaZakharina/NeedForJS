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
    speed: 3,
    traffic: 3
};

function getQuantityElements(heightElement){
    return document.documentElement.clientHeight/heightElement+1;
}

start.addEventListener('click', startGame);
document.addEventListener('keydown', startRun);
document.addEventListener('keyup', stopRun);

function startGame(){
    start.classList.add('hide');
    setting.start=true;

    for(let i=0; i<getQuantityElements(75); i++){
        const line=document.createElement('div');
        line.classList.add('line');
        line.style.top=(i*75)+'px';
        line.y=i*75;
        gameArea.appendChild(line);
    }

    gameArea.appendChild(car);
    car.classList.add('car');
    setting.x=car.offsetLeft;
    setting.y=car.offsetLeft;

    for(let i=0; i<getQuantityElements(100*setting.traffic); i++ ){
        const enemy=document.createElement('div');
        enemy.classList.add('enemy');
        enemy.y=-100*setting.traffic*(i+1);
        enemy.style.top=enemy.y+'px';
        enemy.style.left=~~(Math.random()*(gameArea.offsetWidth-50))+'px';
        enemy.style.background="transparent url('./image/blue.png') center / cover no-repeat";
        gameArea.appendChild(enemy);
    }

    requestAnimationFrame(playGame);
}

function playGame(){
    moveRoad();
    moveEnemy();
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

function moveRoad(){
    let lines=document.querySelectorAll('.line');
    lines.forEach(line=>{
        line.y+=setting.speed;
        line.style.top=line.y+'px';
        if(line.y>=document.documentElement.clientHeight){
            line.y=-100;
        }
    });
}

function moveEnemy(){
    let enemies=document.querySelectorAll('.enemy');
    enemies.forEach(item=>{
        item.y+=setting.speed/2;
        item.style.top=item.y+'px';
        if(item.y>=document.documentElement.clientHeight){
            item.y=-100*setting.traffic;
            item.style.left=~~(Math.random()*(gameArea.offsetWidth-50))+'px';
        }
    });

}