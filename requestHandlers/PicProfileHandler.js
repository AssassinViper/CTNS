const path = require('path');
const Consts = require('../consts');

const PicProfileHandler = async (req, res)=>{

    let ans = PicProfileHandler_rc(req.query);

    if(ans == Consts.SUCCESS){

        let file_name = req.query.file_name;

        res.set('Content-Type', 'image/jpeg');

        let options = {
            root: path.join(__dirname, '/../store/profiles'),
            dotfiles: 'deny',
            headers: {
                cache: 'no-cache',
                'x-timestamp': Date.now(),
                'x-sent': true
            }
        }

        res.sendFile(`${file_name}.jpg`, options, (err)=>{

            if(err){

                console.log("PicProfileHandler->err1"+err);
            }
        });

    }else{

        res.json({result_code:ans});
    }
    
}

const PicProfileHandler_rc = (query)=>{

    if(query.file_name.length > 3){

        return Consts.SUCCESS;
    
    }else{

        return Consts.FILE_NOT_FOUND;
    }
}

module.exports = PicProfileHandler;