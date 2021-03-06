const {
    PLAYGROUND_HEIGHT,
    PLAYGROUND_WIDTH,
    MOVE_DOWN,
    MOVE_DEEP_DOWN,
    MOVE_LEFT,
    MOVE_RIGHT,
    MOVE_UP
} = require('../config')

const {
    canMoveTo,
    addBlockToGrid,
    nextRotation
}
= require("../util")

class Engine {
    constructor(game, player) {
        if (!game) throw Error('incorrect game')
        if (!player) throw Error('incorrect player')
        this.game = game
        this.player = player
        this.init()
    }

    get info() {
        return {
            grid: this.field,
            shape: this.piece,
            rotation: this.rotation,
            x: this.points[0],
            y: this.points[1],
            yShadow: this.yShadow,
            nextShape: this.nextPiece,
            isRunning: this.game.isStarted,
            score: this.score,
            gameOver: this.isFailed,
            isWin: this.isWin,
            canRestart: this.game.canRestart,
            winner: this.game.winner
        }
    }

    init() {
        this.field = this.createField()
        this.currentPiece = 0
        this.isFailed = false
        this.isWin = false
        this.rotation = 0
        this.score = 0
        this.piece = this.game.pieces[this.currentPiece]
        this.nextPiece = this.game.pieces[this.currentPiece + 1]
        this.points = [5, -2]
        this.speed = 1000
        this.linesFull = 0
        this.yShadow = -2
    }

    win() {
        let listener = this.game?.room?.listener
        this.isWin = true
        this.clean()
        if (typeof listener === 'function')
            listener("win game", this.player)
    }

    createField() {
        const field = Array.from({ length: PLAYGROUND_HEIGHT }, () => Array(PLAYGROUND_WIDTH).fill(0))
        return field
    }

    start() {
        if (!this.interval) {
            this.interval = setInterval(
                () => this.movePiece(MOVE_DOWN),
                this.speed
            )
        }
        return !!this.interval
    }

    restart() {
        this.init()
        this.start()
    }

    movePiece (key) {
        let listener = this.game?.room?.listener

        if (!this.isFailed && !this.isWin) {
            switch (key) {
                case MOVE_DOWN:
                    this.moveDown(listener)
                    break;
                
                case MOVE_LEFT:
                    this.moveLeft()
                    break;

                case MOVE_RIGHT:
                    this.moveRight()
                    break;

                case MOVE_UP:
                    this.rotate()
                    break;

                case MOVE_DEEP_DOWN:
                    this.moveDeepDown()
                    break;

                default:
                    break;
            }
            this.getShadow()
        }
        else {
            this.clean()
        }
        this.game.checkWinner()
        this.score += this.checkRows()
        if (typeof listener === 'function')
            listener("piece moved", this.player)
    }

    moveDown (listener) {
        if (canMoveTo(this.piece, this.field, this.points[0], this.points[1] + 1, this.rotation)) {
            this.points[1] += 1
        }
        else {
            let ret = addBlockToGrid(this.piece, this.field, this.points[0], this.points[1], this.rotation)
            this.field = ret.grid
            this.isFailed = ret.gameOver
            if (this.isFailed && typeof listener === 'function')
                listener("game over", this.player)
            this.points = [5, -2]
            this.yShadow = -2
            this.rotation = 0
            this.incrementPiece()
        }
    }

    moveDeepDown () {
        let y = this.points[1]
        while (canMoveTo(this.piece, this.field, this.points[0], y++, this.rotation)) {
            this.moveDown()
        }
    }

    moveLeft () {
        if (canMoveTo(this.piece, this.field, this.points[0] - 1, this.points[1], this.rotation)) {
            this.points[0] -= 1
        }
    }

    moveRight () {
        if (canMoveTo(this.piece, this.field, this.points[0] + 1, this.points[1], this.rotation)) {
            this.points[0] += 1
        }
    }

    rotate () {
        const newRotate = nextRotation(this.piece, this.rotation);
        if (canMoveTo(this.piece, this.field, this.points[0], this.points[1], newRotate))
            this.rotation = newRotate
    }

    incrementPiece () {
        this.currentPiece = (this.currentPiece + 1) % 49
        this.piece = this.game.pieces[this.currentPiece]
        this.nextPiece = this.game.pieces[this.currentPiece === 49 ? 0 : this.currentPiece + 1]
    }

    checkRows() {
        const points = [0, 40, 100, 300, 1200]
        let completedRows = 0
    
        for (let row = 0; row < this.field.length - this.linesFull; row++) {
            if (this.field[row]?.indexOf(0) === -1) {
                completedRows++
                this.field.splice(row, 1)
                this.field.unshift(Array(10).fill(0))
            }
        }
        
        if (completedRows > 0)
            this.game.addLines(this.player.name, completedRows)

        return points[completedRows]
    }

    getShadow() {
        let y = this.yShadow = this.points[1]
        while (canMoveTo(this.piece, this.field, this.points[0], y++, this.rotation)) {
            this.yShadow++
        }
        if (this.yShadow - this.points[1] < 5) {
            this.yShadow = -4
        }
    }

    addConstLines (numLines) {
        for (let i = 0; i < numLines; i++) {
            this.field.splice(0, 1)
            this.field[this.field.length] = new Array(PLAYGROUND_WIDTH).fill(9)
        }
        this.linesFull += numLines
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