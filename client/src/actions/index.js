// GAME actions
export const RESTART    = "RESTART"
export const UPDATE     = "UPDATE"
export const UPDATEOP   = "UPDATEOP"
export const RESETOP    = "RESETOP"
export const CANRESTART = "CANRESTART"

export const restart = () => {
    return { type: RESTART }
}

export const updateData = (data) => {
    return {
        type: UPDATE,
        payload: data
    }
}

export const updateDataOp = (data) => {
    return {
        type: UPDATEOP,
        payload: data
    }
}

export const resetDataOp = () => {
    return {
        type: RESETOP
    }
}

export const canRestart = (player) => {
    return {
        type: CANRESTART,
        payload: player
    }
}

// AUTH actions
export const AUTH_LOGIN  = "AUTH_LOGIN"
export const LOGOUT = "LOGOUT"
export const ADDOP = "ADDOP"

export const authLogin = (username) => {
    return {
        type: AUTH_LOGIN,
        payload: username
    }
}

export const logout = () => {
    return {type: LOGOUT}
}

export const addOpponent = (opponent) => {
    return {
        type: ADDOP,
        payload: opponent
    }
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
export const MSGROOM = "MSGROOM"

export const joinRoom = (room) => {
    return {
        type: ROOM,
        payload: room
    }
}

export const setMsgRoom = (msg) => {
    return {
        type: MSGROOM,
        payload: msg
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

// users
export const USERS = "USERS"

export const setUsers = (users) => {
    return {
        type: USERS,
        payload: users
    }
}

// messages
export const MSGS = "MSGS"

export const setMsgs = (msg) => {
    return {
        type: MSGS,
        payload: msg
    }
}