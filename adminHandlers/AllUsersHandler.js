const Consts = require('../consts');

const User = require('../models/User');

const AllUsersHandler = async (req,res)=>{

    let users = await User.find();

    if(users[0]){
    
        res.json({result_code:Consts.SUCCESS, data:users});
    
    }else{
    
        res.json({result_code:Consts.SERVER_ERROR});
    }
}

module.exports = AllUsersHandler;