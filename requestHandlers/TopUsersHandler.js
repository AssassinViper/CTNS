const User = require('../models/User');
const Consts = require('../consts');

const TopUsersHandler = async (req, res)=>{

    let data = await User.find({},{_id:false, phone_number:true, full_name:true, bio:true,
        profile_pic:true, xp:true},{limit:100, sort:{xp:-1}});

    res.json({result_code:Consts.SUCCESS, data});
}

module.exports = TopUsersHandler;