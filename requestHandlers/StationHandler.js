const Consts = require('../consts');
const Station = require('../models/Station');

const StationHandler = async (req, res)=>{

    let ans = StationHandler_rc(req.query);

    if(ans == Consts.SUCCESS){

        let page = Number(req.query.page);
        let chunk = Number(req.query.chunk)?Number(req.query.chunk):10;
        let search = req.query.search;
        let type = req.query.type;

        let options = {skip:page*chunk, limit:chunk};
        let condition = {};

        if(type){
            condition.type = type;
        }

        if(search != "" ){ options = {} }

        let stations = await Station.find(condition,{},options);

        let res2 = {result_code:Consts.SUCCESS, list:stations};

        if(search != ""){
            
            res2.list = searchHandler(search, res2);
        }

        res.json(res2);

    }else{

        res.json({result_code:ans});
    }
}

const StationHandler_rc = (query)=>{

    query.page = query.page?query.page:"";
    query.chunk = query.chunk?query.chunk:"";
    query.search = query.search?query.search:"";

    if(Number(query.page)<0){

        return Consts.INVALID_PAGE;
    }

    if(Number(query.chunk)<0){

        return Consts.INVALID_CHUNK;
    }

    if(query.search.length > 800){

        return Consts.INVALID_PAGE;
    }

    return Consts.SUCCESS;
}

const searchHandler = (search, res2)=>{

    let list = res2.list;

    let newList = [];

    list.forEach(e => {
        
        if(e.title.search(search) != -1){

            newList.push(e);
        }
    });
        
    return newList;
}

module.exports = StationHandler;