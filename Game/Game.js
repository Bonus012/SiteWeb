/* =====================
   MINI RUNNER GAME
===================== */
window.addEventListener('DOMContentLoaded', function () {

    /* ── Supabase ── */
    const SUPABASE_URL = 'https://morvroimubadwtlqkamc.supabase.co';
    const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1vcnZyb2ltdWJhZHd0bHFrYW1jIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzE4NjY0ODIsImV4cCI6MjA4NzQ0MjQ4Mn0.lKrvVjBMcOqKOZn_u2cJEulEvMw9pu-67uKbwsch-4Y';
    const HEADERS = { 'Content-Type':'application/json', 'apikey':SUPABASE_KEY, 'Authorization':'Bearer '+SUPABASE_KEY };

    async function fetchTopScores() {
        try {
            const ctrl = new AbortController();
            const t = setTimeout(() => ctrl.abort(), 5000);
            const res = await fetch(SUPABASE_URL+'/rest/v1/scores?select=name,score&order=score.desc&limit=10', { headers:HEADERS, signal:ctrl.signal });
            clearTimeout(t);
            if (!res.ok) { console.error('fetch error', res.status, await res.text()); return []; }
            return await res.json();
        } catch(e) { console.error('fetchTopScores:', e.message); return []; }
    }

    async function insertScore(name, score) {
        try {
            const ctrl = new AbortController();
            const t = setTimeout(() => ctrl.abort(), 5000);
            const res = await fetch(SUPABASE_URL+'/rest/v1/scores', {
                method:'POST', headers:{...HEADERS,'Prefer':'return=minimal'},
                body:JSON.stringify({ name:name.toUpperCase().slice(0,3), score:Math.floor(score) }), signal:ctrl.signal
            });
            clearTimeout(t);
            if (!res.ok) console.error('insert error', res.status, await res.text());
        } catch(e) { console.error('insertScore:', e.message); }
    }

    /* ── DOM ── */
    const gamePreview    = document.getElementById('gamePreview');
    const gamePanel      = document.getElementById('gamePanel');
    const closeBtn       = document.getElementById('closeGame');
    const previewCanvas  = document.getElementById('previewCanvas');
    const canvas         = document.getElementById('gameCanvas');
    const ctx            = canvas.getContext('2d');
    const overlay        = document.getElementById('gameOverlay');
    const overlayMsg     = document.getElementById('overlayMsg');
    const scoreDisplay   = document.getElementById('scoreDisplay');
    const hiScoreDisplay = document.getElementById('hiScoreDisplay');

    /* ── Preview perso ── */
    const pc = previewCanvas.getContext('2d');
    pc.fillStyle='#5b8cff';              pc.fillRect(5,0,14,10);
    pc.fillStyle='#c7d9ff';              pc.fillRect(7,1,8,6);
    pc.fillStyle='#1e3a6e';              pc.fillRect(3,10,18,11);
    pc.fillStyle='rgba(91,140,255,0.25)';pc.fillRect(6,12,12,6);
    pc.fillStyle='#162d54';              pc.fillRect(3,21,7,10); pc.fillRect(14,21,7,10);
    pc.fillStyle='#5b8cff';              pc.fillRect(0,12,4,3);  pc.fillRect(20,12,4,3);

    /* ── Ouvrir / Fermer ── */
    gamePreview.addEventListener('click', function() {
        gamePreview.style.display = 'none';
        gamePanel.classList.add('open');
        startGame();
    });
    closeBtn.addEventListener('click', function(e) {
        e.stopPropagation();
        hideNameInput();
        gamePanel.classList.remove('open');
        setTimeout(function(){ gamePreview.style.display='flex'; }, 400);
        state = 'idle';
    });

    /* ── Constantes ── */
    const W=1120, H=150;
    const GROUND_Y=H-16, GRAVITY=0.42, JUMP_FORCE=-8.2, BASE_SPEED=3.5;
    const PLAYER_W=16, PLAYER_H=22, PLAYER_GROUND=GROUND_Y-PLAYER_H;
    const C={ accent:'#5b8cff', purple:'#a855f7', ground:'#1a1e2e', gline:'#2a3050', bg:'#07090f', star:'rgba(91,140,255,0.5)', coin:'#fbbf24' };

    /* ── État ── */
    let state='idle', score=0, hiScore=0, frame=0, speed=BASE_SPEED;
    let particles=[], obstacles=[], coins=[], popups=[];
    let obstacleTimer=0, obstacleInterval=100, coinTimer=0;

    const player = {
        x:80, y:PLAYER_GROUND, w:PLAYER_W, h:PLAYER_H,
        vy:0, onGround:true, runFrame:0, runTimer:0, dead:false,
        jump() {
            if (this.onGround) {
                this.vy=JUMP_FORCE; this.onGround=false;
                spawnDust(this.x+this.w/2, this.y+this.h);
            }
        }
    };

    const stars = Array.from({length:70}, ()=>({
        x:Math.random()*W, y:Math.random()*(GROUND_Y-20),
        r:Math.random()*1.3+0.3, s:Math.random()*0.3+0.1
    }));

    function spawnDust(x,y) {
        for(let i=0;i<6;i++) particles.push({ x,y, vx:(Math.random()-0.5)*3, vy:-Math.random()*2.5-0.5, life:1, r:Math.random()*3+1, color:C.accent });
    }

    /* ── Obstacles variés ── */
    function spawnObstacle() {
        const tier = Math.min(Math.floor(score/150), 4);
        const roll = Math.random();

        if (tier >= 3 && roll < 0.12) {
            // Triple obstacles
            const h = 18+Math.floor(Math.random()*10);
            obstacles.push({ x:W+20,    y:GROUND_Y-h, w:10, h, label:'bug', vy:0 });
            obstacles.push({ x:W+20+30, y:GROUND_Y-h, w:10, h, label:'bug', vy:0 });
            obstacles.push({ x:W+20+60, y:GROUND_Y-h, w:10, h, label:'bug', vy:0 });
        } else if (tier >= 2 && roll < 0.25) {
            // Double obstacle espacé
            const h = 18+Math.floor(Math.random()*14);
            obstacles.push({ x:W+20,    y:GROUND_Y-h, w:10, h, label:'bug', vy:0 });
            obstacles.push({ x:W+20+38, y:GROUND_Y-h, w:10, h, label:'glitch', vy:0 });
        } else if (tier >= 1 && roll < 0.38) {
            // Virus flottant
            const h=16;
            obstacles.push({ x:W+20, y:GROUND_Y-h-25, w:14, h, label:'virus', vy:1.4, bounceMin:GROUND_Y-h-55, bounceMax:GROUND_Y-h });
        } else if (tier >= 2 && roll < 0.48) {
            // Bug + virus combo
            obstacles.push({ x:W+20,    y:GROUND_Y-20, w:10, h:20, label:'bug', vy:0 });
            obstacles.push({ x:W+20+28, y:GROUND_Y-16-22, w:14, h:16, label:'virus', vy:1.0, bounceMin:GROUND_Y-52, bounceMax:GROUND_Y-22 });
        } else if (roll < 0.6) {
            // Bug taille variable
            const h=16+Math.floor(Math.random()*18);
            obstacles.push({ x:W+20, y:GROUND_Y-h, w:10, h, label:'bug', vy:0 });
        } else if (roll < 0.78) {
            // Virus au sol
            obstacles.push({ x:W+20, y:GROUND_Y-16, w:16, h:16, label:'virus', vy:0 });
        } else {
            // Glitch grand
            const h=22+Math.floor(Math.random()*16);
            obstacles.push({ x:W+20, y:GROUND_Y-h, w:8, h, label:'glitch', vy:0 });
        }
    }

    /* ── Pièces ── */
    function spawnCoin() {
        const coinX = W+20;
        const coinY = GROUND_Y - 8; // au sol
        // Vérifier qu'aucun obstacle n'est proche
        for(let ob of obstacles){
            if(Math.abs(ob.x - coinX) < 60) return; // trop proche d'un obstacle
        }
        coins.push({ x:coinX, y:coinY, r:5, collected:false, anim:0 });
    }

    function drawCoin(c2) {
        ctx.save();
        ctx.shadowColor = C.coin;
        ctx.shadowBlur = c2.collected ? 0 : 6;
        ctx.fillStyle = C.coin;
        ctx.beginPath();
        ctx.arc(c2.x, c2.y + Math.sin(c2.anim*0.08)*3, c2.r, 0, Math.PI*2);
        ctx.fill();
        ctx.fillStyle = '#fef3c7';
        ctx.beginPath();
        ctx.arc(c2.x-1, c2.y-1 + Math.sin(c2.anim*0.08)*3, 2, 0, Math.PI*2);
        ctx.fill();
        ctx.restore();
    }

    function drawChar(x,y,runF,dead) {
        ctx.fillStyle=dead?'#ef4444':C.accent; ctx.fillRect(x+4,y,10,9);
        ctx.fillStyle=dead?'#fca5a5':'#c7d9ff'; ctx.fillRect(x+5,y+1,7,5);
        ctx.fillStyle=dead?'#7f1d1d':'#1e3a6e'; ctx.fillRect(x+2,y+9,13,9);
        ctx.fillStyle=dead?'#ef444422':'#5b8cff33'; ctx.fillRect(x+4,y+11,9,5);
        ctx.fillStyle=dead?'#991b1b':'#162d54';
        if(dead){ ctx.fillRect(x+2,y+18,5,7); ctx.fillRect(x+10,y+18,5,7); }
        else if(runF===0){ ctx.fillRect(x+2,y+18,5,8); ctx.fillRect(x+10,y+18,5,4); }
        else{ ctx.fillRect(x+2,y+18,5,4); ctx.fillRect(x+10,y+18,5,8); }
        if(!dead){ ctx.fillStyle=C.accent; const ay=runF===0?y+10:y+9; ctx.fillRect(x-1,ay,3,3); ctx.fillRect(x+15,ay,3,3); }
    }

    function drawObs(ob) {
        if(ob.label==='bug') {
            ctx.fillStyle='#f43f5e'; ctx.fillRect(ob.x+1,ob.y+4,10,12);
            ctx.fillStyle='#fb7185'; ctx.fillRect(ob.x+3,ob.y,5,5);
            ctx.fillStyle='#fff'; ctx.fillRect(ob.x+3,ob.y+1,2,2); ctx.fillRect(ob.x+7,ob.y+1,2,2);
            ctx.fillStyle='#f43f5e';
            ctx.fillRect(ob.x-1,ob.y+6,2,2); ctx.fillRect(ob.x+11,ob.y+6,2,2);
            ctx.fillRect(ob.x-1,ob.y+10,2,2); ctx.fillRect(ob.x+11,ob.y+10,2,2);
            ctx.fillRect(ob.x+2,ob.y+15,3,5); ctx.fillRect(ob.x+6,ob.y+16,3,5);
        } else if(ob.label==='virus') {
            ctx.fillStyle='#a855f7'; ctx.fillRect(ob.x+4,ob.y,8,16); ctx.fillRect(ob.x,ob.y+4,16,8);
            ctx.fillStyle='#c084fc'; ctx.fillRect(ob.x+2,ob.y+2,3,3); ctx.fillRect(ob.x+11,ob.y+2,3,3);
            ctx.fillRect(ob.x+2,ob.y+11,3,3); ctx.fillRect(ob.x+11,ob.y+11,3,3);
            ctx.fillStyle='#f0abfc'; ctx.fillRect(ob.x+6,ob.y+6,4,4);
        } else {
            for(let i=0;i<ob.h;i+=3){
                const w=i%6===0?ob.w:ob.w-2, off=i%6===0?0:1;
                ctx.fillStyle=i%6===0?'#a855f7':'#7c3aed';
                ctx.fillRect(ob.x+off,ob.y+i,w,2);
            }
        }
    }

    function collides(a,b){ const p=3; return a.x+p<b.x+b.w-p&&a.x+a.w-p>b.x+p&&a.y+p<b.y+b.h&&a.y+a.h>b.y+p; }
    function collidesCircle(p,c2){ return Math.hypot(p.x+p.w/2-c2.x, p.y+p.h/2-c2.y)<p.w/2+c2.r+2; }
    function fmt(n){ return String(Math.floor(n)).padStart(5,'0'); }

    function update(dt=1) {
        if(state!=='playing') return;
        frame+=dt; score+=0.1*dt;
        speed=BASE_SPEED+Math.sqrt(score)*0.18;

        // Joueur
        player.vy+=GRAVITY*dt; player.y+=player.vy*dt;
        if(player.y>=PLAYER_GROUND){ player.y=PLAYER_GROUND; player.vy=0; player.onGround=true; }
        player.runTimer+=dt; if(player.runTimer>7){ player.runTimer=0; player.runFrame^=1; }

        // Obstacles
        obstacleTimer+=dt;
        const minInt=Math.max(45, 100-score*0.05);
        if(obstacleTimer>=obstacleInterval){ obstacleTimer=0; obstacleInterval=Math.floor(Math.random()*50+minInt); spawnObstacle(); }
        obstacles=obstacles.filter(ob=>ob.x>-50);
        obstacles.forEach(ob=>{
            ob.x-=speed*dt;
            // Obstacles qui bougent verticalement
            if(ob.vy!==0){
                ob.y+=ob.vy*dt;
                if(ob.y<=ob.bounceMin||ob.y>=ob.bounceMax) ob.vy*=-1;
            }
            if(collides(player,ob)) die();
        });

        // Pièces
        coinTimer+=dt;
        if(coinTimer>=120){ coinTimer=0; if(Math.random()<0.6) spawnCoin(); }
        coins=coins.filter(c2=>c2.x>-20&&!c2.collected);
        coins.forEach(c2=>{
            c2.x-=speed*dt; c2.anim+=dt;
            if(!c2.collected&&collidesCircle(player,c2)){
                c2.collected=true;
                score+=10;
                popups.push({ x:player.x+player.w/2, y:player.y-4, life:1.0 });
                for(let i=0;i<8;i++) particles.push({ x:c2.x, y:c2.y, vx:(Math.random()-0.5)*4, vy:-Math.random()*3-1, life:1, r:Math.random()*2+1, color:C.coin });
            }
        });

        // Particules
        particles.forEach(p=>{ p.x+=p.vx*dt; p.y+=p.vy*dt; p.vy+=0.1*dt; p.life-=0.04*dt; });
        floatingTexts.forEach(t=>{ t.y-=0.8*dt; t.life-=0.025*dt; });
        floatingTexts=floatingTexts.filter(t=>t.life>0);
        particles=particles.filter(p=>p.life>0);
        // Popups +10
        popups.forEach(p=>{ p.y-=0.8*dt; p.life-=0.025*dt; });
        popups=popups.filter(p=>p.life>0);
        stars.forEach(s=>{ s.x-=s.s*dt; if(s.x<0) s.x=W; });

        scoreDisplay.textContent=fmt(score);
        if(score>hiScore){ hiScore=score; hiScoreDisplay.textContent=fmt(hiScore); }
    }

    function die() {
        state='dead'; player.dead=true;
        const finalScore=Math.floor(score);
        for(let i=0;i<16;i++){
            const a=(i/16)*Math.PI*2;
            particles.push({ x:player.x+player.w/2, y:player.y+player.h/2, vx:Math.cos(a)*(Math.random()*4+1), vy:Math.sin(a)*(Math.random()*4+1), life:1, r:Math.random()*3+1, color:Math.random()>0.5?C.accent:C.purple });
        }
        showNameInput(finalScore);
    }

    function draw() {
        ctx.clearRect(0,0,W,H);
        ctx.fillStyle=C.bg; ctx.fillRect(0,0,W,H);
        stars.forEach(s=>{ ctx.fillStyle=C.star; ctx.fillRect(s.x,s.y,s.r*2,s.r*2); });
        ctx.strokeStyle='rgba(91,140,255,0.03)'; ctx.lineWidth=1;
        for(let x=0;x<W;x+=60){ ctx.beginPath(); ctx.moveTo(x,0); ctx.lineTo(x,GROUND_Y); ctx.stroke(); }
        ctx.fillStyle=C.ground; ctx.fillRect(0,GROUND_Y,W,H-GROUND_Y);
        ctx.fillStyle=C.gline;  ctx.fillRect(0,GROUND_Y,W,2);
        ctx.fillStyle='rgba(91,140,255,0.05)'; ctx.fillRect(0,GROUND_Y+2,W,6);

        // Pièces
        coins.forEach(drawCoin);

        // Obstacles
        obstacles.forEach(drawObs);

        // Joueur
        if(!player.dead){ ctx.shadowColor=C.accent; ctx.shadowBlur=12; }
        drawChar(player.x,player.y,player.runFrame,player.dead);
        ctx.shadowBlur=0;

        // Particules
        particles.forEach(p=>{ ctx.globalAlpha=p.life; ctx.fillStyle=p.color; ctx.fillRect(p.x-p.r,p.y-p.r,p.r*2,p.r*2); });
        ctx.globalAlpha=1;
        // Popups +10
        ctx.font='bold 10px "Courier New"';
        ctx.textAlign='center';
        popups.forEach(p=>{ ctx.globalAlpha=p.life; ctx.fillStyle=C.coin; ctx.fillText('+10',p.x,p.y); });
        ctx.globalAlpha=1; ctx.textAlign='left';

        // Indicateur de tier (petite icône en haut à droite)
        const tier=Math.min(Math.floor(score/200),3);
        if(tier>0){
            ctx.fillStyle='rgba(168,85,247,'+(0.2+tier*0.15)+')';
            ctx.font='bold 8px monospace';
            ctx.fillText(['','⚡','⚡⚡','⚡⚡⚡'][tier], W-28, 12);
        }
    }

    let lastTime = 0;
    const TARGET_FPS = 60;
    const FRAME_MS = 1000 / TARGET_FPS;

    function gameLoop(now){
        const dt = Math.min((now - lastTime) / FRAME_MS, 3); // cap à 3x pour éviter les sauts
        lastTime = now;
        update(dt);
        draw();
        requestAnimationFrame(gameLoop);
    }

    function startGame() {
        hideNameInput();
        state='playing'; score=0; frame=0; speed=BASE_SPEED;
        player.y=PLAYER_GROUND; player.vy=0; player.onGround=true; player.dead=false; player.runFrame=0;
        obstacles=[]; coins=[]; floatingTexts=[]; obstacleTimer=0; obstacleInterval=100; coinTimer=0; particles=[]; popups=[];
        overlay.classList.add('hidden');
        player.jump();
    }

    function handleInput(){ if(state==='playing') player.jump(); }

    canvas.addEventListener('click', handleInput);
    document.addEventListener('keydown', function(e){
        if((e.code==='Space'||e.code==='ArrowUp')&&gamePanel.classList.contains('open')){
            if(document.activeElement&&document.activeElement.id==='nameInput') return;
            e.preventDefault(); handleInput();
        }
    });
    canvas.addEventListener('touchstart', function(e){ e.preventDefault(); handleInput(); }, {passive:false});

    /* ── Formulaire + Leaderboard scrollable top 10 ── */
    function showNameInput(finalScore) {
        const existing=document.getElementById('nameForm');
        if(existing) existing.remove();
        overlayMsg.style.display='none';

        const form=document.createElement('div');
        form.id='nameForm'; form.className='name-form';
        form.innerHTML=`
            <div class="name-form-inner">
                <div class="name-form-left">
                    <div class="name-score">SCORE <span>${fmt(finalScore)}</span></div>
                    <div class="name-label">ENTRE TON PSEUDO</div>
                    <div class="name-input-row">
                        <input id="nameInput" class="name-input" type="text" maxlength="3" placeholder="AAA" autocomplete="off" spellcheck="false"/>
                        <button class="name-btn" id="nameSubmit">OK</button>
                    </div>
                </div>
                <div class="name-form-right">
                    <div class="lb-title">🏆 TOP 10</div>
                    <div class="lb-scores lb-scrollable"><div class="lb-loading">Chargement...</div></div>
                </div>
            </div>
            <button class="name-retry" id="nameRetry">▶ REJOUER</button>
        `;
        overlay.appendChild(form);
        overlay.classList.remove('hidden');

        const input=document.getElementById('nameInput');
        const submitBtn=document.getElementById('nameSubmit');
        const retryBtn=document.getElementById('nameRetry');

        retryBtn.addEventListener('click', function(e){ e.stopPropagation(); startGame(); });
        input.focus();
        input.addEventListener('input', function(){ this.value=this.value.toUpperCase().replace(/[^A-Z0-9]/g,''); this.style.borderColor=''; });
        input.addEventListener('keydown', function(e){ if(e.key==='Enter'){ e.stopPropagation(); submitName(); } e.stopPropagation(); });
        submitBtn.addEventListener('click', function(e){ e.stopPropagation(); submitName(); });

        // Charger top 10 en arrière-plan
        fetchTopScores().then(function(scores){
            const board=form.querySelector('.lb-scores');
            if(!board) return;
            if(!scores||scores.length===0){
                board.innerHTML='<div class="lb-row" style="opacity:0.3">Aucun score</div>';
            } else {
                board.innerHTML=scores.map(function(s,i){
                    const isMe=i===scores.findIndex(x=>x.score===finalScore&&x.name==='???');
                    return '<div class="lb-row'+(isMe?' lb-row-me':'')+'"><span class="lb-rank">#'+(i+1)+'</span><span class="lb-name">'+s.name+'</span><span class="lb-score">'+fmt(s.score)+'</span></div>';
                }).join('');
            }
            const isHigh=scores.length<10||finalScore>(scores[scores.length-1]?.score||0);
            if(!isHigh){
                const row=form.querySelector('.name-input-row');
                const lbl=form.querySelector('.name-label');
                if(row) row.style.display='none';
                if(lbl) lbl.textContent='Pas dans le top 10';
            }
        });

        function submitName(){
            if(input.value.trim().length===0){ input.style.borderColor='rgba(239,68,68,0.7)'; input.focus(); return; }
            const name=input.value.trim();
            submitBtn.disabled=true; submitBtn.textContent='...'; input.disabled=true;
            insertScore(name,finalScore).then(function(){ return fetchTopScores(); }).then(function(newScores){
                const board=form.querySelector('.lb-scores');
                if(!board||!newScores) return;
                board.innerHTML=newScores.map(function(s,i){
                    return '<div class="lb-row"><span class="lb-rank">#'+(i+1)+'</span><span class="lb-name">'+s.name+'</span><span class="lb-score">'+fmt(s.score)+'</span></div>';
                }).join('');
                submitBtn.textContent='✓';
            });
        }
    }

    function hideNameInput(){
        const f=document.getElementById('nameForm');
        if(f) f.remove();
        overlayMsg.style.display='';
        overlay.classList.add('hidden');
    }

    requestAnimationFrame(function(now){ lastTime=now; gameLoop(now); });
});