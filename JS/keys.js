/**
 * This function checks which key is clicked, so the animation works
 */
 function listenForKeys() {
    // Hier wird gecheckt ob eine Taste gedrückt wird
    document.addEventListener('keydown', e => {
        lastKeyPressed = new Date().getTime(); //zählt die Millisekunden als das letzte Mal eine Taste gedrückt wurde
        const k = e.key;
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
        } else { 
            isJumping = false;
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

        if (e.code == 'Space') {
            isJumping = false; 
            console.log('is jumping false'); 
        }
    });
}
