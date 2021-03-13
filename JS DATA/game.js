let canvas;
let ctx; //context
let character_x = 75;
let character_y = 125;
let character_energy = 100;
let enemy_energy = 10;
let isMovingRight = false;
let isMovingLeft = false;
let isJumping = false;
let bg_elements = 0;
let lastJumpStarted = 0;
let currentCharacterImage = 'img/character/character_move1.png';
let characterGraphicsRight = ['img/character/character_move1.png', 'img/character/character_move2.png', 'img/character/character_move3.png', 'img/character/character_move4.png', 'img/character/character_move5.png', 'img/character/character_move6.png'];
let characterGraphicsLeft = ['img/character/character_move1-left.png', 'img/character/character_move2-left.png', 'img/character/character_move3-left.png', 'img/character/character_move4-left.png', 'img/character/character_move5-left.png', 'img/character/character_move6-left.png'];
let characterGraphicIndex = 0;

let currentJumpImage = 'img/character/J-33.png';
let characterGraphicsJump = ['img/character/J-33.png', 'img/character/J-34.png', 'img/character/J-35.png', 'img/character/J-36.png', 'img/character/J-37.png', 'img/character/J-38.png'];
let characterGraphicJumpIndex = 0;

let chickens = [];
let currentYellowChicken = 'img/littlechicken/yellowchicken1.png';

let brownchickens = [];
let currentBrownChicken = 'img/littlechicken/brownchicken1.png';

let placedBottles = [1000, 1800, 2300, 2800, 3100, 3500, 4000];
let collectedBottles = 0;
let bottleThrowTime = 0;
let throwBottle_x = 0;
let throwBottle_y = 0;
let enemyDefeatedAt = 0;
let game_finished_winner = false;
let game_finished_looser = false;
let character_lost_at = 0;

//Game config
let JUMP_TIME = 300; //in Millisekunden
let GAME_SPEED = 6;
let BOSS_POSITION = 5500;
let AUDIO_RUNNING = new Audio('audio/running_mp3.mp3');
let AUDIO_JUMPING = new Audio('audio/jump.mp3');
let AUDIO_BOTTLE = new Audio('audio/bottle.mp3');
let AUDIO_THROW = new Audio('audio/throw.mp3');
let AUDIO_CHICKEN = new Audio('audio/chicken.mp3');
let AUDIO_GLASS = new Audio('audio/breaking_bottle.mp3');
let AUDIO_WIN = new Audio('audio/win.mp3');
let AUDIO_LOOSE = new Audio('audio/Looser.mp3');
AUDIO_WIN.volume = 0.6;
let BACKGROUND_MUSIC = new Audio('audio/background-sound.mp3');
BACKGROUND_MUSIC.loop = true;
BACKGROUND_MUSIC.volume = 0.3;


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
    draw()
    listenForKeys();
    calculateChickenPosition();
    calculateBrownChickenPosition()
    checkForCollision();
}

/**
 * This function checks when the character collide with the items
 */
