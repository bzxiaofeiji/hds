//错误码匹配模块
/**
 * 
 * @param {Number} code [错误码]
 * @return {String} [匹配后的文本]
 */
let  matchCode =code=>{
    let text;
    switch (code) {
        case 100000:
            text = "非法请求";
            break;
        case 100001:
            text = "活动尚未开始";
            break;
        case 100002:
            text = "活动已结束";
            break;
        case 200100:
            text = "没有抽奖机会";
            break;
        case 200101:
            text = "用户已中奖";
            break;
        case 200102:
            text = "抽奖过于频繁";
            break;
        case 200103:
            text = "还未抽过奖";
            break;
        case 200200:
            text = "QQ号必须填写";
            break;
        case 200201:
            text = "手机号必须填写";
            break;
        case 200202:
            text = "邮箱必须填写";
            break;
        case 200203:
            text = "姓名必须填写";
            break;
        case 200204:
            text = "地址必须填写";
            break;
        case 200205:
            text = "邮编必须填写";
            break;
        case 200206:
            text = "角色ID必须填写";
            break;
        case 200207:
            text = "服务器必须填写";
            break;
        case 200208:
            text = "必须提供联系方式";
            break;
        case 200300:
            text = "验证码错误";
            break;
        case 200400:
            text = "IP被禁止";
            break;
        case 200500:
            text = "未获得礼包码";
            break;
        case 200600:
            text = "重复参与问卷调查";
            break;
        case 200601:
            text = "尚未完成问卷调查";
            break;
        case 200602:
            text = "问卷调查提交不完整";
            break;
        case 200700:
            text = "排行榜数据来源未设置";
            break;
        case 200701:
            text = "排行榜数据为空";
            break;
        case 200702:
            text = "排行榜类型错误";
            break;
        case 200800:
            text = "禁止重复转发回调";
            break;
        case 200801:
            text = "尚未转发微博或微信分享";
            break;
        case 200802:
            text = "仅支持新浪微博、腾讯微博、微信朋友圈";
            break;
        case 200803:
            text = "每天只能转发或分享一次";
            break;
        case 200900:
            text = "禁止重复关注回调";
            break;
        case 200901:
            text = "尚未关注微博";
            break;
        case 200902:
            text = "仅支持关注新浪微博、腾讯微博";
            break;
        case 201000:
            text = "不能重复提交意见反馈";
            break;
        case 201001:
            text = "尚未提交意见反馈";
            break;
        case 201100:
            text = "不能重复提交祝福语";
            break;
        case 201101:
            text = "快来写下你的祝福语吧";
            break;
        case 201102:
            text = "您今天已经祝福太多啦，明天再来吧";
            break;
        case 201103:
            text = "祝福内容不能为空哦";
            break;
        case 201200:
            text = "积分不足";
            break;
        case 201201:
            text = "不允许变更积分";
            break;
        case 201202:
            text = "积分变更失败";
            break;
        case 201300:
            text = "已经领取奖品";
            break;
        case 201301:
            text = "尚未领取奖品";
            break;
        case 201302:
            text = "领取奖品太过频繁";
            break;
        case 201303:
            text = "领取数量达到上限";
            break;
        case 201304:
            text = "奖品已经领取完";
            break;
        case 201305:
            text = "不满足领取条件";
            break;
        case 201400:
            text = "回调次数已达上限";
            break;
        case 201401:
            text = "尚未完成回调";
            break;
        case 201402:
            text = "回调来源非法";
            break;
        case 201403:
            text = "每天回调次数已达上限";
            break;
        case 201404:
            text = "确认回调连接失效";
            break;
        case 201500:
            text = "您今天许了太多愿望啦，上帝好累哦";
            break;
        case 201501:
            text = "您今天还没许愿哦，上帝好无聊啊";
            break;
        case 201502:
            text = "您还没有留下您的联系方式哦";
            break;
        case 201503:
            text = "您已经留过您的联系方式啦";
            break;
        case 201504:
            text = "QQ号必须正确填写";
            break;
        case 201505:
            text = "手机号必须正确填写";
            break;
        case 201506:
            text = "地址必须正确填写";
            break;
        case 201507:
            text = "角色ID必须正确填写";
            break;
        case 201508:
            text = "角色名称必须正确填写";
            break;
        case 201509:
            text = "角色职业必须正确填写";
            break;
        case 201510:
            text = "服务器必须正确填写";
            break;
        case 201600:
            text = "任务已经做完啦，别太贪心哦";
            break;
        case 201601:
            text = "快来做任务啦，太懒会变胖哦";
            break;
        case 201700:
            text = "您今天已经投了很多票了，歇会吧";
            break;
        case 201701:
            text = "快来投上您宝贵的一票吧";
            break;
        case 201702:
            text = "不要这么专一哦，换个投票对象吧";
            break;
        case 201703:
            text = "手太快啦，慢点投吧";
            break;
        case 201704:
            text = "联系方式不能为空";
            break;
        case 201705:
            text = "支持理由不能为空";
            break;
        case 201801:
            text = "快来签到吧";
            break;
        case 201900:
            text = "今天已经没有投票机会啦";
            break;
        case 201901:
            text = "快来投票吧";
            break;
        case 201902:
            text = "不要这么专一哦，换个投票对象吧";
            break;
        case 201903:
            text = "手太快啦，慢点投吧";
            break;
        case 201904:
            text = "您已经没有参与上传的机会啦";
            break;
        case 201905:
            text = "您还没有上传您的靓照哦";
            break;
        case 201906:
            text = "请添加照片描述哦";
            break;
        case 201907:
            text = "参与失败，请重试";
            break;
        case 201908:
            text = "图片上传失败，限制100x100像素，5M";
            break;
        case 202507:
            text = "联系方式不能为空";
            break;
        case 202502:
            text = "投票机会已用完，请明天再来";
            break;
        case 202503:
            text = "投票太过频繁";
            break;
        case 400000://需要用户登录
            text = "需要用户登录";
            break;
        case 500000://服务器返回错误
            text = "服务器返回错误";
            break;
        default :
            text = '接口未知错误，错误码:'+code;
            break;
    }

    return text;
}

module.exports = matchCode;
