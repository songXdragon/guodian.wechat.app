/**
 * Created by liuyib on 12/4/2016.
 */
function businessHall(){};

businessHall.prototype.init = function(){


    //Step 1: 根据微信OpenId获取所有绑定户号列表与信息

    //Step 2: 是否已经绑定户号,如未绑定则不执行后续操作

    //Step 3: 根据当前默认主户号获取用户信息绑定到上方列表中的元素
    businessHall.prototype.getHHInfo('0000000000');
    //Step 4: 根据当前默认主户号获取用户电量电费数据绑定到上方列表中的元素
};

//根据Weixin OpenId获取当前已绑定的户号列表与信息
businessHall.prototype.getHHbyWxId = function(wxId){


};

//根据户号获取当前用户信息
businessHall.prototype.getHHInfo = function(hhId){
    $.ajax({
        type: "GET",
        url: BizAPI+"hh/hhInfoHh/"+hhId+"/1",
        success: function(res) {
            var obj = eval("(" + res + ")");
            //user.text(obj.name);
        },
        error: function() {
            //index页面目前跳出dialog有问题
            alert('Call Failed!');
        //			var d=$().weuiDialog({
        //				title:"提示",
        //				content:"测试Dialog提示"
        //			});
        //			d.show();
        }
    });
};