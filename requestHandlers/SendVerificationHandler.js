const Const = require('../consts');
const User = require('../models/User');
const env = require('../env.json');
const Kavenegar = require('kavenegar');

const api = Kavenegar.KavenegarApi({apikey: env.SMS_API});

const SendVerificationHandler = async (req, res)=>{

    let ans = SendVerificationHandler_rc(req.body);

    if(ans == Const.SUCCESS){

        let phone_number_dcr = req.body.phone_number;

        let user = await User.findOne({phone_number_dcr});

        if(user){

            let verification_code = user.verification_code;

            if(verification_code != ""){

                let message = "کد تایید"+' "کتونی" '+":    "+"\n"+"\n"+verification_code;

                if(!env.DEVELOP_MODE){

                    kavenegarSender(phone_number_dcr, message);
                }

                res.json({result_code:Const.SUCCESS});
            
            }else{

                res.json({result_code:Const.INVALID_VERIFICATION_CODE});
            }

        }else{

            res.json({result_code:Const.INVALID_PHONE_NUMBER});
        }

    }else{

        res.json({result_code:ans});
    }
}

const SendVerificationHandler_rc = (body)=>{

    body.phone_number = body.phone_number?body.phone_number.toString():"";
    
    if(body.phone_number.length < 11){

        return Const.INVALID_PHONE_NUMBER;
    }

    return Const.SUCCESS;
}

const kavenegarSender = (phone_number, message)=>{

    api.Send({ message , sender: "1000596446" , receptor:phone_number});
}

module.exports = SendVerificationHandler;