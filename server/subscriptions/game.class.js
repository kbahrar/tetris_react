module.exports = class GameSubscription {
    static getInfo() {
        if (this.player && this.player.room && this.player.room.game) {
            return this.player.room.game.engines[this.player.name].info
        }
        return null
    }
    static start(listener) {
        if (this.player && this.player.room) {
            const room = this.player.room
            return room.startGame(this.player, listener)
        } else
            throw new Error('you need to join room first')
    }
}