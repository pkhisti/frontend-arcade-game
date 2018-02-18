
const AddWinngStar = () => {
    let list = document.getElementsByTagName("ul")[0];
    let element = document.createElement("li");
    let image = document.createElement("img");
    image.setAttribute("src","images/Heart.png");
    image.setAttribute("style","height:50px");
    element.appendChild(image);
    list.appendChild(element);
}

// Enemies our player must avoid
class Enemy {
    constructor(xPos,yPos, speed) {
        this.xPos = xPos;
        this.yPos = yPos;
        this.speed = speed;
        this.sprite = 'images/enemy-bug.png';
    }
    // Update the enemy's position, required method for game
    update(dt){
        this.xPos = this.xPos + (this.speed * dt);

        // when off canvas, reset position of enemy to move across again
        if (this.xPos > 550) {
            this.xPos = -100;
            this.speed = 100 + Math.floor(Math.random() * 512);
        }

        // Check for collision between player and enemies
        if (player.xPos < this.xPos + 60 &&
            player.xPos + 37 > this.xPos &&
            player.yPos < this.yPos + 25 &&
            30 + player.yPos > this.yPos) {
            player.xPos = 200;
            player.yPos = 380;
        }
    }
    render(){
         ctx.drawImage(Resources.get(this.sprite), this.xPos, this.yPos);
    }
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
class Player {
     constructor(xPos,yPos, speed, avatar) {
        this.xPos = xPos;
        this.yPos = yPos;
        this.speed = speed;
        this.sprite = avatar;
    }
    // Update the enemy's position, required method for game
    update(dt){
       // Prevent player from moving beyond canvas wall boundaries
        if (this.yPos  > 380) {
            this.yPos  = 380;
        }
        if (this.xPos  > 400) {
            this.xPos  = 400;
        }
        if (this.xPos  < 0) {
            this.xPos  = 0;
        }
        // Check for player reaching top of canvas and winning the game
        if (this.yPos  < 0) {
            this.xPos  = 200;
            this.yPos  = 380;
            AddWinngStar();
        }
    }
    handleInput(keyPress){
        switch (keyPress) {
        case 'left':
            this.xPos -= this.speed + 50;
            break;
        case 'up':
            this.yPos -= this.speed + 30;
            break;
        case 'right':
            this.xPos += this.speed + 50;
            break;
        case 'down':
            this.yPos += this.speed + 30;
            break;
    }
    }
    render(){
         ctx.drawImage(Resources.get(this.sprite), this.xPos, this.yPos);
    }
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
let allEnemies = [];

// Position "y" where the enemies will are created
let enemyPosition = [60, 140, 220];
let player = new Player(200, 380, 50,'images/char-boy.png');
let enemy;

enemyPosition.forEach((posY) => {
    enemy = new Enemy(0, posY, 100 + Math.floor(Math.random() * 512));
    allEnemies.push(enemy);
});


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    let allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});

const SelectAvatar = () =>{
    let img = event.target.getElementsByTagName("img");
    let src =  event.target.getAttribute("src");
    player = new Player(200, 380, 50, src);
}

let avatarImages = document.getElementsByClassName("avatar");
for(let i = 0; i< avatarImages.length; i++) {
    avatarImages[i].addEventListener("click",SelectAvatar);
}