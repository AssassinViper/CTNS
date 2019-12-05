const SocketPool = require("../utilities/SocketPool");
const Consts = require("../consts");
const User = require("../models/User");

const SocketMeetupClosedHandler = async(socket, data)=>{

    let pool = SocketPool.getPool();

    //TODO:: neet auth
    let id = data.token;
    let target_id = data.target;

    let user = await User.findOne({_id:id});
    if(user){

        user.meeting = false;
        await user.save();
    }

    let target = await User.findOne({_id:target_id});
    if(target){

        target.meeting = false;
        await target.save();
    }

    let targetSocket = pool.get(target_id);

    socket.emit("meetup_closed", {result_code:Consts.SUCCESS});
    targetSocket.emit("meetup_closed", {result_code:Consts.SUCCESS});
}

module.exports = SocketMeetupClosedHandler;