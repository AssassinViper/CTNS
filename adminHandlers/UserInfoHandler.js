const Consts = require('../consts');

const User = require('../models/User');

const UserInfoHandler = async (req,res)=>{

    let phone_number = req.body.phone_number?req.body.phone_number.toString():"";

    let user = await User.findOne({phone_number});

    if(user){
    
        res.json({result_code:Consts.SUCCESS, data:user});
    
    }else{
    
        res.json({result_code:Consts.USER_NOT_EXISTS});
    }
}

module.exports = UserInfoHandler;