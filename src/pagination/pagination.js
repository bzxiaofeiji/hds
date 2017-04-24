//分页插件(不依赖于jquery)

//------------demo---------------
/*
    var myPage = new splitPage({
        totalPage:10,
        pageSize:5,
        wrap:'wrap'
    });

 */

//-----------API-----------------
//  totalPage       Number   要生成的页码总数
//  pageSize        Number   页码显示条数
//  wrap            String   页码父容器id
//  activeClass     String   当前页的class名
//  prevPageText    String   上一页的文本显示
//  nextPageText    String   下一页的文本显示
//  firstPageText   String   首页的文本显示
//  endPageText     String   尾页的文本显示
//  firstClick      Fun      首页点击后的回调
//  endClick        Fun      尾页点击后的回调
//  prevClick       Fun      上一页点击后的回调 会默认传入当前页码进来
//  nextClick       Fun      下一页点击后的回调 会默认传入当前页码进来
//  itemClick       Fun      页码点击后的回调 会默认传入当前页码进来

var splitPage = function(obj){
    if(!(obj instanceof Object && typeof obj == 'object')){
        throw 'param must be Object';
    }
    var pages = [],
        vpages = [],
        nowPage = 1,
        index = 1,
        totalPage = obj.totalPage || 1,
        pageSize = obj.pageSize || 5,
        wrap = obj.wrap || 'wrap',
        on = obj.activeClass || 'on',
        prevPageText = obj.prevPageText || '上一页',
        nextPageText = obj.nextPageText || '下一页',
        firstPageText = obj.firstPageText || '首页',
        endPageText = obj.endPageText || '尾页',
        firstClick = obj.firstClick || function(){},
        endClick = obj.endClick || function(){},
        prevClick = obj.prevClick || function(){},
        nextClick = obj.nextClick || function(){},
        itemClick = obj.itemClick || function(){},
        _this = this,
        e = document.getElementById(wrap);
        
    //初始化
    (function(){
        //生成虚拟page结构
        pages = _this.createArr(totalPage);
        //生成视图结构
        vpages = _this.createVArr(pages,nowPage,pageSize,totalPage).vpages;
        index = _this.createVArr(pages,nowPage,pageSize,totalPage).index;
        //渲染视图结构
        _this.render(e,vpages,index,on,prevPageText,nextPageText,firstPageText,endPageText);
        //绑定事件
        e.onclick = function(event){
            
            var classname = event.target.className;
            //上一页点击
            if(classname == 'page-prev'){
                if(nowPage == 1)
                    return;
                --nowPage;
                prevClick(nowPage);
            }
            //下一页点击
            if(classname == 'page-next'){
                if(nowPage == totalPage)
                    return;
                ++nowPage;
                nextClick(nowPage);
            }
            //首页点击
            if(classname == 'page-first'){
                if(nowPage == 1)
                    return;
                nowPage = 1;
                firstClick();
            }
            //尾页点击
            if(classname == 'page-end'){
                if(nowPage == totalPage)
                    return;
                nowPage = totalPage;
                endClick();
            }
            //页码点击
            if(classname == 'page-item'){

                var ind = +event.target.innerHTML;
                if(nowPage == ind){
                    return;
                }

                nowPage = ind;
                itemClick(ind);
            }

            var o = _this.createVArr(pages,nowPage,pageSize,totalPage);
            vpages = o.vpages;
            index = o.index;
            _this.render(e,vpages,index,on,prevPageText,nextPageText,firstPageText,endPageText);
        }

    })();

    // console.log(pages);

};

splitPage.prototype.createArr = function(len){
    var pages = [],
        i = 0;

    while(len--){
        pages.push(++i);
    }
    return pages;
};
splitPage.prototype.createVArr = function(pages,nowPage,pageSize,totalPage){
    var mid = Math.ceil(pageSize/2),
        end = nowPage + pageSize >totalPage ? totalPage: (nowPage + pageSize),
        vpages = [],
        index = 1,
        offset;

    if(nowPage <= mid){
        offset = 0;
        index = nowPage-1;
    }else if(totalPage - nowPage < mid){
        offset = totalPage - pageSize;
        index = pageSize - totalPage + nowPage -1;
    }else{
        offset = nowPage-mid;
        index = mid-1;
    }

    //移位
    vpages = pages.slice(offset, offset+pageSize);

    return{
        vpages:vpages,
        index:index
    };
};

splitPage.prototype.render = function(e,vpages,index,on,prevPageText,nextPageText,firstPageText,endPageText){
    // console.log(on)
    var _html = [];
    _html.push('<span class="page-first">'+firstPageText+'</span>');
    _html.push('<span class="page-prev">'+prevPageText+'</span>');
    for(var i=0,len = vpages.length;i<len;++i){
        var classname = i == index?'page-item '+on+'':'page-item';
        _html.push('<span class="'+classname+'">'+vpages[i]+'</span>');
    }
    _html.push('<span class="page-next">'+nextPageText+'</span>');
    _html.push('<span class="page-end">'+endPageText+'</span>');

    e.innerHTML = _html.join('');
}

module.exports = splitPage;