const path = require('path');
const Consts = require('../consts');

const PicStationHandler = async (req, res)=>{
    
    let ans = PicStationHandler_rc(req.query);

    if(ans == Consts.SUCCESS){

        let file_name = req.query.file_name;

        res.set('Content-Type', 'image/jpeg');

        let options = {
            root: path.join(__dirname, '/../store/stations'),
            dotfiles: 'deny',
            headers: {
                'x-timestamp': Date.now(),
                'x-sent': true
            }
        }

        res.sendFile(`${file_name}.jpg`, options, (err)=>{

            if(err){

                //console.log("StationPicHandler->err1"+err);

                res.end();
            }
        });

    }else{

        res.json({result_code:ans});
    }
    
}

const PicStationHandler_rc = (query)=>{

    if(query.file_name.length > 3){

        return Consts.SUCCESS;
    
    }else{

        return Consts.FILE_NOT_FOUND;
    }
}

module.exports = PicStationHandler;