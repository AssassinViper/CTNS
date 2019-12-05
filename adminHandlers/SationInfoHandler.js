const Consts = require('../consts');
const Station = require('../models/Station');

const StationInfoHandler = async (req,res)=>{

    let id = req.body.id?req.body.id.toString():"";
    
    let st = await Station.find({_id:id});

    if(st[0]){
    
        res.json({result_code:Consts.SUCCESS, data:st[0]});
    
    }else{
    
        res.json({result_code:Consts.STATION_NOT_FOUND});
    }
}

module.exports = StationInfoHandler;