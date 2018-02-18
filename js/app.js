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
    }
    render(){
         ctx.drawImage(Resources.get(this.sprite), this.xPos, this.yPos);
    }
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
class Player {
     constructor(xPos,yPos, speed) {
        this.xPos = xPos;
        this.yPos = yPos;
        this.speed = speed;
        this.sprite = 'images/char-boy.png';
    }
    // Update the enemy's position, required method for game
    update(dt){
        this.xPos = this.xPos + (this.speed * dt);
    }
    handleInput(){
        this.xPos = this.xPos + (this.speed * dt);
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
let player = new Player(200, 380, 50);
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
