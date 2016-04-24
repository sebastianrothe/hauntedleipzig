(function(gruseltourApp) {
    'use strict';

    gruseltourApp.dateHelper = function () {
        var DATE_FRIDAY = 5, DATE_SATURDAY = 6, DATE_SUNDAY = 0;

        return {
            isDisabled: function(date, disabledDates) {
                var localDateString = gruseltourApp.util.toLocalDateString(date);
                console.log('matching ' + localDateString + ' to ' + disabledDates);
                return jQuery.inArray(localDateString, disabledDates) !== -1;
            },

            // weekend includes friday
            isWeekend: function(date) {
                var day = date.getDay();
                return day === DATE_FRIDAY || day === DATE_SATURDAY || day === DATE_SUNDAY;
            },

            // weekday excludes friday
            isNotWeekend: function(date) {
                return !this.isWeekend(date);
            }
        };
    };

    // TODO: inject this object with locale support
    gruseltourApp.tourHTMLEntities = function () {
        return {
            disabled: {
                title: 'Fully booked',
                tooltip: 'The tour is fully booked on this date.',
                style: 'full'
            },

            noRegularTour: {
                title: 'Not available',
                tooltip: 'The tour is not available on this date.',
                style: 'not-available'
            }
        };
    };

    gruseltourApp.dateChecker = function (dataProvider) {
        var disabledDates = dataProvider.getData(),
            dateHelper = gruseltourApp.dateHelper(),
            htmlEntities = gruseltourApp.tourHTMLEntities(),
            noRegularTour = htmlEntities.noRegularTour,
            disabledTour = htmlEntities.disabled;

        console.log('data fetched is: ' + disabledDates + ' from ' + dataProvider);

        return {
            isAvailable: function (date) {
                if (dateHelper.isNotWeekend(date)) {
                    return [false, noRegularTour.style, noRegularTour.tooltip];
                }

                if (dateHelper.isDisabled(date, disabledDates)) {
                    return [false, disabledTour.style, disabledTour.tooltip];
                }

                return [true];
            }
        };
    };
}(window.gruseltourApp = window.gruseltourApp || {}));
