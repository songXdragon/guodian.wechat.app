/**
 * Created by waima00 on 2016/12/5.
 */
var BizAPI = 'http://localhost/hdkj.WxAPI/';
var Weui = new Object();

Weui.dialog = function(title, content){
	$().weuiDialog({
        title:title,
        content:content
    }).show();
}