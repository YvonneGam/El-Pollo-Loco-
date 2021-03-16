//Yellow chicken

/**
 * This function calculates the position of the yellow chickens
 */
 function calculateChickenPosition() {
    setInterval(function () {
        for (let i = 0; i < chickens.length; i++) {
            let chicken = chickens[i];
            chicken.position_x = chicken.position_x - chicken.speed;
        }
    }, 80);
}

/**
 * check for the current image of the chicken.(Moving)
 */
function checkRunningYellowChicken() {
    setInterval(function () {
        if (currentYellowChicken == 'img/littlechicken/yellowchicken1.png') {
            currentYellowChicken = 'img/littlechicken/yellowchicken2.png';
        } else {
            currentYellowChicken = 'img/littlechicken/yellowchicken1.png';
        }
    }, 150);
}

/**
 * The little chickens are created here and each chicken has his coordinates
 */
function createChickenList() {
    chickens = [
        createYellowChicken(1, 650, 350), //type, position_x, position_y
        createYellowChicken(2, 900, 350),
        createYellowChicken(1, 2050, 350),
        createYellowChicken(1, 3200, 350),
        createYellowChicken(2, 3800, 350),
        createYellowChicken(2, 5000, 350),
        createYellowChicken(2, 5600, 350)
    ];
}

/**
 * position of all small chickens
 */
function drawChicken() {
    for (i = 0; i < chickens.length; i = i + 1) {
        let chicken = chickens[i];
        chicken.img = currentYellowChicken;
        addBackgroundObject(chicken.img, chicken.position_x, chicken.position_y, chicken.scale);
    }
}

function createYellowChicken(type, position_x, position_y) {
    return { //JSON for all chicken
        "img": "img/littlechicken/yellowchicken" + type + ".png",
        "position_x": position_x,
        "position_y": position_y,
        "scale": 0.25,
        "speed": (Math.random() * 5)
    };
}

//Brown chickens
/**
 * This function calculates the position of the brown chickens
 */
function calculateBrownChickenPosition() {
    setInterval(function () {
        for (let i = 0; i < brownchickens.length; i++) {
            let brownchicken = brownchickens[i];
            brownchicken.position_x = brownchicken.position_x - brownchicken.speed;
        }
    }, 100);
}

/**
 * check for the current image of the chicken.(Moving)
 */
function checkRunningBrownChicken() {
    setInterval(function () {
        if (currentBrownChicken == 'img/littlechicken/brownchicken1.png') {
            currentBrownChicken = 'img/littlechicken/brownchicken2.png';
        } else {
            currentBrownChicken = 'img/littlechicken/brownchicken1.png';
        }
    }, 200);
}

/**
 * The little chickens are created here and each chicken has his coordinates
 */
function createBrownChickenList() {
    brownchickens = [ //Hier wird das JSON brownchicken befüllt
        createBrownChicken(1, 1600, 350),
        createBrownChicken(2, 2500, 350),
        createBrownChicken(1, 3600, 350),
        createBrownChicken(1, 4100, 350),
        createBrownChicken(2, 4800, 350),
        createBrownChicken(2, 5300, 350)
    ];
}

/**
 * position of all small brown chickens
 */
function drawBrownChicken() {
    for (i = 0; i < brownchickens.length; i = i + 1) {
        let chicken = brownchickens[i];
        chicken.img = currentBrownChicken;
        addBackgroundObject(chicken.img, chicken.position_x, chicken.position_y, chicken.scale);
    }
}

function createBrownChicken(type, position_x, position_y) {
    return { //JSON for all chicken
        "img": "img/littlechicken/brownchicken" + type + ".png",
        "position_x": position_x,
        "position_y": position_y,
        "scale": 0.25,
        "speed": (Math.random() * 5)
    };
}