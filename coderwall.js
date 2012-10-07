(function($) {
	$.fn.coderwall = function(options){
		var defaults = {	
			user:	false,
			size:	100,
			num:	0,
			desc: 	true,
			error:	"There went something wrong"
		}; 
	
		var options = $.extend(defaults, options);

		if (!options.user)
			return this; 
	
		var url = "http://coderwall.com/"+options.user+".json?callback=?";
		var html = "";
		var obj = this;
		var title = "";

		var h = $.getJSON(url, function(data) {
			var items = [];
			var i = 0;
			
			$.each(data.data.badges, function(a, badge) {
				i++;
				if(options.num == 0 || i <= options.num) {
					title = badge.name
					if(options.desc)
						title += ": "+badge.description;
					items.push('<img style="width: '+options.size+'; height: '+options.size+';" src="'+badge.badge+'" alt="'+badge.name+'" title="'+title+'" />');
				}
			});
			html = items.join(""); 
			obj.each(function() {  
				$(this).html(html); 
			}); 
			return this;
		});
		h.error(function() {
			obj.each(function() {
				$(this).html(options.error);
			});
			return this;
		});
	};
})(jQuery);