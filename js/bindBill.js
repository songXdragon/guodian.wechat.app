/**
 * Created by waima006 on 2016/12/9.
 */
function bindBill(){};
//用户密码为：
var passWod="123456";
//验证码为：
var code="v9am";
    bindBill.prototype.init=function(){
        var houseNumber=$("#houseNumber").val();//用户户号
        var queryCode=$("#queryCode").val();//用户微信等入密码
        var validatedCode=$("#validatedCode").val();//验证码
        bindBill.prototype.allConsNo(houseNumber,queryCode,validatedCode);
        //获取用户信息
       // bindBill.prototype.bindSum(houseNumber);


};
bindBill.prototype.allConsNo=function(houseNumber,queryCode,validatedCode){
    console.log(houseNumber+":"+queryCode+":"+validatedCode)
    if(queryCode==passWod && validatedCode==code){
        bindBill.prototype.bindSum(houseNumber);
    }else{
        alert("密码或验证码输入错误！")
    }

}
//获取用户信息
bindBill.prototype.bindSum=function(hoseNumber){
    console.log(hoseNumber);
    $.ajax({
        type: "GET",
        url: BizAPI + "cons/" + hoseNumber,
        success: function (userMsg) {
            if (userMsg) {
                alert("aa");
                console.log(userMsg);
                bindBillConsList(userMsg);
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
};
//将获取的信息存放到对应的数据库表格内
var bindBillConsList=function(usersMsg){
    $.ajax({
        type:"GET",
        url:BizAPI+"hh/addHhInfo/"+usersMsg[0].consNo+"/"+usersMsg[0].consName+"/"+usersMsg[0].elecAddr,
        success: function (index) {
            if (index>0) {
                window.location.reload();
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