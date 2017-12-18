var HomeState = {
    create: function(){
        this.homeBackground = this.game.add.tileSprite(0,0, this.game.world.width, this.game.world.height, 'background4');
        this.homeBackground.tileScale.y = 1;

        this.themeSound2 = this.add.audio('menuMusic');
        this.themeSound2.loopFull();
        this.playSound = this.add.audio('menuNav');

        var style = {font: '40px Orbitron, sans-serif', fill: '#fff'};
        this.title = this.add.text(this.game.world.width/2 -300, this.game.height/2 -350, 'THE LAST COMMIT ON THE EARTH', style);
        this.homeScreenshot1 = this.add.tileSprite(700,295,this.game.width/2 - 148, this.game.height/2 - 90,'screen2');
        this.homeScreenshot2 = this.add.tileSprite(100,295,this.game.width/2 - 148, this.game.height/2 - 90,'screen1');
        this.description1 = this.add.text(this.game.world.width/2 -600, this.game.height/2 -265, 'MAN, ' +
            'YOU HAD SUCH A GOOD PROJECT THAT ALIENS', style);
        this.description1 = this.add.text(this.game.world.width/2 -600, this.game.height/2 -230, 'CAME AT THE EARTH AND GOT IT. ', style);
        this.description2 = this.add.text(this.game.world.width/2 -600, this.game.height/2 -195,
            'RETURN IT BY COLLECTING COMMITS. ', style);
        this.description1 = this.add.text(this.game.world.width/2 -600, this.game.height/2 -160, 'BUT REMEMBER: THERE IS GRAVITY AND ALIENS!', style);


        this.startGame = this.add.text(this.game.width/2-50 , this.game.height/2+225, 'Play', style);
        this.author = this.add.text(this.game.width/2 -600, this.game.height/2+300, 'AUTHOR:  https://github.com/YanaNeronskaya', style);
        this.startGame.anchor.setTo = (0.5);
        this.startGame.angle = (2.5+Math.random()*5)*(Math.random()>0.5?1:-1);
        this.startGameTween = this.add.tween(this.startGame);
        this.startGameTween.to({angle: -this.startGame.angle},2000+Math.random()*2000,Phaser.Easing.Linear.None,true,0,1500,true);
        this.startGame.inputEnabled = true;

        this.startGame.events.onInputDown.add(function(){
            this.playSound.play();
            this.themeSound2.stop();
            this.state.start('GameState');
        }, this);
    }
};

module.exports.HomeState = HomeState;