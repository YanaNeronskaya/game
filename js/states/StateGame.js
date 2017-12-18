var platform = require('./platform/GamePlatform');

var GameState = {
    init: function () {
        this.floorBlock = this.add.group();
        this.platformBlock = this.add.group();

        this.obstacleBlock = this.add.group();
        this.obstacleBlock.enableBody = true;

        this.gitAchieve = this.add.group();
        this.gitAchieve.enableBody = true;

        this.maxJump = 120;
        this.achieve = 0;
        this.gitBranch = 0;
        this.initialSpeed = 800;

        this.hurted = false;
        this.underlavas = false;
        this.ufoClash = false;
        this.alienFClash = false;
        this.obstacleClash = false;

        this.cursors = this.game.input.keyboard.createCursorKeys();
        this.game.physics.arcade.gravity.y = 800;
    },
    create: function () {
        let arrBg = ['background', 'background1', 'background2', 'background3', 'background4'];
        arrBg.sort(compareRandom);
        this.background = this.add.tileSprite(0, 0, this.game.world.width, this.world.height, arrBg[0]);
        this.background.tileScale.y = 1;
        this.background.autoScroll(-this.initialSpeed / 2, 0);
        this.game.world.sendToBack(this.background);

        this.player = this.add.sprite(220, 200, 'player');
        this.player.anchor.setTo(0.5);
        this.player.animations.add('run', [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43], 53, true);
        this.player.animations.add('jump', [1], true);
        this.game.physics.arcade.enable(this.player);

        this.lava = this.add.tileSprite(0, this.game.world.height - 120, this.game.world.width, 60, 'lava');
        this.lava.autoScroll(this.initialSpeed / 4, 0);
        this.lavaBase = this.add.tileSprite(0, this.game.world.height - 60, this.game.world.width, 60, 'lavaBase');
        this.lavaBase.autoScroll(this.initialSpeed / 4, 0);

        this.currentGamePlatform = new platform(this.game, this.floorBlock, Math.floor(Math.random() * (11 - 3)) + 8, 100, 350, -this.initialSpeed, this.gitAchieve, this.obstacleBlock, this.achieve);
        this.platformBlock.add(this.currentGamePlatform);

        this.evilBlock = this.add.group();
        this.evilBlock.enableBody = true;
        this.evilCreator = this.game.time.events.loop(Phaser.Timer.SECOND * 7 + Math.random() * 25, this.createEvil, this);

        this.branchBlock = this.add.group();
        this.branchBlock.enableBody = true;
        this.branchCreator = this.game.time.events.loop(Phaser.Timer.SECOND * 10 + Math.random() * 30, this.createBranch, this);

        this.flyingUFOBlock = this.add.group();
        this.flyingUFOBlock.enableBody = true;
        this.flyingUFOCreator = this.game.time.events.loop(Phaser.Timer.SECOND * 10 + Math.random() * 30, this.createUFO, this);

        this.achieveSound = this.add.audio('achievesound');
        this.UFOSound = this.add.audio('UFOsound');
        this.jumpSound = this.add.audio('jumpsound');
        this.evilSound = this.add.audio('evilsound');
        this.themeSound = this.add.audio('musicmain');
        this.endSound = this.add.audio('endsound');
        this.meetUFO = this.add.audio('meetufo');
        this.playerHello = this.add.audio('playerhello');
        this.playerAch = this.add.audio('playergetach');
        this.playerHurt1 = this.add.audio('playerhurt1');
        this.playerHurt2 = this.add.audio('playerhurt2');

        let arrHurtPlayer = [this.playerHurt1, this.playerHurt2 ];
        arrHurtPlayer.sort(compareRandom);
        this.playerHurt = arrHurtPlayer[0];

        this.startGame();

        let style = {font: '60px Arial', fill: '#fff'};
        this.goodAchCounter = this.add.text(10, 20, '0', style);
    },
    startGame: function () {
        this.themeSound.loopFull();
        this.createGamePlatform();
        this.playerHello.play();
    },
    createGamePlatform: function () {
        let newPlatformData = this.generateRandomPlatform();

        if (newPlatformData) {
            this.currentGamePlatform = this.platformBlock.getFirstDead();

            if (!this.currentGamePlatform) {
                this.currentGamePlatform = new platform(this.game, this.floorBlock, newPlatformData.numBlocks, this.game.world.width + newPlatformData.seperation, newPlatformData.y, -this.initialSpeed, this.gitAchieve, this.obstacleBlock, this.achieve);
            } else {
                this.currentGamePlatform.startingPlatform(newPlatformData.numBlocks, this.game.world.width + newPlatformData.seperation, newPlatformData.y, -this.initialSpeed)
            }
            this.platformBlock.add(this.currentGamePlatform);
        }
    },
    generateRandomPlatform: function () {
        let minDistance = 60,
            maxDistance = 100,
            data = {};

        let minDifY = -20,
            maxDifY = 20;

        if (this.achieve > 20) {
            minDistance = 130;
            maxDistance = 220;
        }

        data.seperation = minDistance + Math.random() * (maxDistance - minDistance);

        if (this.achieve > 10) {
            minDifY = -60;
            maxDifY = 60;
        }
        if (this.achieve > 20) {
            minDifY = -80;
            maxDifY = 80;
        }
        if (this.achieve > 40) {
            minDifY = -160;
            maxDifY = 160;
        }

        data.y = this.currentGamePlatform.children[0].y + minDifY + Math.random() * (maxDifY - minDifY);
        data.y = Math.max(200, data.y);
        data.y = Math.min(this.game.world.height - 60, data.y);

        let minBlocks = 8,
            maxBlocks = 8;

        if (this.achieve > 10) {
            minBlocks = 5;
            maxBlocks = 5;
        }

        if (this.achieve > 20) {
            minBlocks = 3;
            maxBlocks = 3;
        }
        data.numBlocks = minBlocks + Math.random() * (maxBlocks - minBlocks);

        return data;
    },
    update: function () {
        this.game.physics.arcade.overlap(this.player, this.gitAchieve, this.collectAchieves, null, this);
        this.game.physics.arcade.collide(this.player, this.obstacleBlock, this.collideObstacle, null, this);
        this.game.physics.arcade.collide(this.player, this.evilBlock, this.collideEvil, null, this);
        this.game.physics.arcade.collide(this.player, this.flyingUFOBlock, this.collideUFO, null, this);
        this.game.physics.arcade.collide(this.player, this.branchBlock, this.collideBranch, null, this);

        if (this.player.alive && !this.hurted) {

            this.platformBlock.forEachAlive((platform) => {
                this.game.physics.arcade.collide(this.player, platform);
                if (platform.length && platform.children[platform.length - 1].right < 0) {
                    platform.kill();
                }
            }, this);

            this.evilBlock.forEachAlive((evilElement) => {
                if (evilElement.y >= this.game.height || evilElement.x <= this.game.width - 1100) {
                    evilElement.kill();
                }
            }, this);

            this.flyingUFOBlock.forEachAlive((UFO) => {
                if (UFO.x <= -this.game.width) {
                    UFO.kill();
                }
            }, this);

            this.gitAchieve.forEachAlive((achieve) => {
                if (achieve.right <= 0) {
                    achieve.kill();
                }
            }, this);

            this.branchBlock.forEachAlive((beer) => {
                if (beer.x <= -this.game.width) {
                    beer.kill();
                }
            }, this);

            this.obstacleBlock.forEachAlive(function (obstacle) {
                if (obstacle.right <= 0) {
                    obstacle.kill();
                }
            }, this);


            if (this.player.body.touching.down) {
                this.player.body.velocity.x = this.initialSpeed;
                this.player.play('run');
            }
            else {
                this.player.body.velocity.x = 0;
            }

            if (this.cursors.up.isDown || this.game.input.activePointer.isDown) {
                this.jump();
                this.player.play('jump');
            }
            else if (this.cursors.up.isUp || this.game.input.activePointer.isUp) {
                this.isJumping = false;
            }

            if (this.currentGamePlatform.length && this.currentGamePlatform.children[this.currentGamePlatform.length - 1].right < this.game.world.width) {
                this.createGamePlatform();
            }

            if (this.player.top >= this.game.world.height) {
                this.gameOver();
                this.underlavas = true;
            }
            if (this.player.left <= 0) {
                this.gameOver();
            }
        }

        this.platformBlock.forEachAlive(function (platform) {
            this.game.physics.arcade.collide(this.evilBlock, platform);
        }, this);
    },
    jump: function () {
        if (this.player.body.touching.down) {
            this.jumpSound.play();
            this.startJumpY = this.player.y;
            this.player.body.velocity.y = -300;
            this.isJumping = true;
            this.jumpPeaked = false;
        }
        else if (this.isJumping && !this.jumpPeaked) {
            let distanceJumped = this.startJumpY - this.player.y;

            if (distanceJumped <= this.maxJump) {
                this.player.body.velocity.y = -300;
            }
            else {
                this.jumpPeaked = true;
            }
        }
    },
    createEvil: function () {
        let numEvils = Math.floor((Math.random() * 3) + 1),
            arrEvils = ['alien1', 'alien2', 'alien3', 'alien4'];

        arrEvils.sort(compareRandom);

        for (let i = 0; i < numEvils; i++) {
            if (this.player.alive) {
                this.evil = this.evilBlock.getFirstExists(false);

                if (!this.evil) {
                    this.evil = new Phaser.Sprite(this.game, 0, 0, arrEvils[0]);
                    this.evilBlock.add(this.evil);
                    this.evil.animations.add('evilAlive', [0], 10, true);
                    this.evil.animations.add('evilDead', [0], 3, true);
                    this.evil.play('evilAlive');
                }

                this.evil.reset(this.game.width - 300 + (100 * i), 0);
                this.evil.body.velocity.x = -350;
                this.evil.play('evilAlive');
                this.evil.scale.setTo(1, 1);
                this.evil.body.immovable = false;
                this.evil.body.bounce.set(-0.12)
            }
        }
    },
    createUFO: function () {
        if (this.player.alive) {
            this.ufo = this.flyingUFOBlock.getFirstExists(false);

            if (!this.ufo) {
                this.ufo = new Phaser.Sprite(this.game, 0, 0, 'ufo');
                this.flyingUFOBlock.add(this.ufo);
                this.ufo.animations.add('ufoRun', [0], 3, true);
                this.ufo.animations.add('ufoDead', [0], true);
                this.ufo.play('ufoRun');
            }
            this.ufo.reset(this.game.width, 50 + Math.random() * 250);
            this.ufo.body.velocity.x = -1200;
            this.ufo.body.allowGravity = false;
            this.ufo.play('ufoRun');
        }
    },
    createBranch: function () {
        if (this.player.alive) {
            this.gitBranch = this.branchBlock.getFirstExists(false);

            if (!this.gitBranch) {
                this.gitBranch = new Phaser.Sprite(this.game, 0, 0, 'branch');
                this.branchBlock.add(this.gitBranch);
            }
            this.gitBranch.reset(this.game.width, 50 + Math.random() * 200);
            this.gitBranch.body.velocity.y = 0;
            this.gitBranch.body.velocity.x = -675;
            this.gitBranch.body.allowGravity = false;
        }
    },
    collideBranch: function (player, branch) {
        this.playerAch.play();
        this.achieveSound.play();
        branch.kill();
    },
    collideObstacle: function () {
        if (!this.hurted) {
            this.playerHurt.play();
            this.evilSound.play();
            this.player.loadTexture('hurted');

            this.player.body.velocity.y = -100;
            this.hurted = true;
            this.initialSpeed = 0;
            this.obstacleClash = true;

            this.game.time.events.add(1000, this.gameOver, this);
        }
    },
    collectAchieves: function (player, achievement) {
        achievement.kill();
        this.achieve++;
        this.playerAch.play();
        this.achieveSound.play();
        this.goodAchCounter.text = this.achieve;
    },
    collideEvil: function (player, alien) {
        if (alien.body.touching.up) {
            this.playerHurt.play();
            this.evilSound.play();
            this.player.body.velocity.y = -300;
            alien.play('evilDead');
            this.game.time.events.add(Phaser.Timer.SECOND * 1, this.killEvil, this);
        }
        else if (!this.hurted) {
            this.playerHurt.play();
            this.evilSound.play();
            this.player.loadTexture('hurted');
            this.player.body.velocity.y = 0;
            this.player.body.velocity.x = -300;
            alien.body.velocity.y = 100;
            alien.body.velocity.x = -200;
            this.hurted = true;
            this.initialSpeed = 0;
            alien.body.immovable = true;
            this.alienClash = true;

            this.game.time.events.add(1000, this.gameOver, this);
        }
        else {
            this.playerHurt.play();
            this.evilSound.play();
            alien.body.velocity.y = 100;
            alien.body.velocity.x = -200;
            alien.scale.setTo(-1, -1);
            alien.body.immovable = true;
        }
    },
    killEvil: function () {
        this.evil.kill();
    },
    collideUFO: function (player, ufo) {
        if (ufo.body.touching.up) {
            this.jumpSound.play();
            this.meetUFO.play();
            this.UFOSound.play();
            this.player.body.velocity.y = -300;
            this.ufo.body.allowGravity = true;
            ufo.play('ufoDead');
            this.game.time.events.add(Phaser.Timer.SECOND * 1, this.killFlyingUFO, this);
        }
        else if (!this.hurted) {
            ufo.play('ufoDead');
            this.jumpSound.play();
            this.meetUFO.play();
            this.UFOSound.play();
            this.ufo.body.allowGravity = true;
            this.ufo.body.velocity.y = -300;
            this.player.body.velocity.y = 0;
            this.player.loadTexture('hurted');
            this.hurted = true;
            this.initialSpeed = 0;
            this.ufoClash = true;

            this.game.time.events.add(1000, this.gameOver, this);
        }
        else {
            this.jumpSound.play();
            this.meetUFO.play();
            this.UFOSound.play();
            ufo.play('ufoDead');
            this.ufo.body.allowGravity = true;
            this.ufo.body.velocity.y = -350;
            this.ufo.body.velocity.x = 100;
        }
        if (ufo.body.touching.down) {
            this.jumpSound.play();
            this.meetUFO.play();
            this.UFOSound.play();
            this.ufo.body.velocity.y = -350;
            this.ufo.body.velocity.x = -300;
            ufo.play('ufoDead');
            this.game.time.events.add(Phaser.Timer.SECOND * 1, this.killFlyingUFO, this);
        }
    },
    killFlyingUFO: function () {
        this.ufo.kill();
    },
    gameOver: function () {
        if (this.player.alive) {
            this.player.kill();
            this.updateHighscore();

            this.overlay = this.add.bitmapData(this.game.width, this.game.height);
            this.overlay.ctx.fillStyle = '#000';
            this.overlay.ctx.fillRect(0, 0, this.game.width, this.game.height);

            this.panel = this.add.sprite(0, 0, this.overlay);
            this.panel.alpha = 0.55;

            let gameOverPanel = this.add.tween(this.panel);
            gameOverPanel.to({y: 0}, 500);

            gameOverPanel.onComplete.add(function () {
                this.background.stopScroll();
                let arrForPhrase = ['We have no time for that!','Bro, are you serious?' ,'They fly faster than you commit'];
                arrForPhrase.sort(compareRandom);
                if (this.underlavas || this.obstacleClash || this.alienClash || this.ufoClash) {
                    let style = {font: '70px Orbitron, sans-serif', fill: '#fff'};
                    this.add.text(this.game.width / 2, this.game.height / 2 - 200, arrForPhrase[0], style).anchor.setTo(0.5);
                }

                let style = {font: '70px Yanone Kaffeesatz, sans-serif', fill: '#fff'};
                this.add.text(this.game.width / 2, this.game.height / 2 - 80, 'GAME OVER', style).anchor.setTo(0.5);

                style = {font: '60px Yanone Kaffeesatz, sans-serif', fill: '#fff'};
                this.add.text(this.game.width / 2, this.game.height / 2 + 25, 'Highscore: ' + this.highScore, style).anchor.setTo(0.5);

                this.add.text(this.game.width / 2, this.game.height / 2 + 120, 'Your commits: ' + this.achieve, style).anchor.setTo(0.5);

                let style1 = {font: '30px Yanone Kaffeesatz, sans-serif', fill: '#fff'};
                this.add.text(this.game.width / 2, this.game.height / 2 + 180, 'Tap to Play Again', style1).anchor.setTo(0.5);
                this.backToMenu = this.add.text(this.game.width/2-25 , this.game.height/2+225, 'Menu', style1);
                this.backToMenu.inputEnabled = true;

                this.backToMenu.events.onInputDown.add(function(){
                    this.state.start('HomeState');
                }, this);

                this.game.input.onDown.add(this.restart, this);

            }, this);

            gameOverPanel.start();
            this.themeSound.stop();
            this.endSound.play();
        }
    },
    restart: function () {
        this.game.state.start('GameState');
    },
    updateHighscore: function () {
        this.highScore = +localStorage.getItem('highScore');
        if (this.highScore < this.achieve) {
            this.highScore = this.achieve;

            localStorage.setItem('highScore', this.highScore);
        }
    }
};

function compareRandom(a, b) {
    return Math.random() - 0.5;
}

module.exports.GameState = GameState;