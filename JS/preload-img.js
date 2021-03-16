
let imagePaths = [
    'img/character/character_move1.png', 'img/character/character_move2.png', 'img/character/character_move3.png', 'img/character/character_move4.png', 'img/character/character_move5.png', 'img/character/character_move6.png',
    'img/character/character_move1-left.png', 'img/character/character_move2-left.png', 'img/character/character_move3-left.png', 'img/character/character_move4-left.png', 'img/character/character_move5-left.png', 'img/character/character_move6-left.png',
    'img/character/J-33.png', 'img/character/J-34.png', 'img/character/J-35.png', 'img/character/J-36.png', 'img/character/J-37.png', 'img/character/J-38.png',
    'img/littlechicken/yellowchicken1.png', 'img/littlechicken/yellowchicken2.png',
    'img/littlechicken/brownchicken1.png', 'img/littlechicken/brownchicken1.png',
    'img/character/I-11.png', 'img/character/I-12.png', 'img/character/I-13.png', 'img/character/I-14.png', 'img/character/I-15.png', 'img/character/I-16.png', 'img/character/I-17.png', 'img/character/I-18.png', 'img/character/I-19.png', 'img/character/I-20.png'
]

let images = [];

function preloadImages() {
    for (let i = 0; i < imagePaths.length; i++) {
        let image = new Image();
        image.src = imagePaths[i];
        images.push(image); // push image-path to images-array (which contains all image-paths)
    }
}

/**
   * Check if background-image is already loaded in cache; if not, create new image
   * 
   * 
   * @param {string} src_path - scr-path of background-image 
   */
 function checkBackgroundImageCache(src_path) {

    // Check if image is found in images-array.


    let base_image = images.find(function (img) {

        return img.src.endsWith(src_path.substring(0, src_path.length));
    });

    // Create new image if not found in cache

    if (!base_image) {
        base_image = new Image();
        base_image.src = src_path;
    }

    return base_image;

}