const Consts = require('../consts');
const User = require('../models/User');

const ViewProfileHandler = async (req, res)=>{

    let ans = ViewProfileHandler_rc(req.body);

    if(ans == Consts.SUCCESS){

        let token = req.body.token;
        let phone_number = req.body.phone_number;

        let user = await User.findOne({_id:token});

        if(user){

            let profile = await User.findOne({phone_number},{_id:false});

            if(profile){

                res.json({result_code:Consts.SUCCESS, data:profile});

            }else{

                res.json({result_code:Consts.PHONE_NUMBER_EXISTS});
            }

        }else{

            res.json({result_code:Consts.INVALID_TOKEN});
        }

    }else{

        res.json({result_code:ans});
    }
}

const ViewProfileHandler_rc = (body)=>{

    body.token = body.token?body.token.toString():"";
    body.phone_number = body.phone_number?body.phone_number.toString():"";

    if(body.token.length < 20){

        return Consts.INVALID_TOKEN
    }

    if(body.phone_number.length < 10){

        return Consts.PHONE_NUMBER_EXISTS
    }

    return Consts.SUCCESS;
}

module.exports = ViewProfileHandler;