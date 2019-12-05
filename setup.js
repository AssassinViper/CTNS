const mongoose = require('mongoose');
const fakeData = require('./fakeData');
const env = require('./env.json');

const setupDB = async ()=>{

    // use .env for connectiong to mongodb
    
    await mongoose.connect(env.DB, {useNewUrlParser: true});
    
}

const Setup = async (app, http, PORT)=>{

    await setupDB();

    if(env.FACK_DATA){
        
        await fakeData();
    }

    http.listen(PORT+1, ()=>{

        console.log("WebSocket online on port "+(PORT+1))
    });

    app.listen(PORT, ()=>{
    
        console.log("Server Online on port "+PORT);
    });
}

module.exports = Setup;