const Consts = require('../consts');
const User = require("../models/User");

const LoginHandler = async (req,res)=>{

    let phone_number = req.body.phone_number;
    let password = req.body.password;

    if(phone_number && password){

        let data = await User.find({phone_number_dcr:phone_number, password});

        if(data[0] && (data[0].type == "admin-1" || data[0].type == "admin-2" || data[0].type == "admin-3")){

            res.json({result_code:Consts.SUCCESS, data:data[0]});

        }else{

            res.json({result_code:Consts.WRONG_PASSWORD});
        }

    }else{

        res.json({result_code:Consts.WRONG_PASSWORD});
    }
}

module.exports = LoginHandler;