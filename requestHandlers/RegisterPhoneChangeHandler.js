const Const = require('../consts');
const User = require('../models/User');

const RegisterPhoneChangeHandler = async (req, res)=>{

    let ans = RegisterPhoneChangeHandler_rc(req.body);

    if(ans == Const.SUCCESS){

        let phone_number_dcr = req.body.phone_number;

        let user = await User.findOne({phone_number_dcr});

        if(user){

            if(user.xp == 0 && user.full_name == ""){

                await User.deleteOne({phone_number_dcr});

                res.json({result_code:Const.SUCCESS});

            }else{

                res.json({result_code:Const.SUCCESS});
            }

        }else{

            res.json({result_code:Const.INVALID_PHONE_NUMBER});
        }

    }else{

        res.json({result_code:ans});
    }
}

const RegisterPhoneChangeHandler_rc = (body)=>{

    body.phone_number = body.phone_number?body.phone_number.toString():"";
    
    if(body.phone_number.length < 11){

        return Const.INVALID_PHONE_NUMBER;
    }

    return Const.SUCCESS;
}

module.exports=RegisterPhoneChangeHandler;