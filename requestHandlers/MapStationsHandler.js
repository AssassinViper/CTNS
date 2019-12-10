const Consts = require('../consts');
const Station = require('../models/Station');

const MapStationsHandler = async (req,res)=>{

    let ans = MapStationsHandler_rc(req.body);

    if(ans == Consts.SUCCESS){

        let stations = await Station.find({},{title:true, location:true, xp:true, pics:true, type:true})

        if(stations){

            res.json({result_code:Consts.SUCCESS, data:stations});
        
        }else{

            res.json({result_code:Consts.SERVER_ERROR});
        }

    }else{

        res.json({result_code:ans})
    }
}

const MapStationsHandler_rc = (body)=>{

    body.token = body.token?body.token.toString():"";
    body.city = body.city?body.city.toString():"";

    // if(body.token.length < 20){

    //     return Consts.INVALID_TOKEN;
    // }

    if(body.city.length < 0){

        return Consts.CITY_NOT_FOUND;
    }

    return Consts.SUCCESS;
}

module.exports = MapStationsHandler;