let mouse = {
    x: null,
    y: null,
    click: null
}

window.addEventListener('mousemove', function(event){
    mouse.x = event.x;
    mouse.y = event.y;
})

document.body.onmousedown = function() { 
    mouse.click=true;
}
  document.body.onmouseup = function() {
    mouse.click=false;
}

class Particle{
    constructor(){
        /*
        if(Math.random() > 0.5){
            this.x = Math.round(Math.random()*window.innerWidth);
            this.y = Math.round(Math.random())+1;
        }else{
            this.x = Math.round(Math.random())-1;
            this.y = Math.round(Math.random()*window.innerHeight);
        }*/
        this.xOrigin = Math.round(Math.random()*window.innerWidth);
        this.yOrgin = Math.round(Math.random()*window.innerHeight);
        this.x = this.xOrigin;
        this.y = this.yOrgin;
        this.size = 5;
        this.momentum = 1;
        this.direction = (this.y-window.innerHeight/2)/(this.x-window.innerWidth/2)
        this.color = 'white';

    }
    draw(){
        ctx.fillStyle = this.color
        ctx.beginPath();
        ctx.arc(this.x,this.y,this.size,0,Math.PI*2);
        ctx.closePath();
        ctx.fill();
    }
    update(){
        //Distance of the particle to the mouse
        let dx = this.x - mouse.x;
        let dy = this.y - mouse.y;
        let dist = Math.hypot(dx,dy);

        //Forceto be applied to particles to move towards the mouse
        let fDX = dx / dist;
        let fDY = dy / dist;

        if (mouse.click){
            fDX*=-1;
            fDY*=-1;
        }
        if (dist < 300){
            this.x += fDX;
            this.y += fDY;
        };
        if (this.x < 0)this.x=0;
        else if (this.x > window.innerWidth)this.x=window.innerWidth;

        if (this.y < 0)this.y=0;
        else if (this.y > window.innerWidth)this.y=window.innerHeight;
    }
}

const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
ctx.font = '40px Verdana';
let particles = [];

function particleCreate(){
    particles.push(new Particle());
}

for (let i = 0; i < 100; i++)particles.push(new Particle());

function animate(){
    //setInterval(particleCreate(), 10000);
    ctx.clearRect(0,0,canvas.width, canvas.height);
    for (let i = 0; i < particles.length; i++){
        particles[i].draw();
        particles[i].update();
    }
    requestAnimationFrame(animate);
}
animate();
