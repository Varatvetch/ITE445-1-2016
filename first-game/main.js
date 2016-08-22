var mainState = {
	
	preload: function(){
		game.load.image("player", "assets/player.png");
		//game.load.image("player2", "assets/player2.png");
	},
	
	create: function(){
	game.stage.backgroundColor = '#3498db';	
	game.physics.startSystem(Phaser.Physics.ARCADE);
	game.renderer.renderSession.roundPixels = true;
	this.player = game.add.sprite(game.width/2, game.height/2, 'player');
	//this.player2 = game.add.sprite(game.width/2, game.height/2, 'player2');
	this.player.anchor.setTo(0.5,0.5);
	//this.player2.anchor.setTo(1,1);
	game.physics.arcade.enable(this.player);
	this.player.body.gravity.y= 20;
	//game.physics.arcade.enable(this.player2);
	//this.player2.body.gravity.y= -20;
	this.cursor = game.input.keyboard.createCursorKeys();
	
	},
	
	update: function(){
		this.movePlayer();
	},
		movePlayer: function(){
			if(this.cursor.up.isDown) {
				this.player.body.velocity.y = -200;				
			}else if (this.cursor.down.isDown) {
				this.player.body.velocity.y = 200;
			}
			else if (this.cursor.left.isDown) {
				this.player.body.velocity.x = -200;
			}
			else if (this.cursor.right.isDown) {
				this.player.body.velocity.x = 200;
			}
		
			
		else{
			this.player.body.velocity.x = 0;
		}
		if(this.cursor.up.isDown && this.player.body.touching.down) {
			this.player.body.velocity.y = -320;
		}
	},
	
};
var game = new Phaser.Game(500,340,Phaser.AUTO, 'gameDiv');
game.state.add("main",mainState);
game.state.start('main');
