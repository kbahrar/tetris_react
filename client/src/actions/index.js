// GAME actions
export const PAUSE      = "PAUSE"
export const RESUME     = "RESUME"
export const MOVE_LEFT  = "MOVE_LEFT"
export const MOVE_RIGHT = "MOVE_RIGHT"
export const ROTATE     = "ROTATE"
export const MOVE_DOWN  = "MOVE_DOWN"
export const DROP       = "DROP" 
export const RESTART    = "RESTART"

export const moveLeft = () => {
    return {type: MOVE_LEFT}
}

export const moveRight = () => {
    return {type: MOVE_RIGHT}
}

export const rotate = () => {
    return { type: ROTATE }
}

export const moveDown = () => {
    return { type: MOVE_DOWN }
}

export const pause = () => {
    return { type: PAUSE }
}

export const resume = () => {
    return { type: RESUME }
}

export const restart = () => {
    return { type: RESTART }
}

export const drop = () => {
    return { type: DROP }
}

// AUTH actions
export const AUTH_LOGIN  = "AUTH_LOGIN"
export const LOGOUT = "LOGOUT"

export const authLogin = (username) => {
    return {
        type: AUTH_LOGIN,
        payload: username
    }
}

export const logout = () => {
    return {type: LOGOUT}
}

//  sockets
export const SOCKET_CONNECT  = "SOCKET_CONNECT"

export const connectSocket = (socket) => {
    return {
        type: SOCKET_CONNECT,
        payload: socket
    }
}

// room
export const ROOM = "ROOM"
export const EXIT_ROOM = "EXIT_ROOM"

export const joinRoom = (room) => {
    return {
        type: ROOM,
        payload: room
    }
}

// rooms
export const ROOMS = "ROOMS"

export const setRooms = (rooms) => {
    return {
        type: ROOMS,
        payload: rooms
    }
}

// errors
export const ERROR = "ERROR"
export const NoERROR = "NoERROR"

export const setError = (error) => {
    return {
        type: ERROR,
        payload: error
    }
}

export const removeError = () => {
    return {type: NoERROR}
}