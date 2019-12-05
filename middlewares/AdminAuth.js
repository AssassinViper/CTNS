const Consts = require('../consts');
const User = require('../models/User');

const AdminAuth = async (req, res, next)=>{

    let token = req.body.token;

    if(token){

        let data = await User.find({_id:token});

        data = data[0];

        if(data && (data.type == "admin-1" || data.type == "admin-2" || data.type == "admin-3")){

            req.body.auth_user = data;
            next();
            
        }else{

            res.json({result_code:Consts.INVALID_TOKEN});
        }

    }else{
        
        res.json({result_code:Consts.INVALID_TOKEN});
    }
}

module.exports = AdminAuth;