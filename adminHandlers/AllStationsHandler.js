const Consts = require('../consts');

const Station = require('../models/Station');

const AllStationsHandler = async (req,res)=>{

    let st = await Station.find({},{info:false});

    if(st[0]){
    
        res.json({result_code:Consts.SUCCESS, data:st});
    
    }else{
    
        res.json({result_code:Consts.SERVER_ERROR});
    }
}

module.exports = AllStationsHandler;