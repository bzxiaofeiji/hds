#HDS
---
##blessing API
---
###(constructor)
*aid* 活动id(*必填*)  
*cid* 组件id(*必填*)  
*origin* 活动源(tgbus|ptbus|178) *default:*178  
*clearVal* 上传成功后清除输入框的内容(Boolean) *default:*true  
*container* 留言内容的渲染区域，需要传入容器的id *default:*container  
*pageWrap* 页码内容的渲染区域，需要传入容器的id *default:*page-wrap  
*showFirst* 是否需要显示首页(Boolean) *default:*false
*showLast* 是否需要显示尾页(Boolean) *default:*false
*skip* 是否需要页码跳转(Boolean) *default:*false
*onInit(config)* -fun- 初始化成功后执行 
这是分支dev