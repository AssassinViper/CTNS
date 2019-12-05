const Consts = require('../consts');
const fs = require('fs');
const path = require('path');
const User = require('../models/User');

const ChangeProfilePicHandler = async (req, res)=>{

    let token = req.body.token?req.body.token.toString():"";
    let data = req.body.data;

    let user = await User.findOne({_id:token});

    if(user){

        fs.writeFile(__dirname+`/../store/profiles/${user.phone_number}.jpg`,data, 'base64', (err)=>{

            if(err){
                
                res.json({result_code:Consts.PIC_FAILED});
            
            }else{

                res.json({result_code:Consts.SUCCESS});
            }
        });

    }else{

        res.json({result_code:Consts.INVALID_TOKEN});
    }
}

module.exports = ChangeProfilePicHandler;