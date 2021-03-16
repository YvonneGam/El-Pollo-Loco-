


function init() {
    canvas = document.getElementById('canvas');
    ctx = canvas.getContext('2d');
    checkRunningYellowChicken();
    createChickenList();

    checkRunningBrownChicken();
    createBrownChickenList();

    checkForSleeping(); 
    checkForRunning();
    checkForJumping();
    
    draw();
    calculateCloudOffset();
    listenForKeys();
    calculateChickenPosition();
    calculateBrownChickenPosition()
    checkForCollision();
}

function finishLevel() {
    AUDIO_CHICKEN.play();
    setTimeout(function () {
        BACKGROUND_MUSIC.pause();
        if (enemy_energy < 0) {
            game_finished_winner = true;
            AUDIO_WIN.play();
        }
    }, 1000);

    document.getElementById('restart_btn').classList.remove('d-none');
}


/**
 * This happens when the player loose all energy
 */
function looseLevel() {
    BACKGROUND_MUSIC.pause();
    AUDIO_LOOSE.play();
    game_finished_looser = true;
    console.log('Verloren');
    document.getElementById('restart_btn').classList.remove('d-none');
}



/**
 * This function checks if the character is runnig riht or left and changes the feet for running
 */
function checkForRunning() {
    setInterval(function () {
        if (isMovingRight) {
            isJumping = false; 
            moveDirectionRight = true;
            moveDirectionLeft = false; 
            AUDIO_RUNNING.play();
            let index = characterGraphicIndex % characterGraphicsRight.length; // steht für den Rest (modulu)
            currentCharacterImage = characterGraphicsRight[index];
            characterGraphicIndex = characterGraphicIndex + 1;
        }

        if (isMovingLeft) {
            moveDirectionRight = false;
            moveDirectionLeft = true; 
            AUDIO_RUNNING.play();
            let index = characterGraphicIndex % characterGraphicsLeft.length;
            currentCharacterImage = characterGraphicsLeft[index];
            characterGraphicIndex = characterGraphicIndex + 1;
        }
        if (!isMovingRight && !isMovingLeft) // Ausrufezeichen steht dafür dass er sich nicht!! bewegt
            AUDIO_RUNNING.pause();

    }, 100);
}

/**
 * The characters graphics change when the character us jumping
 */
function checkForJumping() {
    let index;

    setInterval(() => {
        if (isJumping && moveDirectionRight) {
/*             if (index == 6) {
                isJumping = false;
                index = 0;
                characterGraphicIndex = 0;
            } */
            index = characterGraphicIndex % characterGraphicsJump.length;
            currentCharacterImage = characterGraphicsJump[index];
            characterGraphicIndex = characterGraphicIndex + 1;
        }

        if (isJumping && moveDirectionLeft) {
            index = characterGraphicIndex % characterGraphicsJump.length;
            currentCharacterImage = characterGraphicsJump[index];
            characterGraphicIndex = characterGraphicIndex + 1;
        }
    }, 150);
}


/**
 * This function checks if the character is sleeping or not moving & shows sleeping images
 */
 function checkForSleeping() {
    setInterval(function () {

        let timePassed = (new Date().getTime() - lastKeyPressed);

        if (lastKeyPressed != 0 && timePassed > 1500) {
            console.log('lastKey');
            characterSleep = true;
            if (moveDirectionRight && !isJumping) {
                let index = characterGraphicIndex % characterSleepRight.length;
                currentCharacterImage = characterSleepRight[index];
                characterGraphicIndex = characterGraphicIndex + 1;
            } else if (moveDirectionLeft) {
                let index = characterGraphicIndex % characterSleepRight.length;
                currentCharacterImage = characterSleepRight[index];
                characterGraphicIndex = characterGraphicIndex + 1;
            }
        } else {
            characterSleep = false;
        }

    }, 200);
}


function draw() {
    updateFloor();
    if (game_finished_looser || game_finished_winner) {
        drawLooserScreen() || drawFinalScreen();
        requestAnimationFrame(draw); //Diese function zeichnet automatisch die Daten je nach Leistung der Grafikkarte (ist nirgends definiert)
    } else {
        drawBottles();
        drawChicken();
        drawBrownChicken();
        updateCaracter();
        requestAnimationFrame(draw);
        drawEnergyBar();
        drawInfo();
        drawThrowBottle();
    }
    drawEnemy();
}

