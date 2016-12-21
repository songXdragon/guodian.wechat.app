/**
 * Created by waima006 on 2016/12/14.
 */
function powerOffNotice(){};

powerOffNotice.prototype.init=function(index){
    var consNo="4241202";//户号
    //查询停电区间;index:null:当天，0:近一天，1:近三天,2:近七天
    console.log(index)
    powerOffNotice.prototype.powerOffMsg(consNo,index);
    //获取所有城市和地区
    powerOffNotice.prototype.data();
};

//获取所有城市和地区
powerOffNotice.prototype.data=function() {
    $.ajax({
        type: "GET",
        url: BizAPI + "allCityData/",
        success: function (titleMsg) {
            if (titleMsg) {
                var key=new Array();
                var values=new Array();
                for(var keys in titleMsg){
                    key.push(keys);
                    values.push(titleMsg[keys]);
                }
                console.log(key)
                console.log(values)
                var citykey=new Array();
               for(var i=0;i<key.length;i++){
                   var str="value:"+key[i].value+"text:"+key[i].name;
                   citykey.push(str);
               }
                console.log(citykey)

                console.log(cityData)
            }
        },
        error: function (err) {
            //alert(err);
            var d = $().weuiDialog({
                title: "提示",
                content: "获取用户信息失败"
            });
            d.show();
        }
    });
};

//查询停电区间
powerOffNotice.prototype.powerOffMsg=function(consNo,index){
    console.log(consNo)
    console.log(index)
    if(index==0){
    $.ajax({
        type:"GET",
        url:BizAPI+"powersOff/selectByDays/"+consNo+"/"+index,
        success: function (OffMsg) {
            if(OffMsg) {
                bindPowerOffMsg(OffMsg, $("#day1"));
            }
        },
        error: function (err) {
            //alert(err);
            var d = $().weuiDialog({
                title: "提示",
                content: "获取用户信息失败"
            });
            d.show();
        }
    });
    }else if(index==1){
        $.ajax({
            type:"GET",
            url:BizAPI+"powersOff/selectByDays/"+consNo+"/"+index,
            success: function (OffMsg) {
                if(OffMsg) {
                    bindPowerOffMsg(OffMsg, $("#day3"));
                }
            },
            error: function (err) {
                //alert(err);
                var d = $().weuiDialog({
                    title: "提示",
                    content: "获取用户信息失败"
                });
                d.show();
            }
        });
    }else if(index==2){
        $.ajax({
            type:"GET",
            url:BizAPI+"powersOff/selectByDays/"+consNo+"/"+index,
            success: function (OffMsg) {
                if(OffMsg) {
                    bindPowerOffMsg(OffMsg, $("#day7"));
                }
            },
            error: function (err) {
                //alert(err);
                var d = $().weuiDialog({
                    title: "提示",
                    content: "获取用户信息失败"
                });
                d.show();
            }
        });
    }else{
    $.ajax({
        type:"GET",
        url:BizAPI+"powersOff/selectByDays/"+consNo+"/"+index,
        success: function (OffMsg) {
            if(OffMsg) {
                bindPowerOffMsg(OffMsg, $("#day1"));
            }
        },
        error: function (err) {
            //alert(err);
            var d = $().weuiDialog({
                title: "提示",
                content: "获取用户信息失败"
            });
            d.show();
        }
    });
};


};

    var bindPowerOffMsg=function(Msg,element){
    element.html("");
    Msg.forEach(function(items) {
        element.append(
        '<div class="powerOffItem">'+
        '<div class="weui-cells">'+
        '<div class="weui-cell bg-white"><p>'+items.scope+'</p></div>'+
        '<div class="weui-cell bg-white toggleMore" onclick="test(this)">'+
        '<div class="weui-cell__bd"><p class="content">停电时间：<span>'+
        items.startTime+ '至'+ items.stopDate+
        '</span></p></div>'+
        '<div class="weui-cell__ft"><i class="arrow arrow-up"></i></div></div>'+
        '<div class="weui-cell more"><p class="content">停电类型：<span>计划停电</span></p></div>'+
        '<div class="weui-cell more"><p class="content">停电范围：<span>'+items.scope+'</span></p> </div>'+
        '<div class="weui-cell more"><p class="content">停电线路:<span>'+items.poweroffArea+'</span></p></div>'+
        '</div>'+
        '</div>'
        );
    });
};