function startGame() {
    document.getElementById('startscreen').classList.add('d-none');
    document.getElementById('start_btn').classList.add('d-none');
    document.getElementById('instruction_btn').classList.add('d-none');
    document.getElementById('fullscreen-icon').classList.add('d-none');
    loadGame();
    BACKGROUND_MUSIC.play();
}


function restartGame() {
    location.reload();
}


function openInstruction() {
    document.getElementById('instruction-div').classList.remove('d-none');
    console.log(document.getElementById("instruction-div"));
}

function closeInstruction() {
    document.getElementById('instruction-div').classList.add('d-none');
}