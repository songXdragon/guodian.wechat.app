/**
 * Created by waima006 on 2016/12/19.
 */
function myServer(){};

myServer.prototype.init=function(){
    var cityCode='荆州';
    var areaCode='天门市';
    //通过和地区编号获取信息
    myServer.prototype.server(cityCode,areaCode);
}
myServer.prototype.server=function(cityCode,areaCode){
    $.ajax({
        type:"GET",
        url:BizAPI + "elecZsqr/"+cityCode+"/"+areaCode,
        success: function (gridMsg) {
            if (gridMsg) {
                console.log(gridMsg);
                bindGridMsg(gridMsg,$("#grid"));
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
var bindGridMsg=function(Msg,element){
    element.empty();
    Msg.forEach(function(items) {
        element.append(
            '<div class="header">'+
            '<div class="portrait"></div>'+
            '<h6>'+items.name+'</h6>'+
            '</div>'+
            '<div class="serverItems">'+
            '<div class="serverItem line-top">'+
            '<a href="javascript:;" class="line-right">'+
            '<img src="img/8-2.png" alt="tu">'+
            '<span>工号：</span>'+
            '<em class="green-1">'+items.openid +'</em>'+
            '</a>'+
            '<a href="javascript:;">'+
            '<img src="img/8-3.png" alt="tu">'+
            '<span>服务区域：</span>'+
            '<em>'+items.stationCode+'</em>'+
            '</a>'+
            '</div>'+
            '<div class="serverItem line-top line-bottom">'+
            '<a href="javascript:;" class="line-right">'+
            '<img src="img/8-4.png" alt="tu">'+
            '<span>微信：</span>'+
            '<em>'+items.ticket+'</em>'+
            '</a>'+
            '<a href="javascript:;">'+
            '<img src="img/8-5.png" alt="tu">'+
            '<span>联系Ta：</span>'+
            '<em>'+items.phone+'</em>'+
            '</a>'+
            '</div>'+
            '</div>'
        )
    })
}