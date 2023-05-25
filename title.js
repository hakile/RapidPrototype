class Title extends Phaser.Scene {
    constructor() {
        super('title');
    }
    preload(){
        this.load.image('rolypoly','rolypoly.png');
        this.load.image('snail','snail.png');
        this.load.image('fairy','fairy.png');
    }  
    create() {
        this.title = this.add.text(640, -100, `Roly Poly: To the End`, { font: '64px Arial', color: '#000' }).setOrigin(.5,0);
        this.rolypoly = this.add.sprite(640, 1000, 'rolypoly')
        .setInteractive()
        .setScale(1.25)
        .on('pointerover', () => this.tweens.add({targets: this.rolypoly, scale: 1.6, duration: 500, ease: 'Bounce.Out'}))
        .on('pointerout', () => this.tweens.add({targets: this.rolypoly, scale: 1.25, duration: 333, ease: 'Cubic.InOut'}))
        .on('pointerdown', () => this.scene.start('victory'));
        this.fairy = this.add.sprite(-300, 200, 'fairy');
        this.snail = this.add.sprite(-200, 600, 'snail').setScale(.6);
        
        this.time.delayedCall(500, () => {
            this.tweens.add({targets: this.title, y: 45, duration: 1000, ease: 'Cubic.Out'});
            this.tweens.add({targets: this.rolypoly, y: 400, duration: 1500, ease: 'Cubic.Out'});
        })
        
        this.time.delayedCall(1500, () => {
            this.tweens.add({
                targets: this.title,
                y: 35,
                duration: 750,
                ease: 'Sine.InOut',
                yoyo: true,
                repeat: -1
            });
            this.tweens.add({
                targets: this.fairy,
                x: 1580,
                duration: 2000,
                yoyo: true,
                repeat: -1
            });
            this.tweens.add({
                targets: this.fairy,
                y: 250,
                duration: 400,
                ease: 'Sine.InOut',
                yoyo: true,
                repeat: -1
            });
            this.tweens.add({
                targets: this.snail,
                x: 1480,
                duration: 10000,
                yoyo: true,
                repeat: -1
            });
            this.time.addEvent({
                delay: 2000,
                repeat: -1,
                callback: () => this.fairy.setScale(-this.fairy.scaleX,1)
            })
            this.time.addEvent({
                delay: 10000,
                repeat: -1,
                callback: () => this.snail.setScale(-this.snail.scaleX,.6)
            })
            this.time.addEvent({
                delay: 6250,
                repeat: -1,
                callback: () => this.tweens.add({targets: this.rolypoly, x: 630, duration: 50, yoyo: true, repeat: 2})
            })
        })
        this.input.on('pointerdown', () => this.scene.start('victory'))
    }
}

class Victory extends Phaser.Scene {
    constructor() {
        super('victory');
    }

    preload() {
        this.load.image('rolypoly','rolypoly.png');
        this.load.image('badge', 'badge.png');
    }
        
    create() {
        this.rolypoly = this.add.sprite(-200, 600, 'rolypoly');
        this.badge = this.add.sprite(640, -200, 'badge').setScale(0.5);

        this.add.text(640, 25, `VICTORY!`, { font: '64px Arial', color: '#000' }).setOrigin(.5,0);
        this.button = this.add.text(640, 300, 'Press To Restart', {font: '40px Arial', color: '#000'}).setOrigin(.5);
  
        this.button.setInteractive();
  
        this.button.on('pointerdown', () => {
            this.scene.start('title');
        });

        this.tweens.add({
            targets: this.badge,
            y: 600,
            duration: 5000,
            ease: 'Quart.Out'
        })
        this.tweens.add({
            targets: this.rolypoly,
            x: 640,
            duration: 1000,
            ease: 'Sine.Out'
        })

    }
}

const game = new Phaser.Game({
    type: Phaser.WEBGL,
    width: 1280,
    height: 720,
    backgroundColor: 0xcccccc,
    physics: {
        default: 'arcade',
        arcade: {debug: true, gravity: {x:0, y:100}}
    },
    scene: [ Title, Victory ],
    title: "Roly Poly: To The End",
});