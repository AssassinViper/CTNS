const Consts = require('../consts');
const Station = require('../models/Station');
const fs = require('fs');


const AddStationHandler = async (req,res)=>{
    
    let ans = AddStationHandler_rc(req.body);

    if(ans === Consts.SUCCESS){

        let station = await saveStation(req.body, res);

        console.log(req.files);

        let total_files = req.files.length;
        let done = 0;

        req.files.forEach((file, i) => {
            
            fs.readFile(file.path, (err, data)=>{

                if(err){

                    console.log("EditWeeklyHandler->err1->reading file failed!->"+err);

                }else{

                    fs.writeFile(__dirname+"/../store/stations/"+station._id+`-${req.body[file.originalname+file.size]}.jpg`, data, (err)=>{

                        if(err){
        
                            console.log("EditWeeklyHandler->err2->writting file failed!->"+err);
                            
                            res.json({result_code:Consts.SERVER_ERROR});
        
                        }else{
        
                            fs.unlink(file.path, async (err)=>{
        
                                if(err){
        
                                    console.log("EditWeeklyHandler->err3->removing file failed!->"+err);
                                }

                                done += 1;

                                successRes(res, station, total_files, done);
                            });
                        }
                    });
                }
            });
        });

        if(total_files === 0){
            
            res.json({result_code:Consts.FILE_NOT_FOUND});
        }

    }else{

        res.json({result_code:ans});
    }
}

const saveStation = async (body, res)=>{


    let {title, type, short_info, xp, info, is_special, lat, lng, writter_name, writter_id} = body;

    let station = {};

    station.title = title;
    station.short_info = short_info;
    station.xp = xp;
    station.type = type;
    station.info = info;
    station.is_special = is_special;
    station.location = {lat, lng};

    station.writter = {name:writter_name, _id:writter_id};

    station = new Station(station);
    

    let newStation = await station.save();

    if(newStation === station){

        return station;

    }else{

        console.log("EditStationHandler->saveStation->err1->station save in db failed!");
        
        res.json({result_code:Consts.SERVER_ERROR});
    }
}

const successRes = (res, station, total_files, done)=>{

    if(total_files === done){

        //res.set("connection", "close")

        res.json({result_code:Consts.SUCCESS, data:station});
    
    }
}

const AddStationHandler_rc = (body)=>{

    return Consts.SUCCESS;
}

module.exports = AddStationHandler;