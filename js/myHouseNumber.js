/**
 * Created by waima006 on 2016/12/8.
 */
function myHouseNumber(){};
var consNoList=new Array("0904336580","0024106659");
//var consNoList=new Array();
myHouseNumber.prototype.init=function(){
    //Step1:根据(openID)微信ID获取当前用户信息
   // myHouseNumber.prototype.consNoId("1");
    //Step2:根据获取的用户信息中的hh，获取用户相关信息
    myHouseNumber.prototype.consNoMsg(consNoList);
}
//根据(openID)微信ID获取当前用户信息
//myHouseNumber.prototype.consNoId=function(id){
//    $.ajax({
//        type:"GET",
//        url:BizAPI+"hh/hhInfo/"+id,
//        success: function(hhConsNo){
//            if(hhConsNo){
//                aab(hhConsNo);
//               //consNoList.push(hhConsNo.hh);
//            }
//        },
//        error:function(err){
//            var d=$().weuiDialog({
//                title:"提示",
//                content:"获取用户信息失败"
//            });
//            d.show();
//        }
//    });
//    myHouseNumber.prototype.consNoMsg(consNoList);
//    console.log(consNoList);
//};
//var aab=function(hhNo){
//    alert("a");
//    for(var i=0;i<hhNo.length;i++){
//        consNoList[i]=hhNo[i].hh;
//    }
//
//};

//根据获取的用户信息中的hh，获取用户相关信息
myHouseNumber.prototype.consNoMsg=function(consNoList){
    console.log(consNoList);
    for(var i=0;i<consNoList.length;i++){
        $.ajax({
            type: "GET",
            url: BizAPI + "cons/" + consNoList[i],
            success: function (user) {
                if (user) {
                    console.log(user);
                    $.ajax({
                        type:"GET",
                        url:BizAPI+"hh/addHhInfo/"+user[0].consNo+"/"+user[0].consName+"/"+user[0].elecAddr,
                        success: function (indxet) {
                            if (indxet>0) {
                                console.log(indxet);
                            }
                        },
                        error: function (err) {
                            var d = $().weuiDialog({
                                title: "提示",
                                content: "获取用户信息失败"
                            });
                            d.show();
                        }
                    });
                    bindConsList(user,$("#consNumber"));
                }
            },
            error: function (err) {
                var d = $().weuiDialog({
                    title: "提示",
                    content: "获取用户信息失败"
                });
                d.show();
            }
        });
    }

};

var bindConsList=function(Msg,element){
    console.log(Msg);
    element.html("");
    Msg.forEach(function(items){
        element.before(
            '<div class="houseNumberList"><h6>'+items.consName+ '<span>'+items.consNo+'</span></h6>' +
            '<p>'+items.elecAddr+'</p>' +
            '<div class="weui-cells weui-cells_checkbox">' +
            '<label class="weui-cell weui-check__label" for="s2">' +
            '<div class="weui-cell__hd"><input type="radio" class="weui-check" name="user" id="s2">' +
            ' <i class="weui-icon-checked"></i> ' +
            '<span class="defaultUser">默认用户</span></div>' +
            '</label>' +
            '<a href="javascript:;" onclick="js_method(this)" class="weui-btn weui-btn_mini weui-btn_plain-primary">删除</a></div>'
        )
    });
};

//点击删除按钮后删除数据
function js_method(e){
        var a=confirm("确定要删除？");
        if(a) {
            console.log(a);
            var numbers = $(e.parentNode.parentNode).find("span").html();
            //console.log(numbers);
            js_method.prototype.consNoMsg(numbers);
        }else
        {
           // alert("aa");
            window.location.reload();
        }

};

js_method.prototype.consNoMsg=function(numbers){
        console.log(numbers);
        $.ajax({
            type:"DELETE",
            url:BizAPI+"hh/deleteHh/"+numbers,
            success: function(digit){
                //alert("aa");
                console.log(digit)
                if(digit>0){
                    window.location.reload();
                }else{
                    window.location.reload();
                }
            }
    });
};

