(this.webpackJsonpclient=this.webpackJsonpclient||[]).push([[0],{37:function(e,t,n){e.exports=n(52)},42:function(e,t,n){},43:function(e,t,n){},52:function(e,t,n){"use strict";n.r(t);var a=n(0),r=n.n(a),o=n(24),c=n.n(o),l=(n(42),n(43),n(1)),u=n(2),i=function(e){return{type:"UPDATE",payload:e}},s=function(e){return{type:"ADDOP",payload:e}},m=function(e){return{type:"SOCKET_CONNECT",payload:e}},d=function(e){return{type:"ROOM",payload:e}},v=function(e){return{type:"ERROR",payload:e}};var f=function(e){var t=Object(l.c)((function(e){return e.socket})),n=Object(l.c)((function(e){return e.auth})),r=Object(l.c)((function(e){var t;return null===(t=e.auth)||void 0===t?void 0:t.opponent})),o=Object(l.b)();return Object(a.useEffect)((function(){t&&(console.log("THERE"),t.on("connected",(function(e){o({type:"NoERROR"}),o({type:"AUTH_LOGIN",payload:e}),t.emit("list room")})),t.on("list room",(function(e){o(function(e){return{type:"ROOMS",payload:e}}(e))})),t.on("room joined",(function(e){o(d(e))})),t.on("error",(function(e){o(v(e))})),t.on("users",(function(e){o(function(e){return{type:"USERS",payload:e}}(e))})),t.on("msg room",(function(e){o(function(e){return{type:"MSGROOM",payload:e}}(e))})),t.on("msg game",(function(e){o(function(e){return{type:"MSGS",payload:e}}(e))})),t.on("game started",(function(e){o(i(e))})),t.on("player exited",(function(){t.emit("get room")})))}),[t]),Object(a.useEffect)((function(){return t&&(t.on("piece moved",(function(e,t){(null===n||void 0===n?void 0:n.name)===t?o(i(e)):r===t&&o(function(e){return{type:"UPDATEOP",payload:e}}(e))})),t.on("win game",(function(e,t){o(function(e){return{type:"CANRESTART",payload:e}}(t)),(null===n||void 0===n?void 0:n.name)===t&&o(i(e))}))),function(){t&&(t.off("piece moved"),t.off("win game"))}}),[t,n,r]),e.children};function E(e){var t="";return t=(null===e||void 0===e?void 0:e.shadow)?"grid-square-shadow color-".concat(e.color,"-shadow"):"".concat(e.classe," color-").concat(e.color),r.a.createElement("div",{className:t})}var p=function(){return{grid:Array.from({length:20},(function(){return Array(10).fill(0)})),shape:0,rotation:0,x:5,y:-2,nextShape:0,isRunning:!1,score:0,speed:1e3,gameOver:!1,yShadow:-2,isWin:!1,canRestart:!1,winner:null}},g=[[[[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0]]],[[[0,0,0,0],[1,1,1,1],[0,0,0,0],[0,0,0,0]],[[0,0,1,0],[0,0,1,0],[0,0,1,0],[0,0,1,0]],[[0,0,0,0],[0,0,0,0],[1,1,1,1],[0,0,0,0]],[[0,1,0,0],[0,1,0,0],[0,1,0,0],[0,1,0,0]]],[[[0,0,0,0],[0,1,0,0],[1,1,1,0],[0,0,0,0]],[[0,1,0,0],[0,1,1,0],[0,1,0,0],[0,0,0,0]],[[0,0,0,0],[1,1,1,0],[0,1,0,0],[0,0,0,0]],[[0,1,0,0],[1,1,0,0],[0,1,0,0],[0,0,0,0]]],[[[0,0,1,0],[1,1,1,0],[0,0,0,0],[0,0,0,0]],[[0,1,0,0],[0,1,0,0],[0,1,1,0],[0,0,0,0]],[[0,0,0,0],[1,1,1,0],[1,0,0,0],[0,0,0,0]],[[1,1,0,0],[0,1,0,0],[0,1,0,0],[0,0,0,0]]],[[[1,0,0,0],[1,1,1,0],[0,0,0,0],[0,0,0,0]],[[0,1,1,0],[0,1,0,0],[0,1,0,0],[0,0,0,0]],[[0,0,0,0],[1,1,1,0],[0,0,1,0],[0,0,0,0]],[[0,1,0,0],[0,1,0,0],[1,1,0,0],[0,0,0,0]]],[[[1,1,0,0],[0,1,1,0],[0,0,0,0],[0,0,0,0]],[[0,0,1,0],[0,1,1,0],[0,1,0,0],[0,0,0,0]],[[0,0,0,0],[1,1,0,0],[0,1,1,0],[0,0,0,0]],[[0,1,0,0],[1,1,0,0],[1,0,0,0],[0,0,0,0]]],[[[0,1,1,0],[1,1,0,0],[0,0,0,0],[0,0,0,0]],[[0,1,0,0],[0,1,1,0],[0,0,1,0],[0,0,0,0]],[[0,0,0,0],[0,1,1,0],[1,1,0,0],[0,0,0,0]],[[1,0,0,0],[1,1,0,0],[0,1,0,0],[0,0,0,0]]],[[[0,1,1,0],[0,1,1,0],[0,0,0,0],[0,0,0,0]]]];function b(e){var t=Object(l.c)((function(e){return e.game})),n=t.grid,a=t.shape,o=t.rotation,c=t.x,u=t.y,i=t.yShadow,s=g[a][o],m=a,d=null===n||void 0===n?void 0:n.map((function(e,t){return null===e||void 0===e?void 0:e.map((function(e,a){var o=a-c,l=t-u,d=t-i+1,v=!1,f=e;o>=0&&o<(null===s||void 0===s?void 0:s.length)&&l>=0&&l<(null===s||void 0===s?void 0:s.length)?f=0===s[l][o]?f:m:o>=0&&o<(null===s||void 0===s?void 0:s.length)&&d>=0&&d<(null===s||void 0===s?void 0:s.length)&&(f=0===s[d][o]?f:m,v=0!==s[d][o]);var p=t*n[0].length+a;return r.a.createElement(E,{key:p,classe:f>0?"grid-square-color":"grid-square",shadow:v,color:f})}))}));return r.a.createElement("div",{className:"grid-board"},d)}var O=n(7);function h(e){var t=Object(l.b)(),n=Object(l.c)((function(e){return e.auth})),a=Object(l.c)((function(e){var t;return null===(t=e.room)||void 0===t?void 0:t.players})),o=r.a.useState(null===n||void 0===n?void 0:n.opponent),c=Object(O.a)(o,2),u=c[0],i=c[1],m=Object(l.c)((function(e){return e.room})),d=null===a||void 0===a?void 0:a.map((function(e){if(e!==(null===n||void 0===n?void 0:n.name))return r.a.createElement("option",{key:e,value:e},e)}));return r.a.useEffect((function(){(null===n||void 0===n?void 0:n.opponent)||m&&(null===m||void 0===m?void 0:m.players.length)>1&&!(null===n||void 0===n?void 0:n.opponent)&&m.players.map((function(e){return e!==(null===n||void 0===n?void 0:n.name)&&t(s(e)),!0}))}),[n,m,t]),r.a.createElement("select",{role:"select",className:"select-dev",id:"select",value:u,onChange:function(e){document.querySelector("#select").blur(),u!==e.target.value&&(i(e.target.value),t({type:"RESETOP"}),t(s(e.target.value)))}},d)}function y(e){var t=Object(l.c)((function(e){return e.opGame})),n=t.grid,a=t.shape,o=t.rotation,c=t.x,u=t.y,i=t.gameOver,s=t.isWin,m=g[a][o],d=a,v=null===n||void 0===n?void 0:n.map((function(e,t){return null===e||void 0===e?void 0:e.map((function(e,a){var o=a-c,l=t-u,i=e;o>=0&&o<(null===m||void 0===m?void 0:m.length)&&l>=0&&l<(null===m||void 0===m?void 0:m.length)&&(i=0===m[l][o]?i:d);var s=t*n[0].length+a;return r.a.createElement(E,{key:s,classe:i>0?"grid-square-color-opo":"grid-square-opo",shadow:!1,color:i})}))}));return r.a.createElement("div",{className:"opponent-dev"},r.a.createElement("div",{className:"header-opponent"},"Opponent"),r.a.createElement(h,null),i||s?s?r.a.createElement("div",{className:"Winner"},"Winner !"):r.a.createElement("div",{className:"Game_Over"},"Game Over !"):r.a.createElement("div",{className:"grid-board-opponent"},v))}function N(e){var t,n=Object(l.c)((function(e){return e.game.nextShape})),a=Object(l.c)((function(e){return e.room})),o=g[n][0],c=n,u=o.map((function(e,t){return e.map((function(e,n){return r.a.createElement(E,{key:"".concat(t).concat(n),classe:e>0?"grid-square-color":"grid-square",color:e>0?c:e})}))}));return r.a.createElement("div",{className:"next-block"},u,(null===a||void 0===a||null===(t=a.players)||void 0===t?void 0:t.length)>1?r.a.createElement(y,null):r.a.createElement(r.a.Fragment,null))}function j(e){var t,n=Object(l.c)((function(e){return e.game})),a=Object(l.c)((function(e){return e.room})),o=Object(l.c)((function(e){return e.socket})),c=Object(l.c)((function(e){return e.auth})),u=r.a.useState(""),i=Object(O.a)(u,2),s=i[0],m=i[1],d=n.score,v=n.isRunning,f=n.gameOver,E=n.canRestart;return r.a.createElement("div",{className:"score-board"},r.a.createElement("div",{className:"info-dev"},"Score: ",d),r.a.createElement("div",{className:"info-dev"},"Level: 1"),(null===c||void 0===c?void 0:c.name)===(null===a||void 0===a?void 0:a.host)?r.a.createElement("div",{className:"controls"},v||E?E?r.a.createElement("button",{id:"restart-btn",className:"control-button",onClick:function(){document.querySelector("#restart-btn").blur(),E&&o.emit("restart game")}},"Restart"):r.a.createElement(r.a.Fragment,null):r.a.createElement("button",{id:"play-btn",className:"control-button",onClick:function(){document.querySelector("#play-btn").blur(),f||v||o.emit("start game")}},"Start")):r.a.createElement(r.a.Fragment,null),r.a.createElement("div",{className:"chat-room"},r.a.createElement("div",{className:"header-online"},"chat"),r.a.createElement("div",{className:"chat-group"},null===a||void 0===a||null===(t=a.messages)||void 0===t?void 0:t.map((function(e,t){return r.a.createElement("div",{className:"message-"+e.type,key:t},r.a.createElement("span",{className:"message-sender"},e.sender,":"),r.a.createElement("span",{className:"message"},e.msg))}))),r.a.createElement("div",{className:"form-room"},r.a.createElement("input",{type:"text",className:"input-room",placeholder:"type message ...",onChange:function(e){m(e.target.value)},value:s}),r.a.createElement("div",{className:"button-room",onClick:function(){return function(e){o.emit("msg room",e),m("")}(s)}},"SEND"))))}function R(e){var t={UP:38,DOWN:40,LEFT:37,RIGHT:39,ESPACE:32};Object.freeze(t);var n=Object(l.c)((function(e){return e.game.isRunning})),o=Object(l.c)((function(e){return e.game.gameOver})),c=Object(l.c)((function(e){return e.socket})),u=function(e){switch(e){case t.UP:return void c.emit("move piece",t.UP);case t.DOWN:return void c.emit("move piece",t.DOWN);case t.LEFT:return void c.emit("move piece",t.LEFT);case t.RIGHT:return void c.emit("move piece",t.RIGHT);case t.ESPACE:return void c.emit("move piece",t.ESPACE);default:return}};return Object(a.useEffect)((function(){var e=function(e){u(e.keyCode)};return window.addEventListener("keydown",e),function(){window.removeEventListener("keydown",e)}}),[n,t,c]),r.a.createElement("div",{className:"controls"},r.a.createElement("button",{disabled:!n||o,className:"control-button",onClick:function(){return u(t.LEFT)}},"Left"),r.a.createElement("button",{disabled:!n||o,className:"control-button",onClick:function(){return u(t.RIGHT)}},"Right"),r.a.createElement("button",{disabled:!n||o,className:"control-button",onClick:function(){return u(t.UP)}},"Rotate"),r.a.createElement("button",{disabled:!n||o,className:"control-button",onClick:function(){return u(t.DOWN)}},"Down"),r.a.createElement("button",{disabled:!n||o,className:"control-button",onClick:function(){return u(t.ESPACE)}},"Drop"))}function S(e){var t,n=Object(l.c)((function(e){return e.game.isRunning})),a=Object(l.c)((function(e){return e.game.gameOver})),o=Object(l.c)((function(e){return e.game.winner})),c=Object(l.c)((function(e){var t;return null===(t=e.auth)||void 0===t?void 0:t.name})),u="message-popup",i={title:"",messages:[]};n&&!a&&(u="message-popup-hidden"),n||(i.title="Waiting to Start !",i.messages=["You can start your game by click in start button","keyboard instrections :","DOWN to move down","UP to rotate piece","RIGHT to move right","LEFT to move left","SPACE to hard drop"]),a&&(i.title="Game Over",i.messages=["You can restart your game by click in restart button"]),o&&(i.messages=["You can restart your game by click in restart button"],i.title=o===c?"YOU ARE THE WINNER !":o+" WIN THIS GAME !");var s=null===i||void 0===i||null===(t=i.messages)||void 0===t?void 0:t.map((function(e,t){return r.a.createElement("p",{key:t},e)}));return r.a.createElement("div",{className:u},r.a.createElement("h1",null,i.title),s)}var k=n(28);function T(){var e=Object(l.b)(),t=Object(l.c)((function(e){return e.socket})),n=Object(l.c)((function(e){return e.room})),a=Object(u.g)(),o=a.room,c=a.username;return r.a.useEffect((function(){if(t)n||t.emit("join room",o);else{var a=Object(k.a)("https://tetris-1337.herokuapp.com/",{withCredentials:!0});document.cookie="name=".concat(c),e(m(a)),a&&a.emit("join room",o),(null===a||void 0===a?void 0:a.connected)||e(v("failed to connect"))}return function(){t&&(t.emit("exit room"),e(d(null)),e({type:"RESTART"}))}}),[]),r.a.createElement(r.a.Fragment,null,r.a.createElement(b,null),r.a.createElement(N,null),r.a.createElement(j,null),r.a.createElement(R,null),r.a.createElement(S,null))}function C(e){var t=Object(l.c)((function(e){return e.error})),n=Object(l.b)();return r.a.createElement(r.a.Fragment,null,t?r.a.createElement("div",{className:"alert-error"},r.a.createElement("h1",{className:"msg-err"},t),r.a.createElement("div",{className:"icon-close",onClick:function(e){n({type:"NoERROR"})}},"x")):null)}function w(e){var t=Object(a.useState)(""),n=Object(O.a)(t,2),o=n[0],c=n[1],u=Object(l.b)();return r.a.createElement("div",{className:"username-div"},r.a.createElement("label",{htmlFor:"username",className:"username-label"},"User Name :"),r.a.createElement("input",{className:"username-input",id:"username",type:"text",onChange:function(e){c(e.target.value)},placeholder:"enter your username"}),r.a.createElement("button",{type:"submit",className:"submit-button",onClick:function(e){if(o){var t=Object(k.a)("https://tetris-1337.herokuapp.com/",{withCredentials:!0});document.cookie="name=".concat(o),u(m(t)),t.connected||u(v("failed to connect"))}else e.preventDefault(),u(v("you should enter a username first"))}},"ENTER"),r.a.createElement(C,null))}function A(e){var t=Object(l.c)((function(e){return e.rooms})),n=Object(a.useState)(""),o=Object(O.a)(n,2),c=o[0],u=o[1],i=Object(l.c)((function(e){return e.socket}));r.a.useEffect((function(){i&&i.emit("list room")}),[i]);return r.a.createElement("div",{className:"rooms"},r.a.createElement("div",{className:"header-online"},"Rooms"),r.a.createElement("div",{className:"rooms-group"},null===t||void 0===t?void 0:t.map((function(e,t){return r.a.createElement("div",{key:t,className:"user-online"},e,r.a.createElement("div",{key:"button-"+t,className:"join-room",onClick:function(){return t=e,void(i&&i.emit("join room",t));var t}},"JOIN"))}))),r.a.createElement("div",{className:"form-room"},r.a.createElement("input",{type:"text",className:"input-room",placeholder:"room name",onChange:function(e){u(e.target.value)},value:c}),r.a.createElement("div",{className:"button-room",onClick:function(e){c?(u(""),i&&(i.emit("create room",c),i.emit("list room"))):e.preventDefault()}},"CREATE ROOM")),r.a.createElement(C,null))}function D(e){var t=Object(l.c)((function(e){return e.socket})),n=Object(l.c)((function(e){return e.users}));return Object(a.useEffect)((function(){t&&t.emit("users")}),[t]),r.a.createElement("div",{className:"users-online"},r.a.createElement("div",{className:"header-online"},n.length," users online"),null===n||void 0===n?void 0:n.map((function(e,t){return r.a.createElement("div",{key:t,className:"user-online"},e,r.a.createElement("div",{className:"dot-online"}))})))}function P(e){var t=Object(a.useState)(""),n=Object(O.a)(t,2),o=n[0],c=n[1],u=Object(l.c)((function(e){return e.socket})),i=Object(l.c)((function(e){return e.messages}));return r.a.createElement("div",{className:"chat"},r.a.createElement("div",{className:"header-online"},"chat"),r.a.createElement("div",{className:"chat-group"},null===i||void 0===i?void 0:i.map((function(e,t){return r.a.createElement("div",{className:"message-"+e.type,key:t},r.a.createElement("span",{className:"message-sender"},e.sender,":"),r.a.createElement("span",{className:"message"},e.msg))}))),r.a.createElement("div",{className:"form-room"},r.a.createElement("input",{type:"text",className:"input-room",placeholder:"type message ...",onChange:function(e){c(e.target.value)},value:o}),r.a.createElement("div",{className:"button-room",onClick:function(e){o?(u.emit("msg game",o),c("")):e.preventDefault()}},"SEND")))}function F(e){return r.a.createElement(r.a.Fragment,null,r.a.createElement(D,null),r.a.createElement(A,null),r.a.createElement(P,null))}function G(e){var t=Object(l.c)((function(e){return e.auth})),n=Object(l.c)((function(e){return e.room})),a=Object(l.c)((function(e){return e.socket})),o=Object(l.b)();return r.a.createElement("header",{className:"App-header"},n?r.a.createElement("button",{className:"control-button",onClick:function(){a&&(a.emit("exit room"),o(d(null)))}},"EXIT"):r.a.createElement(r.a.Fragment,null),r.a.createElement("h1",{className:"App-title"},"Tetris"),(null===t||void 0===t?void 0:t.name)?r.a.createElement("h5",null,null===t||void 0===t?void 0:t.name):r.a.createElement(r.a.Fragment,null))}var U=function(){var e=Object(l.c)((function(e){return e.auth})),t=Object(l.c)((function(e){return e.room})),n=Object(u.f)();return r.a.useEffect((function(){n(e?t?"".concat(t.name,"[").concat(e.name,"]"):"/rooms":"/")}),[e,t,n]),r.a.createElement("div",{className:"App"},r.a.createElement(f,null,r.a.createElement(G,null),r.a.createElement(u.c,null,r.a.createElement(u.a,{path:"/",element:r.a.createElement(w,null)}),r.a.createElement(u.a,{path:"rooms",element:r.a.createElement(F,null)}),r.a.createElement(u.a,{path:":room[:username]",element:r.a.createElement(T,null)}),r.a.createElement(u.a,{path:"*",element:r.a.createElement(w,null)}))))},_=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,54)).then((function(t){var n=t.getCLS,a=t.getFID,r=t.getFCP,o=t.getLCP,c=t.getTTFB;n(e),a(e),r(e),o(e),c(e)}))},I=n(30),L=n(25),x=n(18),M=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:p(),t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"RESTART":return p();case"UPDATE":return t.payload;case"CANRESTART":return Object(x.a)(Object(x.a)({},e),{},{winner:t.payload,canRestart:!0});default:return e}},W=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:null,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"AUTH_LOGIN":return t.payload;case"ADDOP":return Object(x.a)(Object(x.a)({},e),{},{opponent:t.payload});case"LOGOUT":return!1;default:return e}},q=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:null,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"SOCKET_CONNECT":return t.payload;default:return e}},H=n(29),X=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:null,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"ROOM":return t.payload;case"MSGROOM":return!!e&&Object(x.a)(Object(x.a)({},e),{},{messages:[].concat(Object(H.a)(e.messages),[t.payload])});case"EXIT_ROOM":return!1;default:return e}},Y=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[],t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"ROOMS":return t.payload;default:return e}},J=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:null,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"ERROR":return t.payload;case"NoERROR":return null;default:return e}},B=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[],t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"USERS":return t.payload;default:return e}},K=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[],t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"MSGS":return[].concat(Object(H.a)(e),[t.payload]);default:return e}},V=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:p(),t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"RESETOP":return p();case"UPDATEOP":return t.payload;default:return e}},z=Object(I.a)({game:M,opGame:V,auth:W,socket:q,room:X,rooms:Y,error:J,users:B,messages:K}),Q=Object(I.b)(z,window.__REDUX_DEVTOOLS_EXTENSION__&&window.__REDUX_DEVTOOLS_EXTENSION__());c.a.render(r.a.createElement(r.a.StrictMode,null,r.a.createElement(L.a,null,r.a.createElement(l.a,{store:Q},r.a.createElement(U,null)))),document.getElementById("root")),_()}},[[37,1,2]]]);
//# sourceMappingURL=main.384af996.chunk.js.map