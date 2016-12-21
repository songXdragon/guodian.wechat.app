/**
 * Created by waima006 on 2016/12/8.
 */
/**
 * Created by waima006 on 2016/12/6.
 */
function powerAnalysis(){};
var ydfxList=null;

var consNo="0904814927";
var dateTime="201608";
var consName="6658162998";
var yearTime="201609";
var consNos="0024106659";
var dateTimes="201510";

powerAnalysis.prototype.init=function(){
    //Step1:通过用户编号和时间获取12个月内用电量最大，最小，平均及总用电量
    powerAnalysis.prototype.getConsNoDate(consNo,dateTime);
    //Step2:通过用户编号和时间获取12个月每月用电量
    powerAnalysis.prototype.getConsNoYears(consName,yearTime);
    //Step3:通过用户编号和时间获取用电阶梯电量
    powerAnalysis.prototype.getJtdfInfo(consNos,dateTimes);
    //Step4:根据(openID)微信ID获取当前用户信息
    powerAnalysis.prototype.ydfxName('1');
}
//根据获取当前用户信息
powerAnalysis.prototype.ydfxName=function(Id){
    $.ajax({
        type: "GET",
        url: BizAPI + "hh/hhInfo/" + Id,
        success: function (ress) {
            if (ress && ress.length > 0) {
                ydfxConsList(ress, $("#consName"));
                ydfxConsInfo(ress[0], $("#consAddr"));
            }
        },
        error:function(err){
            var d=$().weuiDialog({
                title:"提示",
                content:"获取用户信息失败"
            });
            d.show();
        }
    });
};
var ydfxConsList=function(consNames, element){
    element.html("");
    element.append('<p class="ellipsis" >用户编号：'+consNames[0].hh+'</p><p class="ellipsis" >户名：'+consNames[0].hm+'</p>')
};
var ydfxConsInfo=function(consaddr,element){
    element.html("");
    element.append('地址:'+consaddr.addr);
};

//通过用户编号和时间获取12个月内用电量最大，最小，平均及总用电量
powerAnalysis.prototype.getConsNoDate=function(consNo,dateTime){
    $.ajax({
        type:"GET",
        url: BizAPI+"ydfx/detail/"+consNo+"/"+dateTime,
        success: function(res){
            if(res){
                ydfxCondMap(res,$("#mmasm"));
            }
        },
        error:function(err){
            var d=$().weuiDialog({
                title:"提示",
                content:"获取用户信息失败"
            });
            d.show();
        }
    });
};



var ydfxCondMap=function(condMap,element){
    var sum=condMap.sum;
    var avg=condMap.avg;
    var max=condMap.max;
    var min=condMap.min;
    element.html("");
    element.append(
        '<a href="" class="line-top">'+
        '<div>本年累计用电</div>'+
        '<div>'+sum.SUM_MONT+'度</div></a>'+
        '<a href="" class="line-top">'+
        '<div>平均用电</div>'+
        '<div>'+avg.BILL_MONT+'度/月</div></a>'+
        '<a href="" class="line-top">'+
        '<div>最高用电</div>'+
        '<div><span>'+max.BILL_MONT+'度</span>'+
        '<span>'+max.BILL_DATE.substr(0,4)+'年'+max.BILL_DATE.substr(4,2)+'月'+'</span></div></a>'+
        '<a href="" class="line-top">'+
        '<div>最低用电</div>'+
        '<div><span>'+min.BILL_MONT+'度</span>'+
        '<span>'+min.BILL_DATE.substr(0,4)+'年'+min.BILL_DATE.substr(4,2)+'月'+'</span></div></a>')
};

//通过用户编号和时间获取12个月每月用电量
powerAnalysis.prototype.getConsNoYears=function(consName,yearTime){
    $.ajax({
        type: "GET",
        url: BizAPI + "ydfx/yearsMonth/" + consName + "/" + yearTime,
        success: function (monthDF) {
            if (monthDF) {
                monthDFcondMap(monthDF,$('#yearContainer'));
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

var monthDFcondMap=function (monthMap,element) {
    var key=new Array();
    var values=new Array();
    for(var keys in monthMap){
        key.push(keys.substr(4,2)+"月");
        values.push(monthMap[keys]);
    }

    element.html("");
    element.highcharts({
        credits: {
            enabled: false
        },
        chart: {
            type: 'line'
        },
        title: {
            text: null
        },
        xAxis: {
            categories: key,
            title: {
                text: '单位（度）',
                align: 'high'
            }

        },
        yAxis: {
            title: {
                text: null
            },
            plotLines: [{
                value: 0,
                width: 1,
                color: '#0aba66'
            }]
        },
        plotOptions: {
            series: {
                dataLabels: {
                    enabled: true
                },
                events: {
                    click: function (event) {
                        alert(event.point.category);
                    }
                },
                marker: {
                    fillColor: '#ffffff',
                    lineColor: "#0aba66",
                    lineWidth: 1,
                    radius: 4,  //曲线点半径，默认是4
                    symbol: 'circle' //曲线点类型："circle", "square", "diamond", "triangle","triangle-down"，默认是"circle"
                }
            }
        },
        tooltip: {
            //valueSuffix: '度',
            enabled: false
        },
        legend: {
            enabled: false
        },
        series: [	//指定数据列
            {
                name: '用电量',	//数据列名
                color: '#0aba66',
                lineWidth: 1,
                //shadow: true,
                //data: [17, 6.9, 9.5, 14.5, 18.2, 21.5, 25.2]	//数据
                data: [
                    {
                        y: values[0]
                    },
                    {
                        y: values[1]
                    },
                    {
                        y: values[2]
                    },
                    {
                        y: values[3]
                    },
                    {
                        y: values[4]
                    },
                    {
                        y: values[5]
                    },
                    {
                        y: values[6]
                    },
                    {
                        y: values[7]
                    },
                    {
                        y: values[8]
                    },
                    {
                        y: values[9]
                    },
                    {
                        y: values[10]
                    },
                    {
                        y: values[11]
                    }
                ]
            }
        ]
    });
};

//通过用户编号和时间获取用电阶梯电量
powerAnalysis.prototype.getJtdfInfo=function(consNos,dateTimes){
    $.ajax({
        type:"GET",
        url:BizAPI+"dldf/jtdlInfo/"+dateTimes+"/"+consNos,
        success: function(jtdf){
            if(jtdf && jtdf.length>0){
                jtdfCondList(jtdf,$("#jtdfs"));
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

var jtdfCondList=function(condList,element){
    element.html("");
    element.append(
        '<table class="table table-bordered">'+
        '<caption>更多内容</caption>'+
        '<tbody >'+
        '<tr>'+
        '<td>一档基数</td>'+
        '<td>2480</td>'+
        '<td>一档已用</td>'+
        '<td>'+condList[0].levOnePqSum+'</td>'+
        '</tr>'+
        '<tr>'+
        '<td>二档基数</td>'+
        '<td>2480</td>'+
        '<td>二档已用</td>'+
        '<td>'+condList[0].levTwoPqSum+'</td>'+
        '</tr>'+
        '<tr>'+
        '<td>三档基数</td>'+
        '<td>2480</td>'+
        '<td>三档已用</td>'+
        '<td>'+condList[0].levThreePqSum+'</td>'+
        '</tr>'+
        '</tbody>'+
        '</table>'
    )
};
