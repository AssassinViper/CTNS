const Consts = require('../consts');
const User = require('../models/User');
const Challenge = require('../models/Challenge');

const WeeklyChallengHandler = async (req, res)=>{

    let ans = WeeklyChallengHandler_rc(req.body);

    if(ans == Consts.SUCCESS){

        let token = req.body.token;

        //let user = await User.findOne({_id:token});

        //if(user){
        if(true){

            let challenges = await Challenge.find({type:"weekly", online:true});

            if(challenges[0]){

                res.json({result_code:Consts.SUCCESS, data:challenges[0]});

            }else{

                res.json({result_code:Consts.NO_WEEKLY_AVALIBLE});
            }

        }else{

            res.json({result_code:Consts.INVALID_TOKEN});
        }

    }else{

        res.json({result_code:ans});
    }
}

const WeeklyChallengHandler_rc = (body)=>{

    body.token = body.token?body.token.toString():"";

    // if(body.token.length < 20){
        
    //     return Consts.INVALID_TOKEN;
    // }

    return Consts.SUCCESS;
}

module.exports = WeeklyChallengHandler;