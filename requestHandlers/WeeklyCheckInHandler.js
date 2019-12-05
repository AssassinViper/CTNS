const Consts = require('../consts');
const Challenge = require('../models/Challenge');
const User = require("../models/User");

const maxDist = 0.0006;

const WeeklyCheckInHandler = async (req, res)=>{

    let ans = WeeklyCheckInHandler_rc(req.body);

    if(ans == Consts.SUCCESS){

        let lat = req.body.lat;
        let lng = req.body.lng;
        let token = req.body.token;
        let weekly_id = req.body.weekly;

        let user = await User.findOne({_id:token});

        let allreadyCheckedIn = user.checkins.indexOf(weekly_id);

        if(user){

            if(allreadyCheckedIn == -1){

                let weekly = await Challenge.findOne({_id:weekly_id, type:"weekly", online:true});

                if(weekly){

                    let st_lat = parseFloat(weekly.location.get("lat"));
                    let st_lng = parseFloat(weekly.location.get("lng"));
        
                    let X = (lat - st_lat).toFixed(4);
                    let Y = (lng - st_lng).toFixed(4);
        
                    //console.log('x ->'+X);
                    //console.log('y ->'+Y);
        
                    let D = Math.pow((Math.pow(X,2) + Math.pow(Y,2)), 0.5).toFixed(4);
        
                    //console.log(D);
        
                    if(D < maxDist){
        
                        user.xp += weekly.xp;
                        let saved = await user.save();
        
                        if(saved === user){

                            res.json({result_code:Consts.SUCCESS});

                            weekly.checkins.push(token);
                            let saved_we = await weekly.save();

                            if(saved_we !== weekly){

                                console.log("CheckInHandler->err1-> couldnt save weekly->"+weekly_id);
                            }
                        
                        }else{

                            console.log("CheckInHandler->err2-> couldnt save user->"+token);

                            res.json({result_code:Consts.SERVER_ERROR});
                        }
        
                    }else{
        
                        res.json({result_code:Consts.CHECK_IN_FAILED, dist:D});
                    }

                }else{

                    res.json({result_code:Consts.NO_WEEKLY_AVALIBLE});
                }
            
            }else{

                res.json({result_code:Consts.ALLREADY_CHECKED_IN});
            }

        }else{

            res.json({result_code:Consts.INVALID_TOKEN});
        }

    }else{

        res.json({result_code:ans});
    }
}

const WeeklyCheckInHandler_rc = (body)=>{

    body.lat = body.lat?Number(body.lat):0;
    body.lng = body.lng?Number(body.lng):0;
    body.token = body.token?body.token.toString():"";
    body.weekly = body.weekly?body.weekly.toString():"";

    if(!body.lat || !body.lng){

        return Consts.INVALID_COORDINATE;
    }

    if(body.token.length < 20){

        return Consts.INVALID_TOKEN;
    }

    if(body.weekly.length < 20){

        return Consts.INVALID_TOKEN;
    }

    return Consts.SUCCESS;
}

module.exports = WeeklyCheckInHandler;