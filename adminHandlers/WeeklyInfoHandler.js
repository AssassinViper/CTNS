const Consts = require('../consts');
const Challenge = require('../models/Challenge');

const WeeklyInfoHandler = async (req, res)=>{

    let data = await Challenge.find({type:"weekly", online:true});

    if(data[0]){

        res.json({result_code:Consts.SUCCESS, data:data[0]});

    }else{

        res.json({result_code:Consts.NO_WEEKLY_AVALIBLE});
    }
}

module.exports = WeeklyInfoHandler;