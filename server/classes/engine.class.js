const {
    PLAYGROUND_HEIGHT,
    PLAYGROUND_WIDTH,
    MOVE_DOWN
} = require('../config')

const {
    canMoveTo,
    addBlockToGrid,
}
= require("../util")

class Engine {
    constructor(game, player) {
        if (!game) throw Error('incorrect game')
        this.game = game
        this.player = player
        this.field = this.createField()
        this.currentPiece = 0
        this.isFailed = false
        this.isWin = false
        this.rotation = 0
        this.score = 0
        this.piece = this.game.pieces[this.currentPiece]
        this.nextPiece = this.game.pieces[this.currentPiece + 1]
        this.points = [5, -2]
    }

    get info() {
        return {
            grid: this.field,
            shape: this.piece,
            rotation: this.rotation,
            x: this.points[0],
            y: this.points[1],
            nextShape: this.nextPiece,
            isRunning: true,
            score: 0,
            speed: 1000,
            gameOver: this.isFailed
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
                200
            )
        }
        return !!this.interval
    }

    movePiece (key) {
        let listener = this.game?.room?.listener
        console.log(new Date())
        if (!this.isFailed) {
            switch (key) {
                case MOVE_DOWN:
                    this.moveDown(listener)
                    break;
            
                default:
                    break;
            }
        }
        else {
            this.clean()
        }
    }

    moveDown (listener) {
        if (canMoveTo(this.piece, this.field, this.points[0], this.points[1] + 1, this.rotation)) {
            this.points[1] += 1
        }
        else {
            let ret = addBlockToGrid(this.piece, this.field, this.points[0], this.points[1], this.rotation)
            this.field = ret.grid
            this.isFailed = ret.gameOver
            this.points = [5, -2]
            this.incrementPiece()
        }
        if (typeof listener === 'function')
            listener("piece moved", this.player)
    }

    incrementPiece () {
        this.currentPiece = this.currentPiece % 49 + 1
        this.piece = this.game.pieces[this.currentPiece]
        this.nextPiece = this.game.pieces[this.currentPiece + 1]
    }

    clean() {
        if (this.interval) {
            clearInterval(this.interval)
            this.interval = null
            return true
        }
        return false
    }
}

module.exports = Engine;