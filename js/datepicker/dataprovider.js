// Module Pattern via http://www.adequatelygood.com/JavaScript-Module-Pattern-In-Depth.html and http://www.codeproject.com/Articles/247241/Javascript-Module-Pattern and https://javascriptweblog.wordpress.com/2010/04/22/the-module-pattern-in-a-nutshell/
(function (gruseltourApp) {
    'use strict';

	gruseltourApp.dataProvider = function(useDummyData) {
		// we will store our days here
		var disabledTourDays;

		var parseAndSetData = function parseData(data) {
            console.log('finished loading data: ' + data);
			disabledTourDays = gruseltourApp.util.transformDateLinesToArray(data);
		};

        // TODO: remove and mock this in a test
		var loadDummyData = function loadDummyData() {
			var today = (new Date()).toLocaleDateString('de-de');
			parseAndSetData(today);
		};

		var load = (function(useDummyData) {
			if (useDummyData) {
                console.log('Running in TEST mode.');
				loadDummyData();
				return;
			}

            // TODO: put domain in a config object
			jQuery.get('//hauntedleipzig.de/wordpress/wp-content/themes/hauntedleipzig/js/data.txt', parseAndSetData);
		// run this immediately on parsing this object
		}(useDummyData));

		return {
			getData: function () {
                console.log('data fetched is: ' + disabledTourDays);
				return disabledTourDays;
			}
		};
	};
}(window.gruseltourApp = window.gruseltourApp || {}));
