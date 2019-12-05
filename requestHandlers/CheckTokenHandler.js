const User = require('../models/User');
const Consts = require('../consts');

const CheckTokenHandler = (req, res)=>{

    let token = req.body.token.toString();
    
    User.find({_id:token},(err, data)=>{

        if(err){

            console.log("CheckTokenHandler->error1->"+err);
                
            res.json({result_code:Consts.SERVER_ERROR});
        
        }else{

            if(data[0]){

                let user = data[0];
                
                if(!user.verified){
                    user.verified = true;
                    user.verification_code = "";
                    
                    user.save().then(()=>{

                        res.json({result_code:Consts.SUCCESS, data:data[0]});

                    }).catch(err=>{

                        console.log("CheckTokenHandler->error2->"+err);
                
                        res.json({result_code:Consts.SERVER_ERROR});
                    });
                
                }else{

                    res.json({result_code:Consts.SUCCESS, data:data[0]});
                }

            }else{

                res.json({result_code:Consts.INVALID_TOKEN});
            }
        }
    });
}

module.exports = CheckTokenHandler;