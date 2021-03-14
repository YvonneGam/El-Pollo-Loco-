

function preloadImages() {
    for (let i = 0; i < imagePaths.length; i++) {
        let image = new Image();
        image.src = imagePaths[i];
        images.push(image); // push image-path to images-array (which contains all image-paths)
    }
}



function init() {
    canvas = document.getElementById('canvas');
    ctx = canvas.getContext('2d');
    checkRunningYellowChicken();
    createChickenList();

    checkRunningBrownChicken();
    createBrownChickenList();

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
        AUDIO_WIN.play();
    }, 1000);
    game_finished_winner = true;
    document.getElementById('restart_btn').classList.remove('d-none');
}


//Muss noch irgendwo aufgerufen werden!!!!!!

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
            AUDIO_RUNNING.play();
            let index = characterGraphicIndex % characterGraphicsRight.length; // steht für den Rest (modulu)
            currentCharacterImage = characterGraphicsRight[index];
            characterGraphicIndex = characterGraphicIndex + 1;
        }

        if (isMovingLeft) {
            AUDIO_RUNNING.play();
            let index = characterGraphicIndex % characterGraphicsLeft.length;
            currentCharacterImage = characterGraphicsLeft[index];
            characterGraphicIndex = characterGraphicIndex + 1;
        }
        if (!isMovingRight && !isMovingLeft) // Ausrufezeichen steht dafür dass er sich nicht!! bewegt
            AUDIO_RUNNING.pause();

    }, 100);
}


/* function jumpDirection() {
    if (moveDirection == 'right') {
        checkForJumping(characterGraphicsJump);
    }
     else {
        let jump_image = characterGraphicsJump;
        animateJump(jump_image);
    } 
} */


function checkForJumping() {
    setInterval(function () {
        if (isJumping) {
            let index = characterGraphicJumpIndex % characterGraphicsJump.length;
            currentJumpImage = characterGraphicsJump[index];
            characterGraphicJumpIndex = characterGraphicJumpIndex + 1;
        }
    }, 80);
}


function draw() {
    updateFloor();
    if (game_finished_looser) {
        drawLooserScreen();
    }
    if (game_finished_winner) {
        drawFinalScreen();
    } else {
        drawBottles();
        drawChicken();
        drawBrownChicken();
        updateCaracter();
        requestAnimationFrame(draw); //Diese function zeichnet automatisch die Daten je nach Leistung der Grafikkarte (ist nirgends definiert)
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
    addBackgroundObject('img/floor/floor-background.png', 1921, -60, 0.5);
    addBackgroundObject('img/floor/floor-background.png', 3842, -60, 0.5);
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
 * This function checks which key is clicked, so the animation works
 */
function listenForKeys() {
    // Hier wird gecheckt ob eine Taste gedrückt wird
    document.addEventListener('keydown', e => {
        const k = e.key;
        /*         console.log(e.code == 'Space');
                console.log(k);
         */
        if (k == 'ArrowRight') {
            isMovingRight = true;
        }
        if (k == 'ArrowLeft') {
            isMovingLeft = true;
        }
        if (k == 'b' && collectedBottles > 0) {
            let timepassed = new Date().getTime() - bottleThrowTime;
            if (timepassed > 1000) {
                AUDIO_THROW.play();
                collectedBottles--; //links oben wird eine Flasche abgezogen
                bottleThrowTime = new Date().getTime(); //hier wird die Zeit ermittelt wo "b" gedrück wird um die Koordinaten zu wissen zum schmeißen
            }
        }


        let timePassedSinceJump = new Date().getTime() - lastJumpStarted;
        if (e.code == 'Space' && timePassedSinceJump > JUMP_TIME * 2) {
            isJumping = true;
            AUDIO_JUMPING.play();
            lastJumpStarted = new Date().getTime();
        }
    });

    // Hier wird gecheckt ob eine Taste losgelassen wird
    document.addEventListener('keyup', e => {
        const k = e.key;
        /*      console.log(k); */
        if (k == 'ArrowRight') {
            isMovingRight = false;
        }
        if (k == 'ArrowLeft') {
            isMovingLeft = false;
        }
    });
}