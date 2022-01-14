var _players = []
class Player {
    constructor (name) {
        this.name = name
        _players[this.name] = this
    }
}

module.exports = Player;