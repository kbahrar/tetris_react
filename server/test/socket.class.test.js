const Socket = require('../classes/socket.class')
const socketClient = require('socket.io-client');

function connect(port, name) {
    return socketClient.connect(`http://localhost:${port}`, {
        transportOptions: {
            polling: {
                extraHeaders: {
                    Cookie: `name=${name}`,
                },
            },
        }
    })
}

describe("Socket class", () => {
    const data = {}
    beforeEach(() => {
        data.socket = new Socket()
        data.socket.run(null, 1337)
    })

    afterEach((done) => {
        data.socket.close(done)
    })

    it("Should connect with name hello", (done) => {
        const io = connect(1337, 'hello')
        io.on('connect', () => {
            io.disconnect()
            done()
        })
    });

    it("Should not connect", (done) => {
        let connected = false
        const io = socketClient.connect('http://localhost:1337')
        io.on('connect', () => {
            connected = true
        })
        setTimeout(() => {
            if (!connected) {
                io.disconnect()
                done()
            }
        }, 1000)
    });

    it("Should get online users", (done) => {
        const io = connect(1337, 'hello')
        io.on('users', (data) => {
            expect(data.length).toBe(1)
            expect(data[0]).toBe('hello')
            io.disconnect()
            done()
        })

        io.emit('users')
    });

    it("test create new room", (done) => {
        const io = connect(1337, 'kamal')

        io.on('room joined', (data) => {
            expect(data.name).toBe('room')
            expect(data.host).toBe('kamal')
        })

        io.on('error', (data) => {
            expect(data).toBe('Player already in a room')
            io.disconnect()
            done()
        })

        io.emit('create room', 'room')
        io.emit('create room')
    });

    it("test join room", (done) => {
        const io = connect(1337, 'kamal')

        io.on('room joined', (data) => {
            expect(data.name).toBe('room')
            expect(data.host).toBe('kamal')

            const io_2 = connect(1337, 'kbahrar')

            io_2.on('room joined', (data) => {
                expect(data.name).toBe('room')
                expect(data.host).toBe('kamal')
                expect(data.players[1]).toBe('kbahrar')
            })

            io_2.on('error', (data) => {
                expect(data).toBe('Player already in a room')
                io.disconnect()
                io_2.disconnect()
                done()
            })

            io_2.emit('join room', 'room')
            io_2.emit('join room')
        })


        io.emit('create room', 'room')
    });

    it("test list room", (done) => {
        const io = connect(1337, 'hello');

        io.on('list room', (data) => {
            expect(data.length).toBe(1)
            expect(data[0]).toBe('room')
            io.disconnect()
            done()
        })

        io.emit('create room', 'room')
        io.emit('list room')
    });

    it("test get room", (done) => {
        const io = connect(1337, 'kamal');

        io.on('room joined', (data) => {
            expect(data.name).toBe('room')
            expect(data.host).toBe('kamal')
            io.on('room joined', (data) => {
                expect(data.name).toBe('room')
                expect(data.host).toBe('kamal')
                io.disconnect()
                done()
            })
            io.emit('get room')
        })

        io.emit('create room', 'room')
    });

    it("test exit room", (done) => {
        const io = connect(1337, 'kamal');

        io.on('room joined', (data) => {
            expect(data.name).toBe('room')
            expect(data.host).toBe('kamal')
            io.on('room exited', () => {
                io.disconnect()
                done()
            })
            io.emit('exit room')
        })

        io.emit('create room', 'room')
    });

    it("test start game", (done) => {
        const io = connect(1337, 'kamal');

        io.on('room joined', (data) => {
            expect(data.name).toBe('room')
            expect(data.host).toBe('kamal')
            io.on('game started', () => {
                io.disconnect()
                done()
            })
            io.emit('start game')
        })

        io.emit('create room', 'room')
    });

    it("should not start game", (done) => {
        const io = connect(1337, 'kamal');

        io.on('error', (data) => {
            expect(data).toBe('you need to join room first')
            io.disconnect()
            done()
        })

        io.emit('start game')
    });

    it("test restart game", (done) => {
        const io = connect(1337, 'kamal');

        io.on('room joined', (data) => {
            expect(data.name).toBe('room')
            expect(data.host).toBe('kamal')
            io.on('game started', () => {
                io.disconnect()
                done()
            })
            io.emit('restart game')
        })

        io.emit('create room', 'room')
    });

    it("should not restart game", (done) => {
        const io = connect(1337, 'kamal');

        io.on('error', (data) => {
            expect(data).toBe('you need to join room first')
            io.disconnect()
            done()
        })

        io.emit('restart game')
    });

    it("test move piece", (done) => {
        const io = connect(1337, 'kamal');

        io.on('room joined', (data) => {
            expect(data.name).toBe('room')
            expect(data.host).toBe('kamal')
            io.on('game started', () => {
                io.on('piece moved', () => {
                    io.disconnect()
                    done()
                })
                io.emit('move piece', 32)
            })
            io.emit('start game')
        })

        io.emit('create room', 'room')
    });

    it("should not move piece", (done) => {
        const io = connect(1337, 'kamal');

        io.on('error', (data) => {
            expect(data).toBe('you need to join room first')
            io.disconnect()
            done()
        })

        io.emit('move piece')
    });
});