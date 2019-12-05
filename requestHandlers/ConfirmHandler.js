const User = require('../models/User');
const Consts = require('../consts');

const ConfirmHandler = (req, res)=>{

    let ans = ConfirmHandler_rc(req.body);

    if(ans == Consts.SUCCESS){

        let verification_code = req.body.verification_code;
        let phone_number = req.body.phone_number;

        User.find({phone_number_dcr:phone_number},(err,data)=>{

            if(err){
                
                console.log("ConfirmHandler->error1->"+err);
                
                res.json({result_code:Consts.SERVER_ERROR});
            
            }else{

                if(data[0]){

                    if(data[0].verification_code == verification_code){

                        data[0].verified = true;
                        data[0].verification_code = "";
                        data[0].save().then(()=>{
                        
                            res.json({result_code:Consts.SUCCESS, data:data[0]});
                        
                        }).catch(err=>{

                            console.log("ConfirmHandler->error2->"+err);
                
                            res.json({result_code:Consts.SERVER_ERROR});

                        });
                        
                    }else{

                        res.json({result_code:Consts.INVALID_VERIFICATION_CODE});
                    }

                }else{

                    res.json({result_code:Consts.VERIFICATION_CODE_EXPIRED});
                }
            }
        });

    }else{

        res.json({result_code:ans});
    }
}

const ConfirmHandler_rc = (body)=>{

    let temp = `0${Number(body.phone_number)}`;
    if(temp.length != 11){
        return Consts.INVALID_PHONE_NUMBER;
    }

    if(body.verification_code.length != 4){

        return Consts.INVALID_VERIFICATION_CODE;
    }

    return Consts.SUCCESS;
}

module.exports = ConfirmHandler;