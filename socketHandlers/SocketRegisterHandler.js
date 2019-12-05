const SocketPool = require("../utilities/SocketPool");
const Consts = require("../consts");
const User = require("../models/User");

const SocketRegisterHandler = async(socket, data)=>{

    // data -> token
    let id = data.token;

    let user = await User.findOne({_id:id});

    if(user){

        let pool = SocketPool.getPool();

        pool.set(id, socket);
    
        socket.emit("register", {result_code:Consts.SUCCESS});        

    }else{

        socket.emit("register", {result_code:Consts.INVALID_TOKEN});
    }

}

module.exports = SocketRegisterHandler;