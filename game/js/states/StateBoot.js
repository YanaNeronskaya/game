var BootState = {
    init: function () {
        this.game.stage.backgroundColor = '#26263E';
        this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL; //save game proportions
        this.scale.pageAlignHorizontally = true;
        this.scale.pageAlignVertically = true;
        this.game.physics.startSystem(Phaser.Physics.ARCADE);
    },
    preload: function () {
        this.load.image('preloader', 'assets/img/processbar.png');
        this.load.image('preloaderImage', 'assets/img/logo.gif');
    },
    create: function () {
        this.state.start('PreloadState');
    }
};

module.exports.BootState = BootState;