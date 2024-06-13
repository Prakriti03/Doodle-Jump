var m=Object.defineProperty;var d=(h,t,o)=>t in h?m(h,t,{enumerable:!0,configurable:!0,writable:!0,value:o}):h[t]=o;var e=(h,t,o)=>(d(h,typeof t!="symbol"?t+"":t,o),o);(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))l(s);new MutationObserver(s=>{for(const r of s)if(r.type==="childList")for(const p of r.addedNodes)p.tagName==="LINK"&&p.rel==="modulepreload"&&l(p)}).observe(document,{childList:!0,subtree:!0});function o(s){const r={};return s.integrity&&(r.integrity=s.integrity),s.referrerPolicy&&(r.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?r.credentials="include":s.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function l(s){if(s.ep)return;s.ep=!0;const r=o(s);fetch(s.href,r)}})();const n={CANVAS_WIDTH:600,CANVAS_HEIGHT:650};class f{constructor(){e(this,"posX");e(this,"posY");e(this,"velocity");e(this,"gravity");e(this,"jumpStrength");e(this,"isJumping");e(this,"hasJumpedOnce");e(this,"doodlerImg");e(this,"width");e(this,"height");this.posX=10,this.posY=300,this.velocity=0,this.gravity=.4,this.jumpStrength=-10,this.isJumping=!1,this.hasJumpedOnce=!1,this.doodlerImg=new Image,this.doodlerImg.src="/blueR.png",this.width=60,this.height=60}draw(){a.drawImage(this.doodlerImg,this.posX,this.posY,this.width,this.height)}moveLeft(){this.posX+this.width<0&&(this.posX=n.CANVAS_WIDTH),this.posX-=10}moveRight(){this.posX+=10,this.posX>n.CANVAS_WIDTH&&(this.posX=-this.width)}jump(){this.isJumping||(this.isJumping=!0,this.velocity=this.jumpStrength)}}class g{constructor(t,o){e(this,"x");e(this,"y");e(this,"height");e(this,"width");e(this,"platformImg");this.x=t,this.y=o,this.height=15,this.width=60,this.platformImg=new Image,this.platformImg.src="/platform.png"}draw(){a.drawImage(this.platformImg,this.x,this.y,this.width,this.height)}}function c(h){const t=Math.floor(Math.random()*(i.width-60));return new g(t,h)}class y{constructor(t){e(this,"ctx");e(this,"score");this.ctx=t,this.score=0}increment(){this.score+=10,this.draw(),console.log(this.score)}draw(){this.ctx.fillStyle="white",this.ctx.font="20px Proxima Nova",this.ctx.fillText(`Score: ${this.score}`,10,30)}}class u{constructor(){e(this,"player");e(this,"platforms");e(this,"isGameOver");e(this,"threshold");e(this,"backgroundImg");e(this,"score");this.player=new f,this.platforms=[],this.isGameOver=!1,this.threshold=i.height/2,this.backgroundImg=new Image,this.backgroundImg.src="/bg.png",this.score=new y(a)}createInitialPlatforms(t,o){let l=o/t;for(let s=0;s<t;s++){let r=o-(s+1)*l;this.platforms.push(c(r))}}checkCollision(){for(let t of this.platforms)if(this.player.posY+this.player.height>=t.y&&this.player.posY+this.player.height<=t.y+t.height&&this.player.posX+this.player.width>t.x&&this.player.posX<t.x+t.width)return this.player.hasJumpedOnce=!0,t;return null}drawGameOver(){a.clearRect(0,0,i.width,i.height),a.font="48px Arial",a.fillStyle="red",a.textAlign="center",a.fillText("Game Over",i.width/2,i.height/2)}update(){if(this.isGameOver)return;this.player.velocity+=this.player.gravity,this.player.posY+=this.player.velocity;const t=this.checkCollision();if(t&&this.player.velocity>0&&(this.player.posY=t.y-this.player.height,this.player.velocity=this.player.jumpStrength),this.player.hasJumpedOnce&&this.player.posY>i.height-60){this.isGameOver=!0,this.drawGameOver();return}if(this.player.posY>i.height-60&&(this.player.posY=i.height-60,this.player.isJumping=!1,this.player.jump()),this.player.posY<this.threshold){let o=this.threshold-this.player.posY;this.player.posY=this.threshold,this.platforms.forEach(r=>{r.y+=o});const l=this.platforms.length;for(this.platforms=this.platforms.filter(r=>r.y<i.height),l-this.platforms.length>0&&this.score.increment();this.platforms.length<6;){let r=this.platforms.length>0?this.platforms[this.platforms.length-1].y-Math.floor(Math.random()*80+20):i.height-60;this.platforms.push(c(r))}}a.drawImage(this.backgroundImg,0,0,i.width,i.height),this.player.posX+60<0&&(this.player.posX=i.width),this.player.posX>i.width&&(this.player.posX=-60),this.score.draw(),this.player.draw(),this.platforms.forEach(o=>o.draw()),requestAnimationFrame(this.update.bind(this))}start(){this.createInitialPlatforms(6,i.height),this.player.doodlerImg.onload=()=>{this.backgroundImg.onload=()=>{this.update()}}}}const i=document.querySelector("#gameCanvas"),a=i.getContext("2d"),w=document.getElementById("start-screen"),I=document.getElementById("start-button");i.height=500;i.width=400;I.addEventListener("click",()=>{w.style.display="none",i.style.display="block";const h=new u;h.start(),window.addEventListener("keydown",t=>{if(!h.isGameOver)switch(t.key){case"ArrowLeft":h.player.moveLeft();break;case"ArrowRight":h.player.moveRight();break;case" ":h.player.jump();break}})});