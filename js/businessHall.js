/**
 * Created by liuyib on 12/4/2016.
 */
function businessHall(){};

var consList = null;

businessHall.prototype.init = function(){


    //Step 1: 根据微信OpenId获取所有绑定户号列表与信息
    businessHall.prototype.getHHbyWxId('1',$("#userNumber"));
    //Step 2: 是否已经绑定户号,如未绑定则不执行后续操作

    //Step 3: 根据当前默认主户号获取用户信息绑定到上方列表中的元素

    //Step 4: 根据当前默认主户号获取用户电量电费数据绑定到上方列表中的元素
};

//根据Weixin OpenId获取当前已绑定的户号列表与信息
businessHall.prototype.getHHbyWxId = function(wxId,list){
    $.ajax({
        type: "GET",
        url: BizAPI+"hh/hhInfo/"+wxId,
        success: function(res) {
            consList = res;
            if(res && res.length>0){
                //alert(res.length);
                bindConsList(res,list);
                bindConsInfo(res[0],$("#bh_addr"))
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

//根据户号获取当前用户信息
businessHall.prototype.getHHInfo = function(consNo){
    alert(consNo);
    $.ajax({
        type: "GET",
        url: BizAPI+"hh/hhInfoHh/"+consNo+"/0",
        success: function(res) {
            if(res && res.length>0){
                alert(res.length);
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

var bindConsList = function(consData, element){
    element.html("");
    element.append('<li><a class="clearfix" href="javascript:;"><div class="ellipsis">用户编码：<b class="houseCode">'+consData[0].hh+'</b></div><div class="ellipsis">户名：<b class="houseName">'+consData[0].hm+'</b></div></a></li>')
    consData.forEach(function (item) {
        element.append('<li><a class="clearfix" href="javascript:;"><div class="ellipsis">用户编码：<b class="houseCode">'+item.hh+'</b></div><div class="ellipsis">户名：<b class="houseName">'+item.hm+'</b></div></a></li>')
    });
    setSwtichForConsNo();
};

var bindConsInfo = function(consData,element){
    element.html("");
    element.append("地址:"+consData.addr);
};

//顶部绑定用户信息后调用此方法设置切换户名和户号
var setSwtichForConsNo = function(){
    var $userNumber = $('#userNumber'),
        $firstLi = $userNumber.find('li:eq(0)'),
        $firstCode = $firstLi.find('.houseCode'),
        $firstName = $firstLi.find('.houseName'),
        isVisible = false;

    $userNumber.on("click", 'li', function(e){
        var $this = $(this),
            selectedCode = $this.find('.houseCode').text(),
            selectedName = $this.find('.houseName').text();
        if (isVisible) {
            if (selectedCode !== $firstCode.text()) {
                $firstCode.text(selectedCode);
                $firstName.text(selectedName);
            }
            $firstLi.removeClass('first').siblings().slideUp(200); //第一个li增加first类名，其它li收起来
            isVisible = false;
        } else {
            $firstLi.addClass('first').siblings().slideDown(200); //第一个li移除first类名，其它li展开
            isVisible = true;
        }
    });
};

var setSVGImg = function(){
    var $svgLoader = $('#svgLoader'),
        src = $svgLoader.data('src');
    $.ajax({
        url: src,
        dataType: 'xml',
        success: function(content) {
            var doc = content.documentElement;
            $svgLoader.after(doc).remove();

            //设置头部第2行左边与右边一样高
            var $header_mainInfo_div = $('#userInfo .row-2-item'),
                dashboardArea_h = $header_mainInfo_div.eq(1).height();
            $header_mainInfo_div.eq(0).height(dashboardArea_h);

            //svg加载完成后，设置列表的行高
            var li_h = Math.ceil($('.header').height() / $('#userNumber li').length),
                $userNumber = $('#userNumber');
            $userNumber.find('li').css('line-height', (li_h > 100 ? 100 : li_h) + 'px');
        },
        error: function(error) {
            console.log(error);
        }
    }).done(function() {
        var setPointerState = function(deg) {
            deg = parseInt(deg);
            if (typeof deg === 'number') {
                if (deg >= 0 && deg <= 54) {
                    $('#dashboard-pointer path').css('fill', '#0ABA66');
                }
                if (deg > 54 && deg <=216) {
                    $('#dashboard-pointer path').css('fill', '#f3a826');
                }
                if (deg > 216 && deg <= 270) {
                    $('#dashboard-pointer path').css('fill', '#ff4646');
                }
                if (deg >= 0 && deg <= 270) {
                    $('#dashboard-pointer').css({
                        '-webkit-transform': 'rotate(' + deg + 'deg)',
                        'transform': 'rotate(' + deg + 'deg)'
                    });
                }
            }
        };
        /*
         *根据参数设置指针角度
         *指针的角度介于0－270度之间
         */
        setTimeout(function() {
            setPointerState(162);
        }, 100);
    })
};