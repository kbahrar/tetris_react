import React from "react";

import Room from "./ROOMS/Room";
import Users from "./ROOMS/Users"
import Chat from "./ROOMS/Chat";

export default function Rooms(props) {
    return (
        <>
            <Users />
            <Room />
            <Chat />
        </>
    )
}