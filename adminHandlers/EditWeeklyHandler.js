const Consts = require('../consts');
const Challenge = require('../models/Challenge');
const fs = require('fs');

const EditWeeklyHandler = async (req,res)=>{

    // req.file is the `file` file
    // req.body will hold the text fields, if there were any

    let ans = EditWeeklyHandler_rc(req.body);

    if(ans === Consts.SUCCESS){

        let {_id, title, info, answer, lat, lng} = req.body;       

        if(req.file){

            fs.readFile(req.file.path, (err, data)=>{

                if(err){

                    console.log("EditWeeklyHandler->err1->reading file failed!->"+err);

                }else{

                    fs.writeFile(__dirname+"/../store/stations/wk_"+_id+".jpg", data, (err)=>{

                        if(err){
        
                            console.log("EditWeeklyHandler->err2->writting file failed!->"+err);
                            
                            res.json({result_code:Consts.SERVER_ERROR});
        
                        }else{
        
                            fs.unlink(req.file.path, async (err)=>{
        
                                if(err){
        
                                    console.log("EditWeeklyHandler->err3->removing file failed!->"+err);
                                }

                                let weekly = await Challenge.find({_id});

                                weekly = weekly[0];
                                weekly.title = title;
                                weekly.answer = answer;
                                weekly.info = info;
                                weekly.location = {lat, lng};

                                let newWeekly = await weekly.save();

                                if(newWeekly === weekly){

                                    res.json({result_code:Consts.SUCCESS, data:newWeekly});
                                
                                }else{

                                    console.log("EditWeeklyHandler->err4->saving weekly in db failed!");
                                    
                                    res.json({result_code:Consts.SERVER_ERROR});
                                }
                            });
                        }
                    });
                }
            });

        }else{

            let weekly = await Challenge.find({_id});

            weekly = weekly[0];
            weekly.title = title;
            weekly.answer = answer;
            weekly.info = info;
            weekly.location = {lat, lng};

            let newWeekly = await weekly.save();

            if(newWeekly === weekly){

                res.json({result_code:Consts.SUCCESS, data:newWeekly});
            
            }else{

                console.log("EditWeeklyHandler->err4->saving weekly in db failed!");
                
                res.json({result_code:Consts.SERVER_ERROR});
            }
        }

    }else{

        res.json({result_code:ans});
    }
    
}

const EditWeeklyHandler_rc = (body)=>{

    return Consts.SUCCESS;
}

module.exports = EditWeeklyHandler;