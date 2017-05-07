//分页模块

let defaultFun = ()=>{

};

class Pagination {
    constructor(config){
        //默认配置
        this.config = {
            index: 1,
            nowPage: 1,
            totalPage: 1,
            pageSize: 5,
            pageWrap: 'pagewrap',
            activeClass: 'on',
            prevPageText: '上一页',
            nextPageText: '下一页',
            firstPageText: '首页',
            lastPageText: '尾页',
            skip: false,
            showFirst: false,
            showLast: false,
            pageClick: defaultFun
        };

        for(var item in config){
            this.config[item] = config[item];
        }

        this.len  = this.config.totalPage < this.config.pageSize? this.config.totalPage : this.config.pageSize;
        this.mid = Math.ceil(this.config.pageSize/2);
        this.pageWrap = document.getElementById(this.config.pageWrap);
        this.init();
    }
    init() {
        this.render();
        this.bindEvent();
    }

    //生成第默认页码数组
    render() {
        var html = [];
        html.push(`<span class="page-prev">${this.config.prevPageText}</span>`);
        this.config.showFirst && html.push(`<span class="page-first">${this.config.firstPageText}</span>`);
        //前几页
        if(this.config.nowPage <= this.mid){
            this.createFirst(html);
        }
        //后几页
        else if(this.config.totalPage - this.config.nowPage < this.mid){
            this.createLast(html);
        }
        //中间页
        else{
            this.createMid(html);
        }

        if(this.config.nowPage != this.config.totalPage){
            html.push(`<span class="page-next">${this.config.nextPageText}</span>`);
        }

        //是否渲染跳页
        this.config.skip && this.createSkip(html);
        //追加外层容器
        html.unshift('<div id="hds-pagination">');
        html.push('<div>');
        this.pageWrap.innerHTML = html.join('');
        
    }

    //生成前几页的html
    createFirst(html){
        let i = 0;
        html.pop();
        if(this.config.nowPage == 1){
            html.pop();
        }
        while(++i<=this.len){
            let className = this.config.nowPage == i?this.config.activeClass:'';
            html.push(`<span class="page-item ${className}">${i}</span>`);
        }
        html.push(`<span class="page-empty">...</span>`);
        this.config.showLast && html.push(`<span class="page-last">${this.config.lastPageText}</span>`);
    }

    //生成后几页的html
    createLast(html){
        let i = this.config.totalPage -this.config.pageSize;

        html.push(`<span class="page-empty">...</span>`);
        while(++i <= this.config.totalPage){
            let className = this.config.nowPage == i?this.config.activeClass:'';
            html.push(`<span class="page-item ${className}">${i}</span>`);
        }

    }

    //生成中间页的html
    createMid(html){
        let i = this.config.nowPage -this.mid,
            count = this.config.pageSize+1;
        
        html.push(`<span class="page-empty">...</span>`);
        while(--count){
            ++i;
            let className = this.config.nowPage == i?this.config.activeClass:'';
            html.push(`<span class="page-item ${className}">${i}</span>`);
        }
        html.push(`<span class="page-empty">...</span>`);
        this.config.showLast && html.push(`<span class="page-last">${this.config.lastPageText}</span>`);
    }

    //生成页码跳转的html
    createSkip(html){
        html.push('<span class="hds-skip">跳转到');
        html.push('<input type="text" id="hds-skip-input">页');
        html.push('<input type="button" id="hds-skip-button" value="确定">');
        html.push('</span>');
    }

    bindEvent(){
        this.pageWrap.addEventListener('click',e=>{
            var target = e.target,
                className = target.className,
                id = target.id;
            
            if(id == this.config.pageWrap){
                return;
            }

            //页码点击
            if(className.indexOf('page-item') != -1){
                let page = +target.innerHTML;
                if(this.config.nowPage != page){
                    this.config.nowPage = page;
                    this.render();
                    this.config.pageClick(this.config.nowPage,target);
                }
                return;
            }

            //上一页点击
            if(className.indexOf('page-prev') != -1){
                
                if(this.config.nowPage !=1){
                    --this.config.nowPage;
                    this.render();
                    this.config.pageClick(this.config.nowPage,target);
                }
                return;
            }

            //下一页点击
            if(className.indexOf('page-next') != -1){
                if(this.config.nowPage != this.config.totalPage){
                    ++this.config.nowPage;
                    this.render();
                    this.config.pageClick(this.config.nowPage,target);
                }
                return;
            }
            //首页点击
            if(className.indexOf('page-first') != -1){
                if(this.config.nowPage !=1){
                    this.config.nowPage = 1;
                    this.render();
                    this.config.pageClick(this.config.nowPage,target);
                }
                return;
            }

            //尾页点击
            if(className.indexOf('page-last') != -1){
                if(this.config.nowPage != this.config.totalPage){
                    this.config.nowPage = this.config.totalPage;
                    this.render();
                    this.config.pageClick(this.config.nowPage,target);
                }
                return;
            }

            //跳转按钮点击
            if(id === 'hds-skip-button'){
                let page = +document.getElementById('hds-skip-input').value;
                page = page > this.config.totalPage?this.config.totalPage:page;
                page = page <= 0 ? 1:page;
                if(page != this.config.nowPage){
                    this.config.nowPage = page;
                    this.render();
                    this.config.pageClick(this.config.nowPage,target);
                }
            }
        });
        if(this.config.skip){
            this.pageWrap.addEventListener('keyup',e=>{
                var target = e.target,
                    id = target.id;

                if(id === 'hds-skip-input'){
                    target.value=target.value.replace(/\D/g,'');
                }
            });
        }
    }

}



module.exports = Pagination;












