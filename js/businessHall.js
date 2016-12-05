/**
 * Created by liuyib on 12/4/2016.
 */
function businessHall(){};

businessHall.prototype.init = function(){


    //Step 1: 根据微信OpenId获取所有绑定户号列表与信息
    businessHall.prototype.getHHbyWxId('1',$("#userNumber"));
    //Step 2: 是否已经绑定户号,如未绑定则不执行后续操作

    //Step 3: 根据当前默认主户号获取用户信息绑定到上方列表中的元素
    //businessHall.prototype.getHHInfo('9000107362');
    //Step 4: 根据当前默认主户号获取用户电量电费数据绑定到上方列表中的元素
};

//根据Weixin OpenId获取当前已绑定的户号列表与信息
businessHall.prototype.getHHbyWxId = function(wxId,list){
    $.ajax({
        type: "GET",
        url: BizAPI+"hh/hhInfo/"+wxId,
        success: function(res) {
            if(res && res.length>0){
                //alert(res.length);
                list.html("");
                list.append('<li><a class="clearfix" href="javascript:;"><div class="ellipsis">用户编码：<b class="houseCode">'+res[0].hh+'</b></div><div class="ellipsis">户名：<b class="houseName">'+res[0].hm+'</b></div></a></li>')
                res.forEach(function (item) {
                    list.append('<li><a class="clearfix" href="javascript:;"><div class="ellipsis">用户编码：<b class="houseCode">'+item.hh+'</b></div><div class="ellipsis">户名：<b class="houseName">'+item.hm+'</b></div></a></li>')
                });
                setSwtichForConsNo();
            }
        },
        error: function(err) {
            //alert(err);
            var d=$().weuiDialog({
                title:"提示",
                content:"获取用户信息失败"
            });
            d.show();
        }
    });

};

//根据户号获取当前用户信息
businessHall.prototype.getHHInfo = function(consNo){
    $.ajax({
        type: "GET",
        url: BizAPI+"hh/hhInfoHh/"+consNo+"/0",
        success: function(res) {
            if(res && res.length>0){
                alert(res.length);
            }
        },
        error: function(err) {
            //alert(err);
            var d=$().weuiDialog({
                title:"提示",
                content:"获取用户信息失败"
            });
            d.show();
        }
    });
};