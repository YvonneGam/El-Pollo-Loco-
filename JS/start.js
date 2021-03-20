function startGame() {
    document.getElementById('startscreen').classList.add('d-none');
    document.getElementById('start_btn').classList.add('d-none');
    document.getElementById('instruction_btn').classList.add('d-none');
    document.getElementById('fullscreen-icon').classList.add('d-none');
    document.getElementById('speaker-icon').classList.remove('d-none');
    loadGame();
    BACKGROUND_MUSIC.play();
}


function restartGame() {
    location.reload();
}


function openInstruction() {
    document.getElementById('instruction-div').classList.remove('d-none');
}

function closeInstruction() {
    document.getElementById('instruction-div').classList.add('d-none');
}

/**
 * This function mutes the background sound when klick on the speaker icon
 */

function muteSound() {
        if (soundOn) {
            document.getElementById('mute-sound').classList.remove('d-none'); 
            BACKGROUND_MUSIC.muted = true;

            setTimeout(function () {
                soundOn = false;
                soundOff = true;
            }, 100);
        }
    }


    function playSound() {
        if (soundOff) {
            document.getElementById('mute-sound').classList.add('d-none'); 
            BACKGROUND_MUSIC.muted = false;

            setTimeout(function () {
                soundOn = true;
                soundsOff = false;
            }, 100);
        }
    }
