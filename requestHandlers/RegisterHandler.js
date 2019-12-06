const User = require('../models/User');
const Consts = require('../consts');
const Kavenegar = require('kavenegar');
const env = require('../env.json');
const Cryptr = require('cryptr');
const https = require("https");

const cryptr = new Cryptr(env.ENCRYPT_KEY);

const api = Kavenegar.KavenegarApi({apikey:env.SMS_API});

const RegisterHandler = async (req, res)=>{

    let ans = RegisterHandler_rc(req.body);

    if(ans == Consts.SUCCESS){

        let phone_number = req.body.phone_number;

        User.find({phone_number_dcr:phone_number}, async (err, data)=>{

            if(err){
                
                console.log("RegisterHandler->err1->"+err);
                
                res.json({result_code:Consts.SERVER_ERROR});
            
            }else{

                await sendVerificationCode(phone_number, data[0], (ans2)=>{
                    
                    if(data[0] && ans2 == Consts.SUCCESS){
                        // if phone number exists
                        res.json({result_code:Consts.PHONE_NUMBER_EXISTS});

                    }else if(Consts.SUCCESS){

                        res.json({result_code:Consts.SUCCESS});
                    
                    }else{

                        res.json({result_code:ans2});
                    }
                });
            }
        });
    
    }else{

        res.json({result_code:ans});
    }
}

const RegisterHandler_rc = (body)=>{

    let temp = `0${Number(body.phone_number)}`;
    if(temp.length != 11){
        return Consts.INVALID_PHONE_NUMBER;
    }

    return Consts.SUCCESS;
}

const sendVerificationCode = async (phone_number, user ,cb)=>{

    let random = Math.floor(Math.random()*10000);
    if(random < 1500){random+=1500}
    if(random > 9500){random-=1500}
    random = random.toString();

    console.log(random.length+"->"+random);

    verification_code = random;

    let message = "کد تایید"+' "کتونی" '+":    "+"\n"+"\n"+verification_code;

    if(!env.DEVELOP_MODE){

        await kavenegarVerify(phone_number, verification_code);
        //kavenegarSender(phone_number, message);
    }

    if(user){

        //login
        user.verification_code = verification_code;
        user.verified = false;

        user.save().then(()=>{
            
            cb(Consts.SUCCESS);

        }).catch(err=>{

            console.log("RegisterHandler->err2->"+err);

            cb(Consts.SERVER_ERROR);
        })
    
    }else{
        // create new user
        
        let user = new User({phone_number:cryptr.encrypt(phone_number), phone_number_dcr:phone_number, verification_code});

        user.save().then(()=>{

            console.log("RegisterHandler->user created->"+JSON.stringify(user));

            cb(Consts.SUCCESS);

        }).catch(err=>{

            console.log("RegisterHandler->err3->"+err);

            cb(Consts.SERVER_ERROR);
        });
    }
}

const kavenegarSender = (phone_number, message)=>{

    api.Send({ message , sender: "1000596446" , receptor:phone_number});
}

const kavenegarVerify = async(phone_number, token)=>{

    let api_key = env.SMS_API;
    let template = env.SMS_TEMPLATE;

    let new_req = https.request({
        hostname: 'api.kavenegar.com',
        port: 443,
        path: `/v1/${api_key}/verify/lookup.json?receptor=${phone_number}&token=${token}&template=${template}`,
        method: 'GET',
        });

    new_req.end();
    
}

module.exports = RegisterHandler;