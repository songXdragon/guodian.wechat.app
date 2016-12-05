//消息跑马灯
NewsMarquee.defaults = { 
	line_show: 1,		//显示的行数
	moveDistance: 1,	//每次移动的距离
	interval: 120		//每次移动间隔的时间
};

function NewsMarquee(opts) { 
	this.opts = $.extend({}, NewsMarquee.defaults, opts);
	
	this.moveDistance = this.opts.moveDistance;
	this.line_show = this.opts.line_show;

	this.replenish();
	this.move();
}

NewsMarquee.prototype.replenish = function() { 
	var $replenish = $('.newsMarquee li:lt(' + this.line_show + ')').clone();
	$replenish.appendTo($('.newsMarquee ul'));

	this.$ul = $('.newsMarquee ul');
	this.$lis = $('.newsMarquee li');
	this.li_len = this.$lis.length;
	this.li_h = this.$lis.height();

	if (this.line_show > 1) { 
		$('.newsMarquee').height('0.' + this.line_show * this.li_h  + 'rem');
	}
};

NewsMarquee.prototype.move = function() { 
	var moveUnit = this.moveDistance;
	var _this = this;

	setInterval(function() { 
		if (_this.moveDistance >= _this.li_h * (_this.li_len - _this.line_show)) { 
			_this.moveDistance = 0;
		}
		_this.$ul.css('-webkit-transform', 'translateY(-' + _this.moveDistance + 'px)');
		_this.$ul.css('transform', 'translateY(-' + _this.moveDistance + 'px)');
		_this.moveDistance += moveUnit;

	}, _this.opts.interval);
};


$.prototype.newsMarquee = function(opts) { 
	return this.each(function() { 
		new NewsMarquee(opts);
	});
};