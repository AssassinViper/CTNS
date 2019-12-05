class SocketPool{

    constructor(){

        this._map = new Map();
    }

    //static pool;

    static init(){

        if(!SocketPool.pool){

            this.pool = new SocketPool();
        
        }else{

            console.log("SocketPool -> socketPool can be initials once");
        }
    }

    static getPool(){

        return SocketPool.pool;
    }

    get(id){

        return this._map.get(id);
    }

    set(id, data){

        this._map.set(id, data);
    }
}

module.exports = SocketPool;