function checkForCollision() {
    setInterval(function () {
        // Check collision with yellow chicken
        for (let i = 0; i < chickens.length; i++) {
            let chicken = chickens[i];
            let chicken_x = chicken.position_x + bg_elements; //Position des Hühnchens + Position des Hintergrundes, da nur er sich verschiebt und nicht der Character
            if ((chicken_x - 40) < character_x && (chicken_x + 40) > character_x) { //Ist die Koordinate der Chicken-10 kleiner als die x-Koordiante der Person & ist die Koordinate der Chicken+10 größer als die Person, also 20 Unterschied, dann Kollision!
                if (character_y > 95) //Wenn die y-Koordinate des Characters größer als 95 ist dann wird keine Energie abgezogen, da man dann hoch genug gesprungen ist
                    if (character_energy > 0) {
                        character_energy = character_energy - 10;  //1 Energie-Element wird abgezogen bei Collision
                    } else {
                        character_lost_at = new Date().getTime();
                        game_finished_looser = true;
                        looseLevel(); 

                    }
            }
        }

        //Check collision with brown chicken
        for (let i = 0; i < brownchickens.length; i++) {
            let brownchicken = brownchickens[i];
            let brownchicken_x = brownchicken.position_x + bg_elements; //Position des Hühnchens + Position des Hintergrundes, da nur er sich verschiebt und nicht der Character
            if ((brownchicken_x - 40) < character_x && (brownchicken_x + 40) > character_x) { //Ist die Koordinate der Chicken-10 kleiner als die x-Koordiante der Person & ist die Koordinate der Chicken+10 größer als die Person, also 20 Unterschied, dann Kollision!
                if (character_y > 95) //Wenn die y-Koordinate des Characters größer als 95 ist dann wird keine Energie abgezogen, da man dann hoch genug gesprungen ist
                    if (character_energy > 0) {
                        character_energy = character_energy - 10;  //1 Energie-Element wird abgezogen bei Collision
                    } else {
                        character_lost_at = new Date().getTime();
                        game_finished_looser = true;
                        looseLevel(); 
                    }
            }
        }

        //check collision with bottles
        for (let i = 0; i < placedBottles.length; i++) {
            let bottle_x = placedBottles[i] + bg_elements;
            if ((bottle_x - 40) < character_x && (bottle_x + 40) > character_x) { //Ist die Koordinate der Chicken-10 kleiner als die x-Koordiante der Person & ist die Koordinate der Chicken+10 größer als die Person, also 20 Unterschied, dann Kollision!
                if (character_y > 95) //Wenn die y-Koordinate des Characters größer als 95 ist dann wird keine Energie abgezogen, da man dann hoch genug gesprungen ist
                    placedBottles.splice(i, 1);
                AUDIO_BOTTLE.play();
                collectedBottles++;
            }
        }

        //check collision with enemy
        if (throwBottle_x > BOSS_POSITION + bg_elements - 100 && throwBottle_x < BOSS_POSITION + bg_elements + 100) {
            if (enemy_energy > 0) { //Hier wird gecheckt ob die Enerie mehr als 0 ist (also Chicken gewinnt)
                enemy_energy = enemy_energy - 10;
                AUDIO_GLASS.play();
            } else if (enemyDefeatedAt == 0) {
                enemyDefeatedAt = new Date().getTime();
                finishLevel();
            }
        }
    }, 100);
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
    if(game_finished_looser) {
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
        ctx.fillStyle = "salmon"
        ctx.fillRect(BOSS_POSITION + 65 + bg_elements, 98, 2 * enemy_energy, 25) //x-koordinate, y-koordinate, breite, höhe
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
    ctx.fillRect(440, 30, 230, 60) //x-koordinate, y-koordinate, breite, höhe

    ctx.globalAlpha = 1;
    ctx.fillStyle = "darkred"
    ctx.fillRect(455, 40, 2 * character_energy, 40) //x-koordinate, y-koordinate, breite, höhe
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
    if (isMovingRight) {
        bg_elements = bg_elements - GAME_SPEED;
    }

    if (isMovingLeft && bg_elements < 500) {
        bg_elements = bg_elements + GAME_SPEED;
    }
    //evtl For-Schleife wie bei Video17
    addBackgroundObject('img/floor/Completo.png', 0, -60, 0.5);
    addBackgroundObject('img/floor/Completo.png', 1500, -60, 0.5);
    addBackgroundObject('img/floor/Completo.png', 3000, -60, 0.5);
    addBackgroundObject('img/floor/Completo.png', 4500, -60, 0.5);
}

function addBackgroundObject(src, offsetX, offsetY, scale) {
    let base_image_floor = new Image();
    base_image_floor.src = src;
    if (base_image_floor.complete) { //gibt den Wert "true" zurück, wenn das Bild fertig gelaen ist, ansonten "false"
        ctx.drawImage(base_image_floor, offsetX + bg_elements, offsetY, base_image_floor.width * scale, base_image_floor.height * scale);
    }
}

/* function drawBackground() {
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
} */

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