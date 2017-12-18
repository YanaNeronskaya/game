GamePlatform = function (game, floorBlock, numBlocks, x, y, speed, goodAchieveBlock, obstacleBlock, goodAch) {
    Phaser.Group.call(this, game);

    this.blockSize = 60;
    this.game = game;
    this.floorBlock = floorBlock;
    this.gitAchieve = goodAchieveBlock;
    this.achieve = goodAch;
    this.obstacleBlock = obstacleBlock;
    this.enableBody = true;

    this.startingPlatform(numBlocks, x, y, speed);
};

GamePlatform.prototype = Object.create(Phaser.Group.prototype);
GamePlatform.prototype.constructor = GamePlatform;

GamePlatform.prototype.startingPlatform = function (numBlocks, x, y, speed) {
    this.alive = true;
    let counter = 0;
    let arrFloor = ['ground', 'ground1'];
    arrFloor.sort(compareRandom);

    while (counter < numBlocks) {

        let floorBlock = this.floorBlock.getFirstExists(false);

        if (!floorBlock) {
            floorBlock = new Phaser.Sprite(this.game, x + counter * this.blockSize, y, arrFloor[0]);
        }
        else {
            floorBlock.reset(x + counter * this.blockSize, y);
        }
        this.add(floorBlock);
        counter++;
    }

    this.setAll('body.velocity.x', speed);
    this.setAll('body.immovable', true);
    this.setAll('body.allowGravity', false);
    this.addAchieve(speed);
    this.addObstacle(speed);
};

GamePlatform.prototype.kill = function () {
    this.alive = false;
    this.callAll('kill');

    let sprites = [];
    this.forEach(function (block) {
        sprites.push(block);
    }, this);

    sprites.forEach(function (block) {
        this.floorBlock.add(block);
    }, this);
};

GamePlatform.prototype.addAchieve = function (speed) {
    let achY = 110 + Math.random() * 200;
    let numbAch = Math.floor((Math.random() * 2) + 1);
    let isAchived;

    this.forEach(function (block) {
        isAchived = Math.random() <= 0.06;
        for (let i = 0; i < numbAch; i++) {
            if (isAchived) {
                let achieve = this.gitAchieve.getFirstExists(false);

                if (!achieve) {
                    achieve = new Phaser.Sprite(this.game, block.x, block.y - achY + (50 * i), 'goodAchieve');
                    this.gitAchieve.add(achieve);
                }
                else {
                    achieve.reset(block.x, block.y - achY - (50 * i));
                }

                achieve.body.velocity.x = speed;
                achieve.body.allowGravity = false;
            }
        }
    }, this);
};
GamePlatform.prototype.addObstacle = function (speed) {
    let arrObstacle = ['rock1', 'rock2', 'flower1', 'flower2', 'stump1', 'stump2', 'crystal1', 'crystal2', 'crystal3'];
    arrObstacle.sort(compareRandom);

    let obstacleY = 65;
    let isObstacled;

    this.forEach(function (block) {
        if (this.achieve >= 2) {
            isObstacled = Math.random() <= 0.16;
        }
        if (isObstacled) {
            let obstacle = this.obstacleBlock.getFirstExists(false);

            if (!obstacle) {
                obstacle = new Phaser.Sprite(this.game, block.x, (block.y - obstacleY), arrObstacle[0]);
                this.obstacleBlock.add(obstacle);
            }
            else {
                obstacle.reset(block.x, (block.y - obstacleY));
            }
            obstacle.body.velocity.x = speed;
            obstacle.body.allowGravity = false;
            obstacle.body.immovable = true;
        }
    }, this);
};


function compareRandom(a, b) {
    return Math.random() - 0.5;
}

module.exports = GamePlatform;