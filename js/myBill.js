/**
 * Created by liuyib on 12/4/2016.
 */
function myBill(){};

myBill.prototype.dialog = function(title, content){
	$().weuiDialog({
        title:title,
        content:content
    }).show();
}
myBill.prototype.init = function(){
    // 获取户号信息
    var consNo = "6662955144";
    this.getWxhhByHh(consNo);
    // 本期电量电费
    var now = new Date();
    var m = now.getMonth()+1;
    var ym = now.getFullYear()+String(m<10?"0"+m:m);
    this.getDldfByHhYm(consNo, ym);
	this.getYearBillInfo(consNo, ym);
};
//根据户号获取户号信息
myBill.prototype.getWxhhByHh = function(consNo){
    $.ajax({
        type: "GET",
        url: BizAPI+"cons/"+consNo,
        success: function(res) {
            if(res && res.length>0){
            	var $info = $(".bh-userBaseInfo");
            	var spans = $info.find("span");
            	spans[0].innerText = consNo;
            	spans[1].innerText = res[0].consName;
                $info.children("p").text(res[0].elecAddr);
            }
        },
        error: function(err) {
			this.dialog("提示","获取用户信息失败");
        }
    });
};
//根据户号与时间获取电量电费信息
myBill.prototype.getDldfByHhYm = function(consNo,rcvblYm){
	var mb = this;
    $.ajax({
        type: "GET",
        url: BizAPI+"dldf/cons/"+consNo+"/"+rcvblYm,
        success: function(res) {
            if(res && res.length>0){
				mb.getBillDate(consNo);
            	var $cf = $(".clearfix div:first");
            	$cf.find("em").text(res[0].rcvblYm.substr(4,2));
            	var $span = $cf.find("span");
            	// 未结清
            	if(res[0].settleFlag != 3) {
            		$span.text("未");
            	}else{
            		$span.text("已");
            		$(".orange-1").hide();
            	}
            	var $r = $(".row-2");
            	$r.find("span:first").text(res[0].tPq);
            	$r.find("span:last").text(res[0].rcvblAmt);
            }
        },
        error: function(err) {
			this.dialog("提示","获取电量电费失败");
        }
    });
};
//根据户号获取本期用电时间
myBill.prototype.getBillDate = function(consNo){
    $.ajax({
        type: "GET",
        url: BizAPI+"dldf/BillDate/"+consNo,
        success: function(res) {
            if(res && res.length>0){
            	var $cf = $(".clearfix p:first");
            	var last = res[0].lastMrDate;
            	var plan = res[0].planMrDate;
            	$cf.find("span:first").text(last);
            	$cf.find("span:last").text(plan.substr(0,4)+"-"+plan.substr(4,2)+"-"+plan.substr(6,2));
            }
        },
        error: function(err) {
			this.dialog("提示","获取本期用电时间失败");
        }
    });
};
//根据户号与年月获取最近12个月电量电费账单信息
myBill.prototype.getYearBillInfo = function(consNo, ym){
    $.ajax({
        type: "GET",
        url: BizAPI+"ydfx/summary/"+consNo+"/"+ ym,
        success: function(res) {
            if(res && res.length>0){
            	var trs = "";
            	for (var i = 0; i < res.length; i++) {
            		trs += "<tr><td>"+res[i].rcvblYm
            					+"</td><td>"+res[i].tPq
            					+"</td><td>"+res[i].rcvblAmt
            					+"</td></tr>";
            	}
            	$("tbody").html(trs);
            }
        },
        error: function(err) {
			this.dialog("提示","获取最近12个月电费账单失败");
        }
    });
};