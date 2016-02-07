(function (gruseltourApp) {
    'use strict';

	gruseltourApp.init = function (useDummyData) {
		useDummyData = useDummyData || false;
	  	var dataProvider = gruseltourApp.dataProvider(useDummyData),
	  		dateChecker = gruseltourApp.dateChecker(dataProvider);

	  	// get the 2nd inputfield
	  	var $datepickerInjectionPoint = jQuery('#contact-form-18 input.text').eq(1);
		if (!$datepickerInjectionPoint.length) {
			console.log('Could not find injection point for the datepicker.');
			return;
		}

		// inject the datepicker
	    $datepickerInjectionPoint.datepicker({
	    	// minDate: today
			minDate: 0,
			// is this day already fully booked ?
			beforeShowDay: dateChecker.isAvailable
		});

		// set datepicker input field to readonly
		var setReadonlyFlag = (function (element) {
			element.addClass('readonly');
			element.prop('readonly', true);
		}($datepickerInjectionPoint));
	};

	// augment the jQuery Datepicker with a footer
	gruseltourApp.renderFooterOnDatepicker = function () {
		var htmlEntities = gruseltourApp.tourHTMLEntities();

		jQuery.extend(jQuery.datepicker, {
			_generateHTMLOriginal: jQuery.datepicker._generateHTML,

			generateFooter: function (legendOptions) {
				// TODO: refactor to support locale
				var TEXT_LAST_REFRESHED = 'Zuletzt aktualisiert: Heute, um',
					TEXT_LAST_REFRESHED_TIME = gruseltourApp.util.toGermanTimeString(new Date());

				var html = '<div class="ui-datepicker-footer">';
				var items = [];

				// validate argument
				legendOptions = legendOptions || [];

				// go through legendOptions and map properties to html code
				var length = legendOptions.length;
				if (length) {
					for (var i = 0; i < length; i += 1) {
						// use direct assignment in this case because we're micro-optimizing.
						var legend = legendOptions[i];
						// class=color will always be assigned
						items[i] = '<li><div class="color {0}" /><div>{1}</div></li>'.format(legend.style, legend.title);
					}
					html += '<ul class="legend">' + items.join('') + '</ul>' +
							'<hr class="clear" />';
				}

				html += '<div class="lastRefreshDate">{0} {1}</div>'.format(TEXT_LAST_REFRESHED, TEXT_LAST_REFRESHED_TIME) +
						'</div>';
				return html;
			},

			_generateHTML: function (inst) {
				var legendOptions = [];
				legendOptions.push(htmlEntities.disabled);

				var footerHTML = this.generateFooter(legendOptions);
	    		return this._generateHTMLOriginal(inst) + footerHTML;
			}
		});
	};
// create global namespace and run it
}(window.gruseltourApp = window.gruseltourApp || {}));

// Only include at end of main application...
jQuery(document).ready(function () {
    'use strict';

	// only set dummyData for testing
	window.gruseltourApp.init(true);

	window.gruseltourApp.renderFooterOnDatepicker();
});
