import Phaser from "phaser";

class Example extends Phaser.Scene
{
    constructor ()
    {
        super();

        this.sprite;
        this.stick;
    }

    preload ()
    {
        this.load.scenePlugin('VirtualJoystickPlugin', 'assets/VirtualJoystickPlugin.min.js', 'VirtualJoystickPlugin', 'pad');
        this.load.atlas('arcade', 'assets/arcade-joystick.png', 'assets/arcade-joystick.json');
        this.load.image('clouds', 'assets/clouds.png');
        this.load.atlas('jelly', 'assets/jellies.png', 'assets/jellies.json');
    }

    create ()
    {
        this.add.image(400, 300, 'clouds');

        this.sprite = this.physics.add.image(400, 300, 'jelly', 'NoShadow/Jelly5').setScale(0.5);
    
        this.stick = this.pad.addStick(0, 0, 200, 'arcade');
        this.stick.alignBottomLeft();

        //  Note: If you use the frames 'buttonX-up-plain' and 'buttonX-down-plain' instead,
        //  it will be a button graphic without the text labels on.

        this.buttonA = this.pad.addButton(500, 520, 'arcade', 'button1-up', 'button1-down');
        this.buttonA.on('down', this.pressButtonA, this);
        this.buttonA.addKey('A');

        this.buttonB = this.pad.addButton(615, 450, 'arcade', 'button2-up', 'button2-down');
        this.buttonB.on('down', this.pressButtonB, this);
        this.buttonB.addKey('B');

        this.buttonC = this.pad.addButton(730, 520, 'arcade', 'button3-up', 'button3-down');
        this.buttonC.on('down', this.pressButtonC, this);
        this.buttonC.addKey('C');
    }

    pressButtonA ()
    {
        this.sprite.setFrame('NoShadow/Jelly1');
    }

    pressButtonB ()
    {
        this.sprite.setFrame('NoShadow/Jelly2');
    }

    pressButtonC ()
    {
        this.sprite.setFrame('NoShadow/Jelly5');
    }

    update ()
    {
        const maxSpeed = 400;

        this.sprite.setVelocity(0);

        if (this.stick.isDown)
        {
            this.physics.velocityFromRotation(this.stick.rotation, this.stick.force * maxSpeed, this.sprite.body.velocity);
        }
    }
}

const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    backgroundColor: '#000000',
    parent: 'phaser-example',
    physics: {
        default: 'arcade'
    },
    scene: Example
};

const game = new Phaser.Game(config);
