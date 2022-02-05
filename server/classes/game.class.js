const {randomShape} = require('../util')
const Engine = require("./engine.class")

class Game {
    constructor(room) {
        if (!room) throw Error('incorrect room')
        this.room = room
        this.init()
    }

    init() {
        this.pieces = []
        this.engines = {}
        this.isStarted = false
        this.isPaused = false
        this.lastPieces = []
        this.generate()
    }

    generate () {
        for (let i = 0; i < 50; i++)
            this.pieces.push(randomShape())
    }

    start() {
        if (this.isStarted)
            throw new Error('game already started')
        else {
            for (const player of Object.values(this.room.players)) {
                console.log(player.name)
                this.engines[player.name] = new Engine(this, player)
                this.engines[player.name].start()
            }
            this.isStarted = true
        }
        return this.isStarted
    }
}

module.exports = Game;