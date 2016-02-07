// Module Pattern via http://www.adequatelygood.com/JavaScript-Module-Pattern-In-Depth.html and http://www.codeproject.com/Articles/247241/Javascript-Module-Pattern
(function (gruseltourApp) {
    'use strict';

	gruseltourApp.dataProvider = function(useDummyData) {
		// we will store our days here
		var disabledTourDays;

		var parseAndSetData = function parseData(data) {
			disabledTourDays = gruseltourApp.util.transformDateLinesToArray(data);
		};

        // TODO: remove and mock this in a test
		var loadDummyData = function loadDummyData() {
			parseAndSetData('19.2.2016');
		};

		var load = (function(useDummyData) {
			if (useDummyData) {
				loadDummyData();
				return;
			}

            // TODO: put domain in a config object
			jQuery.get('//hauntedleipzig.de/wordpress/wp-content/themes/hauntedleipzig/js/data.txt', parseAndSetData);
		// run this immediately on parsing this object
		}(useDummyData));

		return {
			getData: function () {
				return disabledTourDays;
			}
		};
	};
}(window.gruseltourApp = window.gruseltourApp || {}));
