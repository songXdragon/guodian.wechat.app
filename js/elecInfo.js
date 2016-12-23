/**
 * Created by waima006 on 2016/12/15.
 */
function elecInfo(){};

elecInfo.prototype.init=function(){
    var index=0;
    //获取服务信息的标题
    elecInfo.prototype.title(index);
};

elecInfo.prototype.title=function(index) {
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
        );
        var value=values[i];
        for(var j=0;j<value.length;j++){
            $("#"+i+"").append(
                '<div class="weui-cells">'+
                '<a class="weui-cell weui-cell_access" href="javascript:;"onclick="test(this)">'+
                '<p class="ellipsis">'+value[j]["typeName"]+'</p>'+
                '<div class="weui-cell__ft"></div>'+
                '</a>'+
                '</div>'
            );
        }
    };

};
