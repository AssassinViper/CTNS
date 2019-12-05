const Consts = require('../consts');
const Station = require('../models/Station');
const User = require("../models/User");

const maxDist = 0.0005;

const CheckInHandler = async (req, res)=>{

    let ans = CheckInHandler_rc(req.body);

    if(ans == Consts.SUCCESS){

        let lat = req.body.lat;
        let lng = req.body.lng;
        let token = req.body.token;
        let station_id = req.body.station_id;

        let user = await User.find({_id:token});
        user = user[0];

        let allreadyCheckedIn = user.checkins.indexOf(station_id);

        if(user){

            if(allreadyCheckedIn == -1){

                let station = await Station.find({_id:station_id});
                station = station[0];

                if(station){

                    console.log(typeof(station.location));
                    

                    let st_lat = parseFloat(station.location.lat);
                    let st_lng = parseFloat(station.location.lng);
        
                    let X = (lat - st_lat).toFixed(4);
                    let Y = (lng - st_lng).toFixed(4);
        
                    //console.log('x ->'+X);
                    //console.log('y ->'+Y);
        
                    let D = Math.pow((Math.pow(X,2) + Math.pow(Y,2)), 0.5).toFixed(4);
        
                    console.log(D);
        
                    if(D < maxDist){

                        user.xp += station.xp;
                        let saved = await user.save();
        
                        if(saved === user){

                            res.json({result_code:Consts.SUCCESS});

                            station.checkins.push(token);
                            let saved_st = await station.save();

                            if(saved_st !== station){

                                console.log("CheckInHandler->err1-> couldnt save station->"+station_id);
                            }
                        
                        }else{

                            console.log("CheckInHandler->err2-> couldnt save user->"+token);

                            res.json({result_code:Consts.SERVER_ERROR});
                        }
        
                    }else{
        
                        res.json({result_code:Consts.CHECK_IN_FAILED});
                    }

                }else{

                    res.json({result_code:Consts.STATION_NOT_FOUND});
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

const CheckInHandler_rc = (body)=>{

    body.lat = body.lat?Number(body.lat):0;
    body.lng = body.lng?Number(body.lng):0;
    body.token = body.token?body.token.toString():"";
    body.station_id = body.station_id?body.station_id.toString():"";

    if(!body.lat || !body.lng){

        return Consts.INVALID_COORDINATE;
    }

    if(body.token.length < 20){

        return Consts.INVALID_TOKEN;
    }

    if(body.station_id.length < 20){

        return Consts.STATION_NOT_FOUND;
    }

    return Consts.SUCCESS;
}

module.exports = CheckInHandler;