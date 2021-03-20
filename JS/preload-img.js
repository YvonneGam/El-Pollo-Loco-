
let imagePaths = [
    'img/character/character_move1.png', 'img/character/character_move2.png', 'img/character/character_move3.png', 'img/character/character_move4.png', 'img/character/character_move5.png', 'img/character/character_move6.png',
    'img/character/J-36.png','img/character/J-37.png', 'img/character/character_move1.png', 
    'img/character/J-36-left.png','img/character/J-37-left.png', 'img/character/character_move1.png',
    'img/littlechicken/yellowchicken1.png', 'img/littlechicken/yellowchicken2.png',
    'img/littlechicken/brownchicken1.png', 'img/littlechicken/brownchicken1.png',
    'img/character/I-11.png', 'img/character/I-12.png', 'img/character/I-13.png', 'img/character/I-14.png', 'img/character/I-15.png', 'img/character/I-16.png', 'img/character/I-17.png', 'img/character/I-18.png', 'img/character/I-19.png', 'img/character/I-20.png',
    'img/character/I-11-left.png', 'img/character/I-12-left.png', 'img/character/I-13-left.png', 'img/character/I-14-left.png', 'img/character/I-15-left.png', 'img/character/I-16-left.png', 'img/character/I-17-left.png', 'img/character/I-18-left.png', 'img/character/I-19-left.png', 'img/character/I-20-left.png'
]; 

let images = [];

/**
 * This function loads all images on the beginning
 */
function preloadImages() {
    for (let i = 0; i < imagePaths.length; i++) {
      let image = new Image();
      image.src = imagePaths[i];
      images.push(image); // push image-path to images-array (which contains all image-paths)
      console.log('preload images');
    }
  }