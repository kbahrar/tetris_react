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
        this.canRestart = false
        this.winner = null
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
                this.engines[player.name] = new Engine(this, player)
                this.engines[player.name].start()
            }
            this.canRestart = false
            this.isStarted = true
            this.winner = null
        }
        return this.isStarted
    }

    restart() {
        if (this.isStarted)
            throw new Error('game already started')
        else {
            for (const player of Object.values(this.room.players)) {
                if (!this.engines[player.name])
                    this.engines[player.name] = new Engine(this, player)
                this.engines[player.name].restart()
                this.winner = null
            }
            this.canRestart = false
            this.isStarted = true
            this.winner = null
        }
        return this.isStarted
    }

    checkWinner() {
        let gameOvers = 0
        let numPlayers = 0
        let winPlayer = null
        for (const player of Object.values(this.room.players)) {
            numPlayers++
            let engine = this.engines[player.name]
            if (engine.info.gameOver)
                gameOvers++
            else
                winPlayer = player.name
        }
        if (numPlayers > 1 && numPlayers - 1 === gameOvers && winPlayer) {
            this.isStarted = false
            this.canRestart = true
            this.winner = winPlayer
            this.engines[winPlayer].win()
            return true
        }
        else if (numPlayers === gameOvers) {
            this.isStarted = false
            this.canRestart = true
            return true
        }
        return false
    }

    addLines (playerName, numLines) {
        for (const player of Object.values(this.room.players)) {
            if (player.name !== playerName) {
                this.engines[player.name].addConstLines(numLines)
            }
        }
    }

    quit() {
        for (const player of Object.values(this.room.players)) {
            if (this.engines[player.name]) {
                this.engines[player.name].clean()
                delete this.engines[player.name]
            }
        }
        return delete this.room.game
    }

    removePlayer(player) {
        if (player && this.engines[player.name]) {
            this.engines[player.name].clean()
            delete this.engines[player.name]
            return true
        }
        return false
    }
}

module.exports = Game;