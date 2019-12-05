const Consts = require('../consts');
const Station = require('../models/Station');

const StationInfoHandler = async (req, res)=>{

    let ans = StationInfoHandler_rc(req.query);

    if(ans == Consts.SUCCESS){

        let id = req.query.id;

        let station = await Station.find({_id:id});

        if(station[0]){

            res.json({result_code:Consts.SUCCESS, data:station[0]});

        }else{

            res.json({result_code:Consts.STATION_NOT_FOUND});
        }

    }else{

        res.json({result_code:ans});
    }
}

const StationInfoHandler_rc = (query)=>{

    query.id = query.id?query.id:"";

    if(query.id.length < 20){

        return Consts.STATION_NOT_FOUND;
    }

    return Consts.SUCCESS;
}

module.exports = StationInfoHandler;