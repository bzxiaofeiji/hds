//祝福墙改进版(多个联系方式)

const Base = require('../base/base.js'),
      jsonp  = require('../jsonp/jsonp.js'),
      Pagination = require('../pagination/pagination.js');

//拼接blessing组件的url地址
let getURL = (aid,cid,origin)=>{

    let baseUrl = 'http://hdsupport.'+origin+'.com/api/index?aid='+aid+'&cid='+cid+'&s=';

    return {
        urlPost:baseUrl+'blessing',
        urlGet:baseUrl+'get_blessing',
        urlGetList:baseUrl+'get_blessing_list'
    }
}

let render = db=>{
    throw new Error('render方法为必传参数')
}

//判断正则
let testReg = (val,reg,fun)=>{
    if(reg){
        var reg = new RegExp(reg);
        return reg.test(val);
    }else{
        return true;
    }
}


//检查数据
let checkVal = obj=>{
    var config = obj.config,
        db = obj.db;
    var suc = obj.suc || function(val){
        //如果前端需要显示联系方式
        if(config.showContact){
            db.disp_contact.push(val);
        }
        db.hide_contact.push(val);
    };

    if(obj.e.length !=0){
        var e = obj.e[0],
            reg = e.getAttribute('reg'),
            val = e.value,
            err = e.getAttribute('errorText');

        if(!testReg(val,reg)){
            obj.err(err);
            return false;
        }else{
            suc(val);
            return true;
        }

    }else{
        return true;
    }
};


class Blessing extends Base{
    constructor(config){
        super(config);

        this.config.url = getURL(this.config.aid,this.config.cid,this.config.origin);
        this.config.render = config.render || render;

        this.uploadBox = this.getId(this.config.uploadBoxId);
        this.username = this.getClass('hds-username',this.uploadBox);
        this.contact = this.getClass('hds-contact',this.uploadBox);
        this.content = this.getClass('hds-content',this.uploadBox);
        this.add = this.getClass('hds-add',this.uploadBox);

        this.container = this.getId(this.config.container);

        this._init();
    }

    _init(){
        this._getDB(()=>{
            //复制配置对象
            let config = JSON.parse(JSON.stringify(this.config));
            config.pageClick = page=>{
                this.page = page;
                this._createDOM();
                this.config.pageClick();
            };
            config.totalPage = this.totalPage;
            //调用分页模块
            this.pagination = new Pagination(config);

            this.config.onInit(this);
        });
        this._bindEvent();
    }

    _getDB(cb){
        jsonp({
            url:this.config.url.urlGet,
            success:db=>{
                this.page = 1;
                this.db = db.result;
                this.totalPage = Math.ceil(this.db.length/this.config.listSize);
                
                this._createDOM();
                cb&& cb();
            },
            error:this.config.error
        });
    }

    _createDOM(){
        var end = this.config.listSize * this.page,
            start = end - this.config.listSize,
            db = this.db.slice(start,end);

        this.config.willRender();
        var db = this.config.render(db);

        this.container.innerHTML = db;
        // this.setInnerText(this.container,db);
        this.config.didRender();
    }

    _bindEvent(){
        //绑定提交事件
        this.addEvent(this.uploadBox,'click',e=>{
            var className = e.target.className,
                db = {
                    disp_contact:[],
                    hide_contact : [],
                    content : ''
                };

            if(className == 'hds-submit'){

                //检查用户名
                var usernameResult = checkVal({
                    e:this.username,
                    config:this.config,
                    db:db,
                    suc:val=>{
                        db.disp_contact.push(val);
                        db.hide_contact.push(val);
                    },
                    err:errText=>{
                        this.config.error(errText || '用户名格式错误');
                    }
                });

                if(!usernameResult){
                    return;
                }

                var contactResult = checkVal({
                    e:this.contact,
                    config:this.config,
                    db:db,
                    err:errText=>{
                        this.config.error(errText || '联系方式格式错误');
                    }
                });

                if(!contactResult){
                    return;
                }

                var addResult = checkVal({
                    e:this.add,
                    config:this.config,
                    db:db,
                    err:errText=>{
                        this.config.error(errText || '额外参数格式错误');
                    }
                });

                if(!addResult){
                    return;
                }

                var contentResult = checkVal({
                    e:this.content,
                    config:this.config,
                    db:db,
                    suc:val=>{
                        db.content = val;
                    },
                    err:errText=>{
                        this.config.error(errText || '祝福内容格式错误');
                    }
                });

                if(!contentResult){
                    return;
                }

                //提交数据
                this.config.willSubmit(db);
                jsonp({
                    url:this.config.url.urlPost,
                    db:db,
                    success:db=>{
                        if(this.config.clearVal){
                            this.username[0] && (this.username[0].value = '');
                            this.contact[0] && (this.contact[0].value = '');
                            this.add[0] && (this.add[0].value = '');
                            this.content[0] && (this.content[0].value = '');
                        }
                        this.config.success(db);
                    }
                });
            }
        });
    }

    skip(page){
        page = +page || 1;
        if(this.page != page){
            this.page = page;
            this._createDOM();
            this.pagination.skip(page);
        }
    }

    reload(){
        this._getDB(()=>{
            this.pagination = new Pagination({
                totalPage:this.totalPage,
                pageSize:5,
                wrap:'pagewrap',
                showFirst: this.config.showFirst,
                showLast: this.config.showLast,
                skip: this.config.skip,
                pageClick:page=>{
                    this.page = page;
                    this._createDOM();
                }
            });

            this.config.onInit(this);
        });
    }
};



module.exports = Blessing;