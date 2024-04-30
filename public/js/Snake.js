export default class Snake {
    constructor(scene)
    {
        this.scene=scene;
        this.direction=Phaser.Math.Vector2.UP;
        this.lastMoveTime=0;
        this.moveInterval=300; //increase decrease the speed of snake
        this.titleSize=16;
        this.body=[];

        this.body.push(this.scene.add.rectangle(
          this.scene.game.config.width /2,
          this.scene.game.config.height/2,
          this.titleSize,
          this.titleSize,
          0xff0000).setOrigin(0))//10*10 16 16 pixel and color
       
        this.apple=this.scene.add.rectangle(0,0,this.titleSize,this.titleSize,0x00ff00).setOrigin(0)
        this.positionApple()

        scene.input.keyboard.on('keydown',e=>{
            this.keydown(e)
        })
    }

    positionApple()
    {
      this.apple.x=Math.floor(Math.random()*this.scene.game.config.width/this.titleSize)*this.titleSize
      this.apple.y=Math.floor(Math.random()*this.scene.game.config.height/this.titleSize)*this.titleSize
    }

    keydown(event)
    {
        switch(event.keyCode)
        {
            case 37://left
            if(this.direction!==Phaser.Math.Vector2.RIGHT || this.direction!==Phaser.Math.Vector2.DOWN  || this.direction!==Phaser.Math.Vector2.UP)
              this.direction=Phaser.Math.Vector2.LEFT;
            break;
            case 38://up
            if(this.direction!==Phaser.Math.Vector2.DOWN || this.direction!==Phaser.Math.Vector2.LEFT  || this.direction!==Phaser.Math.Vector2.RIGHT)
              this.direction=Phaser.Math.Vector2.UP;
            break;
            case 39://right
            if(this.direction!==Phaser.Math.Vector2.LEFT || this.direction!==Phaser.Math.Vector2.DOWN  || this.direction!==Phaser.Math.Vector2.UP)
               this.direction=Phaser.Math.Vector2.RIGHT;
            break;
            case 40://down
            if(this.direction!==Phaser.Math.Vector2.UP || this.direction!==Phaser.Math.Vector2.LEFT  || this.direction!==Phaser.Math.Vector2.RIGHT)
              this.direction=Phaser.Math.Vector2.DOWN;
            break;
            case 65: //a
              this.add = true;
            break;
            case 32: //space
              this.stop = true;
            break;
        }
    }

    update(time)
    {
      if (this.stop === true) return;
      if(time>=this.lastMoveTime +this.moveInterval)
      {
        this.lastMoveTime=time
        this.move();
      }
    }
    move()
    {
      //to eat apple
      let x=this.body[0].x +this.direction.x*this.titleSize
      let y=this.body[0].y +this.direction.y*this.titleSize

      if(this.apple.x===x && this.apple.y===y)
      {
        //eaten the apple
        this.body.push(this.scene.add.rectangle(0,0,this.titleSize,this.titleSize,0xffffff).setOrigin(0))
        this.positionApple()
      }

      //set the head and tail
      for(let i=this.body.length - 1;i>0;i--)
      {
        //tail
        this.body[i].x=this.body[i-1].x
        this.body[i].y=this.body[i-1].y
      }
        this.body[0].x += this.direction.x *16; 
        this.body[0].y += this.direction.y *16;
        console.log(this.scene.game.config.width,this.scene.game.config.height);

        //death by going offscreen
      if(this.body[0].x < 0 ||
        this.body[0].x >= this.scene.game.config.width ||
        this.body[0].y < 0 ||
        this.body[0].y >= this.scene.game.config.height )//left right top bottom
      {
        this.scene.scene.restart();
      }

      //death by eating own tail
      let tail=this.body.slice(1)
      if(tail.some(s=>s.x===this.body[0].x &&s.y===this.body[0].y))   //return true/false
      {
        this.scene.scene.restart()
      }
    }
}