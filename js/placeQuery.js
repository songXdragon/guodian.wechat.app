/**
 * Created by waima006 on 2016/12/12.
 */
function placeQuery(){};
//获取城市名称
placeQuery.prototype.init=function() {
        placeQuery.prototype.allCityName();
};
//获取所有地区
placeQuery.prototype.allTown=function(){
    var cityNames=$("#city option:selected").text();
    placeQuery.prototype.allTownName(cityNames);
};

//获取城市名称
placeQuery.prototype.allCityName=function() {
    $.ajax({
        type: "GET",
        url: BizAPI + "allCityName/",
        success: function (allCityName) {
            for(var i=0;i<allCityName.length;i++){
                $("#city").append("<option value=" + i + ">" +allCityName[i].name + "</option>");
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
//获取所有地区
placeQuery.prototype.allTownName=function(cityNames) {
    if (cityNames == "请选择城市") {
        $("#town").empty();
        $("#town").append('<option value="-1">选择区域</option>');
    }else {
        $("#town").empty();
        $("#town").prepend('<option value="-1">选择区域</option>');
        $.ajax({
            type: "GET",
            url: BizAPI + "rootCode/" + cityNames,
            success: function (valueCodes) {
                $.ajax({
                    type: "GET",
                    url: BizAPI + "allTownName/" + valueCodes[0].value,
                    success: function (townNames) {

                        for (var i = 0; i < townNames.length; i++) {
                            $("#town").append("<option value=" + i + ">" + townNames[i].name + "</option>");
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
    }
};



placeQuery.prototype.checks=function(){
    //Step 1: 根据选择的城市或地区调用接口获取code值
        var cityNo=$("#city option:selected").val();
        var cityName=$("#city option:selected").text();
        var townNo=$("#town option:selected").val();
        var townName=$("#town option:selected").text();
    console.log(cityNo)
         console.log(cityName)
    console.log(townNo)
        console.log(townName)
        if(townNo==0 && cityNo!=-1){
            placeQuery.prototype.townCode(townName);
        }else{
            //placeQuery.prototype.cityCode(cityName);
            placeQuery.prototype.townCode(townName);
        }
};
//根据选择的城市调用接口获取code值
placeQuery.prototype.cityCode=function(cityName){
    console.log(cityName);
        $.ajax({
            type: "GET",
            url: BizAPI + "rootCode/" + cityName,
            success: function (valueCode) {
                if (valueCode && valueCode.length > 0) {
                    //根据城市或地区的code值再调用接口获取网店信息
                    $.ajax({
                        type: "GET",
                        url: BizAPI + "wd/wdInfoByPartCode/" + valueCode[0].value,
                        success: function (cityMsg){
                            if (cityMsg) {
                                bindCityList(cityMsg,$("#wdInfo"));
                            };
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


//根据选择的地区调用接口获取code值
placeQuery.prototype.townCode=function(townName){
    $.ajax({
        type:"GET",
        url: BizAPI +"initCode/"+townName,
        success: function(townValue) {
            if(townValue && townValue.length>0){
                //根据城市或地区的code值再调用接口获取网店信息
                $.ajax({
                    type:"GET",
                    url:BizAPI+"wd/wdInfoByCode/"+townValue[0].value,
                    success: function(townMsg) {
                        console.log(townMsg);
                        if(townMsg){
                            bindCityList(townMsg,$("#wdInfo"));
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
var bindCityList=function(res,element){
    console.log(res);
    element.html("");
    res.forEach(function(items) {
        element.append(
            '<div class=\"addressList\">' +
            '<h6>'+items.siteName+'<span>1.5km<\/span><\/h6>' +
            '<div class=\"detail line-bottom\">' +
            '<p>'+items.addr+'<\/p>' +
            '<p>营业时间：'+items.businessTime+'<\/p><p>电话：'+items.tel+'<\/p><\/div>' +
            '<div class=\"btns\">' +
            '<a href=\"javascript:;\"><img src=\"img/6-1.png\" alt=\"tu\">导航<\/a> ' +
            '<a href=\"javascript:;\"><img src=\"img/6-2.png\" alt=\"tu\">位置<\/a> ' +
            '<a href=\"javascript:;\"><img src=\"img/6-3.png\" alt=\"tu\">电话<\/a><\/div>' +
            '<\/div>'
        )
    });
} ;

