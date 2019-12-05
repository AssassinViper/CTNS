const SocketPool = require("../utilities/SocketPool");
const Consts = require("../consts");
const User = require("../models/User");

const SocketMeetupRequestHandler = async(socket, data)=>{
    
    // data -> token , target
    let id = data.token;
    let target_id = data.target;

    let user = await User.findOne({_id:id});

    if(user){

        let socketPool = SocketPool.getPool();

        let target_socket = socketPool.get(target_id);

        if(target_socket){

            target_socket.emit("meetup_invite", {result_code: Consts.MEETUP_REQUEST, data:{ target:id }});
        
        }else{

            socket.emit("meetup_request", {result_code: Consts.TARGET_NOT_ONLINE});
        }

    }else{

        socket.emit("meetup_request", {result_code: Consts.INVALID_TOKEN});
    }
}

module.exports = SocketMeetupRequestHandler;