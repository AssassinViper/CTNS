const SocketPool = require("../utilities/SocketPool");
const Consts = require("../consts");
const User = require("../models/User");

const SocketMeetupResponseHandler = async(socket, data)=>{

    let pool = SocketPool.getPool();

    //TODO:: neet auth
    let id = data.token;
    let target_id = data.target;
    let answer = data.answer;

    let targetSocket = pool.get(target_id);

    if(answer === "accept"){

        let user = await User.findOne({_id:id});
        let target = await User.findOne({_id:target_id});

        if(user && target){

            user.meeting = target._id;
            target.meeting = user._id;

            await user.save();
            await target.save();

            targetSocket.emit("meetup_response", {result_code:Consts.SUCCESS});
        
            socket.emit("meetup_response", {result_code:Consts.SUCCESS});
        
        }else{

            // TODO:: tell user that some problem accorded
            targetSocket.emit("meetup_response", {result_code:Consts.MEETUP_FAILED});
            socket.emit("meetup_response", {result_code:Consts.MEETUP_FAILED});
        }

    }else{
        
        targetSocket.emit("meetup_response", {result_code:Consts.REQUEST_NOT_ACCEPTED});
    }
}

module.exports = SocketMeetupResponseHandler;