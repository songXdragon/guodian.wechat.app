var CityData = new Function();
// 初始化城市
CityData.initCities = function(selectId) {
    $.get(BizAPI + "allCityName/", function(cities){
        if(cities && cities.length > 0) {
            var opts = '<option value="">请选择城市</option>';
            for (var i = 0; i < cities.length; i++) {
                opts += '<option value="' + cities[i].value + '">' + cities[i].name + '</option>';
            }
            var sel = document.getElementById(selectId);
            sel.innerHTML = opts;
        }
    })
}
// 根据城市code获取下级区县
CityData.initCounties = function(cityCode, selectId) {
    $.get(BizAPI + "allTownName/" + cityCode, function(counties){
        if(counties && counties.length > 0) {
            var opts = '<option value="">请选择地区</option>';
            for (var i = 0; i < counties.length; i++) {
                opts += '<option value="' + counties[i].value + '">' + counties[i].name + '</option>';
            }
            var sel = document.getElementById(selectId);
            sel.innerHTML = opts;
        }
    })
}