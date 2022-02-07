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
            this.sendMsgGame('Connected !')
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
        this.socket.on('move piece', this.MovePieces.bind(this))
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

    sendMsgGame (msg) {
        if (this.player) {
            const msgObj = {
                sender: this.player.name,
                msg: msg
            }
            this.io.emit('msg game', msgObj)
        }
        else {
            this.handleError(new Error('invalid player'))
        }
    }

    sendMessagesRoom(msg) {
        if (this.player && this.player.room) {
            const msgObj = {
                sender: this.player.name,
                msg: msg
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
                this.sendMessagesRoom('Created the Room !')
            }
        }
        catch (error) {
            this.handleError(error);
        }
    }

    JoinRoom (name) {
        try {
            const room = RoomSubscription.join.call(this, name);
            console.log(room)
            if (room) {
                this.socket.join(room.name);
                this.io.to(room.name).emit('room joined', room)
                this.sendMessagesRoom('Joined the Room !')
            }
        }
        catch (error) {
            this.handleError(error);
        }
    }

    MovePieces (key) {
        try {
            GameSubscription.move_piece.call(this, key)
        }
        catch (error) {
            this.handleError(error);
        }
    }

    listener(event, player) {
        try {
            if (player && player.room) {
                const room = player.room
                const info = GameSubscription.getInfo.call({ player })
                if (info)
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