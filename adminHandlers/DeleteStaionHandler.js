const Consts = require('../consts');
const Station = require('../models/Station');

const DeleteStationHandler = async (req,res)=>{

    let id = req.body.id?req.body.id.toString():"";
    
    let st = await Station.deleteOne({_id:id});

    console.log(st); //TODO

    if(st){
    
        res.json({result_code:Consts.SUCCESS, data:st});
    
    }else{
    
        res.json({result_code:Consts.STATION_NOT_FOUND});
    }
}

module.exports = DeleteStationHandler;