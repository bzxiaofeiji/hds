//Base

class Base {
    
    constructor(config){

        this.config = {
            origin:'178',
            uploadBoxId:'uploadbox',
            showContact:false,
            container:'container',
            pageWrap:'page-wrap',
            listSize:8,
            nowPage:1,
            totalPage:1,
            // default fun
            error(msg){
                alert(msg)
            },
            willSubmit(db){
  
            },
            willRender(){

            },
            didRender(){

            },
            success(){

            }
        };

        for(var key in config){
            this.config[key] = config[key];
        }

        if(!this.config.aid) throw Error('aid为必传参数');
        if(!this.config.cid) throw Error('cid为必传参数');

        this.config.aid = config.aid;
        this.config.cid = config.cid;
    }

    getId(id){
        return document.getElementById(id);
    }

    getClass(className,p){
        var p = p || document;

        return p.getElementsByClassName(className);
    }

    addEvent(element,eventType,fn){
        element.addEventListener(eventType,fn);
    }

    setInnerText(e,text){
        if(e.innerText){
            e.innerText = text;
        }else{
            e.textContent = text;
        }
    }

}


module.exports = Base;