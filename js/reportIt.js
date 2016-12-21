var ReportIt = new Function();

ReportIt.prototype.init = function() {
	// 初始化城市
	CityData.initCities("city");
	$("#city").on("change", function(){
		CityData.initCounties(this.value, "town");
	})
}
