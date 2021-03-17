/**
 * This function checks when the character collide with the items
 */
 function checkForCollision() {
    setInterval(function () {
        collisionYellowChicken();
        collisionBrownChicken();
        collisionBottles();
        collisionEnemy(); 

    }, 100);
}

/**
 * Check collision with yellow chicken
 */
function collisionYellowChicken() {
    for (let i = 0; i < chickens.length; i++) {
        let chicken = chickens[i];
        let chicken_x = chicken.position_x + bg_elements; //Position des Hühnchens + Position des Hintergrundes, da nur er sich verschiebt und nicht der Character
        if ((chicken_x - 40) < character_x && (chicken_x + 40) > character_x) { //Ist die Koordinate der Chicken-10 kleiner als die x-Koordiante der Person & ist die Koordinate der Chicken+10 größer als die Person, also 20 Unterschied, dann Kollision!
            if (character_y > 95) //Wenn die y-Koordinate des Characters größer als 95 ist dann wird keine Energie abgezogen, da man dann hoch genug gesprungen ist
                if (character_energy > 0) {
                    character_energy = character_energy - 10;  //1 Energie-Element wird abgezogen bei Collision
                    AUDIO_OHOH.play(); 
                } else {
                    character_lost_at = new Date().getTime();
                    game_finished_looser = true;
                    looseLevel();
                }
        }
    }
}

/**
 * Check collision with brown chicken
 */
function collisionBrownChicken() {
    for (let i = 0; i < brownchickens.length; i++) {
        let brownchicken = brownchickens[i];
        let brownchicken_x = brownchicken.position_x + bg_elements; //Position des Hühnchens + Position des Hintergrundes, da nur er sich verschiebt und nicht der Character
        if ((brownchicken_x - 40) < character_x && (brownchicken_x + 40) > character_x) { //Ist die Koordinate der Chicken-10 kleiner als die x-Koordiante der Person & ist die Koordinate der Chicken+10 größer als die Person, also 20 Unterschied, dann Kollision!
            if (character_y > 95) //Wenn die y-Koordinate des Characters größer als 95 ist dann wird keine Energie abgezogen, da man dann hoch genug gesprungen ist
                if (character_energy > 0) {
                    character_energy = character_energy - 10;  //1 Energie-Element wird abgezogen bei Collision
                    AUDIO_OHOH.play(); 
                } else {
                    character_lost_at = new Date().getTime();
                    game_finished_looser = true;
                    looseLevel();
                }
        }
    }
}

/**
 *  check collision with bottles
 */
function collisionBottles() {
    for (let i = 0; i < placedBottles.length; i++) {
        let bottle_x = placedBottles[i] + bg_elements;
        if ((bottle_x - 40) < character_x && (bottle_x + 40) > character_x) { //Ist die Koordinate der Chicken-10 kleiner als die x-Koordiante der Person & ist die Koordinate der Chicken+10 größer als die Person, also 20 Unterschied, dann Kollision!
            if (character_y > 95) //Wenn die y-Koordinate des Characters größer als 95 ist dann wird keine Energie abgezogen, da man dann hoch genug gesprungen ist
                placedBottles.splice(i, 1);
            AUDIO_BOTTLE.play();
            collectedBottles++;
        }
    }
}


/**
 * Check collision with enemy
 */

function collisionEnemy() {
    if (throwBottle_x > BOSS_POSITION + bg_elements - 100 && throwBottle_x < BOSS_POSITION + bg_elements + 100) {
        if (enemy_energy > 0) { //Hier wird gecheckt ob die Enerie mehr als 0 ist (also Chicken gewinnt)
            enemy_energy = enemy_energy - 10;
            AUDIO_GLASS.play();
        } else if (enemyDefeatedAt == 0) {
            enemyDefeatedAt = new Date().getTime();
            finishLevel();
        }
    }
}
