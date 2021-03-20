let canvas;
let ctx; //context
let character_x = 75;
let character_y = 125;
let character_energy = 80;
let enemy_energy = 100;
let isMovingRight = false;
let isMovingLeft = false;
let moveDirectionRight = true;
let moveDirectionLeft = false; 
let isJumping = false;
let bg_elements = 0;
let lastJumpStarted = 0;
let currentCharacterImage = 'img/character/character_move1.png';
let characterGraphicsRight = ['img/character/character_move1.png', 'img/character/character_move2.png', 'img/character/character_move3.png', 'img/character/character_move4.png', 'img/character/character_move5.png', 'img/character/character_move6.png'];
let characterGraphicsLeft = ['img/character/character_move1-left.png', 'img/character/character_move2-left.png', 'img/character/character_move3-left.png', 'img/character/character_move4-left.png', 'img/character/character_move5-left.png', 'img/character/character_move6-left.png'];
let characterGraphicIndex = 0;

let characterGraphicsJump = ['img/character/J-36.png','img/character/J-37.png', 'img/character/character_move1.png'];
let characterGraphicsJumpLeft = ['img/character/J-36-left.png','img/character/J-37-left.png', 'img/character/character_move1-left.png'];
let characterGraphicJumpIndex = 0;

let characterSleepRight = ['img/character/I-11.png', 'img/character/I-12.png', 'img/character/I-13.png', 'img/character/I-14.png', 'img/character/I-15.png', 'img/character/I-16.png', 'img/character/I-17.png', 'img/character/I-18.png', 'img/character/I-19.png', 'img/character/I-20.png'];
let characterSleepLeft = ['img/character/I-11-left.png', 'img/character/I-12-left.png', 'img/character/I-13-left.png', 'img/character/I-14-left.png', 'img/character/I-15-left.png', 'img/character/I-16-left.png', 'img/character/I-17-left.png', 'img/character/I-18-left.png', 'img/character/I-19-left.png', 'img/character/I-20-left.png'];
let characterSleep = false; 
let lastKeyPressed = 0;

let chickens = [];
let currentYellowChicken = 'img/littlechicken/yellowchicken1.png';

let brownchickens = [];
let currentBrownChicken = 'img/littlechicken/brownchicken1.png';

let cloudOffset = 0; 
let placedBottles = [1000, 1800, 2300, 2800, 3100, 3500, 4000, 4800, 5400];
let collectedBottles = 0;
let bottleThrowTime = 0;
let throwBottle_x = 0;
let throwBottle_y = 0;
let enemyDefeatedAt = 0;
let game_finished_winner = false;
let game_finished_looser = false;
let character_lost_at = 0;

let soundOn = true;
let soundOff = false; 


//Game config
let JUMP_TIME = 400; //in Millisekunden
/* let WHOLE_JUMP_TIME = JUMP_TIME + JUMP_TIME * 1.9; */
let GAME_SPEED = 6;
let BOSS_POSITION = 6500;
let AUDIO_RUNNING = new Audio('audio/running_mp3.mp3');
let AUDIO_JUMPING = new Audio('audio/jump.mp3');
let AUDIO_SLEEP = new Audio('audio/snoring.mp3');
let AUDIO_BOTTLE = new Audio('audio/bottle.mp3');
let AUDIO_THROW = new Audio('audio/throw.mp3');
let AUDIO_CHICKEN = new Audio('audio/chicken.mp3');
let AUDIO_GLASS = new Audio('audio/breaking_bottle.mp3');
let AUDIO_WIN = new Audio('audio/win.mp3');
let AUDIO_LOOSE = new Audio('audio/Looser.mp3');
let AUDIO_OHOH = new Audio('audio/ohoh.mp3');
AUDIO_OHOH.volume = 0.6; 
AUDIO_WIN.volume = 0.6;
let BACKGROUND_MUSIC = new Audio('audio/background-sound.mp3');
BACKGROUND_MUSIC.loop = true;
BACKGROUND_MUSIC.volume = 0.2;
