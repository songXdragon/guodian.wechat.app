/**
 * Created by waima006 on 2016/12/15.
 */
function guideMsg(){};

guideMsg.prototype.init=function(){
    var index=0;
    //获取服务信息的标题
    guideMsg.prototype.title(index);
};

guideMsg.prototype.title=function(index) {
    var titleName = new Array();
    $.ajax({
        type: "GET",
        url: BizAPI + "guideType/AllTypeName/" + index,
        success: function (titleMsg) {
            if (titleMsg) {
                bindAllNameMsg(titleMsg,$("ul"));
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

var bindAllNameMsg=function(AllMsg,element){
    var key=new Array();
    var values=new Array();
    for(var keys in AllMsg){
        key.push(keys);
        values.push(AllMsg[keys]);
    }
    console.log(key)
    console.log(values)

    element.html("");


    for(var i=0;i<key.length;i++){
        element.append(
        '<li id='+i+'>'+
        '<div class="weui-flex">'+
            '<p class="weui-flex__item">'+key[i]+'</p>'+
            '<img src="img/10-1.jpg" alt="tu">'+
            '</div>'+

            '</li>'
            //'<div class="weui-cells" id='+i+'>'+
            //'<div class="weui-cell bg-white toggleMore" onclick="test(this)">'+
            //'<div class="weui-cell__bd" >'+
            //'<p>'+key[i]+'<span><img src="img/dj.jpg" width="50" height="50" align="right"></span></p>'+
            //'</div>'+
            //'<div class="weui-cell__ft"><i class="arrow arrow-down"></i></div>'+
            //'</div>'+
            //'</div>'
        );
        var value=values[i];
        for(var j=0;j<value.length;j++){
        $("#"+i+"").append(
            '<div class="weui-cells">'+
            '<a class="weui-cell weui-cell_access" href="javascript:;">'+
            '<p class="ellipsis">'+value[j]["typeName"]+'</p>'+
            '<div class="weui-cell__ft"></div>'+
            '</a>'+
            '</div>'
            //'<table  id="msg">'+
            //'<tr onclick="tests(this)">'+
            //'<td  width="500" border="1" cellspacing="1" cellpadding="1">'+value[j]["typeName"]+'</td>'+
            //'</tr>'+
            //'<tr >'+
            //'<td width="500" border="1" cellspacing="1" cellpadding="1"></td>'+
            //'</tr>'+
            //'</table>'
        );
            console.log(values[i][j]['typeName'])
        }
        console.log(values[0][0]['typeName'])
    };

};
