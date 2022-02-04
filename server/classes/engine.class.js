const { PLAYGROUND_HEIGHT, PLAYGROUND_WIDTH, MOVE_DOWN } = require('../config')

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

    start() {
        if (!this.interval) {
            this.interval = setInterval(
                () => this.movePiece(MOVE_DOWN),
                1000
            )
        }
        return !!this.interval
    }

    movePiece (key) {
        let listener = this.game?.room?.listener
        console.log(listener)
        switch (key) {
            case MOVE_DOWN:
                this.points[1] += 1
                if (listener)
                    listener("piece moved", this.player)
                break;
        
            default:
                break;
        }
    }
}

module.exports = Engine;