function drawFinalScreen() {
    let base_image_screen2 = new Image();
    base_image_screen2.src = 'img/finalscreens-elpolloloco-winner.png';
    if (base_image_screen2.complete) { //gibt den Wert "true" zurück, wenn das Bild fertig gelaen ist, ansonten "false"
        ctx.drawImage(base_image_screen2, 0, 0, base_image_screen2.width * 1, base_image_screen2.height * 1);
    }
    console.log('gewonnen');
}

function drawLooserScreen() {
    let base_image_screen = new Image();
    base_image_screen.src = 'img/finalscreens-elpolloloco_looser.png';
    if (base_image_screen.complete) { //gibt den Wert "true" zurück, wenn das Bild fertig gelaen ist, ansonten "false"
        ctx.drawImage(base_image_screen, 0, 0, base_image_screen.width * 1, base_image_screen.height * 1);
    }
}

function drawEnemy() {
    let chicken_x = BOSS_POSITION;
    let enemyImage = 'img/enemy/G1.png'

    if (enemyDefeatedAt > 0) {
        let timePassed = new Date().getTime() - enemyDefeatedAt;
        chicken_x = chicken_x + timePassed * 0.5;
        enemyImage = 'img/enemy/G11.png'
    }
    addBackgroundObject(enemyImage, chicken_x, 100, 0.3);

    if (enemyDefeatedAt == 0) { // zeigt EnergyBar des Huhns nur an wenn das Huhn noch nicht besiegt wurde
        ctx.globalAlpha = 0.7;
        ctx.fillStyle = "black"
        ctx.fillRect(BOSS_POSITION + 55 + bg_elements, 90, 225, 40) //x-koordinate, y-koordinate, breite, höhe

        ctx.globalAlpha = 1;
        ctx.fillStyle = "orange"
        ctx.fillRect(BOSS_POSITION + 65 + bg_elements, 98, 2 * enemy_energy, 25) //x-koordinate, y-koordinate, breite, höhe

        //Heart in Front of the enemy energy-bar
        /*        let base_image_life = new Image();
               base_image_life.src = 'img/heart-life-enemy.png';
               if (base_image_life.complete) { 
                   ctx.drawImage(base_image_life, 440, 15, base_image_life.width * 0.25, base_image_life.height * 0.25);
               } */
    }
}

function drawThrowBottle() {
    if (bottleThrowTime) { // bottleThrowTime = true, hier wird gecheckt ob "b" gedrückt wurde
        let time = new Date().getTime() - bottleThrowTime; //Genaue ms die vergangen sind seit "b" gedrückt wurde
        let gravity = Math.pow(9.81, time / 300); //so geht der Wurf nicht steil nach oben sondern 
        throwBottle_x = 97 + (time * 0.6);
        throwBottle_y = 300 - (time * 0.4 - gravity);

        let base_image = new Image();
        base_image.src = 'img/bottles/1.Marcador.png';
        if (base_image.complete) { //gibt den Wert "true" zurück, wenn das Bild fertig gelaen ist, ansonten "false"
            ctx.drawImage(base_image, throwBottle_x, throwBottle_y, base_image.width * 0.20, base_image.height * 0.20);
        }
    }
}

function drawInfo() {
    let base_image_bottle = new Image();
    base_image_bottle.src = 'img/bottles/1.Marcador.png';
    if (base_image_bottle.complete) { //gibt den Wert "true" zurück, wenn das Bild fertig gelaen ist, ansonten "false"
        ctx.drawImage(base_image_bottle, -15, 5, base_image_bottle.width * 0.25, base_image_bottle.height * 0.25);
    }
    ctx.font = '20px Chango';
    ctx.fillText('x' + collectedBottles, 60, 70);
}

function drawBottles() {
    for (let i = 0; i < placedBottles.length; i++) {
        let bottle_x = placedBottles[i];
        addBackgroundObject('img/bottles/2.Botella_enterrada2.png', bottle_x, 315, 0.25);
    }
}

function drawEnergyBar() {
    ctx.globalAlpha = 0.7;
    ctx.fillStyle = "black"
    ctx.fillRect(490, 30, 190, 40) //x-koordinate, y-koordinate, breite, höhe

    ctx.globalAlpha = 1;
    ctx.fillStyle = "darkred"
    ctx.fillRect(505, 35, 2 * character_energy, 30) //x-koordinate, y-koordinate, breite, höhe

    //Heart in Front of the energy-bar
    let base_image_life = new Image();
    base_image_life.src = 'img/heart-life.png';
    if (base_image_life.complete) { //gibt den Wert "true" zurück, wenn das Bild fertig gelaen ist, ansonten "false"
        ctx.drawImage(base_image_life, 440, 15, base_image_life.width * 0.25, base_image_life.height * 0.25);
    }
}


