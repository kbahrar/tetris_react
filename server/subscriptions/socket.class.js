const Player = require('../classes/player.class');
const Room = require('../classes/room.class')
const RoomSubscription = require('../subscriptions/room.class');
const GameSubscription = require('./game.class');

module.exports = class SocketSubscription {
    constructor(master, socket) {
        try {
            this.master = master
            this.io = master.io
            this.socket = socket
            this.player = new Player(this.socket.username)
            this.socket.emit('connected', this.player)
            this.sendMsgGame('Connected !', "success")
            this.handleEvents()
        } catch (error) {
            this.handleError(error)
        }
    }

    handleEvents() {
        this.socket.on("list room", this.listRoom.bind(this));
        this.socket.on("users", this.GetUsers.bind(this));
        this.socket.on("create room", this.CreateRoom.bind(this));
        this.socket.on("join room", this.JoinRoom.bind(this));
        this.socket.on('msg room', this.sendMessagesRoom.bind(this));
        this.socket.on('msg game', this.sendMsgGame.bind(this));
        this.socket.on('start game', this.startGame.bind(this));
        this.socket.on('move piece', this.MovePieces.bind(this));
        this.socket.on('exit room', this.exitRoom.bind(this));
        this.socket.on('disconnect', this.disconnect.bind(this));
        this.socket.on('get room', this.getRoom.bind(this));
        this.socket.on('restart game', this.restartGame.bind(this));
    }

    startGame() {
        try {
            if (GameSubscription.start.call(this, this.listener.bind(this))) {     
                const room = this.player.room
                this.io.to(room.name).emit('game started', GameSubscription.getInfo.call(this))
            }
        } catch (error) {
            this.handleError(error)
        }
    }

    restartGame() {
        try {
            if (GameSubscription.restart.call(this, this.listener.bind(this))) {     
                const room = this.player.room
                this.io.to(room.name).emit('game started', GameSubscription.getInfo.call(this))
            }
        } catch (error) {
            this.handleError(error)
        }
    }

    sendMsgGame (msg, type = "normal") {
        if (this.player) {
            const msgObj = {
                sender: this.player.name,
                msg,
                type
            }
            this.io.emit('msg game', msgObj)
        }
        else {
            this.handleError(new Error('invalid player'))
        }
    }

    sendMessagesRoom(msg, type = "normal") {
        if (this.player && this.player.room) {
            const msgObj = {
                sender: this.player.name,
                msg,
                type
            }
            this.player.room.messages.push(msgObj)
            this.io.to(this.player.room.name).emit('msg room', msgObj);
        }
        else {
            this.handleError(new Error('invalid player or room'))
        }
    }

    listRoom() {
        let rooms = Room.getRoomsNames();
        this.io.emit("list room", rooms);
    }

    GetUsers() {
        var users = Player.getPlayersNames();
        this.io.emit("users", users);
    }

    CreateRoom (name) {
        try {
            const room = RoomSubscription.create.call(this, name);
            if (room) {
                this.socket.join(room.name);
                this.socket.emit('room joined', room)
                this.sendMessagesRoom('Created the Room !', 'success')
            }
        }
        catch (error) {
            this.handleError(error);
        }
    }

    JoinRoom (name) {
        try {
            const room = RoomSubscription.join.call(this, name);
            if (room) {
                this.socket.join(room.name);
                this.io.to(room.name).emit('room joined', room)
                this.sendMessagesRoom('Joined the Room !', 'success')
            }
        }
        catch (error) {
            this.handleError(error);
        }
    }

    getRoom () {
        const room = RoomSubscription.getInfo.call(this);
        if (room)
            this.io.to(room.name).emit('room joined', room)
    }

    MovePieces (key) {
        try {
            GameSubscription.move_piece.call(this, key)
        }
        catch (error) {
            this.handleError(error);
        }
    }

    exitRoom() {
        try {
            if (this.player && this.player.room) {
                const room = this.player.room
                const name = this.player.name
                this.sendMessagesRoom('Exited the Room !', 'failed')
                if (RoomSubscription.exit.call(this)) {
                    this.socket.leave(room.name)
                    this.socket.emit('room exited')
                    this.io.to(room.name).emit('player exited')
                }
            }
        } catch (error) {
            this.handleError(error)
        }
    }

    disconnect() {
        try {
            if (this.player) {
                this.sendMessagesRoom('Exited the Room !', 'failed')
                const room = this.player.room
                const name = this.player.name
                this.player.disconnect()
                if (room) {
                    this.io.to(room.name).emit('player exited')
                }
                this.master.removeSocket(name)
            }
        } catch (error) {
            this.handleError(error)
        }
    }

    listener(event, player) {
        try {
            if (player && player.room) {
                const room = player.room
                const info = GameSubscription.getInfo.call({ player })
                if (event == 'game over') {
                    this.sendMessagesRoom('game over !', 'failed')
                }
                else if (info)
                    this.io.to(room.name).emit(event, info, player.name)
            }
        } catch (error) {
            this.handleError(error)
        }
    }

    handleError(error) {
        this.socket.emit('error', error.message);
    }
}