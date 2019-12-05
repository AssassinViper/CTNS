const Consts = require('../consts');
const User = require('../models/User');

const EditProfileHandler = async (req, res)=>{

    let ans = EditProfileHandler_rc(req.body);

    let token = req.body.token;
    let full_name =req.body.full_name;
    let bio = req.body.bio;

    if(ans == Consts.SUCCESS){

        let user = await User.findOne({_id:token});
        
        if(user){

            user.full_name = full_name;
            user.bio = bio;

            let change = await user.save();

            if(change === user){

                res.json({result_code:Consts.SUCCESS});

            }else{

                console.log("EditProfileHandler->err1-> couldnt save user"+JSON.stringify(user));

                res.json({result_code:Consts.SERVER_ERROR});
            }

        }else{

            res.json({result_code:Consts.INVALID_TOKEN});
        }

    }else{

        res.json({result_code:ans});
    }
}

const EditProfileHandler_rc = (body)=>{

    body.full_name = body.full_name?body.full_name.toString():"";
    body.bio = body.bio?body.bio.toString():"";

    if(body.full_name.length < 4){

        return Consts.INVALID_NAME;
    }

    if(body.bio.length > 100){

        return Consts.INVALID_BIO;
    }
    
    return Consts.SUCCESS;
}

module.exports = EditProfileHandler;