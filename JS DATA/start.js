function startGame() {
    document.getElementById('startscreen').classList.add('d-none');
    document.getElementById('start_btn').classList.add('d-none');
    document.getElementById('instruction_btn').classList.add('d-none');
    BACKGROUND_MUSIC.play();
}


function restartGame() {
    location.reload();
}