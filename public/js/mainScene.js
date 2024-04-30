import Snake from "./Snake.js"

export default class mainScene extends Phaser.Scene{
    constructor()
    {
        super('MainScene')
    }
    //phase scene classes
    create()
    {
        this.snake=new Snake(this) //scene
    }
    update(time)
    {
        this.snake.update(time)
    }
}