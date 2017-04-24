require("babel-polyfill");
const Blessing = require('./blessing/blessing.js');

let hds = function(){
    this.blessing = config=>{
        return new Blessing(config);
    }

}

hds.getId = id=>{
    return document.getElementById(id)
}


window.hds = new hds();