/**
 * This function adds the character
 */
function updateCaracter() {
    let base_image = new Image();
    base_image.src = currentCharacterImage;

    let timePassedSinceJump = new Date().getTime() - lastJumpStarted;
    if (timePassedSinceJump < JUMP_TIME) { //Sprung
        character_y = character_y - 10; //Hier werden 10 abgezogen, da das Canvas immer von oben nach unten gerechnet wird, anders als normale Koordinatensysteme
    } else { //Check falling

        if (character_y < 125) {
            character_y = character_y + 10;
        }
        if (base_image.complete) { //gibt den Wert "true" zurück, wenn das Bild fertig geladen ist, ansonten "false"
            ctx.drawImage(base_image, character_x, character_y, base_image.width * 0.25, base_image.height * 0.25);
        }
    }
}


/**
 * This function adds and moves the floor
 */
function updateFloor() {
    drawGround();
    addBackgroundObject('img/floor/cloud.png', 0 - cloudOffset, -60, 0.5, 0.5);
    addBackgroundObject('img/floor/cloud.png', 1921 - cloudOffset, -60, 0.5, 0.5);
    addBackgroundObject('img/floor/cloud.png', 3842 - cloudOffset, -60, 0.5, 0.5);
    addBackgroundObject('img/floor/cloud.png', 5763 - cloudOffset, -60, 0.5, 0.5);
}

function drawGround() {
    if (isMovingRight) {
        bg_elements = bg_elements - GAME_SPEED;
    }

    if (isMovingLeft && bg_elements < 500) {
        bg_elements = bg_elements + GAME_SPEED;
    }

    //Moving Clouds
    addBackgroundObject('img/floor/floor-background.png', 0, -60, 0.5);
    addBackgroundObject('img/floor/floor-background.png', 1918, -60, 0.5);
    addBackgroundObject('img/floor/floor-background.png', 3838, -60, 0.5);
    addBackgroundObject('img/floor/floor-background.png', 5763, -60, 0.5);
}

function addBackgroundObject(src, offsetX, offsetY, scale) {
    let base_image_floor = new Image();
    base_image_floor.src = src;
    if (base_image_floor.complete) { //gibt den Wert "true" zurück, wenn das Bild fertig gelaen ist, ansonten "false"
        ctx.drawImage(base_image_floor, offsetX + bg_elements, offsetY, base_image_floor.width * scale, base_image_floor.height * scale);
    }
}


function calculateCloudOffset() {
    setInterval(function () {
        cloudOffset = cloudOffset + 0.35;
    }, 30);
}



/**
 * This function opens the fullscreen.
 */
function openFullscreen() {
    /* document.getElementById('canvas-box').classList.add('d-none'); */
    document.getElementById('fullscreen-icon').classList.add('d-none');
    document.getElementById('keys-explanation').classList.add('d-none');
    document.getElementById('head').classList.add('d-none');
    document.getElementById('close-fullscreen').classList.remove('d-none');
    BACKGROUND_MUSIC.play();


    if (canvas.requestFullscreen) {
        canvas.requestFullscreen();
    }
    else if (canvas.webkitRequestFullscreen) { /* Safari */
        canvas.webkitRequestFullscreen();
    } else if (canvas.msRequestFullscreen) { /* IE11 */
        canvas.msRequestFullscreen();
    }

}

/**
 * This function closes the fullscreen.
 */
function closeFullscreen() {
    document.getElementById('fullscreen-icon').classList.remove('d-none');
    document.getElementById('keys-explanation').classList.remove('d-none');
    document.getElementById('head').classList.remove('d-none');
    document.getElementById('close-fullscreen').classList.add('d-none');
    BACKGROUND_MUSIC.pause();

    if (document.exitFullscreen) {
        document.exitFullscreen();
    } else if (document.webkitExitFullscreen) { /* Safari */
        document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) { /* IE11 */
        document.msExitFullscreen();
    }
}

/**
 * This function adds the images to the canvas
 * 
 * @param {*} src 
 * @param {*} offsetX 
 * @param {*} bg_elements 
 * @param {*} offsetY 
 * @param {*} scale 
 * @param {*} opacity 
 */
function addBackgroundobject(src, offsetX, bg_elements, offsetY, scale, opacity) {
    if (opacity != undefined) {
        ctx.globalAlpha = opacity;
    }

    let base_image = checkBackgroundImageCache(src);
    ctx.drawImage(base_image, offsetX + bg_elements, offsetY, base_image.width * scale, base_image.height * scale);
    ctx.globalAlpha = 1;
}