var RealtimePower = new Function();

RealtimePower.prototype.init = function(consNo){
	// 限制起止日期最多选最近一个月
	var max = new Date();
	var min = new Date(max.getTime() - 1000*60*60*24*30);
	var $se = $("#startDate,#endDate");
	var m1 = min.getMonth()+1,
		m2 = max.getMonth()+1,
		d1 = min.getDate(),
		d2 = max.getDate();
	$se.attr("min", min.getFullYear()+"-"+(m1<10?"0"+m1:m1)+"-"+(d1<10?"0"+d1:d1));
	$se.attr("max", max.getFullYear()+"-"+(m2<10?"0"+m2:m2)+"-"+(d2<10?"0"+d2:d2));
	var that = this;
	that.drawHistogram(consNo);
	$se.on("change", function(){
		var s = $("#startDate").val().replace("/","-"),
			e = $("#endDate").val().replace("/","-");
		if(s && e) {
			s = s.split("-");
			e = e.split("-");
			if(new Date(s[0],s[1],s[2]).getTime() > new Date(e[0],e[1],e[2]).getTime()) {
				Weui.dialog("提示","起始日期不能大于结束日期");
				return;
			}
			that.elecDataBeginEnd(consNo, s.join(""), e.join(""));
		}
	});
}

// 初始化近7天电量条形图
RealtimePower.prototype.drawHistogram = function(consNo){
	var that = this;
	$.get(BizAPI + "amt/getSevenDay/"+consNo, function(res){
		if(res && res.length>0)
			that.draw(res);
	});
}

// 根据数据初始化条形图和表格
RealtimePower.prototype.draw = function(res){
	var arr = [], days = [], html = "";
	for (var i = 0; i < res.length; i++) {
		arr.push(res[i].quantity);
		days.push(res[i].quantityDate);
		html += "<tr><td>$"+i+"</td><td>"+res[i].quantity+"</td></tr>";
	}
	days.sort();
	for (var j = 0; j < days.length; j++) {
		var date = new Date(days[j]);
		var m = date.getMonth()+1;
		m = m<10?"0"+m:m;
		var d = date.getDate();
		d = d<10?"0"+d:d;
		days[j] = m + "-" + d;
		html = html.replace("$"+j, days[j]);
	}
	$("tbody").html(html);
	$('#sevenDayContainer').highcharts({
			chart: {
				type: 'column'
			},
			title: {
				text: null
			},
			subtitle: {
				text: null
			},
			xAxis: {
				categories: days,
				title: {
					text: null
				}
			},
			yAxis: {
				min: 0,
				title: {
					text: '单位（度）',
					align: 'high'
				},
				labels: {
					overflow: 'justify'
				}
			},
			plotOptions: {
				series: {
					dataLabels: {
						enabled: true,
						color: '#606060'
					},
					events: { 
						click: function(event) { 
							alert(event.point.category);
						}
					}
				}
			},
			tooltip: {
				//valueSuffix: '度',
				enabled: false
			},
			exporting: { 
				enabled: false
			},
			legend: {
				enabled: false
			},
			credits: {
				enabled: false
			},
			series: [{
				name: '用电量',
				color: '#29AE63',
				data: arr
			}]
		});
}
// 初始化总电量、余额列表数据
RealtimePower.prototype.elecDataBeginEnd = function(consNo, s, e){
	var that = this;
	$.get(BizAPI + "amt/getStartAndEndTime/"+consNo+"/"+s+"/"+e, function(res){
		if(res && res.length>0)
			that.draw(res);
	});
}