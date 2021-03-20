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
            AUDIO_RUNNING.muted = true; 
            AUDIO_JUMPING.muted = true; 
            AUDIO_SLEEP.muted = true;
            AUDIO_BOTTLE.muted = true; 
            AUDIO_THROW.muted = true; 
            AUDIO_CHICKEN.muted = true; 
            AUDIO_GLASS.muted = true; 
            AUDIO_WIN.muted = true; 
            AUDIO_LOOSE.muted = true; 
            AUDIO_OHOH.muted = true; 


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
            AUDIO_RUNNING.muted = false;
            AUDIO_JUMPING.muted = false; 
            AUDIO_SLEEP.muted = false;
            AUDIO_BOTTLE.muted = false; 
            AUDIO_THROW.muted = false;
            AUDIO_CHICKEN.muted = false;
            AUDIO_GLASS.muted = false;
            AUDIO_WIN.muted = false;
            AUDIO_LOOSE.muted = false;
            AUDIO_OHOH.muted = false;

            setTimeout(function () {
                soundOn = true;
                soundsOff = false;
            }, 100);
        }
    }


    /**
 * This function opens the fullscreen.
 */
function openFullscreen() {
    /* document.getElementById('canvas-box').classList.add('d-none'); */
    /*     document.getElementById('fullscreen-icon').classList.add('d-none');  */
    document.getElementById('keys-explanation').classList.add('d-none');
    document.getElementById('close-fullscreen').classList.remove('d-none');
    BACKGROUND_MUSIC.play();
    loadGame();

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
    location.reload();

    if (document.exitFullscreen) {
        document.exitFullscreen();
    } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
    }
}

