var TheLastCommitJedi = TheLastCommitJedi || {};

TheLastCommitJedi.BootState = require('./states/StateBoot').BootState;
TheLastCommitJedi.GameState = require('./states/StateGame').GameState;
TheLastCommitJedi.HomeState = require('./states/StateHome').HomeState;
TheLastCommitJedi.PreloadState = require('./states/StatePreload').PreloadState;

TheLastCommitJedi.game = new Phaser.Game(1300, 760, Phaser.AUTO);

TheLastCommitJedi.game.state.add('BootState', TheLastCommitJedi.BootState);
TheLastCommitJedi.game.state.add('PreloadState', TheLastCommitJedi.PreloadState);
TheLastCommitJedi.game.state.add('HomeState', TheLastCommitJedi.HomeState);
TheLastCommitJedi.game.state.add('GameState', TheLastCommitJedi.GameState);

TheLastCommitJedi.game.state.start('BootState');