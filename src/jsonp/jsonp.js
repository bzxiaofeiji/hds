//发起jsonp请求模块
let matchCode = require('./matchcode');

let jsonp = obj => {
    if(!obj.url) throw Error('url是必传参数');
    let scriptObj = document.createElement('script'),
        CallBackName = 'Xiaofeiji_Callback_' + (new Date()).valueOf() + '_' + Math.random().toString().replace('.', ''),
        db = obj.db || {};
    if (window.addEventListener) {
        scriptObj.addEventListener('load', function() {
            document.body.removeChild(scriptObj);
        });
    } else {
        scriptObj.attachEvent('onload', function() {
            document.body.removeChild(scriptObj);
        });
    }
    window[CallBackName] = obj.success || function(){};
    scriptObj.setAttribute('CallBackName', CallBackName);
    scriptObj.src = obj.url + (obj.url.indexOf('?') > 0 ? '&' : '?') + 'callback=' + CallBackName+'&'+formatedParam(obj.db);
    document.body.appendChild(scriptObj);
}

let formatedParam = db=>{
    var arr = [];
    for(var key in db){
        arr.push(key+'='+db[key]);
    }
    return arr.join('&');
}

/**
 * @param obj
 */
module.exports = obj=>{

    let timer = setTimeout(()=> {
            throw new Error('接口返回超时');
        },1000);
    jsonp({
        url:obj.url,
        db:obj.db,
        success:msg=>{
            clearTimeout(timer);

            let code = msg.code;
            if(code == 0){
                obj.success(msg);
            }else{
                let text = matchCode(code);
                obj.error?obj.error(text):alert(text);
            }
        }

    });
}
