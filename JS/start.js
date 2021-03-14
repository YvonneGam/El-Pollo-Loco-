function startGame() {
    document.getElementById('startscreen').classList.add('d-none');
    document.getElementById('start_btn').classList.add('d-none');
    document.getElementById('instruction_btn').classList.add('d-none');
    BACKGROUND_MUSIC.play();
}


function restartGame() {
    location.reload();
}


function openInstruction() {
    document.getElementById('instruction_div').classList.remove('d-none');
}

function closeInstruction() {
    document.getElementById('instruction_div').classList.add('d-none');
}