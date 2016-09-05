var mainState = {
	
	preload: function(){
		game.load.image("player", "assets/player.png");
		//game.load.image("player2", "assets/player2.png");
	game.load.image('wallV', 'assets/wallVertical.png');
	game.load.image('wallH', 'assets/wallHorizontal.png');
	game.load.image('coin', 'assets/coin.png');
	game.load.image('enemy', 'assets/enemy.png');
	
	},
	create: function(){
	game.stage.backgroundColor = '#02937B';	
	game.physics.startSystem(Phaser.Physics.ARCADE);
	game.renderer.renderSession.roundPixels = true;
	this.player = game.add.sprite(game.width/2, game.height/2, 'player');
	//this.player2 = game.add.sprite(game.width/2, game.height/2, 'player2');
	this.player.anchor.setTo(0.5,0.5);
	//this.player2.anchor.setTo(1,1);
	game.physics.arcade.enable(this.player);
	 this.player.body.gravity.y= 500;
	//game.physics.arcade.enable(this.player2);
	//this.player2.body.gravity.y= -20;
	this.cursor = game.input.keyboard.createCursorKeys();	
	
	this.walls = game.add.group();
	this.walls.enableBody = true;
	game.add.sprite(0, 0, 'wallV', 0, this.walls);
	game.add.sprite(480, 0, 'wallV', 0, this.walls);
	
	game.add.sprite(0, 0, 'wallH', 0, this.walls);
	game.add.sprite(300, 0, 'wallH', 0, this.walls);
	game.add.sprite(0, 320, 'wallH', 0, this.walls);
	game.add.sprite(300, 320, 'wallH', 0, this.walls);
	
	game.add.sprite(-100, 160, 'wallH', 0, this.walls);
	game.add.sprite(400, 160, 'wallH', 0, this.walls);
	var middleTop = game.add.sprite(100, 80, 'wallH', 0, this.walls);
	middleTop.scale.setTo(1.5, 1);
	var middleBottom = game.add.sprite(100, 240, 'wallH', 0, this.walls);
	middleBottom.scale.setTo(1.5, 1);
	//this.coin = game.add.sprite(60, 145, 'coin');  //เรียกเหรียญ
	//game.physics.arcade.enable(this.coin); //
	//this.coin.anchor.setTo(0.5, 0.5); // ตั่งมุมเหรียญ
	this.enemies = game.add.group();
	this.enemies.enableBody = true;
	this.enemies.createMultiple(1000, 'enemy');

	game.time.events.loop(800, this.addEnemy, this);
		game.time.events.loop(800, this.addEnemy2, this);
	this.scoreLable = game.add.text(30, 30, 'score: 0',{ font: '18px Arail', fill: '#ffffff'});
	this.score = 0;
	//var number = game.rnd.integerInRange(a, b);
	//this.coin.reset(x, y);
	this.walls.setAll('body.immovable', true);
	 this.coins = game.add.group();
  this.coins.enableBody = true;
  this.spawnCoins();
	},
	spawnCoins: function() {

  for (var i = 0; i < 1; i++) {

    var x = this.rnd.integerInRange(0, game.world.width - 40);
    var y = this.rnd.integerInRange(0, game.world.height - 100);

    this.coins.create(x, y, 'coin');
    this.coins.forEach(function(coin) {
      coin.animations.add('effect', [0, 1, 2, 3], 5, true);
      coin.animations.play('effect');
    //  coin.scale.setTo(0.5, 0.5); // site coin
      coin.body.gravity.y = 200;
      coin.body.bounce.y = 0.4;
    });
  }

},
	

collectCoin: function(player, coin) {
  coin.destroy();
   this.score += 10;
  this.scoreLable.text = 'Score : ' + this.score;
  this.spawnCoins();
},
	
	update: function(){
		game.physics.arcade.collide(this.enemies, this.walls);
		game.physics.arcade.overlap(this.player, this.enemies, this.playerDie, null, this);
		game.physics.arcade.overlap(this.player, this.coins, this.collectCoin, null, this);
		 game.physics.arcade.collide(this.coins, this.walls);
		game.physics.arcade.overlap(this.player, this.coin, this.takeCoin, null, this);
		game.physics.arcade.collide(this.player, this.walls);
		this.movePlayer();
		if (!this.player.inWorld) {
			this.playerDie();
		}
	},
	//takeCoin: function(player, coin) {
	//	this.coin.kill();
	//	this.score += 1;
	//	this.scoreLable.text = 'score:' + this.score;
	//},
	
	addEnemy: function() {
		var enemy = this.enemies.getFirstDead();
		if (!enemy) {
			return;
		}
		enemy.anchor.setTo(0.5, 0.5);
		enemy.reset(game.width/2, 0);
		enemy.body.gravity.y = 500;		
		enemy.body.velocity.x =100* game.rnd.pick([-1,1]);
		enemy.body.bounce.x = 1;
		enemy.checkWorldBounds = true;
		enemy.outOfBoundsKill = true;
	
	},
	addEnemy2: function() {
		var enemy2 = this.enemies.getFirstDead();
		if (!enemy2) {
			return;
		}
		enemy2.anchor.setTo(0.5, 0.5);
		enemy2.reset(game.width/2, game.height);
		enemy2.body.gravity.y = -500;	
		enemy2.body.velocity.x =100* game.rnd.pick([-1,1]);
		enemy2.body.bounce.x = 1;
		enemy2.checkWorldBounds = true;
		enemy2.outOfBoundsKill = true;				
	},	

		movePlayer: function(){
			//if(this.cursor.up.isDown) {
				//this.player.body.velocity.y = -200;				
			 if (this.cursor.down.isDown) {
				this.player.body.velocity.y = 200;
			}
			else if (this.cursor.left.isDown) {
				this.player.body.velocity.x = -200;
			}
			else if (this.cursor.right.isDown) {
				this.player.body.velocity.x = 200;
			}
			//else if (this.cursor.up.isDown) {
				//this.player.body.velocity.y = -200;	
			//}
			else{
				this.player.body.velocity.x = 0;
			}
			if(this.cursor.up.isDown && this.player.body.touching.down) {
				this.player.body.velocity.y = -320;
		}
		
	},
	playerDie: function() {
		game.state.start('main');
	},
	displayEnd: function(win) {
    if (this.endText && this.endText.exists) {
      return;
    }

  
    this.endText.anchor.setTo(0.5, 0);
    this.showReturn = this.time.now + 2000;
  },
};
var game = new Phaser.Game(500,340,Phaser.AUTO, 'gameDiv');
game.state.add("main",mainState);
game.state.start('main');
