/**
 * Created by liuyib on 12/4/2016.
 */
function myBill(){};

myBill.prototype.init = function(){
        var d=$().weuiDialog({
            title:"提示",
            content:"测试Dialog提示"
        });
        d.show();


    myBill.prototype.getHHbyWxId('9000107362','1609');
};

//根据户号与时间获取电量电费信息
myBill.prototype.getHHbyWxId = function(consNo,rcvblYm){


};