// Module Pattern via http://www.adequatelygood.com/JavaScript-Module-Pattern-In-Depth.html and http://www.codeproject.com/Articles/247241/Javascript-Module-Pattern
(function (gruseltourApp) {
    'use strict';

	gruseltourApp.dataProvider = function (useDummyData) {
		// we will store our days here
		var disabledTourDays;

		var parseAndSetData = function parseData (data) {
			disabledTourDays = gruseltourApp.util.transformDateLinesToArray(data);
		};

		var loadDummyData = function loadDummyData () {
			parseAndSetData('19.2.2016');
		};

		var load = (function (useDummyData) {
			if (useDummyData) {
				loadDummyData();
				return;
			}

			jQuery.get('//gruseltour-leipzig.de/wordpress/wp-content/themes/gruseltour-leipzig/js/data.txt', parseData);
		// run this immediately on parsing this object
		}(useDummyData));

		return {
			getData: function () {
				return disabledTourDays;
			}
		};
	};
}(window.gruseltourApp = window.gruseltourApp || {}));
