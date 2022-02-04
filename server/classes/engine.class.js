const { PLAYGROUND_HEIGHT, PLAYGROUND_WIDTH } = require('../config')

class Engine {
    constructor(game, player) {
        if (!game) throw Error('incorrect game')
        this.game = game
        this.player = player
        this.field = this.createField()
        this.currentPiece = 0
        this.isFailed = false
        this.isWin = false
        this.score = 0
        this.piece = this.game.pieces[this.currentPiece]
        this.nextPiece = this.game.pieces[this.currentPiece + 1]
        this.points = [5, -2]
    }

    get info() {
        return {
            grid: this.field,
            shape: this.piece,
            rotation: 0,
            x: this.points[0],
            y: this.points[1],
            nextShape: this.nextPiece,
            isRunning: true,
            score: 0,
            speed: 1000,
            gameOver: false
        }
    }

    createField() {
        const field = Array.from({ length: PLAYGROUND_HEIGHT }, () => Array(PLAYGROUND_WIDTH).fill(0))
        return field
    }
}

module.exports = Engine;