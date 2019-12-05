const Log = (req, res, next)=>{

    //TODO:: if env == develope
    console.log("Request => "+req.url+" -> "+JSON.stringify(req.body));

    next();
}

module.exports = Log;