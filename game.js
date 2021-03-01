let canvas;
let ctx; //context
let character_x = 75;
let character_y = 125;
let isMovingRight = false;
let isMovingLeft = false;
let bg_elements = 0;
let lastJumpStarted = 0;
let currentCharacterImage = 'img/character/character_move1.png';
let characterGraphicsRight = ['img/character/character_move1.png', 'img/character/character_move.png', 'img/character/character_move3.png', 'img/character/character_move4.png', 'img/character/character_move5.png', 'img/character/character_move6.png'];
let characterGraphicsLeft = ['img/character/character_move1-left.png', 'img/character/character_move2-left.png', 'img/character/character_move3-left.png', 'img/character/character_move4-left.png', 'img/character/character_move5-left.png', 'img/character/character_move6-left.png'];
let characterGraphicIndex = 0;


//Game config
let JUMP_TIME = 300; //in Millisekunden
let GAME_SPEED = 6;






function init() {
    canvas = document.getElementById('canvas');
    ctx = canvas.getContext('2d');
    checkForRunning();
    draw()
    listenForKeys();
}

function checkForRunning() {
    setInterval(function () {
        if (isMovingRight) {
            let index = characterGraphicIndex % characterGraphicsRight.length;
            currentCharacterImage = characterGraphicsRight[index];
            characterGraphicIndex = characterGraphicIndex + 1;
        }

        if (isMovingLeft) {
            let index = characterGraphicIndex % characterGraphicsLeft.length;
            currentCharacterImage = characterGraphicsLeft[index];
            characterGraphicIndex = characterGraphicIndex + 1;
        }

    }, 100);
}

function draw() {
    /*     drawBackground(); */
    updateFloor();
    drawChicken();
    updateCaracter();
    requestAnimationFrame(draw); //Diese function zeichnet automatisch die Daten je nach Leistung der Grafikkarte (ist nirgends definiert)
}

function drawChicken() {
    let chickens = [
        createChicken(1, 300, 350), //type, position_x, position_y
        createChicken(2, 500, 345),
        createChicken(1, 750, 350),
        createChicken(1, 1050, 350),
        createChicken(2, 1350, 345)
    ];

    for (i = 0; i < chickens.length; i = i + 1) {
        let chicken = chickens[i];
        addBackgroundObject(chicken.img, chicken.position_x, chicken.position_y, chicken.scale);
    }
}

function createChicken(type, position_x, position_y) {
    return { //JSON for all chicken
        "img": "img/littlechicken/littlechicken" + type + ".png",
        "position_x": position_x,
        "position_y": position_y,
        "scale": 0.25,
    };
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
        if (base_image.complete) { //gibt den Wert "true" zurück, wenn das Bild fertig gelaen ist, ansonten "false"
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

    if (isMovingLeft) {
        bg_elements = bg_elements + GAME_SPEED;
    }
    //evtl For-Schleife wie bei Video17
    addBackgroundObject('img/floor/Completo.png', 0, -60, 0.5);
    addBackgroundObject('img/floor/Completo.png', 1500, -60, 0.5);
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
        console.log(e.code == 'Space');

        if (k == 'ArrowRight') {
            isMovingRight = true;
            /*   character_x = character_x + 5; //Person wird an der X-Achse um 5 px nach rechts verschoben wenn man die rechte Pfeiltaste klickt */
        }
        if (k == 'ArrowLeft') {
            isMovingLeft = true;
            /*  character_x = character_x - 5; //Person wird an der X-Achse um 5 px nach links verschoben wenn man die rechte Pfeiltaste klickt */
        }

        let timePassedSinceJump = new Date().getTime() - lastJumpStarted;
        if (e.code == 'Space' && timePassedSinceJump > JUMP_TIME * 2) {
            lastJumpStarted = new Date().getTime();
        }
    });

    // Hier wird gecheckt ob eine Taste losgelassen wird
    document.addEventListener('keyup', e => {
        const k = e.key;
        console.log(k);
        if (k == 'ArrowRight') {
            isMoving = false;
            /*    character_x = character_x + 5; */
        }
        if (k == 'ArrowLeft') {
            isMovingLeft = false;
            /*      character_x = character_x - 5; */
        }
        /*         if (e.code == 'Space') {
                    isJumping = false;
                } */
    });

}