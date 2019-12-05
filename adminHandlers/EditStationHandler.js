const Consts = require('../consts');
const Station = require('../models/Station');
const fs = require('fs');

const EditStationHandler = async (req,res)=>{

    let ans = EditStationHandler_rc(req.body);

    if(ans === Consts.SUCCESS){

        //let {_id, title, info, answer, lat, lng} = req.body;       

        console.log(req.files);

        let total_files = req.files.length;
        let done = 0;

        req.files.forEach((file, i) => {
            
            fs.readFile(file.path, (err, data)=>{

                if(err){

                    console.log("EditWeeklyHandler->err1->reading file failed!->"+err);

                }else{

                    fs.writeFile(__dirname+"/../store/stations/"+req.body._id+`-${req.body[file.originalname+file.size]}.jpg`, data, (err)=>{

                        if(err){
        
                            console.log("EditWeeklyHandler->err2->writting file failed!->"+err);
                            
                            res.json({result_code:Consts.SERVER_ERROR});
        
                        }else{
        
                            fs.unlink(file.path, async (err)=>{
        
                                if(err){
        
                                    console.log("EditWeeklyHandler->err3->removing file failed!->"+err);
                                }

                                done += 1;

                                await saveStation(req.body, res, total_files, done);
                            });
                        }
                    });
                }
            });
        });

        if(total_files === 0){
            
            await saveStation(req.body, res, total_files, done);
        }

    }else{

        res.json({result_code:ans});
    }
}

const saveStation = async (body, res, total_files, done)=>{

    if(total_files === done){

        let {_id, title, type, short_info, xp, info, is_special, lat, lng} = body;

        let station = await Station.find({_id});
        station = station[0];
        station.title = title;
        station.short_info = short_info;
        station.xp = xp;
        station.type = type;
        station.info = info;
        station.is_special = is_special;
        station.location = {lat, lng};

        let newStation = await station.save();

        if(newStation === station){

            res.json({result_code:Consts.SUCCESS, data:newStation});

        }else{

            console.log("EditStationHandler->saveStation->err1->station save in db failed!");
            
            res.json({result_code:Consts.SERVER_ERROR});
        }
    }
}

const EditStationHandler_rc = (body)=>{

    return Consts.SUCCESS;
}

module.exports = EditStationHandler;