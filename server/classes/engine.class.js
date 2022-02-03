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
    }

    createField() {
        const field = Array.from({ length: PLAYGROUND_WIDTH }, () => Array(PLAYGROUND_HEIGHT).fill(0))
        return field
    }
}

module.exports = Engine;