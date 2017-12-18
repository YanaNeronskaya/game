var PreloadState = {
    preload: function () {
        this.logo = this.add.sprite(this.game.world.centerX, this.game.world.centerX-300, 'preloaderImage');
        this.logo.anchor.setTo(0.5);

        this.processBar = this.add.sprite(this.game.world.centerX-20, this.game.world.centerX - 100, 'preloader');
        this.processBar.anchor.setTo(0.5);
        this.load.setPreloadSprite(this.processBar);

        this.load.image('background', 'assets/img/background/bg_volcano.png');
        this.load.image('background1', 'assets/img/background/bgHome.png');
        this.load.image('background2', 'assets/img/background/bgHome2.png');
        this.load.image('background3', 'assets/img/background/planets.png');
        this.load.image('background4', 'assets/img/background/blue.png');
        this.load.image('backgroundHome', 'assets/img/background/bgHome.jpg');
        this.load.image('screen1', 'assets/img/screenshots/Screenshot_3_504x295.png');
        this.load.image('screen2', 'assets/img/screenshots/Screenshot_4_504x296.png');
        this.load.image('ground', 'assets/img/platform/volcano_pack_05.png');
        this.load.image('ground1', 'assets/img/platform/volcano_pack_alt_05.png');
        this.load.image('branch', 'assets/img/branch.png');
        this.load.image('goodAchieve', 'assets/img/good-ach.png');
        this.load.image('rock1', 'assets/img/walls/volcano_pack_70.png');
        this.load.image('rock2', 'assets/img/walls/volcano_pack_71.png');
        this.load.image('flower1', 'assets/img/walls/volcano_pack_66.png');
        this.load.image('flower2', 'assets/img/walls/volcano_pack_74.png');
        this.load.image('stump1', 'assets/img/walls/volcano_pack_68.png');
        this.load.image('stump2', 'assets/img/walls/volcano_pack_73.png');
        this.load.image('crystal1', 'assets/img/walls/volcano_pack_72.png');
        this.load.image('crystal2', 'assets/img/walls/volcano_pack_65.png');
        this.load.image('crystal3', 'assets/img/walls/volcano_pack_56.png');
        this.load.image('lava', 'assets/img/lavas/volcano_pack_53.png');
        this.load.image('lavaBase', 'assets/img/lavas/volcano_pack_54.png');
        this.load.image('ufo', 'assets/img/players/ufo.png');
        this.load.image('hurted', 'assets/img/players/dead.png');

        this.load.audio('achievesound', ['assets/audio/getAch.ogg']);
        this.load.audio('UFOsound', ['assets/audio/bgboss.ogg']);
        this.load.audio('musicmain', ['assets/audio/gameTheme.mp3']);
        this.load.audio('jumpsound', ['assets/audio/Jump.mp3']);
        this.load.audio('menuNav', ['assets/audio/menu_nav.mp3']);
        this.load.audio('menuMusic', ['assets/audio/mainTheme.mp3']);
        this.load.audio('evilsound', ['assets/audio/smboss.ogg']);
        this.load.audio('endsound', ['assets/audio/end.mp3']);
        this.load.audio('playerhello', ['assets/audio/allright.mp3']);
        this.load.audio('playergetach', ['assets/audio/alltheway.mp3']);
        this.load.audio('playerhurt1', ['assets/audio/blahblahblah.mp3']);
        this.load.audio('playerhurt2', ['assets/audio/itsnotthateasy.mp3']);
        this.load.audio('meetufo', ['assets/audio/imintouble.mp3']);

        this.load.spritesheet('player', 'assets/img/players/run.png', 100.1, 154, 40, 0, 0);
        this.load.spritesheet('alien1', 'assets/img/players/evil1.png', 91, 100, 8, 0, 1);
        this.load.spritesheet('alien2', 'assets/img/players/evil2.png', 93, 100, 2, 0, 1);
        this.load.spritesheet('alien3', 'assets/img/players/evil3.png', 92, 100, 2, 0, 1);
        this.load.spritesheet('alien4', 'assets/img/players/evil4.png', 135, 100, 8, 0, 1);
    },
    create: function () {
        this.state.start('HomeState');
    }
};

module.exports.PreloadState = PreloadState;