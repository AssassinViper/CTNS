const SocketRegisterHandler = require("./SocketRegisterHandler");
const SocketMeetupRequestHandler = require("./SocketMeetupRequestHandler");
const SocketMeetupResponseHandler = require("./SocketMeetupResponseHandler");
const SocketMeetupClosedHandler = require("./SocketMeetupClosedHandler");

const SocketHandlers = {
    
    SocketRegisterHandler,
    SocketMeetupRequestHandler,
    SocketMeetupResponseHandler,
    SocketMeetupClosedHandler,

}

module.exports = SocketHandlers;