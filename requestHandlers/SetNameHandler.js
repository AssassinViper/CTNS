const User = require('../models/User');
const Consts = require('../consts');

const SetNameHandler = async (req, res)=>{

    let ans = SetNameHandler_rc(req.body);

    if(ans == Consts.SUCCESS){

        let full_name = req.body.full_name;
        let token = req.body.token;

        let data = await User.find({_id:token});

        if(data[0]){

            data[0].full_name = full_name;

            let save_res = await data[0].save();

            if(save_res === data[0]){

                res.json({result_code:Consts.SUCCESS});

            }else{

                console.log("SetNameHandler->err1-> user didnt saved");
                
                res.json({result_code:Consts.SERVER_ERROR});
            }

        }else{

            res.json({result_code:Consts.INVALID_TOKEN});
        }

    }else{

        res.json({result_code:ans});
    }
}

const SetNameHandler_rc = (body)=>{

    body.full_name = body.full_name.toString();

    if(body.full_name.length < 4){

        return Consts.INVALID_NAME;
    }

    return Consts.SUCCESS;
}

module.exports = SetNameHandler;